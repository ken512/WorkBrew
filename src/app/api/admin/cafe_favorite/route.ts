import { supabase } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const getUserFormToken = async (token: string) => {
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    throw new Error("Invalid or missing token");
  }
  return data.user.id;
};

export const GET = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";
  const userId = await getUserFormToken(token);

  try {
    const favoritesCafes = await prisma.favorite.findMany({
      where: { id: parseInt(userId) },
      include: {
        cafe: true, // 関連するカフェ情報を取得
        user: true, // 関連するユーザー情報を取得
      },
    });

    return NextResponse.json({ status: "OK", favoritesCafes }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
