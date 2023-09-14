"use client";

import Image from "next/image";

interface Props {
  src: string | null | undefined;
}

export default function Avatar({ src }: Props) {
  return (
    <Image
      alt="Avatar"
      className="rounded-full round-xs"
      height="30"
      width="30"
      src={src ? `/uploads/profile/sm/${src}` : "/images/user.webp"}
    />
  );
}

// internship -> setOptions, digital, onpage setOptions, seo, guest blogging, backlink, digital marketing, oneisok
