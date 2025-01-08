import { PrismaClient } from "@prisma/client";
import {  NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {


  try {
    const cafes = await prisma.cafe.findMany({
      include: {
        users: {
          select: { id: true, userName: true },
        },
        favorites: { select: { id: true } },
        information: {
          select: { id: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ status: "OK", cafes: cafes }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
