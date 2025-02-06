import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    const cafes = await prisma.cafe.findUnique({
      where: { id: parseInt(id) },
      include: {
        users: {
          select: { id: true, userName: true },
        },
        favorites: { select: { id: true } },
        information: {
          select: { id: true },
        },
      },
    });
    return NextResponse.json({ status: "OK", cafes: cafes }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
