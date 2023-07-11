"use client";

import React, {useState, useEffect} from "react";
import {Formik, Form, Field, ErrorMessage, useFormikContext} from "formik";
import * as Yup from "yup";
import {storage} from "@/firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import {BounceLoader} from "react-spinners";
import axios from "axios";
import {useRouter} from "next/navigation";
import clsx from "clsx";
import {ReactSortable} from "react-sortablejs";
import Image from "next/image";
import {useEditedProductStore} from "@/store";

type Props = {
  handleSubmit: (product: Product) => void;
  data?: Product;
  edit?: boolean;
};

export default function ProductForm({handleSubmit, edit}: Props) {
  const {editedProduct} = useEditedProductStore();

  const router = useRouter();

  const initialValues: any =
    edit && editedProduct
      ? {
          ...editedProduct,
          brand: editedProduct.brand.id!,
          category: editedProduct.category.id!,
        }
      : {
          name: "",
          description: "",
          price: "",
          images: "",
          category: "",
          brand: "",
          storage,
        };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string(),
    price: Yup.number().required("Required"),
    images: Yup.string().required("Required"),
    category: Yup.number().required("Required"),
    brand: Yup.number().required("Required"),
    storage: Yup.number().required("Required"),
  });

  if (edit && !editedProduct) {
    router.push("/products");
  }

  return (
    <div className="flex flex-col">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <TypoFiled type="text" title="Name" name="name" />

          <ImageField />

          <div className="flex items-center gap-16">
            <CategoryField />

            <BrandField />
          </div>

          <TypoFiled type="number" title="Storage" name="storage" />

          <TypoFiled type="number" title="Price (in VNĐ)" name="price" />

          <TypoFiled
            type="textarea"
            title="Description"
            name="description"
            component="textarea"
            rows={3}
          />

          <button
            type="submit"
            className="float-right text-white btn btn-primary"
          >
            Save
          </button>
        </Form>
      </Formik>
    </div>
  );
}

type TypoFiledProps = {
  title: string;
  name: string;
  type: string;
  rows?: number;
  component?: string;
};

const TypoFiled = ({title, name, type, rows, component}: TypoFiledProps) => {
  return (
    <>
      <div className="flex items-center mb-2">
        <div className="text-base font-semibold md:text-xl">{title}</div>
        <div className="ml-3 text-red-500">
          <ErrorMessage name={name} />
        </div>
      </div>
      <div className="mb-3 overflow-hidden border rounded-lg border-e-black-1 md:mb-5 bg-e-white-1">
        <Field
          name={name}
          type={type}
          component={component ? component : undefined}
          rows={rows ? rows : undefined}
          placeholder={`Enter ${name}`}
          className="w-full px-4 py-3 border-none outline-none bg-inherit"
        />
      </div>
    </>
  );
};

type OptionType = {
  value: number;
  label: string;
};

type CategoryFieldProps = {};

const CategoryField = ({}: CategoryFieldProps) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const {data} = await axios.get(
        "http://localhost:8080/store/api/categories"
      );
      setCategories(data.categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setOptions(
      categories.map((category: Category) => {
        if (typeof category === "object") {
          return {value: category.id, label: category.name} as OptionType;
        } else {
          return {value: category, label: category} as OptionType;
        }
      })
    );
  }, [categories]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        <div className="text-base font-semibold md:text-xl">Category</div>
        <div className="ml-3 text-red-500">
          <ErrorMessage name="category" />
        </div>
      </div>
      <Field
        className="px-4 py-2 mb-3 border rounded-lg border-e-black-1 md:mb-5 bg-e-white-1 bg-black-1"
        component="select"
        name="category"
      >
        <option className="px-4 py-2 bg-black-1" value="">
          No Category
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="px-4 py-2 bg-black-1"
          >
            {option.label}
          </option>
        ))}
      </Field>
    </div>
  );
};

type BrandFieldProps = {};

const BrandField = ({}: BrandFieldProps) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const {data} = await axios.get("http://localhost:8080/store/api/brands");
      setBrands(data.brands);
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    setOptions(
      brands.map((brand: Brand) => {
        if (typeof brand === "object") {
          return {value: brand.id, label: brand.name} as OptionType;
        } else {
          return {value: brand, label: brand} as OptionType;
        }
      })
    );
  }, [brands]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        <div className="text-base font-semibold md:text-xl">Brand</div>
        <div className="ml-3 text-red-500">
          <ErrorMessage name="brand" />
        </div>
      </div>
      <Field
        className="px-4 py-2 mb-3 border rounded-lg border-e-black-1 md:mb-5 bg-inherit bg-black-1"
        component="select"
        name="brand"
      >
        <option className="px-4 py-2 bg-black-1" value="">
          No Brand
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="px-4 py-2 bg-black-1"
          >
            {option.label}
          </option>
        ))}
      </Field>
    </div>
  );
};

function ImageField() {
  const {getFieldProps, setFieldValue} = useFormikContext();
  const imagesString = getFieldProps("images").value;
  const imagesArray: string[] = imagesString ? JSON.parse(imagesString) : [];
  const [isUploading, setIsUploading] = useState(false);

  const uploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);

    const image = e.target.files?.[0];

    if (!image) return;

    const imageRef = ref(storage, `images/${image.name + v4()}`);

    await uploadBytes(imageRef, image);

    const url = await getDownloadURL(imageRef);

    setFieldValue("images", JSON.stringify([...imagesArray, url]));

    setIsUploading(false);
  };
  return (
    <>
      <div className="flex items-center mb-2">
        <div className="text-base font-semibold md:text-xl">Photos</div>
        <div className="ml-3 text-red-500">
          <ErrorMessage name="images" />
        </div>
      </div>
      <div className="flex flex-wrap items-center mb-3 md:mb-5">
        <ReactSortable
          list={imagesArray as any}
          setList={(val) => {
            setFieldValue("images", JSON.stringify(val));
          }}
          className="flex flex-wrap items-center"
        >
          {imagesArray.map((url) => {
            return (
              <div
                key={url}
                className="relative mb-2 mr-2 overflow-hidden rounded-lg group hover:opacity-70"
              >
                <div
                  onClick={() => {
                    setFieldValue(
                      "images",
                      JSON.stringify(imagesArray.filter((item) => item !== url))
                    );
                  }}
                  className="absolute items-center justify-center hidden rounded-full cursor-pointer group-hover:flex opacity-70 w-9 h-9 bg-black-2 top-2 right-2 hover:opacity-100"
                >
                  <Image
                    src="/delete.svg"
                    alt="delete"
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
          className={clsx(
            "w-32 h-32 btn btn-outline btn-white hover:btn-primary mr-2 mb-2 text-white",
            isUploading && "hidden"
          )}
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
