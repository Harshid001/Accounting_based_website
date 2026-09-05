import { Router } from 'express';

/**
 * Storage transfer endpoints were removed when the server migrated from GridFS
 * to Cloudflare R2 with presigned URLs. Clients now PUT files directly to R2
 * using the presigned URL returned by POST /documents/presign-upload, and
 * download via the presigned URL returned by GET /documents/:id/download.
 *
 * This router is kept as a named export so existing imports compile without
 * churn; it registers no routes.
 */
export const storageRouter: Router = Router();
