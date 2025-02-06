import { getCurrentUser } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { Cafe } from "@/_types/cafe";
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
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }
  
  console.log("getCurrentUser Error:", error);
  console.log("currentUser:", currentUser);

  try {
  


    const user = await prisma.users.findUnique({
      where: { supabaseUserId: currentUser.user.id }, // Int型に変換したuserIdを使う
      include: {
        cafes: {
          select: {
            id: true,
            cafeName: true,
            thumbnailImage: true,
            createdAt: true,  // 新しいカフェ順に並べる
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        favorites: {
          include: {
            cafe: {
              select: {
                id: true,
                cafeName: true,
                starRating: true,
                locationCoordinates: true,
              },
            },
          },
        },
        information: {
          select: {
            latestInfo: true,
            recommended_cafe: true,
            recommendation_reason: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { status: "Not Found", message: "ユーザー情報が見つかりません" },
        { status: 400 }
      );
    }
    return NextResponse.json({ status: "OK", user }, { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};


export const POST = async (request: NextRequest) => {
  const { currentUser, error } = await getCurrentUser(request);
  if (error || !currentUser || !currentUser.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  try {
    // まず、supabaseUserIdに基づいてユーザーを検索
    const user = await prisma.users.findUnique({
      where: { supabaseUserId: currentUser.user.id },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const {
      cafeName,
      area,
      storeAddress,
      openingTime,
      closingHours,
      thumbnailImage,
      closingDays,
      cafeUrl,
      menuOrdered,
      wifiAvailable,
      wifiSpeed,
      wifiStability,
      powerOutlets,
      seatAvailability,
      starRating,
      comment,
      locationCoordinates,
    }: Cafe = await request.json();

    if (
      !cafeName ||
      !storeAddress ||
      starRating === null ||
      wifiAvailable === null ||
      powerOutlets === null ||
      seatAvailability === null
    ) {
      throw new Error("Invalid input data");
    }

    // カフェの作成
    const newCafe = await prisma.cafe.create({
      data: {
        cafeName,
        area,
        storeAddress,
        openingTime,
        closingHours,
        thumbnailImage,
        closingDays,
        cafeUrl,
        menuOrdered,
        wifiAvailable,
        wifiSpeed,
        wifiStability,
        powerOutlets,
        seatAvailability,
        starRating,
        comment,
        locationCoordinates,
        userId: user.id,  // 取得したユーザーIDを使用
      },
    });

    return NextResponse.json({ status: "OK", cafe: newCafe }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};
