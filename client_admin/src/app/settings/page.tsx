"use client";

import { FileUploadIcon } from "@/contexts/icons";
import { storage } from "@/services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import React, { useState } from "react";
import { BounceLoader } from "react-spinners";
import { v4 } from "uuid";
import * as Yup from "yup";

type Props = {};

export default function SettingsPage({}: Props) {
  const handleSubmit = (form: { urlPath: string }) => {};

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-6">
        <div className="font-medium text-3xl">Settings</div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between flex-col sm:flex-row sm:items-center mb-6">
          <div className="text-base md:text-xl font-semibold">
            Admins's Email
          </div>
        </div>

        {/* <AdminList /> */}
      </div>

      <SettingBannerForm handleSubmit={handleSubmit} />
    </div>
  );
}

type SettingBannerFormProps = {
  handleSubmit: (form: { urlPath: string }) => void;
};

const SettingBannerForm = ({ handleSubmit }: SettingBannerFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://images.freeimages.com/images/previews/ac9/railway-hdr-1361893.jpg"
  );
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex flex-col rounded-2xl max-w-[760px] bg-dvt-item p-6">
      <div className="flex items-center mb-4 justify-between">
        <div className="text-base md:text-xl font-semibold">
          Banner Image {"( just one )"}
        </div>
        {!edit && (
          <button
            onClick={() => setEdit(true)}
            type="submit"
            className="btn btn-primary text-white"
          >
            Edit
          </button>
        )}
      </div>
      {edit ? (
        <>
          <ImageField
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
          />
          <div className="text-sm md:text-base font-semibold my-2">Or</div>
          <div className="border-e-black-1 mb-3 md:mb-5 bg-e-white-1 rounded-lg border overflow-hidden">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
              placeholder="Enter url link..."
              className="py-3 px-4 w-full outline-none border-none bg-inherit"
              disabled={isUploading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary text-white w-fit ml-auto"
            onClick={() => {
              setEdit(false);
            }}
          >
            Save
          </button>
        </>
      ) : (
        <div className="flex flex-col">
          {imageUrl ? (
            <div className="overflow-hidden">
              <img
                className="w-full object-cover rounded-lg"
                src={imageUrl}
                alt={imageUrl}
              />
            </div>
          ) : (
            <div>No banner image available!</div>
          )}
        </div>
      )}
    </div>
  );
};

type ImageFieldProps = {
  isUploading: boolean;
  setIsUploading: (val: boolean) => void;
  imageUrl: string;
  setImageUrl: (val: string) => void;
};
function ImageField({
  isUploading,
  setIsUploading,
  imageUrl,
  setImageUrl,
}: ImageFieldProps) {
  const uploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);

    const image = e.target.files?.[0];

    if (!image) return;

    const imageRef = ref(storage, `images/${image.name + v4()}`);

    await uploadBytes(imageRef, image);

    const url = await getDownloadURL(imageRef);

    setImageUrl(url);

    setIsUploading(false);
  };
  return (
    <>
      <div className="flex flex-wrap items-center">
        <div key={imageUrl} className="mr-2 rounded-lg overflow-hidden mb-2">
          <img className="h-24 object-cover" src={imageUrl} alt={imageUrl} />
        </div>

        {isUploading && (
          <div className="w-24 h-24 flex justify-center items-center">
            <BounceLoader color="#fad56a" />
          </div>
        )}

        <label
          className={`w-24 h-24 btn btn-outline btn-white hover:btn-primary mr-2 mb-2 text-white${
            isUploading ? " hidden" : ""
          }`}
        >
          <div className="flex justify-center items-center flex-col">
            <FileUploadIcon />
            <h1 className="text-base normal-case">Upload</h1>
          </div>
          <input
            onChange={(e) => uploadImages(e)}
            type="file"
            className="hidden"
          />
        </label>
      </div>
    </>
  );
}
