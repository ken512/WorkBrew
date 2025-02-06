import { getCurrentUser } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

  if (error || !currentUser || !currentUser.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if(!currentUser?.user) {
    return NextResponse.json({message: "No authenticated user found"}, {status:401});
  }

  // クエリパラメータからフィルタ条件を取得
  const { searchParams } = new URL(request.url);

  const cafeFilters: { [key: string]: any } = {};

  if (searchParams.has("wifiAvailable")) {
    cafeFilters.wifiAvailable = searchParams.get("wifiAvailable") === "true";
  }
  if (searchParams.has("powerOutlets")) {
    cafeFilters.powerOutlets = searchParams.get("powerOutlets") === "true";
  }
  if (searchParams.has("area")) {
    cafeFilters.area = searchParams.get("area");
  }
  if (searchParams.has("seatAvailability")) {
    cafeFilters.seatAvailability = searchParams.get("seatAvailability");
  }


  try {

    // ユーザーのお気に入りカフェを取得
    const favoritesCafes = await prisma.favorite.findMany({
      where: {
        user: {
          supabaseUserId: currentUser.user.id
        },
        cafe: {
          ...cafeFilters,
        },
      },
      select: {
        cafe: {
          select: {
            cafeName: true,
            area: true,
            wifiAvailable: true,
            powerOutlets: true,
            thumbnailImage: true,
          },
        },
        user: {
          select: {
            userName: true,
          },
        },
      },
    });

    return NextResponse.json({ status: "OK", data: { favoritesCafes } }, { status: 200 });
  } catch (error) {
    console.error("Error fetching favorite cafes:", error);
    if (error instanceof Error) {
      return NextResponse.json({ status: "ERROR", message: error.message }, { status: 400 });
    }
  }
};
