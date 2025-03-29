import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { UpdateStatus } from "@/app/_types/updateStatus";

const prisma = new PrismaClient();

export const GET = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params; // URLのidパラメータを取得
  console.log("取得したID:", id);

  try {
    const cafes = await prisma.cafe.findUnique({
      where: { id: parseInt(id) },
      include: {
        users: {
          select: { id: true, userName: true, profileIcon: true },
        },
      },
    });
    if (!cafes) {
      return NextResponse.json(
        {
          status: "NOT_FOUND",
          message: "カフェが見つかりませんでした",
        },
        { status: 404 }
      );
    }
    // 同じカフェ名・住所を持つ全ての投稿を取得
    const relatedCafes = await prisma.cafe.findMany({
      where: {
        cafeName: cafes.cafeName,
        storeAddress: cafes.storeAddress,
      },
    });

    return NextResponse.json(
      { status: "OK", cafes: cafes, relatedCafes },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const { seatAvailability, wifiSpeed }: UpdateStatus = await request.json();
    const updateWiFiAndSeatStatus = await prisma.cafe.update({
      where: { id: parseInt(id) },
      data: {
        seatAvailability: seatAvailability || null,
        wifiSpeed: wifiSpeed || null,
      },
    });
    console.log("Wi-Fi、空席状況:", updateWiFiAndSeatStatus);

    return NextResponse.json(
      {
        status: "SUCCESS",
        message: "更新しました",
        update: updateWiFiAndSeatStatus,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error", error);
    return NextResponse.json(
      {
        status: "ERROR",
        message: error instanceof Error ? error.message : "更新に失敗しました",
      },
      { status: 400 }
    );
  }
};
