import { CardSet } from "@/models/CardSet";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const method = req.method;

  await mongooseConnect();

  if (method === "POST") {
    const { name, category, cards, userId, rating, IsPublic } = req.body;

    try {
      const newCard = await CardSet.create({
        name,
        category,
        cards,
        userId,
        rating,
        IsPublic,
      });

      res.status(201).json({ success: true, data: newCard });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  if (method === "GET") {
    const { cardSetId } = req.query;

    try {
      const cardSet = await CardSet.findById(cardSetId);

      if (!cardSet) {
        return res
          .status(404)
          .json({ success: false, message: "CardSet not found" });
      }

      res.status(200).json({ success: true, data: cardSet });
    } catch (error) {
      console.error("Error fetching CardSet:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
  if (method === "PUT") {
    const { cardSetId } = req.body;

    try {
      const updatedCardSet = await CardSet.findOneAndUpdate(
        { cardId },
        { name, category, cards, userId, rating, IsPublic },
        { new: true }
      );

      if (!updatedCardSet) {
        return res
          .status(404)
          .json({ success: false, message: "CardSet not found" });
      }

      res.status(200).json({ success: true, data: updatedCardSet });
    } catch (error) {
      console.error("Error updating CardSet data:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.status(405).json({
      success: false,
      message: "Method not supported",
    });
    if (method === "DELETE") {
      const { CardSetId } = req.body;

      try {
        const deletedCardSet = await CardSet.findByIdAndDelete(CardSetId);

        if (!deletedCardSet) {
          return res
            .status(404)
            .json({ success: false, message: "CardSet not found" });
        }

        res
          .status(200)
          .json({ success: true, message: "CardSet deleted successfully" });
      } catch (error) {
        console.error("Error deleting CardSet:", error);
        res.status(500).json({ success: false, message: "Server error" });
      }
    } else {
      res.status(405).json({ success: false, message: "Method not supported" });
    }
  }
}
