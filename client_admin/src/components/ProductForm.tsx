"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { storage } from "@/services/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { BounceLoader } from "react-spinners";
import axios from "axios";
import { FileUploadIcon } from "@/contexts/icons";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { useRouter } from "next/navigation";

type Props = {
  handleSubmit: (product: Product) => void;
  data?: Product;
  edit?: boolean;
};

export default function ProductForm({ handleSubmit, edit }: Props) {
  const { editedProduct } = useGlobalContext();

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
            className="btn btn-primary float-right text-white"
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

const TypoFiled = ({ title, name, type, rows, component }: TypoFiledProps) => {
  return (
    <>
      <div className="flex items-center mb-2">
        <div className="text-base md:text-xl font-semibold">{title}</div>
        <div className="text-red-500 ml-3">
          <ErrorMessage name={name} />
        </div>
      </div>
      <div className="border-e-black-1 mb-3 md:mb-5 bg-e-white-1 rounded-lg border overflow-hidden">
        <Field
          name={name}
          type={type}
          component={component ? component : undefined}
          rows={rows ? rows : undefined}
          placeholder={`Enter ${name}`}
          className="py-3 px-4 w-full outline-none border-none bg-inherit"
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
      const { data } = await axios.get(
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
          return { value: category.id, label: category.name } as OptionType;
        } else {
          return { value: category, label: category } as OptionType;
        }
      })
    );
  }, [categories]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        <div className="text-base md:text-xl font-semibold">Category</div>
        <div className="text-red-500 ml-3">
          <ErrorMessage name="category" />
        </div>
      </div>
      <Field
        className="border-e-black-1 mb-3 md:mb-5 bg-e-white-1 rounded-lg border py-2 px-4 bg-dvt-white-1"
        component="select"
        name="category"
      >
        <option className="bg-dvt-white-1 py-2 px-4" value="">
          No Category
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-dvt-white-1 py-2 px-4"
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
      const { data } = await axios.get(
        "http://localhost:8080/store/api/brands"
      );
      setBrands(data.brands);
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    setOptions(
      brands.map((brand: Brand) => {
        if (typeof brand === "object") {
          return { value: brand.id, label: brand.name } as OptionType;
        } else {
          return { value: brand, label: brand } as OptionType;
        }
      })
    );
  }, [brands]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        <div className="text-base md:text-xl font-semibold">Brand</div>
        <div className="text-red-500 ml-3">
          <ErrorMessage name="brand" />
        </div>
      </div>
      <Field
        className="border-e-black-1 mb-3 md:mb-5 bg-inherit rounded-lg border py-2 px-4 bg-dvt-white-1"
        component="select"
        name="brand"
      >
        <option className="bg-dvt-white-1 py-2 px-4" value="">
          No Brand
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-dvt-white-1 py-2 px-4"
          >
            {option.label}
          </option>
        ))}
      </Field>
    </div>
  );
};

function ImageField() {
  const { getFieldProps, setFieldValue } = useFormikContext();
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
        <div className="text-base md:text-xl font-semibold">Photos</div>
        <div className="text-red-500 ml-3">
          <ErrorMessage name="images" />
        </div>
      </div>
      <div className="flex flex-wrap items-center mb-3 md:mb-5">
        {imagesArray.map((url) => {
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
