"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";
import { getUsersInfo } from "@/lib/actions/user.actions";
import Search from "@/components/Search";
import { User } from "@/types";

export const dynamic = "force-dynamic";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsersInfo();
      setUsers(usersData);
      setFilteredUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm) {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden relative flex-col bg-gray-700 rounded-xl">
      <div className="flex flex-col w-full h-full max-md:flex-row max-md:overflow-hidden">
        <div className="flex flex-col text-black h-full w-full md:p-20">
          <h1 className="header text-light-200 pt-10 text-2xl md:text-3xl font-bold sm:px-4">
            User Management Table
          </h1>
          <div className="w-full mt-6 sm:px-4">
            <Search onSearch={handleSearch} />
            <DataTable columns={columns} data={filteredUsers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
