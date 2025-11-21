import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Ecom API is healthy',
    timestamp: new Date().toISOString(),
  });
});

export default router;
