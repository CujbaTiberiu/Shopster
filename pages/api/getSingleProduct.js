import prisma from "../../prisma/prisma";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { id } = req.query;
            const product = await prisma.product.findUnique({
                where: {
                    id: id,
                },
            });

            res.status(200).json({ product });
        } catch (error) {
            console.error("Error getting product:", error);
            res.status(500).json({ error: "Error getting product" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}  