import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    const data = await prisma.todo.delete({ where: { id: parseInt(id!) } });
    return Response.json({ data, success: true });
  } catch (error) {
    return console.log(error);
  }
}
