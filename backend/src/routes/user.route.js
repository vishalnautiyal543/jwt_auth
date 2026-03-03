import {Router} from "express"
import { getUsers, login, register } from "../controllers/user.controller.js";

const router = Router();

router.post("/register",register)
router.post("/login",login)
router.get("/users",getUsers)

export default router;