import { getCurrentUser } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Cafe } from "@/_types/cafe";
// グローバルスコープでPrismaClientのインスタンスを保持
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
// PrismaClientのインスタンスを取得（存在しない場合は新規作成）
const prisma = globalForPrisma.prisma ?? new PrismaClient();

// 本番環境以外ではグローバルにインスタンスを保持
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const GET = async (request: NextRequest) => {
  const { currentUser, error } = await getCurrentUser(request);

  if (error || !currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  try {
    const cafes = await prisma.cafe.findMany({
      where: {
        users: {
          supabaseUserId: currentUser.user.id,
        },
      },
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

export const PUT = async (request: NextRequest) => {
  const { currentUser, error } = await getCurrentUser(request);

  if (error || !currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  try {
    // ユーザーの取得
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
      wifiAvailable,
      wifiSpeed,
      wifiStability,
      powerOutlets,
      seatAvailability,
      starRating,
      comment,
      locationCoordinates,
    }: Cafe = await request.json();

    // URLからカフェIDを取得
    const cafeId = parseInt(request.url.split('/').pop() || '');

    if (starRating === null) {
      throw new Error("Invalid input data");
    }

    const updatedCafe = await prisma.cafe.update({
      where: { 
        id: cafeId,
        userId: user.id  // このユーザーのカフェのみ更新可能
      },
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
      },
    });

    return NextResponse.json(
      { status: "更新が成功しました", cafe: updatedCafe },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { status: "更新が失敗しました", message: error.message },
        { status: 400 }
      );
    }
  }
};

export const DELETE = async (request: NextRequest) => {
  const { currentUser, error } = await getCurrentUser(request);

  if (error || !currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }
  
};
