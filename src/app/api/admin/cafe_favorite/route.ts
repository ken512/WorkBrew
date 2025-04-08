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

   // まず userId に紐づくお気に入りを取得
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

    return NextResponse.json({ status: "OK", data: { favoriteCafes } }, { status: 200 });
  } catch (error) {
    console.error("Error fetching favorite cafes:", error);
    if (error instanceof Error) {
      return NextResponse.json({ status: "ERROR", message: error.message }, { status: 400 });
    }
  }
};
