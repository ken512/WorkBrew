import { getCurrentUser } from "@/_utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest, {params}: {params: {id: string}}) => {

  try {
    const { currentUser, error} = await getCurrentUser(request);

    if(error || !currentUser) {
      return NextResponse.json({message: "Unauthorized"}, { status: 400});
    }
    const {id} = params;
    const cafes = await prisma.cafe.findUnique({
      where: {id: parseInt(id), 
        users: {supabaseUserId: currentUser.user.id,
        },
      },
      include: {
        users: {
          select: {id: true, userName: true, profileIcon: true},
        },
        favorites: {
          select: {
            userId: true,
            id: true,
          },
        },
      },
    });
    return NextResponse.json({status: "OK", cafes: cafes}, {status: 200});
  } catch (error) {
    if(error instanceof Error)
      return NextResponse.json({status: error.message}, {status: 400});
  }
}
