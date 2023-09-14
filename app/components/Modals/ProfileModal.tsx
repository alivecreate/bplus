"use client";

import useProfileModal from "@app/hooks/useProfilePictureModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import AvatarBox from "@app/components/image/AvatarBox";
import { compressFile } from "@app/libs/imageCompressor";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { HiOutlinePhotograph } from "react-icons/hi";
import ImageUploaderPreview from "@app/test/ImageUploaderPreview";
import { LiaSave } from "react-icons/lia";
import { Button } from "flowbite-react";
import prisma from "@app/libs/prismadb";
import { SafeUser } from "@app/types";

interface FileWithPreview extends File {
  preview: string;
}

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

interface Props {
  currentUser?: SafeUser | null;
}

const ProfileModal = ({ currentUser }: Props) => {
  const profModal = useProfileModal();

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setUploading(true);
    // alert(files[0].preview)
    const originalFile = files[0];
    const regex = /^.*base64/;

    if (originalFile && originalFile.type.split("/")[0] !== "image") {
      console.log(
        `The file selected was not an image type and will not be reduced.`,
      );
    } else if (originalFile) {
      try {
        const blob = await compressFile(originalFile);
        console.log("blob", blob);

        const formData = new FormData();

        blob.forEach((file: any, i: any) => formData.append(`file${i}`, file));
        formData.append("id", currentUser?.id || "");

        const { data } = await axios.post("/api/upload", formData);
        console.log(data);
      } catch (error: any) {
        console.log("Compress error", error);
        toast.success(error.message);
      } finally {
        console.log("Compress complete");
        profModal.onClose();
        setUploading(false);
      }
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/image", formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  let bodyContent = (
    <>
      <div className="flex flex-col gap-8 items-center">
        <section className="items-center3">
          {!currentUser?.image ? (
            <AvatarBox size={200} src={files[0]?.preview} />
          ) : null}

          <form encType="multipart/form-data" method="post" onSubmit={onSubmit}>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <div className="flex items-center flex-row p-3 w-40 rounded justify-center border-2 border-dashed cursor-pointer">
                <HiOutlinePhotograph
                  size={27}
                  color="#474747"
                  className="mr-2.5"
                />
                <span>Select Image</span>
              </div>
            </div>
            <br />
            <Button
              size="sm"
              type="submit"
              style={{ opacity: uploading ? ".5" : "1" }}
              className="flex items-center w-46 text-center rounded text-white p-2"
            >
              <LiaSave size={27} color="#fff" className="mr-2.5" />
              <span className="flex items-center">
                {uploading ? "Saving Picture..." : "Save Profile Picture"}
              </span>
            </Button>
          </form>
        </section>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={profModal.isOpen}
      onClose={profModal.onClose}
      onSubmit={() => {}}
      title="Upload Profile Picture"
      actionLabel=""
      body={bodyContent}
      secondaryAction={() => {}}
      secondaryActionLabel=""
      name="profile-modal"
    />
  );
};

export default ProfileModal;
