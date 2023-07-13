import {AdminList, SettingBannerForm} from "@/components";
import React from "react";
import {addAdmin, getAdmins} from "../_actions/admins";
import Image from "next/image";

type Props = {};

export default async function SettingsPage({}: Props) {
  const admins = await getAdmins();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-6">
        <div className="text-3xl font-medium">Settings</div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col justify-between gap-3 mb-6 md:items-center md:flex-row">
          <div className="text-base font-semibold md:text-xl flex-nowrap">
            Admins's Email
          </div>

          <form action={addAdmin} className="flex flex-1 gap-4">
            <input
              name="email"
              type="text"
              placeholder="Enter admin's email"
              className="w-full px-4 py-3 ml-auto border-none outline-none md:flex-1 md:w-0 md:max-w-sm bg-black-2 rounded-xl"
            />

            <input type="hidden" name="admins" value={admins} />

            <button type="submit" className="text-white btn btn-primary w-fit">
              <Image
                src="/add-icon.svg"
                alt="add"
                width={24}
                height={24}
                className="filter invert"
              />
              <div className="ml-2">Add Admin</div>
            </button>
          </form>
        </div>

        {/* @ts-expect-error Server Component */}
        <AdminList />
      </div>

      <SettingBannerForm />
    </div>
  );
}
