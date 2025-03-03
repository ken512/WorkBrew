import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/_utils/supabase";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {

  const { currentUser, error } = await getCurrentUser(request);
  if (error || !currentUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 400 });
  }
  
  try {
    // 最新カフェ情報を取得
    const cafesRaw = await prisma.cafe.findMany({
      where: {
        users: {
          supabaseUserId: currentUser.user.id
        },
      },
      orderBy: [
        { updatedAt: 'desc' },
        { createdAt: 'desc' } // 更新されていない場合は、作成日時（createdAt）がその代わりとして使う
      ],
      take: 10, // 取得する件数を指定
    });
    //最新カフェ情報を一意で表示させる(カフェ名、店舗住所)
    const uniqueCafesMap = new Map<string, typeof cafesRaw[0]>();
    for(const cafe of cafesRaw) {
      const key = `${cafe.cafeName}-${cafe.storeAddress}`;
      if(!uniqueCafesMap.has(key)) {
        uniqueCafesMap.set(key, cafe);
      } else {
        const existing = uniqueCafesMap.get(key);
        if(new Date(cafe.updatedAt) > new Date(existing!.updatedAt)) {
          uniqueCafesMap.set(key, cafe);
        }
      }
    }
    const uniqueCafes = Array.from(uniqueCafesMap.values());

    const latestCafes = uniqueCafes.slice(0, 10);

    if(latestCafes.length === 0) {
      console.warn("No latest cafes found");
    }
    

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
      take: 10,
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