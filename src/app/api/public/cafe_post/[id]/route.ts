import { prisma } from "@/_utils/prisma";
import { NextResponse, NextRequest } from "next/server";
import { UpdateStatus } from "@/app/_types/UpdateStatus";
import { getCurrentUser } from "@/_utils/supabase";



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
        favorites: { // 👈 お気に入り情報を含める
          select: {
            userId: true,
            id: true,
          },
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

    //選択した場合のみ、更新する。
    const updateData: UpdateStatus = {};
    if(seatAvailability !== null) updateData.seatAvailability = seatAvailability;
    if(wifiSpeed !== null) updateData.wifiSpeed = wifiSpeed;
    
    const updateWiFiAndSeatStatus = await prisma.cafe.update({
      where: {
        id: parseInt(id),
        users: {
          supabaseUserId: currentUser.user.id,
        },
      },
      data: updateData,
    });

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

    // エラーメッセージの内容で分岐（Prismaのエラー）
    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return NextResponse.json(
        {
          status: "ERROR",
          message: "他のユーザーの投稿を更新する権限はありません!!",
        },
        { status: 400 }
      );
    }
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { currentUser, error } = await getCurrentUser(request);
  if (error || !currentUser) {
    return NextResponse.json({ status: "ERROR", message: "認証に失敗しました" }, { status: 400 });
  }

  const { id } = params;
  const cafeId = parseInt(id);

  try {
    const user = await prisma.users.findUnique({
      where: { supabaseUserId: currentUser.user.id },
    });

    if (!user) {
      return NextResponse.json({ status: "ERROR", message: "ユーザーが見つかりません" }, { status: 404 });
    }

    const cafe = await prisma.cafe.findUnique({
      where: {
        id: cafeId,
        userId: user.id, // 自分の投稿だけ対象にする
      },
    });

    if (!cafe) {
      return NextResponse.json({ status: "ERROR", message: "他のユーザーの投稿を削除する権限はありません!!" }, { status: 403 });
    }

    // お気に入りに登録しているかを確認
    const isFavorited = await prisma.favorite.findFirst({
      where: {
        userId: user.id,
        cafeId: cafeId,
      },
    });
    
    // 自分の投稿 & 自分がお気に入りしている場合
    if (isFavorited) {
      return NextResponse.json({
        status: "ERROR",
        message: "お気に入りに登録しているカフェは削除できません。まずお気に入りから解除してください。",
      }, { status: 400 });
    }

    //  削除実行
    await prisma.cafe.delete({
      where: { id: cafeId },
    });

    return NextResponse.json({ status: "OK", message: "削除しました" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "ERROR", message: String(error) }, { status: 500 });
  }
};
