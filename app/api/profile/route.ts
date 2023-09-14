import bcrypt from "bcrypt";
import prisma from "@app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const {
    id,
    first_name,
    last_name,
    phone = null,
    city,
    gender,
    dob,
    bio,
  } = body;

  console.log("data", JSON.stringify(body));

  let dateobj = new Date(dob);

  const birthdate = dob ? dateobj.toISOString() : null;

  const user = await prisma.user.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      first_name: first_name?.trim(),
      last_name: last_name?.trim(),
      phone: parseInt(phone?.trim()) || null,
      city: city?.trim(),
      gender: gender?.trim(),
      dob: birthdate || null,
      bio: bio?.trim(),
    },
  });

  return NextResponse.json(user);
}
