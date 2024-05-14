import { mongooseConnect } from "@/lib/mongoose";

export async function createCard(req, res) {
    const method = req.method;
  
    await mongooseConnect();
  
    if (method === "POST") {
      const { question, answer, image} = req.body;
  
      const newCard = await Card.create({
        question,
        answer,
        image
      });
      res.status(201).json({ success: true, data: newCard });
    } 
}

// Отримання карточки за ідентифікатором
export async function getCard (req, res) {
    const method = req.method;

    await mongooseConnect(); 

    if (method === "GET") {
        const { id } = req.query;
        const card = await Card.findById(req.params.id);

    res.status(201).json({ success: true, data: card });
    }
}

// Оновлення карточки за ідентифікатором
export async function updateCard (req, res) {
    const method = req.method;

    await mongooseConnect();

    if (method === "PUT") {
        const { id } = req.query;
        const { question, answer, image } = req.body;
        const updatedCard = await Card.findByIdAndUpdate(id, { question, answer, image }, { new: true });

        res.status(201).json({ success: true, data: updatedCard });
    }
}

// Видалення карточки за ідентифікатором
export async function deleteCard (req, res) {
    const method = req.method;

    await mongooseConnect();
    if (method === "DELETE") {
        const { id } = req.query;
        const card = await Card.findByIdAndDelete(req.params.id);

        res.status(201).json({ success: true, message: "Card deleted successfully" });
    }
}  
