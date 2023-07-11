'use sever'

import AddIcon from "@/assets/AddIcon";
import DeleteIcon from "@/assets/DeleteIcon";
import MoreHorizonIcon from "@/assets/MoreHorizonIcon";
import {Scroll, SettingBannerForm} from "@/components";
import React from "react";
import {addAdmin, deleteAdmin, getAdmins} from "../_actions/admins";

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
              <AddIcon className="w-6 h-6" />
              <div className="ml-2">Add Admin</div>
            </button>
          </form>
        </div>

        <AdminList adminList={admins} />
      </div>

      {/* hard to handle banner at server, so separate it to client component */}
      <SettingBannerForm />
    </div>
  );
}

type AdminListProps = {
  adminList?: Admin[];
};

function AdminList({adminList}: AdminListProps) {
  return (
    <Scroll>
      <table className="min-w-full border-separate border-spacing-y-3 whitespace-nowrap pb-9">
        <thead>
          <tr className="text-xs font-medium uppercase">
            <th className="pl-6 pr-4">ID</th>
            <th className="px-4">Email</th>
            <th className="pl-4 pr-8 text-end">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-black-2">
          {adminList?.map((admin: any, index: number) => {
            return (
              <tr key={admin} className="px-6 py-4 mb-2 bg-black-2 rounded-xl">
                <td className="pl-6 pr-4 font-bold text-primary rounded-l-xl">
                  {"#"}
                  {index + 1}
                </td>

                <td className="px-4">{admin}</td>

                <td className="pl-4 pr-6 text-white text-end rounded-r-xl">
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="m-1 text-white btn btn-primary"
                    >
                      <MoreHorizonIcon className="w-6 h-6" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="p-2 shadow dropdown-content menu bg-primary rounded-box w-52"
                    >
                      <li>
                        <form action={deleteAdmin}>
                          <input
                            type="hidden"
                            name="admins"
                            value={adminList}
                          />
                          <input type="hidden" name="email" value={admin} />
                          <button
                            type="submit"
                            className="flex items-center gap-2"
                          >
                            <DeleteIcon className="w-6 h-6" />
                            Delete
                          </button>
                        </form>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Scroll>
  );
}
