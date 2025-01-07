import { supabase } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest,  { params }: { params: { id: string } },) => {
  const token = request.headers.get('Authorization') ?? ''


	// supabaseに対してtokenを送る
  const { error } = await supabase.auth.getUser(token)
  if( error ) {
    return NextResponse.json({status: error.message}, {status: 200});
  }

  const { id } = params

  try {
    const userData = await prisma.users.findUnique({
      where: { id: parseInt(id), },
      include: {
        cafes: {
          select: { id: true },
        },
        contacts: {
          select: { id: true },
        },
        information: {
          select: { id: true },
        },
        favorites: {
          select: { id: true },
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

type User = {
  userName: string;
  profileIcon: string;
  biography: string;
};

export const POST = async (request: NextRequest) => {
  const token = request.headers.get('Authorization') ?? ''


	// supabaseに対してtokenを送る
  const { error } = await supabase.auth.getUser(token)
  if( error ) {
    return NextResponse.json({status: error.message}, {status: 200});
  }

  try {
    const { userName, profileIcon, biography, }: User = await request.json();

    if (!userName) {
      throw new Error("Invalid input data");
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

export const PUT = async (request: NextRequest,  { params }: { params: { id: string } }) => {
  const token = request.headers.get('Authorization') ?? ''


	// supabaseに対してtokenを送る
  const { error } = await supabase.auth.getUser(token)
  if( error ) {
    return NextResponse.json({status: error.message}, {status: 200});
  }

  const { id } = params

  try {
    const { userName, profileIcon, biography }: User = await request.json();

    const updateUser = await prisma.users.update({
      where: { id: parseInt(id)},
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

export const DELETE = async (request: NextRequest,  { params }: { params: { id: string } }) => {
  const token = request.headers.get('Authorization') ?? ''


	// supabaseに対してtokenを送る
  const { error } = await supabase.auth.getUser(token)
  if( error ) {
    return NextResponse.json({status: error.message}, {status: 200});
  }

  const { id } = params

  try {
    const userDelete = await prisma.users.delete({
      where: {
        id: parseInt(id) // 削除対象を一意に識別するために `id` を指定
      },
    });

    return NextResponse.json(
      { status: "削除成功", user: userDelete },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
