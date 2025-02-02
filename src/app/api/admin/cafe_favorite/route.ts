import { getCurrentUser } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  const { currentUser, error } = await getCurrentUser(request);

  if (error || !currentUser || !currentUser.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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

    const userId = parseInt(currentUser.user.id);
    // ユーザーのお気に入りカフェを取得
    const favoritesCafes = await prisma.favorite.findMany({
      where: {
        userId: userId,
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
