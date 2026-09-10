import { getCurrentUser } from "@/_utils/supabase";
import { prisma } from "@/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";



// ログイン済みユーザーに対応するUsersレコードが未作成の場合、デフォルトアカウントを作成するAPI
export const POST = async (req: NextRequest) => {
  const { currentUser, error} = await getCurrentUser(req);

  if(error || !currentUser || !currentUser.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  try {

    const existingUserAccount = await prisma.users.findUnique({
      where: {supabaseUserId: currentUser.user.id},
    });
    if(existingUserAccount) {
      return NextResponse.json( { 
          status: "ERROR", 
          message: "すでにアカウントが存在します" 
        },
        { status: 200 });
    }

        const defaultUserAccount = await prisma.users.create({
      data: {
        supabaseUserId: currentUser.user.id,
        userName: `user_${currentUser.user.id.slice(0, 8)}`,
        profileIcon: "",
        biography: "",
      }
    })

    return NextResponse.json({status: "OK", user: defaultUserAccount}, {status: 200});
  } catch(error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message}, { status: 500});
    }
  }
}
