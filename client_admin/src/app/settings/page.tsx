"use client";

import { Scroll } from "@/components";
import {
  AddCircleIcon,
  DeleteIcon,
  FileUploadIcon,
  MoreHorizIcon,
} from "@/contexts/icons";
import { storage } from "@/services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { BounceLoader } from "react-spinners";
import { v4 } from "uuid";

type Props = {};

export default function SettingsPage({}: Props) {
  const handleSubmit = (form: { urlPath: string }) => {};

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-6">
        <div className="font-medium text-3xl">Settings</div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between md:items-center mb-6 gap-3 flex-col md:flex-row">
          <div className="text-base md:text-xl font-semibold flex-nowrap">
            Admins's Email
          </div>

          <input
            type="text"
            placeholder="Enter admin's email"
            className="py-3 px-4 w-full md:flex-1 md:w-0 md:max-w-sm ml-auto outline-none border-none bg-dvt-item rounded-xl"
          />

          <div className="btn btn-primary text-white w-fit">
            <AddCircleIcon />
            <div className="ml-2">Add Admin</div>
          </div>
        </div>

        <AdminList />
      </div>

      <SettingBannerForm handleSubmit={handleSubmit} />
    </div>
  );
}

type AdminListProps = {};

function AdminList({}: AdminListProps) {
  const [adminList, setAdminList] = useState<any>([
    {
      id: 1,
      email: "kingchenobama711@gmail.com",
      role: "admin",
    },
    {
      id: 2,
      email: "vanttse170128@fpt.edu.vn",
      role: "admin",
    },
  ]);
  return (
    <Scroll>
      <table className="min-w-full border-spacing-y-3 border-separate whitespace-nowrap pb-9">
        <thead>
          <tr className="font-medium text-xs uppercase">
            <th className="pl-6 pr-4">ID</th>
            <th className="px-4">Email</th>
            <th className="text-end pr-8 pl-4">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-dvt-item">
          {adminList.map((admin: any, index: number) => {
            return (
              <tr
                key={admin.id}
                className="bg-dvt-item py-4 px-6 rounded-xl mb-2"
              >
                <td className="text-primary pl-6 pr-4 rounded-l-xl font-bold">
                  {"#"}
                  {index + 1}
                </td>

                <td className="px-4">{admin.email}</td>

                <td className="text-end rounded-r-xl text-white pr-6 pl-4">
                  <DropdownActions />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Scroll>
  );
}

type DropdownActionsProps = {};

function DropdownActions({}: DropdownActionsProps) {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-primary m-1 text-white">
        <MoreHorizIcon />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-primary rounded-box w-52"
      >
        <li>
          <a>
            <DeleteIcon />
            Delete
          </a>
        </li>
      </ul>
    </div>
  );
}

type SettingBannerFormProps = {
  handleSubmit: (form: { urlPath: string }) => void;
};

const SettingBannerForm = ({ handleSubmit }: SettingBannerFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/dvtcream.appspot.com/o/images%2FTelefonino.net-IV-2160x1350-4-7.webp5bc5ebb1-0b2a-4282-860d-2dd276af9f66?alt=media&token=0c2d1499-dc7c-4c6f-a386-dfbda84749e3&_gl=1*1f9kotv*_ga*NzYyNTEwMTYxLjE2ODU2ODM2NjE.*_ga_CW55HF8NVT*MTY4NTY5NzE3MS4yLjEuMTY4NTY5NzIzMC4wLjAuMA.."
  );
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex flex-col rounded-2xl">
      <div className="flex flex-col md:flex-row md:items-center mb-4 justify-between">
        <div className="text-base md:text-xl font-semibold">
          Banner Image {"( just one )"}
        </div>
        {!edit && (
          <button
            onClick={() => setEdit(true)}
            className="btn btn-primary w-fit text-white mt-2"
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
          <div className="text-xs md:text-sm font-semibold my-2">Or</div>
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
