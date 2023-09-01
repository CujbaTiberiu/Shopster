import prisma from "../../prisma/prisma";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        try {
            const { id, name, description, price, category, images } = req.body;
            const updatedProduct = await prisma.product.update({
                where: {
                    id,
                },
                data: {
                    name,
                    price,
                    category,
                    description,
                    images,
                },
            });

            res.status(201).json({ product: updatedProduct });
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).json({ error: "Error updating product" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}