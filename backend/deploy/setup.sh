#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${1:-jvaccounting.in}"
EMAIL="${2:-admin@${DOMAIN}}"
APP_DIR="/opt/firmdesk"
NODE_VERSION="22"

# Fail fast if the layout is wrong. Files are staged into APP_DIR by the README
# transfer steps; this script runs from there and must not copy onto itself.
if [ "$PWD" != "$APP_DIR" ]; then
  echo "Run this from ${APP_DIR}: cd ${APP_DIR} && ./deploy/setup.sh ${DOMAIN} [email]" >&2
  exit 1
fi

for required in package.json dist/src/server.js deploy/nginx/firmdesk.conf deploy/ecosystem.config.cjs; do
  if [ ! -e "$required" ]; then
    echo "Missing ${required} under ${APP_DIR}. Follow the README transfer steps first." >&2
    exit 1
  fi
done

if [ ! -f .env ]; then
  echo "Missing ${APP_DIR}/.env. Copy your production environment file first (README step 3)." >&2
  exit 1
fi

echo "==> Updating system packages"
sudo apt update && sudo apt upgrade -y

echo "==> Installing Node.js ${NODE_VERSION}"
curl -fsSL "https://deb.nodesource.com/setup_${NODE_VERSION}.x" | sudo -E bash -
sudo apt install -y nodejs git nginx certbot python3-certbot-nginx

echo "==> Installing PM2 globally"
sudo npm install -g pm2

echo "==> Creating log directory"
sudo mkdir -p /var/log/firmdesk
sudo chown "$USER:$USER" /var/log/firmdesk

echo "==> Installing production dependencies"
npm ci --omit=dev

echo "==> Checking MongoDB"
if ! systemctl is-active --quiet mongod 2>/dev/null; then
  echo "    WARNING: mongod is not running on this host."
  echo "    Either install MongoDB 8.0 (https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)"
  echo "    or point MONGODB_URI in ${APP_DIR}/.env at MongoDB Atlas before the app will boot."
fi

# Phase 1: a plain HTTP config so nginx passes `nginx -t` and certbot can
# answer the ACME challenge. The production config references certificate
# files that do not exist until certbot succeeds, so it must wait.
echo "==> Installing temporary HTTP config for certificate issuance"
sudo tee /etc/nginx/sites-available/firmdesk >/dev/null <<EOF
server {
    listen 80;
    server_name ${DOMAIN};
    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
sudo ln -sf /etc/nginx/sites-available/firmdesk /etc/nginx/sites-enabled/firmdesk
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

echo "==> Obtaining SSL certificate for ${DOMAIN} (certbot email: ${EMAIL})"
sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --email "$EMAIL"

# Phase 2: certificates now exist, so the full production config will validate.
echo "==> Installing production nginx config"
sudo cp deploy/nginx/firmdesk.conf /etc/nginx/sites-available/firmdesk
sudo sed -i "s/DOMAIN_PLACEHOLDER/${DOMAIN}/g" /etc/nginx/sites-available/firmdesk
sudo nginx -t && sudo systemctl reload nginx

echo "==> Starting application with PM2"
pm2 start deploy/ecosystem.config.cjs
pm2 save
sudo env PATH="$PATH:/usr/bin" pm2 startup systemd -u "$USER" --hp "$HOME"

echo "==> Opening firewall ports"
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow OpenSSH
sudo ufw --force enable || true

echo ""
echo "==> Deployment complete!"
echo "    App running at: https://${DOMAIN}"
echo "    PM2 status:     pm2 status"
echo "    Logs:           pm2 logs firmdesk"
echo "    Restart:        pm2 restart firmdesk"
