import { getCurrentUser } from "@/_utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Cafe } from "@/app/_types/Cafe";
const prisma = new PrismaClient();

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { currentUser, error } = await getCurrentUser(request);

    if (error || !currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }
    const { id } = params;
    const cafes = await prisma.cafe.findUnique({
      where: {
        id: parseInt(id),
        users: { supabaseUserId: currentUser.user.id },
      },
      include: {
        users: {
          select: { id: true, userName: true, profileIcon: true },
        },
        favorites: {
          select: {
            userId: true,
            id: true,
          },
        },
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
  const {currentUser, error} = await getCurrentUser(request);
  if(error || !currentUser) {
    return NextResponse.json({status: 400});
  }

  const {
    storeAddress,
    businessHours,
    closingDays,
    cafeUrl,
    menuOrdered,
    wifiAvailable,
    wifiStability,
    powerOutlets,
    starRating,
    comment,

  }: Cafe = await request.json();

  try {
    const {id} = params;
    
    const cafePostEdit = await prisma.cafe.update({
      where: {id: parseInt(id),
          users: {
              supabaseUserId: currentUser.user.id,
      },},
      data: {
        
          comment,
        }
    })
  }
};
