import { supabase } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  const token = request.headers.get('Authorization') ?? ''

  	// supabaseに対してtokenを送る
    const { error } = await supabase.auth.getUser(token)
    if( error ) {
      return NextResponse.json({status: error.message}, {status: 200});
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

type Cafe = {
  id: string;
  cafeName: string;
  area: string;
  storeAddress: string;
  openingTime: string;
  closingHours: string;
  thumbnailImage: string;
  closingDays: string;
  cafeUrl: string;
  wifiAvailable: boolean;
  wifiSpeed: boolean;
  wifiStability: boolean;
  powerOutlets: boolean;
  seatAvailability: boolean;
  starRating: number;
  comment: string;
  locationCoordinates: string;
  userId: number;
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const token = request.headers.get("Authorization") ?? "";

  // supabaseに対してtokenを送る
  const { error } = await supabase.auth.getUser(token);
  if (error) {
    return NextResponse.json({ status: error.message }, { status: 200 });
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
    userId,
  }: Cafe = await request.json();

  const { id } = params;

  try {
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
        userId,
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
