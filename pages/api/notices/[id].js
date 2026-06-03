import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    // GET ONE NOTICE
    if (req.method === "GET") {
      const notice = await prisma.notice.findUnique({
        where: { id },
      });

      if (!notice) {
        return res
          .status(404)
          .json({ error: "Notice not found" });
      }

      return res.status(200).json(notice);
    }

    // UPDATE NOTICE
    if (req.method === "PUT") {
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

      const updatedNotice =
        await prisma.notice.update({
          where: { id },
          data: {
            title,
            body,
            category,
            priority,
            publishDate: new Date(
              publishDate
            ),
          },
        });

      return res
        .status(200)
        .json(updatedNotice);
    }

    // DELETE NOTICE
    if (req.method === "DELETE") {
      await prisma.notice.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "Notice deleted",
      });
    }

    return res.status(405).json({
      error: "Method not allowed",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}