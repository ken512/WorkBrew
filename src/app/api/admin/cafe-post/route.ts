import { supabase } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Cafe } from "@/_types/cafe";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
const token = request.headers.get('Authorization') ?? ''

  // supabaseに対してtokenを送る
  const { error } = await supabase.auth.getUser(token);
  if (error) {
    return NextResponse.json({ status: error.message }, { status: 200 });
  } 

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


export const POST = async (request: NextRequest) => {
  const token = request.headers.get('Authorization') ?? ''

  console.log("Received Token:", token);
  const {data, error } = await supabase.auth.getUser(token);
  console.log("Auth Data:", data, "Auth Error:", error);
  if (error) {
    return NextResponse.json({ status: error.message }, { status: 200 });
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
      wifiAvailable,
      wifiSpeed,
      wifiStability,
      powerOutlets,
      seatAvailability,
      starRating,
      comment,
      locationCoordinates,
      userId,
    }: Cafe = await request.json();

    //cafe投稿で必須項目のみをエラーハンドリング
    if (
      !cafeName ||
      !storeAddress ||
      wifiAvailable === undefined ||
      powerOutlets === undefined ||
      seatAvailability === undefined
    ) {
      throw new Error("Invalid input data");
    }

    // 既存のカフェをチェック
    const existingCafe = await prisma.cafe.findMany({
      where: { cafeName, storeAddress },
    });
    if (existingCafe.length > 0) {
      throw new Error("Cafe Already exists");
    }

    // 新しいカフェを作成
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
        wifiAvailable,
        wifiSpeed,
        wifiStability,
        powerOutlets,
        seatAvailability,
        starRating,
        comment,
        locationCoordinates,
        userId,
      },
    });

    return NextResponse.json({ status: "OK", cafe: newCafe }, { status: 200 });
  } catch (error) {
    console.error("Error creating post:", error);
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};
