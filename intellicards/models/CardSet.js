import { Schema, model } from "mongoose";

const cardSetSchema = new Schema({
    name: String,
    category: String,
    cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    rating: Number,
    IsPublic: { type: Boolean, default: true },
});

const CardSet = model("CardSet", cardSetSchema);

export { CardSet };
