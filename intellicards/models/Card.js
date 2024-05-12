// models/Card.js
import { Schema, model } from "mongoose";

const cardSchema = new Schema({
    question: String,
    answer: String,
    image: String,
});

const Card = model("Card", cardSchema);

export { Card };
