import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    // カフェ投稿一覧を取得する
    const cafePostList = await prisma.cafe.findMany({
      include: {
        users: {
          select: { id: true, userName: true, profileIcon: true },// ユーザー情報を取得
        },
        favorites: { // お気に入り情報も取得
          select: {id: true, userId: true},
        }
      },
      orderBy: [
        { createdAt: "desc"},
        { updatedAt: 'desc' },
      ],
    });
    console.log("カフェ投稿一覧:", cafePostList );

    return NextResponse.json({ status: "OK", cafePostList}, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};