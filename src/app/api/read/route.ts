import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await prisma.todo.findMany();
    return Response.json({ data, success: true });
  } catch (error) {
    return console.log(error);
  }
}
