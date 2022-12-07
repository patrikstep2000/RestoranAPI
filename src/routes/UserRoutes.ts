import express from 'express'
import { validateUserBody } from '../validators/BaseValidators';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';

const router = express.Router();

router.post("/user/create",validateUserBody, UserController.createUser);
router.post("/user/login", AuthController.AuthenticateUser);

export default router;