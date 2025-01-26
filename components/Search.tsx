"use client";

import { searchDocuments } from "@/lib/actions/user.actions";
import { SearchProps, User } from "@/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Search = ({ onSearch }: SearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);

    if (searchTerm) {
      setLoading(true);
      try {
        const docs = await searchDocuments(searchTerm);
        const users = docs.map((doc) => ({
          id: doc.$id,
          name: doc.name,
          email: doc.email,
          status: doc.status,
          last_login_time: doc.last_login_time,
          updated_at: doc.updated_at,
        }));
        setResults(users);
        onSearch(searchTerm);
        console.log("Search results:", users);
      } catch (error) {
        console.error("Error searching documents:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
      onSearch("");
    }
  };

  return (
    <div className="absolute top-[198px] right-32 w-1/3 z-50">
      <div className="flex items-center w-full rounded-md border border-gray-200 bg-dark-400 focus-within:ring-2 focus-within:ring-gray-300">
        <MagnifyingGlassIcon className="ml-3 h-5 w-5 text-gray-500" />
        <input
          id="search"
          className="flex-1 border-none bg-transparent py-2 pl-2 pr-3 text-sm text-white placeholder-gray-500 focus:outline-none"
          placeholder="Search"
          defaultValue={searchParams.get("query")?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
