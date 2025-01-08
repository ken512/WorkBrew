import { PrismaClient } from "@prisma/client";
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  const token = request.headers.get('Authorization') ?? ''

  const { error } = await supabase.auth.getUser(token)
  if( error ) {
    return NextResponse.json({status: error.message}, {status: 200});
  }

  try {
    //最新のカフェ情報を取得
    const latestCafes = await prisma.information.findMany({
      orderBy: { createdAt: 'desc'},
      take: 10, // 最新の10件を取得
      include: {
        cafe: true,// 関連するカフェ情報を取得
        user: true,// 関連するユーザー情報を取得（必要に応じて）
      },
    });

    //おすすめのカフェ情報を取得
    const recommendedCafe = await prisma.information.findMany({
      where: { is_suggested: true},
      include: {
        cafe: true,// 関連するカフェ情報を取得
        user: true,// 関連するユーザー情報を取得（必要に応じて）
      },
    });

    return NextResponse.json({status: "OK", latestCafes, recommendedCafe }, {status: 200} )
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
}