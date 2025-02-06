import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/utils/supabase";

// グローバルスコープでPrismaClientのインスタンスを保持
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
}
// PrismaClientのインスタンスを取得（存在しない場合は新規作成）
const prisma = globalForPrisma.prisma ?? new PrismaClient();

// 本番環境以外ではグローバルにインスタンスを保持
if(process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const GET = async (request: NextRequest) => {

  const { currentUser, error } = await getCurrentUser(request);
  if (error || !currentUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 400 });
  }
  
  try {
    // 最新カフェ情報を取得
    const latestCafes = await prisma.cafe.findMany({
      where: {
        users: {
          supabaseUserId: currentUser.user.id
        },
      },
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