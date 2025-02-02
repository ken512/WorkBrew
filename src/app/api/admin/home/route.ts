import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/utils/supabase";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {

  const { currentUser, error } = await getCurrentUser(request);
  if (error || !currentUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 400 });
  }
  
  try {
    // 最新カフェ情報を取得
    const latestCafes = await prisma.cafe.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 5, // 取得する件数を指定
    });
    if(latestCafes.length === 0) {
      console.warn("No latest cafes found");
    }

    // おすすめカフェ情報を取得（評価が高いカフェ）
    const recommendedCafes = await prisma.cafe.findMany({
      where: {
        starRating: {
          gte: 3, 
        },
      },
      take: 5,
    });

    if(recommendedCafes.length === 0) {
      console.warn("No recommended cafes found");
    }

    return NextResponse.json({ status: "OK", latestCafes, recommendedCafes }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};