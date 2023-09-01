import prisma from "../../prisma/prisma";

export default async function handler(req, res) {
    if (req.method === "DELETE") {
        try {
            const { id } = req.body;
            console.log(id);
            const deletedProduct = await prisma.product.delete({
                where: {
                    id,
                },
            });

            res.status(201).json({ product: deletedProduct });
        } catch (error) {
            console.error("Error deleting product:", error);
            res.status(500).json({ error: "Error deleting product" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}