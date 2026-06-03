import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: "desc" },
          { publishDate: "desc" },
        ],
      });

      return res.status(200).json(notices);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const {
        title,
        body,
        category,
        priority,
        publishDate,
      } = req.body;

      if (
        !title?.trim() ||
        !body?.trim() ||
        !publishDate
        ) {
        return res.status(400).json({
            error: "Title, body and publish date are required",
        });
        }

        if (
        !["EXAM", "EVENT", "GENERAL"].includes(category)
        ) {
        return res.status(400).json({
            error: "Invalid category",
        });
        }

        if (
        !["NORMAL", "URGENT"].includes(priority)
        ) {
        return res.status(400).json({
            error: "Invalid priority",
        });
        }

        if (isNaN(new Date(publishDate).getTime())) {
        return res.status(400).json({
            error: "Invalid date",
        });
        }

      const notice = await prisma.notice.create({
        data: {
          title,
          body,
          category,
          priority,
          publishDate: new Date(publishDate),
        },
      });

      return res.status(201).json(notice);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({
    error: "Method not allowed",
  });
}