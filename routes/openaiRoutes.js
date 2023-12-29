import express from "express";
import {
  chatbotController,
  getResponceController,
  jsconverterController,
  paragraphController,
  scifiImageController,
  summaryController,
} from "../controllers/openaiController.js";

const router = express.Router();

//route
router.post("/summary", summaryController);
router.post("/paragraph", paragraphController);
router.post("/chatbot", chatbotController);
router.post("/js-converter", jsconverterController);
router.post("/scifi-image", scifiImageController);
router.post("/getResponce", getResponceController);

export default router;
