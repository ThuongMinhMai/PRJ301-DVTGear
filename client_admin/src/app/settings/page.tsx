import AddIcon from "@/assets/AddIcon";
import DeleteIcon from "@/assets/DeleteIcon";
import MoreHorizonIcon from "@/assets/MoreHorizonIcon";
import { Scroll } from "@/components";
import SettingBannerForm from "@/components/SettingBannerForm";
import addAdmin from "@/services/addAdmin";
import deleteAdmin from "@/services/deleteAdmin";
import getAdmins from "@/services/getAdmins";
import React from "react";

type Props = {};

export default async function SettingsPage({}: Props) {
  const admins = await getAdmins();

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

          <form action={addAdmin} className="flex-1 flex gap-4">
            <input
              name="email"
              type="text"
              placeholder="Enter admin's email"
              className="py-3 px-4 w-full md:flex-1 md:w-0 md:max-w-sm ml-auto outline-none border-none bg-dvt-item rounded-xl"
            />

            <input type="hidden" name="admins" value={admins} />

            <button type="submit" className="btn btn-primary text-white w-fit">
              <AddIcon className="w-6 h-6" />
              <div className="ml-2">Add Admin</div>
            </button>
          </form>
        </div>

        <AdminList adminList={admins} />
      </div>

      <SettingBannerForm />
    </div>
  );
}

type AdminListProps = {
  adminList: any;
  onDeleteAdmin?: (admin: string) => void;
};

function AdminList({ adminList }: AdminListProps) {
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
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-primary m-1 text-white"
                    >
                      <MoreHorizonIcon className="w-6 h-6" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-primary rounded-box w-52"
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
