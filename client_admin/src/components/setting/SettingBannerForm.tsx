"use client";

import axios from "axios";
import {storage} from "@/firebase";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {useEffect, useState} from "react";
import {ReactSortable} from "react-sortablejs";
import {BounceLoader} from "react-spinners";
import {v4} from "uuid";
import Image from "next/image";

type Props = {};

const SettingBannerForm = ({}: Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [bannerUrls, setBannerUrls] = useState<string[]>([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      const {data} = await axios.get("http://localhost:8080/store/api/banner");
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
      <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-center">
        <div className="text-base font-semibold md:text-xl">
          Banner Image {"( just one )"}
        </div>
        {!edit && (
          <button
            onClick={() => setEdit(true)}
            className="flex items-center gap-2 text-white btn btn-primary w-fit"
          >
            <Image
              src="/edit.svg"
              alt="edit"
              width={20}
              height={20}
              className="filter invert"
            />
            Edit
          </button>
        )}
      </div>
      {!edit ? (
        bannerUrls.length !== 0 ? (
          <div className="flex flex-wrap items-center">
            {bannerUrls.map((url) => {
              return (
                <div key={url} className="mb-2 mr-2 overflow-hidden rounded-lg">
                  <img className="object-cover h-48" src={url} alt={url} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-xl text-medium">No Image Available!</div>
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
            className="ml-auto text-white btn btn-primary w-fit"
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
  setBannerUrls: any;
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
        <ReactSortable
          list={bannerUrls as any}
          setList={setBannerUrls as any}
          className="flex flex-wrap items-center"
        >
          {bannerUrls.map((url) => {
            return (
              <div
                key={url}
                className="relative mb-2 mr-2 overflow-hidden rounded-lg group hover:opacity-70"
              >
                <div
                  onClick={() => {
                    setBannerUrls((prev: string[]) => {
                      return prev.filter((item) => item !== url);
                    });
                  }}
                  className="absolute items-center justify-center hidden rounded-full cursor-pointer group-hover:flex opacity-70 w-9 h-9 bg-black-2 top-2 right-2 hover:opacity-100"
                >
                  <Image
                    src="/delete.svg"
                    alt="add"
                    width={24}
                    height={24}
                    className="filter invert"
                  />
                </div>
                <img className="object-cover h-32" src={url} alt={url} />
              </div>
            );
          })}
        </ReactSortable>

        {isUploading && (
          <div className="flex items-center justify-center w-32 h-32">
            <BounceLoader color="#ea1c00" />
          </div>
        )}

        <label
          className={`w-32 h-32 btn btn-outline btn-white hover:btn-primary mr-2 mb-2 text-white${
            isUploading ? " hidden" : ""
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <Image
              width={24}
              height={24}
              alt="upload"
              src="/upload.svg"
              className="filter invert"
            />
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
export default SettingBannerForm;
