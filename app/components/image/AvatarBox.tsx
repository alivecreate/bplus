import Image from "next/image";

interface Props {
  src: any | null | undefined;
  size: any;
}

export default async function AvatarBox({ src, size = 45 }: Props) {
  return (
    <Image
      alt="Avatar"
      className="rounded-full round-md mb-4 mx-auto"
      height={size}
      width={size}
      src={src ? src : "/images/user.webp"}
    />
  );
}
