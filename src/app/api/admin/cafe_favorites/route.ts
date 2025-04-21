import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/_utils/supabase";
const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {

  try {
    const { currentUser, error } = await getCurrentUser(request);
    if (error || !currentUser) {
      return NextResponse.json({ status: 401 });
    }
    console.log("ここ通った")
    // SupabaseのユーザーIDから、アプリ内のuserId（int）を取得
    const user = await prisma.users.findUnique({
      where: { supabaseUserId: currentUser.user.id },
    });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "ユーザーが見つかりません",
      });
    }

    
    // まとめて、お気に入りとそのカフェ情報を取得
    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      select: {
        cafeId: true,
        cafe: {
          include: {
            users: {
              select: {
                id: true,
                userName: true,
                profileIcon: true,
              },
            },
          },
        },
      },
    });
    console.log("お気に入りカフェ:", favorites);

    return NextResponse.json(
      {
        status: "OK",
        data: {
          favorites: favorites.map((f) => ({ cafeId: f.cafeId })), // ❤️ 保持用
          favoriteCafes: favorites.map((f) => f.cafe), // 一覧表示用
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching favorite cafes:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { status: "ERROR", message: error.message },
        { status: 400 }
      );
    }
  }
};

export const POST = async (request: NextRequest) => {
 
  try {
    const { currentUser, error } = await getCurrentUser(request);
    if (error || !currentUser) {
      return NextResponse.json({ status: 401 });
    }
    console.log("ここ通った")
    const body = await request.json();
    const cafeId = body.cafeId;

    // supabaseのuser.id（文字列）から、UsersテーブルのuserId（Int）を取得
    const user = await prisma.users.findUnique({
      where: { supabaseUserId: currentUser.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { status: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }

    // POST の前に既に登録されているかチェック
    const exists = await prisma.favorite.findFirst({
      where: { userId: user.id, cafeId },
    });
    if (exists) {
      return NextResponse.json({ status: "OK", favorite: exists });
    }

    console.log("カフェ", exists);
    const newFavorite = await prisma.favorite.create({
      data: {
        userId: user.id,
        cafeId,
      },
    });

    return NextResponse.json({ status: "OK", favorite: newFavorite });
  } catch (err) {
    return NextResponse.json(
      { status: "ERROR", message: String(err) },
      { status: 400 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {

  try {
    const { currentUser, error } = await getCurrentUser(req);
    if (!currentUser || error) {
      return NextResponse.json({ status: 401 });
    }
    console.log("ここ通った")
    const body = await req.json();
    const cafeId = body.cafeId;

    const user = await prisma.users.findUnique({
      where: { supabaseUserId: currentUser.user.id },
    });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "ユーザーが見つかりません",
      });
    }

    await prisma.favorite.deleteMany({
      where: {
        userId: user.id,
        cafeId,
      },
    });

    return NextResponse.json({ status: "OK" });
  } catch (err) {
    return NextResponse.json(
      { status: "ERROR", message: String(err) },
      { status: 400 }
    );
  }
};
