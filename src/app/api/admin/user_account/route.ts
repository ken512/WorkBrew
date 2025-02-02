import { getCurrentUser } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { UserAccountFormProps } from "@/app/admin/_types/UserAccountForm";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const  convertUUIDtoInt = (uuid: string): number => {
  // UUIDを数値に変換する例 (シンプルな変換例)
  return parseInt(uuid.replace(/[^0-9]/g, '').slice(0, 9), 10);
}

export const GET = async (request: NextRequest) => {
  const { currentUser, error } = await getCurrentUser(request);

  if (error || !currentUser || !currentUser.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  console.log("currentUser:", currentUser);

  try {
     // UUIDをIntに変換
    const userId = convertUUIDtoInt(currentUser.user.id);
    console.log("userId", userId);// UUIDをIntに変換できているか確認
    const userData = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        cafes: {
          select: {
            id: true,
            cafeName: true,
            thumbnailImage: true,
            starRating: true,
          },
        },
        favorites: {
          include: {
            cafe: {
              select: {
                id: true,
                cafeName: true,
                starRating: true,
                locationCoordinates: true,
              },
            },
          },
        },
        information: {
          select: {
            latestInfo: true,
            recommended_cafe: true,
            recommendation_reason: true,
          },
        },
      },
    });
    if (!userData) {
      return NextResponse.json(
        { status: "Not Found", message: "ユーザー情報が見つかりません" },
        { status: 400 }
      );
    }

    return NextResponse.json({ status: "OK", user: userData }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};


export const POST = async (request: NextRequest) => {
  const { currentUser, error } = await getCurrentUser(request);

  if (error || !currentUser || !currentUser.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  try {
    const { userName, profileIcon, biography }: UserAccountFormProps = await request.json();
    if (!userName) {
      throw new Error("Invalid input data");
    }

    //ユーザー名を一意にするため、同じユーザー名の存在確認
    const existingUser = await prisma.users.findUnique({
      where: { userName: userName},
    });
    if(existingUser) {
      return NextResponse.json(
        {status:"User already exists", user: existingUser },
        {status: 400}
      );
    }

    const newUser = await prisma.users.create({
      data: {
        userName,
        profileIcon,
        biography,
      },
    });

    return NextResponse.json({ status: "OK", user: newUser }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};

export const PUT = async (
  request: NextRequest
) => {
  const { currentUser, error } = await getCurrentUser(request);

  if (error || !currentUser || !currentUser.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  try {
    // UUIDをIntに変換
    const userId = convertUUIDtoInt(currentUser.user.id); 
    const { userName, profileIcon, biography }: UserAccountFormProps = await request.json();

    const updateUser = await prisma.users.update({
      where:  { id: userId } ,
      data: { userName, profileIcon, biography },
    });

    return NextResponse.json(
      { status: "更新成功", user: updateUser },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

