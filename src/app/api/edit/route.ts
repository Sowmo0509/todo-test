import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const id: any = searchParams.get("id");
  const body = await req.json();

  try {
    const data = await prisma.todo.update({ where: { id: parseInt(id) }, data: body });
    return Response.json({ data, success: true });
  } catch (error) {
    return console.log(error);
  }
}
