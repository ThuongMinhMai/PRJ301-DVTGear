import React from "react";
import {Scroll} from "..";
import {deleteAdmin, getAdmins} from "@/app/_actions/admins";
import Image from "next/image";

type Props = {};

export default async function AdminList({}: Props) {
  const admins = await getAdmins();

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
          {admins?.map((admin: any, index: number) => {
            return (
              <tr key={admin} className="px-6 py-4 mb-2 bg-black-2 rounded-xl">
                <td className="pl-6 pr-4 font-bold rounded-l-xl">
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
                      <Image
                        src="/more.svg"
                        alt="more"
                        width={24}
                        height={24}
                        className="filter invert"
                      />
                    </label>
                    <ul
                      tabIndex={0}
                      className="p-2 shadow dropdown-content menu bg-primary rounded-box w-52"
                    >
                      <li>
                        <form action={deleteAdmin}>
                          <input type="hidden" name="admins" value={admins} />
                          <input type="hidden" name="email" value={admin} />
                          <button
                            type="submit"
                            className="flex items-center gap-2"
                          >
                            <Image
                              className="filter invert"
                              src="/delete.svg"
                              alt="add"
                              width={24}
                              height={24}
                            />
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
