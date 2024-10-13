import React from "react";
import PageTitle from "@/app/(dashboardLayout)/components/_page-title/PageTitle";
import UsersTable from "./_components/UsersTable";
import { getUsers } from "@/services/UserService";

export default async function ManageUsersTable() {
  const { data: users } = await getUsers();
  return (
    <div className="container mx-auto p-6 bg-default-50  rounded-lg">
      <PageTitle title="Manage Users" />
      {/* table */}
      <div className="">
        <UsersTable users={users} />
      </div>
    </div>
  );
}
