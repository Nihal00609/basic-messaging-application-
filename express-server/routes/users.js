import { Router } from "express";
import { deleteUserController, getAllUsersController, getUserByIdController, updateUserController } from "../controllers/userController.js";

const router = Router();

router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
