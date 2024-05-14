import express from "express";
import {
    createCard,
    getCard,
    updateCard,
    deleteCard,
} from "../api/cardController";

const router = express.Router();

// Маршрути для карточок
router.post("/", createCard);
router.get("/:id", getCard);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);

export default router;
