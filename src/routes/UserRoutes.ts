import express from 'express'
import { validateUserBody } from '../validators/BaseValidators';
import UserController from '../controllers/UserController';

const router = express.Router();

router.post("/user/create",validateUserBody, UserController.createUser);

export default router;