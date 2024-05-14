import { CardSet } from "@/models/CardSet";
import { mongooseConnect } from "@/lib/mongoose";

// Створення нового набору карточок
export const createCardSet = async (req, res) => {
    try {
        await mongooseConnect();
        const { name, category, userId, rating, isPublic } = req.body;
        const cardSet = new CardSet({
            name,
            category,
            userId,
            rating,
            isPublic,
        });
        await cardSet.save();
        res.status(201).json(cardSet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating card set" });
    }
};

// Отримання набору карточок за ідентифікатором
export const getCardSet = async (req, res) => {
    try {
        await mongooseConnect();
        const cardSet = await CardSet.findById(req.params.id);
        if (!cardSet) {
            return res.status(404).json({ message: "Card set not found" });
        }
        res.json(cardSet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching card set" });
    }
};

// Оновлення набору карточок за ідентифікатором
export const updateCardSet = async (req, res) => {
    try {
        await mongooseConnect();
        const { name, category, rating, isPublic } = req.body;
        const cardSet = await CardSet.findByIdAndUpdate(
            req.params.id,
            { name, category, rating, isPublic },
            { new: true }
        );
        if (!cardSet) {
            return res.status(404).json({ message: "Card set not found" });
        }
        res.json(cardSet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating card set" });
    }
};

// Видалення набору карточок за ідентифікатором
export const deleteCardSet = async (req, res) => {
    try {
        await mongooseConnect();
        const cardSet = await CardSet.findByIdAndDelete(req.params.id);
        if (!cardSet) {
            return res.status(404).json({ message: "Card set not found" });
        }
        res.json({ message: "Card set deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting card set" });
    }
};
