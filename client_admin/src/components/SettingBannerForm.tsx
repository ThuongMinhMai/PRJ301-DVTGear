"use client";

import DeleteIcon from "@/assets/DeleteIcon";
import EditIcon from "@/assets/EditIcon";
import { FileUploadIcon } from "@/contexts/icons";
import { storage } from "@/services/firebase";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { BounceLoader } from "react-spinners";
import { v4 } from "uuid";

type Props = {};

const SettingBannerForm = ({}: Props) => {
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
            className="btn btn-primary w-fit text-white flex items-center gap-2"
          >
            <EditIcon className="w-5 h-5" />
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
                className="group hover:opacity-70 mr-2 rounded-lg overflow-hidden mb-2 relative"
              >
                <div
                  onClick={() => {
                    setBannerUrls((prev: string[]) => {
                      return prev.filter((item) => item !== url);
                    });
                  }}
                  className="group-hover:flex hidden absolute opacity-70 rounded-full w-9 h-9 justify-center items-center bg-dvt-item top-2 right-2 hover:opacity-100 cursor-pointer"
                >
                  <DeleteIcon className="w-6 h-6 text-primary" />
                </div>
                <img className="h-32 object-cover" src={url} alt={url} />
              </div>
            );
          })}
        </ReactSortable>

        {isUploading && (
          <div className="w-24 h-24 flex justify-center items-center">
            <BounceLoader color="#ea1c00" />
          </div>
        )}

        <label
          className={`w-32 h-32 btn btn-outline btn-white hover:btn-primary mr-2 mb-2 text-white${
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
export default SettingBannerForm;
