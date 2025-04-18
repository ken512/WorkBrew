import { getCurrentUser } from "@/_utils/supabase";
import { PrismaClient } from "@prisma/client";
import { Cafe } from "@/app/_types/cafe";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  const { currentUser, error } = await getCurrentUser(request);

  if (error || !currentUser || !currentUser.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  try {
    const user = await prisma.users.findUnique({
      where: { supabaseUserId: currentUser.user.id }, 
      include: {
        cafes: {
          select: {
            id: true,
            cafeName: true,
            thumbnailImage: true,
            openingTime: true,
            closingHours: true,
            createdAt: true, // 新しいカフェ順に並べる
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
    // supabaseUserIdに基づいてユーザーを検索
    const user = await prisma.users.findUnique({
      where: { supabaseUserId: currentUser.user.id },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const {
      cafeName,
      area,
      storeAddress,
      businessHours,
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
    //バックエンドでは、受け取った businessHours を開店時間と閉店時間に分割して保存
    let openingTime = "";
    let closingHours = "";

    if (businessHours && businessHours.includes("-")) {
      const [open, close] = businessHours.split("-").map((time) => time.trim());
      openingTime = open;
      closingHours = close;
    }

    // カフェデータを作成
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
        userId: user.id,
      },
    });

    return NextResponse.json({ status: "OK", cafe: newCafe }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};
