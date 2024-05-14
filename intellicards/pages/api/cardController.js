import { Card } from "../models/Card";
import { mongooseConnect } from "@/lib/mongoose";

// Створення нової карточки
export const createCard = async (req, res) => {
    try {
        await mongooseConnect();
        const { question, answer, image } = req.body;
        const card = new Card({ question, answer, image });
        await card.save();
        res.status(201).json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating card" });
    }
};

// Отримання карточки за ідентифікатором
export const getCard = async (req, res) => {
    try {
        await mongooseConnect();
        const card = await Card.findById(req.params.id);
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }
        res.json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching card" });
    }
};

// Оновлення карточки за ідентифікатором
export const updateCard = async (req, res) => {
    try {
        await mongooseConnect();
        const { question, answer, image } = req.body;
        const card = await Card.findByIdAndUpdate(
            req.params.id,
            { question, answer, image },
            { new: true }
        );
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }
        res.json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating card" });
    }
};

// Видалення карточки за ідентифікатором
export const deleteCard = async (req, res) => {
    try {
        await mongooseConnect();
        const card = await Card.findByIdAndDelete(req.params.id);
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }
        res.json({ message: "Card deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting card" });
    }
};
