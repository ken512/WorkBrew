import { getCurrentUser } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { UserAccountFormProps } from "@/app/admin/_types/userAccountForm";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  try {
    const { currentUser, error } = await getCurrentUser(request);
    
    if (error) {
      console.error("Authentication error:", error);
      return NextResponse.json({ message: "Authentication failed", error }, { status: 401 });
    }

    if (!currentUser?.user) {
      return NextResponse.json({ message: "No authenticated user found" }, { status: 401 });
    }

    const userData = await prisma.users.findUnique({
      where: { supabaseUserId: currentUser.user.id },
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

    console.log("Found userData:", userData);

    if (!userData) {
      return NextResponse.json({ 
        status: "OK", 
        user: {
          userName: '',
          profileIcon: '',
          biography: '',
        }
      });
    }

    const response = {
      status: "OK", 
      user: {
        userName: userData.userName,
        profileIcon: userData.profileIcon,
        biography: userData.biography
      }
    };

    console.log("Sending response:", response);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
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
      return NextResponse.json({ 
        status: "ERROR", 
        message: "ユーザー名は必須です" 
      }, { status: 400 });
    }

    const existingUser = await prisma.users.findUnique({
      where: { userName: userName},
    });
    if(existingUser) {
      return NextResponse.json(
        { 
          status: "ERROR", 
          message: "このユーザー名は既に登録されているか、すでにアカウントが存在します" 
        },
        { status: 409 } // 409 Conflict
      );
    }

    const newUser = await prisma.users.create({
      data: {
        supabaseUserId: currentUser.user.id,
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

export const PUT = async (request: NextRequest) => {
  try {
    const { currentUser, error } = await getCurrentUser(request);

    if (error || !currentUser || !currentUser.user) {
      return NextResponse.json({ 
        status: "ERROR",
        message: "認証エラー" 
      }, { status: 401 });
    }

    const { userName, profileIcon, biography }: UserAccountFormProps = await request.json();

    const updateUser = await prisma.users.update({
      where: { supabaseUserId: currentUser.user.id },
      data: { 
        userName, 
        profileIcon: profileIcon || '', // nullの場合は空文字を設定
        biography: biography || '' 
      },
    });

    return NextResponse.json({
      status: "SUCCESS",
      message: "ユーザー情報を更新しました",
      user: updateUser
    }, { status: 200 });

  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ 
      status: "ERROR",
      message: error instanceof Error ? error.message : "更新処理に失敗しました"
    }, { status: 500 });
  }
};

