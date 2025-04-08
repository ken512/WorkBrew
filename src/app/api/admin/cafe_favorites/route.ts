import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/_utils/supabase";
const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {

  const { currentUser, error } = await getCurrentUser(request);
  if (error || !currentUser) {
    return NextResponse.json({ status: 401 });
  }

  try {

   // userId に紐づくお気に入りを取得
const favorites = await prisma.favorite.findMany({
  where: { supabaseUserId: currentUser.user.id },
  select: { cafeId: true },
});

// それに対応するカフェ投稿データを取得
const favoriteCafes = await prisma.cafe.findMany({
  where: { id: { in: favorites.map((fav) => fav.cafeId) } },
  include: {
    users: { select: { id: true, userName: true, profileIcon: true } },
  },
});
console.log("お気に入りカフェ:", favoriteCafes);

    return NextResponse.json({ status: "OK", data: {
      favorites: favorites,
      favoriteCafes: favoriteCafes,
    }, }, { status: 200 });
  } catch (error) {
    console.error("Error fetching favorite cafes:", error);
    if (error instanceof Error) {
      return NextResponse.json({ status: "ERROR", message: error.message }, { status: 400 });
    }
  }
};

export const POST = async (request: NextRequest) => {
  const { currentUser, error } = await getCurrentUser(request);
  if (error || !currentUser) {
    return NextResponse.json({ status: 401 });
  }

  const body = await request.json();
  const cafeId = body.cafeId;
  try {
    // supabaseのuser.id（文字列）から、UsersテーブルのuserId（Int）を取得
    const user = await prisma.users.findUnique({
      where: { supabaseUserId: currentUser.user.id },
    });

    if (!user) {
      return NextResponse.json({ status: "User Not Found" }, { status: 404 });
    }
    const newFavorite = await prisma.favorite.create({
      data: {
        supabaseUserId: currentUser.user.id,
        userId: user.id,
        cafeId,
      },
    });
    return NextResponse.json({ status: "OK", favorite: newFavorite });
  } catch (err) {
    return NextResponse.json(
      { status: "ERROR", message: String(err) },
      { status: 400}
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  const { currentUser, error } = await getCurrentUser(req);
  if (!currentUser || error) {
    return NextResponse.json({ status: 401 });
  }

  const body = await req.json();
  const cafeId = body.cafeId;

  try {
    await prisma.favorite.deleteMany({
      where: {
        supabaseUserId: currentUser.user.id,
        cafeId,
      },
    });

    return NextResponse.json({ status: "OK" });
  } catch (err) {
    return NextResponse.json({ status: "ERROR", message: String(err) }, { status: 400});
  }
};

