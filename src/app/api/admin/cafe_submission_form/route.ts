import { getCurrentUser } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { Cafe } from "@/_types/cafe";
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();


const  convertUUIDtoInt = (uuid: string): number => {
  // UUIDの最初の部分を数値に変換する例 (シンプルな変換例)
  return parseInt(uuid.replace(/[^0-9]/g, '').slice(0, 9), 10);
}

export const GET = async (request: NextRequest) => {
  const { currentUser, error } = await getCurrentUser(request);

  if (error || !currentUser || !currentUser.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }
  
  console.log("getCurrentUser Error:", error);
  console.log("currentUser:", currentUser);

  try {
     // UUIDをIntに変換
    const userId = convertUUIDtoInt(currentUser.user.id);


    const user = await prisma.users.findUnique({
      where: { id: userId }, // Int型に変換したuserIdを使う
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


export const POST = async (
  request: NextRequest
) => {
  const { currentUser, error } = await getCurrentUser(request);
  if (error || !currentUser || !currentUser.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  try {
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
    // UUIDをIntに変換
    const userId = convertUUIDtoInt(currentUser.user.id);
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
        userId: userId,
      },
    });

    return NextResponse.json({ status: "OK", cafe: newCafe }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};
