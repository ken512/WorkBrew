import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/_utils/supabase";
import { Cafe } from "@/app/_types/Cafe";
const prisma = new PrismaClient();

export const GET = async (
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const cafes = await prisma.cafe.findUnique({
      where: {
        id: parseInt(id),
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
    return NextResponse.json({ status: "OK", cafes: cafes }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const {
    storeAddress,
    businessHours,
    closingDays,
    cafeUrl,
    menuOrdered,
    comment,
  }: Cafe = await request.json();

  try {
    
    const { id } = params;
    const { currentUser, error } = await getCurrentUser(request);
    if (error || !currentUser) {
      console.error("API AUTH ERROR", error);
      return NextResponse.json({ status: 401 });
    }

    //バックエンドでは、受け取った businessHours を開店時間と閉店時間に分割して保存
    let openingTime = "";
    let closingHours = "";

    if (businessHours && businessHours.includes("-")) {
      const [open, close] = businessHours.split("-").map((time) => time.trim());
      openingTime = open;
      closingHours = close;
    }

    const user = await prisma.users.findUnique({
      where: { supabaseUserId: currentUser.user.id},
    });

    if(!user) {
      return NextResponse.json({status: "ユーザーが見つかりません"}, {status: 401})
    }

    const cafePostEdit = await prisma.cafe.update({
      where: { id: parseInt(id), userId: user.id},
      data: {
        storeAddress,
        openingTime,
        closingHours,
        closingDays,
        cafeUrl,
        menuOrdered,
        comment,
      },
    });

    return NextResponse.json(
      { status: "OK", cafe: cafePostEdit },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};
