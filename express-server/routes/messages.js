import { Router } from "express";
import { getMessagesController, replyMessageController, sendMessageController } from "../controllers/messageController.js";

const router = Router();

router.post("/send", sendMessageController);
router.get("/", getMessagesController);
router.post("/:messageId/reply", replyMessageController);

export default router;
