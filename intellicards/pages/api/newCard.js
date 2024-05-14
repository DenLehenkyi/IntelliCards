import { Card } from "@/models/Card";
import { mongooseConnect } from "@/lib/mongoose";


export default async function handle(req, res) {
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