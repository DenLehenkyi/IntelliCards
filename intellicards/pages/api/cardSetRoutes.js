import express from "express";
import {
    createCardSet,
    getCardSet,
    updateCardSet,
    deleteCardSet,
} from "../api/cardSetController";

const router = express.Router();

// Маршрути для наборів карточок
router.post("/", createCardSet);
router.get("/:id", getCardSet);
router.put("/:id", updateCardSet);
router.delete("/:id", deleteCardSet);

export default router;
