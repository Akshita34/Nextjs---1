"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams(); ////S1.
  const router = useRouter(); ////S4.
  const pathName = usePathname(); ////S5.

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    console.log(filter);
    const params = new URLSearchParams(searchParams); ////S2.
    params.set("capacity", filter); ////S3.
    router.replace(`${pathName}?${params.toString()}`);
  }

  //
  return (
    <div className="border border-primary-800 flex">
      <button
        className={`px-4 py-2 hover:bg-primary-700 ${
          activeFilter === "all" ? "bg-primary-700" : ""
        } `}
        onClick={() => handleFilter("all")}
      >
        All Cabins
      </button>
      <button
        className={`px-4 py-2 hover:bg-primary-700 ${
          activeFilter === "small" ? "bg-primary-700" : ""
        } `}
        onClick={() => handleFilter("small")}
      >
        1-3 Guests
      </button>
      <button
        className={`px-4 py-2 hover:bg-primary-700 ${
          activeFilter === "medium" ? "bg-primary-700" : ""
        } `}
        onClick={() => handleFilter("medium")}
      >
        4-7 Guests
      </button>
      <button
        className={`px-4 py-2 hover:bg-primary-700 ${
          activeFilter === "large" ? "bg-primary-700" : ""
        } `}
        onClick={() => handleFilter("large")}
      >
        8-10 guests
      </button>
    </div>
  );
}

export default Filter;
