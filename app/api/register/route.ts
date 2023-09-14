import bcrypt from "bcrypt";
import prisma from "@app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { first_name, last_name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: email.trim(),
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
