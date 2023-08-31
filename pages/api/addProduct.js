import prisma from "../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, description, price, category, images } = req.body;

      const createdProduct = await prisma.product.create({
        data: {
          name,
          description,
          price,
          category,
          images,
        },
      });

      res.status(201).json({ product: createdProduct });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Error creating product" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
