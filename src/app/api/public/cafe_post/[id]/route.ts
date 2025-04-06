import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { UpdateStatus } from "@/app/_types/updateStatus";
import { getCurrentUser } from "@/_utils/supabase";

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
  const { currentUser, error } = await getCurrentUser(request);
  if (error || !currentUser) {
    return NextResponse.json({ status: 400 });
  }

  const { id } = params;

  try {
    const { seatAvailability, wifiSpeed }: UpdateStatus = await request.json();

    const updateWiFiAndSeatStatus = await prisma.cafe.update({
      where: {
        id: parseInt(id),
        users: {
          supabaseUserId: currentUser.user.id,
        },
      },
      data: {
        seatAvailability: seatAvailability || null,
        wifiSpeed: wifiSpeed || null,
      },
    });

    return NextResponse.json({
      status: "SUCCESS",
      message: "更新しました",
      update: updateWiFiAndSeatStatus,
    }, { status: 200 });

  } catch (error) {
    console.error("Update error", error);

    // エラーメッセージの内容で分岐（Prismaのエラー）
    if (error instanceof Error && error.message.includes("Record to update not found")) {
      return NextResponse.json({
        status: "ERROR",
        message: "他のユーザーの投稿を更新する権限はありません!!"
      }, { status: 400 });
    }
  }
};


export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { currentUser, error } = await getCurrentUser(request);
  if (error || !currentUser) {
    return NextResponse.json({ status: 400 });
  }
  const { id } = params;

  try {

    await prisma.cafe.delete({
      where: {
        id: parseInt(id),
        users: {
          supabaseUserId: currentUser.user.id,
        },//他のユーザーが投稿したカフェ情報を勝手に削除できないようにする。
      },
    });
    return NextResponse.json({ status: "OK" }, { status: 200 });
  } catch (error) {
    
// エラーメッセージの内容で分岐（Prismaのエラー）
if (error instanceof Error && error.message.includes("Record to update not found")) {
  return NextResponse.json({
    status: "ERROR",
    message: "他のユーザーの投稿を削除する権限はありません!!"
  }, { status: 400 });
}
  }
};
