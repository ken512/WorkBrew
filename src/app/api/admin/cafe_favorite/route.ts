import { supabase } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest,  { params }: { params: { id: string } },) => {
  const token = request.headers.get("Authorization") ?? "";

  // supabaseに対してtokenを送る
  const { error } = await supabase.auth.getUser(token);
  if (error) {
    return NextResponse.json({ status: error.message }, { status: 200 });
  }

  const { id } = params;

  try {
    const favoritesCafes = await prisma.favorite.findMany({
      where: { id: parseInt(id), },
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
