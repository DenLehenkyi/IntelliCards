import { Progress } from "@/models/Progress";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const method = req.method;

  await mongooseConnect();

  if (method === "POST") {
    const { passedCards, passingPercentage, cardSetsId, userId } = req.body;

    try {
      // Перевірка наявності запису про прогрес для цього користувача і кард-сету
      const existingProgress = await Progress.findOne({
        cardSetsId,
        userId,
      });

      if (existingProgress) {
        return res.status(200).json({
          success: true,
          message: "Progress for this card set already exists",
          data: existingProgress,
        });
      }

      // Якщо запис не існує, створіть новий
      const newProgress = await Progress.create({
        passedCards,
        passingPercentage,
        cardSetsId,
        userId,
      });
      res.status(201).json({ success: true, data: newProgress });
    } catch (error) {
      console.error("Error adding progress", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
  if (method === "GET") {
    const { progressId } = req.query;

    try {
      const foundedProgress = await Progress.findById(progressId);

      if (!foundedProgress) {
        return res
          .status(404)
          .json({ success: false, message: "progressId not found" });
      }

      res.status(200).json({ success: true, data: foundedProgress });
    } catch (error) {
      console.error("Error fetching foundedProgress:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
  if (method === "PUT") {
    const { progressId, passedCards, passingPercentage, cardSetsId, userId  } = req.body;

    try {
      const updatedProgress = await Progress.findOneAndUpdate(
        {  _id: progressId },
        { passedCards, passingPercentage, cardSetsId, userId },
        { new: true }
      );

      if (!updatedProgress) {
        return res
          .status(404)
          .json({ success: false, message: "updatedProgress not found" });
      }

      res.status(200).json({ success: true, data: updatedProgress });
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
      const { progressId } = req.body;

      try {
        const deletedCard = await Card.findByIdAndDelete(progressId);

        if (!deletedCard) {
          return res
            .status(404)
            .json({ success: false, message: "progressId not found" });
        }

        res
          .status(200)
          .json({ success: true, message: "progressId deleted successfully" });
      } catch (error) {
        console.error("Error deleting card:", error);
        res.status(500).json({ success: false, message: "Server error" });
      }
    } else {
      res.status(405).json({ success: false, message: "Method not supported" });
    }
  }
}
