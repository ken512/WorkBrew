import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    // 最新カフェ情報を取得
    const latestCafes = await prisma.cafe.findMany({
      include: {
        users: {
          select: { id: true, userName: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log("Latest cafes fetched:", latestCafes);

    // おすすめカフェ情報を取得（評価が高いカフェ）
    const recommendedCafes = await prisma.cafe.findMany({
      where: {
        starRating: {
          gte: 5,
        },
      },
      include: {
        users: {
          select: { id: true, userName: true },
        },
      },
      orderBy: {
        starRating: "desc",
      },
    });
    console.log("Recommended cafes fetched:", recommendedCafes);  

    return NextResponse.json({ status: "OK", latestCafes, recommendedCafes }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};