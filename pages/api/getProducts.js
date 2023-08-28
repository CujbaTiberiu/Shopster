
import prisma from "@/prisma/client";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const products = await prisma.product.findMany({
                orderBy: {
                    createdAt: "desc",
                },
            });

            res.status(200).json({ products });
        } catch (error) {
            console.error("Error getting products:", error);
            res.status(500).json({ error: "Error getting products" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}