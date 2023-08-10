import { IncomingForm } from "formidable";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export const config = {
    api: {
        externalResolver: true,
    },
}


export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to process the request." });
        }

        const uploadedImages = [];

        for (const file of Object.values(files)) {
            const extension = file.name.split(".").pop();
            const fileName = `${uuidv4()}.${extension}`;
            const filePath = path.join(process.cwd(), "public", "uploads", fileName);

            fs.renameSync(file.path, filePath);
            uploadedImages.push(`/uploads/${fileName}`);
        }

        return res.status(200).json(uploadedImages);
    });
}
