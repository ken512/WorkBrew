import { getCurrentUser } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Cafe } from "@/_types/cafe";
const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {

  const { currentUser, error } = await getCurrentUser(request);

  if (error || !currentUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 400 });
  }


  try {
    const cafes = await prisma.cafe.findMany({
      include: {
        users: {
          select: { id: true, userName: true },
        },
        favorites: { select: { id: true } },
        information: {
          select: { id: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

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

  const { currentUser, error } = await getCurrentUser(request);

  if (error || !currentUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 400 });
  }


  const {
    cafeName,
    area,
    storeAddress,
    openingTime,
    closingHours,
    thumbnailImage,
    closingDays,
    cafeUrl,
    wifiAvailable,
    wifiSpeed,
    wifiStability,
    powerOutlets,
    seatAvailability,
    starRating,
    comment,
    locationCoordinates,
  }: Cafe = await request.json();

  const { id } = params;

  try {

    if (
      starRating === null 
    ) {
      throw new Error("Invalid input data");
    }

    const updatedCafe = await prisma.cafe.update({
      where: { id: parseInt(id) },
      data: {
        cafeName,
        area,
        storeAddress,
        openingTime,
        closingHours,
        thumbnailImage,
        closingDays,
        cafeUrl,
        wifiAvailable,
        wifiSpeed,
        wifiStability,
        powerOutlets,
        seatAvailability,
        starRating,
        comment,
        locationCoordinates,
      },
    });

    return NextResponse.json(
      { status: "更新が成功しました", cafe: updatedCafe },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { status: "更新が失敗しました", message: error.message },
        { status: 400 }
      );
    }
  }
};


export const DELETE = async(request: NextRequest) => {

  const { currentUser, error } = await getCurrentUser(request);

  if (error || !currentUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 400 });
  }



}