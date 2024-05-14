import { Card } from "@/models/Card";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const method = req.method;

  await mongooseConnect();

  if (method === "POST") {
    const { question, answer, image } = req.body;

    try {
      const newCard = await Card.create({
        question,
        answer,
        image,
      });
      res.status(201).json({ success: true, data: newCard });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  if (method === "GET") {
    try {
      const cards = await Card.find();
      res.status(200).json({ success: true, data: cards });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
  if (method === "PUT") {
    const { cardId } = req.body;

    try {
      const updatedCard = await Card.findOneAndUpdate(
        { cardId },
        { question, answer, image },
        { new: true }
      );

      if (!updatedCard) {
        return res
          .status(404)
          .json({ success: false, message: "Card not found" });
      }

      res.status(200).json({ success: true, data: updatedCard });
    } catch (error) {
      console.error("Error updating card data:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.status(405).json({
      success: false,
      message: "Method not supported",
    });
    if (method === "DELETE") {
      const { cardId } = req.body;

      try {
        const deletedCard = await Card.findByIdAndDelete(cardId);

        if (!deletedCard) {
          return res
            .status(404)
            .json({ success: false, message: "Card not found" });
        } 

        res
          .status(200)
          .json({ success: true, message: "Card deleted successfully" });
      } catch (error) {
        console.error("Error deleting card:", error);
        res.status(500).json({ success: false, message: "Server error" });
      }
    } else {
      res.status(405).json({ success: false, message: "Method not supported" });
    }
  }
}
