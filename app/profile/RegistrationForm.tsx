"use client";
import AvatarBox from "@app/components/image/AvatarBox";
import React, { useEffect, useState } from "react";

import { SafeUser } from "@app/types";
import ProfiePictureUploader from "./ProfiePictureUploader";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Button } from "flowbite-react";
import cities from "@app/data/cities.json";
import { parseISO, format } from "date-fns";
import Loader from "@app/components/Loader";
import ProfileModal from "@app/components/Modals/ProfileModal";

interface Props {
  currentUser?: SafeUser | null;
}

const ProfileForm = ({ currentUser }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "test",
      last_name: "kk",
      city: currentUser?.city,
      gender: currentUser?.gender,
      email: currentUser?.email,
      phone: currentUser?.email,
      bio: currentUser?.bio,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/profile", data)
      .then(() => {
        toast.success("Profile saved");
        console.log("then", JSON.stringify(data));
      })
      .catch((err) => {
        toast.error("Something went wrong.");
        console.log("catch", JSON.stringify(err));
      })
      .finally(() => {
        setIsLoading(false);
        console.log("done", JSON.stringify(data));
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ProfileModal currentUser={currentUser} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 md:gap-6 mb-6 items-center">
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center py-10">
                  {currentUser?.image ? (
                    <AvatarBox
                      size={200}
                      src={`/uploads/profile/sm/${currentUser?.image}`}
                    />
                  ) : null}
                  <ProfiePictureUploader currentUser={currentUser} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6 mb-6">
                <div className="">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="first_name"
                    id="first_name"
                    {...register("first_name", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your first name"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="last_name"
                    {...register("last_name", { required: true })}
                    id="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your first name"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                  >
                    City
                  </label>

                  <select
                    {...register("city")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option>{currentUser?.city || "Select City"}</option>
                    {cities.map((value, index) =>
                      value.city ? (
                        <option key={index} value={value.city}>
                          {value.city} ({value.state})
                        </option>
                      ) : (
                        <option key={index} value={value.state}>
                          {value.state}
                        </option>
                      ),
                    )}
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="lat_name"
                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Gender
                  </label>
                  <select
                    {...register("gender")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option>{currentUser?.gender || "Select Gender"}</option>
                    {currentUser?.gender == "Male" ? null : (
                      <option>Male</option>
                    )}
                    {currentUser?.gender == "Female" ? null : (
                      <option>Female</option>
                    )}
                    {currentUser?.gender == "Other" ? null : (
                      <option>Other</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  disabled
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your email id"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  {...register("phone")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="10 Digit Mobile Number"
                />
              </div>
            </div>

            <div className="grid md:gap-6">
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  {...register("bio")}
                  rows={4}
                  className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Leave a comment..."
                />
              </div>
            </div>
            <Button size="sm" type="submit">
              Save Profile Detail
            </Button>
          </form>
        </>
      )}
    </>
  );
};

export default ProfileForm;
