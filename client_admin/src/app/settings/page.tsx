"use client";

import { Scroll } from "@/components";
import { useGlobalContext } from "@/contexts/GlobalContext";
import {
  AddCircleIcon,
  DeleteIcon,
  EditIcon,
  FileUploadIcon,
  MoreHorizIcon,
} from "@/contexts/icons";
import { storage } from "@/services/firebase";
import { AlertType } from "@/utils/types";
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
  const { setShowAlert } = useGlobalContext();

  const fetchAdmins = useCallback(async () => {
    const { data } = await axios.get("http://localhost:8080/store/api/admins");
    setAdminList(JSON.parse(data?.admins || "[]"));
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdmin = async () => {
    if (!inputAdmin) {
      return;
    }

    if (adminList.includes(inputAdmin.toLowerCase())) {
      setShowAlert({
        status: true,
        type: AlertType.failure,
        message: "Admin already exists!",
      } as IAlert);
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
  const [bannerUrls, setBannerUrls] = useState<string[]>([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      const { data } = await axios.get(
        "http://localhost:8080/store/api/banner"
      );
      setBannerUrls(data.bannerUrl ? JSON.parse(data.bannerUrl) : []);
    };
    fetchBanner();
  }, []);

  const handleUpdateBanner = async () => {
    axios.put("http://localhost:8080/store/api/banner", {
      bannerUrl: JSON.stringify(bannerUrls),
    });
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
      {!edit ? (
        bannerUrls.length !== 0 ? (
          <div className="flex flex-wrap items-center">
            {bannerUrls.map((url) => {
              return (
                <div key={url} className="mr-2 rounded-lg overflow-hidden mb-2">
                  <img className="h-48 object-cover" src={url} alt={url} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-medium text-xl">No Image Available!</div>
        )
      ) : (
        <>
          <ImageField
            bannerUrls={bannerUrls}
            setBannerUrls={setBannerUrls}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
          />

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
      )}
    </div>
  );
};

type ImageFieldProps = {
  isUploading: boolean;
  setIsUploading: (val: boolean) => void;
  bannerUrls: string[];
  setBannerUrls: (val: string[]) => void;
};
function ImageField({
  isUploading,
  setIsUploading,
  bannerUrls,
  setBannerUrls,
}: ImageFieldProps) {
  const uploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);

    const image = e.target.files?.[0];

    if (!image) return;

    const imageRef = ref(storage, `images/${image.name + v4()}`);

    await uploadBytes(imageRef, image);

    const url = await getDownloadURL(imageRef);

    setBannerUrls([...bannerUrls, url]);

    setIsUploading(false);
  };
  return (
    <>
      <div className="flex flex-wrap items-center">
        {bannerUrls.map((url) => {
          return (
            <div key={url} className="mr-2 rounded-lg overflow-hidden mb-2">
              <img className="h-24 object-cover" src={url} alt={url} />
            </div>
          );
        })}

        {isUploading && (
          <div className="w-24 h-24 flex justify-center items-center">
            <BounceLoader color="#ea1c00" />
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
