import { Router } from 'express';
import authRouter from './auth.router.js'
import userRouter from './user.router.js'
import orgRouter from './organization.router.js'

const router = Router();
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/organization', orgRouter);

export default router;