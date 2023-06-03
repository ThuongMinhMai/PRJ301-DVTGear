"use client";

import { Scroll } from "@/components";
import {
  AddCircleIcon,
  DeleteIcon,
  EditIcon,
  FileUploadIcon,
  MoreHorizIcon,
} from "@/contexts/icons";
import { storage } from "@/services/firebase";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { v4 } from "uuid";

type Props = {};

export default function SettingsPage({}: Props) {
  const handleSubmit = (form: { urlPath: string }) => {};
  const [inputAdmin, setInputAdmin] = useState("");
  const [adminList, setAdminList] = useState<any>([]);

  const fetchAdmins = useCallback(async () => {
    const { data } = await axios.get("http://localhost:8080/store/api/admins");
    setAdminList(JSON.parse(data?.admins || "[]"));
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdmin = async () => {
    if (adminList.includes(inputAdmin.toLowerCase())) {
      alert("Admin already exists!");
      return;
    }
    setInputAdmin("");
    await axios.put("http://localhost:8080/store/api/admins", {
      admins: [...adminList, inputAdmin.toLowerCase()],
    });
    fetchAdmins();
  };

  const handleDeleteAdmin = async (admin: string) => {
    await axios.put("http://localhost:8080/store/api/admins", {
      admins: adminList.filter((adminItem: string) => {
        return adminItem.toLowerCase() !== admin.toLowerCase();
      }),
    });
    fetchAdmins();
  };

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
            value={inputAdmin}
            onChange={(e) => {
              setInputAdmin(e.target.value);
            }}
            placeholder="Enter admin's email"
            className="py-3 px-4 w-full md:flex-1 md:w-0 md:max-w-sm ml-auto outline-none border-none bg-dvt-item rounded-xl"
          />

          <div
            onClick={handleAddAdmin}
            className="btn btn-primary text-white w-fit"
          >
            <AddCircleIcon />
            <div className="ml-2">Add Admin</div>
          </div>
        </div>

        <AdminList adminList={adminList} onDeleteAdmin={handleDeleteAdmin} />
      </div>

      <SettingBannerForm handleSubmit={handleSubmit} />
    </div>
  );
}

type AdminListProps = {
  adminList: any;
  onDeleteAdmin: (admin: string) => void;
};

function AdminList({ adminList, onDeleteAdmin }: AdminListProps) {
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
              <tr key={admin} className="bg-dvt-item py-4 px-6 rounded-xl mb-2">
                <td className="text-primary pl-6 pr-4 rounded-l-xl font-bold">
                  {"#"}
                  {index + 1}
                </td>

                <td className="px-4">{admin}</td>

                <td className="text-end rounded-r-xl text-white pr-6 pl-4">
                  <DropdownActions
                    onDeleteAdmin={() => {
                      onDeleteAdmin(admin);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Scroll>
  );
}

type DropdownActionsProps = {
  onDeleteAdmin: () => void;
};

function DropdownActions({ onDeleteAdmin }: DropdownActionsProps) {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-primary m-1 text-white">
        <MoreHorizIcon />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-primary rounded-box w-52"
      >
        <li onClick={onDeleteAdmin}>
          <div>
            <DeleteIcon />
            Delete
          </div>
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
  const [bannerUrl, setBannerUrl] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      const { data } = await axios.get(
        "http://localhost:8080/store/api/banner"
      );
      setBannerUrl(data.bannerUrl);
    };
    fetchBanner();
  }, []);

  const handleUpdateBanner = async () => {
    axios.put("http://localhost:8080/store/api/banner", { bannerUrl });
  };

  return (
    <div className="flex flex-col rounded-2xl">
      <div className="flex flex-col md:flex-row md:items-center mb-4 gap-4">
        <div className="text-base md:text-xl font-semibold">
          Banner Image {"( just one )"}
        </div>
        {!edit && (
          <button
            onClick={() => setEdit(true)}
            className="btn btn-primary w-fit text-white"
          >
            <EditIcon />
            Edit
          </button>
        )}
      </div>
      {edit ? (
        <>
          <ImageField
            bannerUrl={bannerUrl}
            setBannerUrl={setBannerUrl}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
          />
          <div className="text-xs md:text-sm font-semibold my-2">Or</div>
          <div className="border-e-black-1 mb-3 md:mb-5 bg-e-white-1 rounded-lg border overflow-hidden">
            <input
              type="text"
              value={bannerUrl}
              onChange={(e) => {
                setBannerUrl(e.target.value);
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
              handleUpdateBanner();
              setEdit(false);
            }}
          >
            Save
          </button>
        </>
      ) : (
        <div className="flex flex-col">
          {bannerUrl ? (
            <div className="overflow-hidden">
              <img
                className="max-w-full object-cover rounded-lg"
                src={bannerUrl}
                alt={bannerUrl}
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
  bannerUrl: string;
  setBannerUrl: (val: string) => void;
};
function ImageField({
  isUploading,
  setIsUploading,
  bannerUrl,
  setBannerUrl,
}: ImageFieldProps) {
  const uploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);

    const image = e.target.files?.[0];

    if (!image) return;

    const imageRef = ref(storage, `images/${image.name + v4()}`);

    await uploadBytes(imageRef, image);

    const url = await getDownloadURL(imageRef);

    setBannerUrl(url);

    setIsUploading(false);
  };
  return (
    <>
      <div className="flex flex-wrap items-center">
        <div key={bannerUrl} className="mr-2 rounded-lg overflow-hidden mb-2">
          <img className="h-24 object-cover" src={bannerUrl} alt={bannerUrl} />
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
