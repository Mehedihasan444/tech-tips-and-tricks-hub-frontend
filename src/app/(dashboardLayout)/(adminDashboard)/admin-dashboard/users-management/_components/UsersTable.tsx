"use client";
import React, { useState, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Pagination,
} from "@nextui-org/react";
import {  Eye } from "lucide-react";
import { IUser } from "@/types/IUser";
import Link from "next/link";

import DeleteConfirmationModal from "@/app/(dashboardLayout)/components/modal/ConfirmModal";
import UserUpdateModal from "./UserUpdateModal";

// Define a valid color map using the specific values allowed by the Chip component
const statusColorMap: Record<
  string,
  "success" | "warning" | "danger" | "default"
> = {
  ACTIVE: "success",
  BLOCKED: "danger",
  // vacation: "warning",
};

const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "FOLLOWERS", uid: "followers" },
  { name: "FOLLOWING", uid: "following" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];
type SortOrder = "asc" | "desc";

interface SortedBy {
  column: keyof IUser;
  order: SortOrder;
}

const UsersTable = ({ users }: { users: IUser[] }) => {
  const [sortedBy, setSortedBy] = useState<SortedBy | null>(null);
  
  
  // Sort the data based on the selected column
  const sortedUsers = useMemo(() => {
    if (!sortedBy) return users;
    const { column, order } = sortedBy;
    const sortOrder = order === "asc" ? 1 : -1;
    return [...users].sort((a, b) => {
      if (a[column] && b[column]) {
        if (a[column] > b[column]) return sortOrder;
        if (a[column] < b[column]) return -sortOrder;
      }
      return 0;
    });
  }, [users, sortedBy]);


  type OmittedKeys = "socialMedia" | "education"; // Specify the keys you want to omit
  //"following" | "followers" |
  type TUserWithoutObjects = Omit<IUser, OmittedKeys>; // Create the new type

  const renderCell = useCallback(
    (
      user: TUserWithoutObjects,
      columnKey: keyof TUserWithoutObjects | "actions"
    ) => {
      const cellValue = user[columnKey as keyof TUserWithoutObjects];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.profilePhoto }}
              description={user.email}
              name={user.name}
            />
          );
        case "followers":
          // Make sure you're rendering valid data
          return (
            <span>
              {Array.isArray(user.followers) ? user.followers.length : "N/A"}
            </span>
          );
        case "following":
          // Similarly, ensure valid rendering for `following`
          return (
            <span>
              {Array.isArray(user.following) ? user.following.length : "N/A"}
            </span>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{user.role}</p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={
                statusColorMap[user?.status as keyof typeof statusColorMap]
              }
              size="sm"
              variant="flat"
            >
              {user.status}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <Link href={`/profile/${user?.nickName}`}>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <Eye />
                  </span>
                </Link>
              </Tooltip>
              {/* update modal */}
              <UserUpdateModal user={user} />

              <DeleteConfirmationModal item={user} title="user" />
            </div>
          );
        default:
          return <span>{cellValue as keyof TUserWithoutObjects}</span>;
      }
    },
    []
  );

  const handleSort = (column: keyof IUser) => {
    let order: SortOrder = "asc";
    if (sortedBy && sortedBy.column === column && sortedBy.order === "asc") {
      order = "desc";
    }
    setSortedBy({ column, order });
  };

  return (
    <Table
      aria-label="User table with sorting"
      // Remove bottom pagination content
      style={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting
            onClick={() => handleSort(column.uid as keyof IUser)}
          >
            {column.name}
            {sortedBy && sortedBy.column === column.uid && (
              <span>{sortedBy.order === "asc" ? "↑" : "↓"}</span>
            )}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sortedUsers}>
        {/* Change paginatedUsers to sortedUsers */}
        {(user) => (
          <TableRow key={user._id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(
                  user,
                  columnKey as keyof TUserWithoutObjects | "actions"
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
