import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/_utils/supabase";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  // クエリパラメータを取得
  const searchParams = req.nextUrl.searchParams;
  const area = searchParams.get("area") || "";
  const keyword = searchParams.get("keyword") || "";
  const wifiAvailable = searchParams.get("wifiAvailable") || "";
  const powerOutlets = searchParams.get("powerOutlets") || "";

  const { currentUser, error } = await getCurrentUser(req);
  if (error || !currentUser) {
    return NextResponse.json({ status: 401 });
  }

  try {
    //カフェ情報をフィルタリングするためのwhere条件を定義(.pushを使ってフィルター条件をひとつずつ追加)
    const whereCondition: any = { AND: [] }; // `AND` は配列として使用

    // キーワード検索（カフェ名 or エリア）
    if (keyword) {
      whereCondition.AND.push({
        OR: [
          { cafeName: { contains: keyword } },
          { area: { contains: keyword } },
        ],
      });
    }
    // エリア検索
    if (area) {
      whereCondition.AND.push({ area: { constants: area } });
    }
    // Wi-Fiの有無
    if (wifiAvailable) {
      whereCondition.AND.push({ wifiAvailable: wifiAvailable === "true" });
    }
    // 電源の有無
    if (powerOutlets) {
      whereCondition.AND.push({ powerOutlets: powerOutlets === "true" });
    }
    
    // supabaseUserIdからuserIdを取得
    const user = await prisma.users.findUnique({
      where: { supabaseUserId: currentUser.user.id},
    });
    const userId = user?.id;

    // カフェ投稿一覧を取得する
    const cafePostList = await prisma.cafe.findMany({
      where: whereCondition,
      include: {
        users: {
          select: { id: true, userName: true, profileIcon: true },
        },
        favorites: userId
          ? {
              where: { userId }, 
              select: { id: true, cafeId: true },
            }
          : false, // 非ログイン者は `favorites` 無視
      },
      orderBy: [{ createdAt: "desc" }, { updatedAt: "desc" }],
    });
    console.log("検索条件:", whereCondition);
    console.log("カフェ投稿一覧:", cafePostList);

    return NextResponse.json({ status: "OK", cafePostList }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};
