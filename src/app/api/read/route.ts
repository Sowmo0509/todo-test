import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const id: any = searchParams.get("id");

  if (id) {
    try {
      const data = await prisma.todo.findUnique({ where: { id: parseInt(id) } });
      return Response.json({ data, success: true });
    } catch (error) {
      return console.log(error);
    }
  }

  try {
    const data = await prisma.todo.findMany({ orderBy: { id: "desc" } });
    return Response.json({ data, success: true });
  } catch (error) {
    return console.log(error);
  }
}
