import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  // クエリパラメータを取得
  const searchParams = req.nextUrl.searchParams;
  const area = searchParams.get("area") || "";
  const keyword = searchParams.get("keyword") || "";
  const wifiAvailable = searchParams.get("wifiAvailable") || "";
  const powerOutlets = searchParams.get("powerOutlets") || "";

  try {
    //カフェ情報をフィルタリングするためのwhere条件を定義(.pushを使ってフィルター条件をひとつずつ追加)
    const whereCondition: any = {AND: []}; // `AND` は配列として使用

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

    // カフェ投稿一覧を取得する
    const cafePostList = await prisma.cafe.findMany({
      include: {
        users: {
          select: { id: true, userName: true, profileIcon: true }, // ユーザー情報を取得
        },
        favorites: {
          // お気に入り情報も取得
          select: { id: true, userId: true },
        },
      },
      where: whereCondition,
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
