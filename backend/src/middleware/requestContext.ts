import { randomUUID } from 'node:crypto';

import type { NextFunction, Request, RequestHandler, Response } from 'express';

import { isProduction } from '../config/env.js';
import { logger } from '../config/logger.js';

const clientIp = (req: Request): string | null => {
  if (isProduction) {
    const cfIp = req.headers['cf-connecting-ip'];
    if (typeof cfIp === 'string' && cfIp.trim().length > 0) {
      return cfIp.trim();
    }
  }
  return req.ip ?? req.socket.remoteAddress ?? null;
};

export const requestIp = clientIp;

export const requestUserAgent = (req: Request): string | null => {
  const agent = req.headers['user-agent'];
  return typeof agent === 'string' ? agent.slice(0, 400) : null;
};

export const requestContext: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestId = randomUUID();

  req.requestId = requestId;
  req.log = logger.child({ requestId });
  res.setHeader('X-Request-Id', requestId);

  const startedAt = process.hrtime.bigint();
  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    req.log.info(
      {
        event: 'http.request',
        method: req.method,
        route: req.route === undefined ? req.path : req.originalUrl.split('?')[0],
        status: res.statusCode,
        durationMs: Math.round(durationMs),
        userId: req.authUser?.id.toString() ?? null,
      },
      'request completed',
    );
  });

  next();
};
