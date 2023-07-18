import {Skeleton} from "@/components";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function loading({}: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between mb-6 sm:flex-row sm:items-center">
        <div className="text-3xl font-medium">Orders</div>
        <div className="flex gap-3">
          <Link href="/orders" className="text-white btn btn-primary">
            <Image
              width={24}
              height={24}
              alt="back"
              src="/arrow-back.svg"
              className="filter invert"
            />
            <div className="ml-2">Back</div>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2 text-2xl font-medium">
        <div className="flex items-center gap-2">
          Order ID: <Skeleton className="w-16 h-9" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="grid grid-flow-col grid-cols-2 col-span-9 grid-rows-3 gap-4 p-6 rounded-md bg-black-2">
          <div className="flex flex-col row-span-1">
            <div className="mb-2 font-semibold text-primary">Customer</div>
            <Skeleton className="w-8 h-14 bg-black-1" />
          </div>
          <div className="flex flex-col row-span-1">
            <div className="mb-2 font-semibold text-primary">Receiver</div>
            <Skeleton className="w-8 h-14 bg-black-1" />
          </div>
          <div className="flex flex-col row-span-1">
            <div className="mb-2 font-semibold text-primary">Phone</div>
            <Skeleton className="w-8 h-14 bg-black-1" />
          </div>
          <div className="flex flex-col row-span-1">
            <div className="mb-2 font-semibold text-primary">Date</div>
            <Skeleton className="w-8 h-14 bg-black-1" />
          </div>
          <div className="flex flex-col row-span-1">
            <div className="mb-2 font-semibold text-primary">Address</div>
            <Skeleton className="w-8 h-14 bg-black-1" />
          </div>

          <div className="flex flex-col row-span-1">
            <div className="mb-2 font-semibold text-primary">Status</div>
            <div>
              <Skeleton className="w-8 h-14" />
            </div>
          </div>
        </div>

        <div className="flex flex-col col-span-3 p-6 rounded-md bg-black-2">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold">Price</div>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">Sub Total:</div>
              <div className="col-span-1">
                <Skeleton className="w-8 h-14" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">Shipping:</div>
              <div className="col-span-1">
                <Skeleton className="w-8 h-14" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 font-semibold text-primary">
              <div className="col-span-1">Total:</div>
              <div className="col-span-1">
                <Skeleton className="w-8 h-14" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 mb-2 text-2xl font-medium">
        Order Items
      </div>
      <div className="min-w-full pb-24 border-separate border-spacing-y-3 whitespace-nowrap">
        <div>
          <div className="flex justify-between w-full text-xs font-medium uppercase">
            <div className="pl-6 pr-4">NO.</div>
            <div className="px-4">Photo</div>
            <div className="px-4">Name</div>
            <div className="px-4">Quantity</div>
            <div className="px-4">Price</div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex flex-col gap-3 mb-2 rounded-xl">
            <div className="px-4">
              <Skeleton className="w-full h-14" />
            </div>
            <div className="px-4">
              <Skeleton className="w-full h-14" />
            </div>
            <div className="px-4">
              <Skeleton className="w-full h-14" />
            </div>
            <div className="px-4">
              <Skeleton className="w-full h-14" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
