import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  try {
    const data = await prisma.todo.create({ data: body });
    return Response.json({ data, success: true });
  } catch (error) {
    return console.log(error);
  }
}
