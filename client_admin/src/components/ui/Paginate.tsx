"use client";

import {useRouter, useSearchParams} from "next/navigation";
import React, {useEffect} from "react";
import ReactPaginate from "react-paginate";

type PaginateProps = {
  pageSize: number;
  totalItems: number;
  path: string;
};

const Paginate = ({pageSize, totalItems, path}: PaginateProps) => {
  const router = useRouter();

  const paginate = ({selected}: {selected: number}) => {
    const pathWithPaginate = `${path}${
      path.indexOf("?") === -1 ? "?" : "&"
    }page=${selected + 1}`;

    router.push(pathWithPaginate);
  };

  console.log({
    pageSize,
    totalItems,
    path,
  });

  return (
    <ReactPaginate
      breakClassName={"join-item btn btn-disabled"}
      onPageChange={paginate}
      pageCount={Math.ceil(totalItems / pageSize)}
      previousLabel={"Prev"}
      nextLabel={"Next"}
      containerClassName={"flex justify-center gap-2 mb-8 join"}
      pageLinkClassName={"join-item btn border-primary"}
      previousLinkClassName={"join-item btn border-primary"}
      nextLinkClassName={"join-item btn border-primary"}
      activeLinkClassName={"btn-primary"}
    />
  );
};

export default Paginate;
