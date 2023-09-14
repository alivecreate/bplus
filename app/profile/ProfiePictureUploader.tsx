import AvatarBox from "@app/components/image/AvatarBox";
import useProfileModal from "@app/hooks/useProfilePictureModal";
import useSearchModal from "@app/hooks/useSearchModal";
import { Button } from "flowbite-react";

import { SafeUser } from "@app/types";
import React from "react";
import { HiOutlinePhotograph } from "react-icons/hi";

interface Props {
  currentUser?: SafeUser | null;
}

export default function ProfiePictureUploader({ currentUser }: Props) {
  const profileModal = useProfileModal();
  return (
    <>
      <Button size="sm" onClick={profileModal.onOpen}>
        <HiOutlinePhotograph size={20} color="#fff" className="mr-1" />
        Change Profile Picture
      </Button>
    </>
  );
}
