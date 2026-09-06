# FirmDesk Oracle Cloud Deployment

## Prerequisites

- Oracle Cloud Always Free VM (A1.Flex, 4 OCPU, 24 GB RAM)
- Ubuntu 22.04 or Oracle Linux 9
- Domain pointed to VM public IP
- `.env` file with production values ready

## Quick Deploy

### 1. Build locally

```bash
cd backend
npm run build
```

### 2. Transfer files to VM

The app code, PM2 config, and the whole `deploy/` folder (setup script + nginx
config) all need to reach the VM:

```bash
ssh ubuntu@<VM_IP> "sudo mkdir -p /opt/firmdesk && sudo chown ubuntu:ubuntu /opt/firmdesk"
scp -r dist package.json package-lock.json deploy/ ubuntu@<VM_IP>:/opt/firmdesk/
```

> The setup script runs from `/opt/firmdesk` and reads
> `deploy/nginx/firmdesk.conf` and `deploy/ecosystem.config.cjs`, so the
> `deploy/` folder must be part of the transfer.

### 3. Copy .env to VM

```bash
scp .env.production ubuntu@<VM_IP>:/opt/firmdesk/.env
```

> The app validates its environment at boot and exits with a clear list of any
> missing variables, so the `.env` must be in place before setup runs.

### 4. Run setup script

```bash
ssh ubuntu@<VM_IP>
cd /opt/firmdesk
chmod +x deploy/setup.sh
./deploy/setup.sh jvaccounting.in you@your-email.com
```

> The second argument is the certbot email used for certificate expiry notices.
> It defaults to admin@jvaccounting.in if omitted.

The script issues the TLS certificate in two phases: a temporary HTTP-only
nginx config first (so the ACME challenge can be answered), then the full
HTTPS config once the certificate exists. It also creates `/var/log/firmdesk`
and warns (without aborting) if MongoDB is not running on the host.

### 5. Open Oracle Cloud firewall ports

In OCI Console > Networking > Security Lists:
- Add ingress rules for TCP 80 and 443

Also on the VM:
```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save
```

## Manual Management

```bash
pm2 status              # Check status
pm2 logs firmdesk       # View logs
pm2 restart firmdesk    # Restart app
pm2 stop firmdesk       # Stop app
sudo systemctl reload nginx   # Reload nginx after config changes
sudo certbot renew      # Renew SSL certificate
```

## Alternative: Systemd (without PM2)

```bash
sudo cp deploy/firmdesk.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now firmdesk
sudo journalctl -u firmdesk -f   # View logs
```

## Expected Capacity on Oracle A1.Flex

| Metric | Value |
|--------|-------|
| Safe concurrent users | 50-100 |
| Max burst users | 200+ |
| Sustainable RPS | 50-100 |
| RAM available | 24 GB |
| CPU cores | 4 ARM |
| Cold starts | None |

## Updating the Application

```bash
npm run build
scp -r dist ubuntu@<VM_IP>:/opt/firmdesk/dist
ssh ubuntu@<VM_IP> "pm2 restart firmdesk"
```

---

# Render Deployment (Free Plan)

This section is for deploying the backend to Render instead of Oracle Cloud.
The repo root contains `render.yaml`, a Render Blueprint that defines:

- **`firmdesk-api`** (web service): builds with `npm ci && npm run build`,
  starts with `npm run start`, health-checked at `/api/v1/health`
- **`firmdesk-indexes`** (job): runs `npm run indexes` against the production
  database so the index step is never forgotten (Mongoose's `autoIndex` is
  disabled in production by design — `src/config/db.ts`)

## First Deploy

1. Push `render.yaml` at the repository root to `main`.
2. In Render: **New > Blueprint**, select the repo. Render reads `render.yaml`.
3. When prompted, link/enter the environment variables (full list in
   `backend/.env.example`). At minimum you will need:
   - `MONGODB_URI` (MongoDB Atlas free cluster works)
   - `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `APP_BASE_URL`
   - `CORS_ORIGINS` (no wildcards accepted, the app refuses to boot with one)
   - `FIELD_ENCRYPTION_KEY` (32 bytes, base64) — generate with:
     `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
   - `R2_*` Cloudflare R2 credentials, `SMTP_*` + `MAIL_FROM`
4. Deploy the web service, then run the `firmdesk-indexes` job once.
5. Verify: `GET <api-url>/` returns `{"status":"ok"}` and
   `GET <api-url>/api/v1/health` returns `"db":"up"`.

> **Post-deploy, every time:** after each API deploy, run the
> `firmdesk-indexes` job (Render dashboard > firmdesk-indexes > Trigger Job).
> It is idempotent and keeps query performance as models evolve.

## Frontend on Render

The frontend is a static Vite build — host it as a Render **Static Site**:

- Build command: `npm ci && npm run build`
- Publish directory: `frontend/dist`
- Environment variable: `VITE_API_BASE_URL` = your deployed API URL + `/api/v1`
  (baked in at build time, so set it before the first build)
- `VITE_APP_NAME` = your app display name

## Free-Plan Behaviour (expected, not bugs)

- **Spin-down**: the API sleeps after ~15 min without traffic. The first
  request after wake-up takes several seconds and hits the DB cold — the
  in-memory LRU cache and rate-limit counters live in process memory and are
  cleared on every wake. Under sustained traffic the cache works normally.
- **Single instance only**: the app deliberately assumes one instance
  (in-memory rate limits and cache). Do not scale to multiple instances on
  Render without first moving rate limiting/caching to Redis.
- **CORS**: set `CORS_ORIGINS` to your exact frontend origin(s)
  (e.g. `https://your-site.onrender.com`). The API rejects every other origin
  and refuses to boot with wildcard origins.

## Deploying Changes

Auto-deploy is on: every push to `main` redeploys the API (Blueprint builds
only when `backend/**` changes, set in the dashboard if needed). After each
deploy completes, trigger the `firmdesk-indexes` job.
