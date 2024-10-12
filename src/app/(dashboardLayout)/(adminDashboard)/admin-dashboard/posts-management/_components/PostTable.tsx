"use client";
import { TPost } from "@/types/TPost";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";
import { Eye } from "lucide-react";
import Link from "next/link";

import DeleteConfirmationModal from "@/app/(dashboardLayout)/components/modal/ConfirmModal";

const columns = [
  { name: "TITLE", uid: "title" },
  { name: "CATEGORY", uid: "category" },
  { name: "LIKES", uid: "likes" },
  { name: "DISLIKES", uid: "dislikes" },
  { name: "AUTHOR", uid: "author" },
  { name: "ACTIONS", uid: "actions" },
];

type SortOrder = "asc" | "desc";

interface SortedBy {
  column: keyof TPost;
  order: SortOrder;
}

const PostTable = ({ posts }: { posts: TPost[] }) => {
  const [sortedBy, setSortedBy] = useState<SortedBy | null>(null);
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 4;

  const sortedPosts = useMemo(() => {
    if (!sortedBy) return posts;
    const { column, order } = sortedBy;
    const sortOrder = order === "asc" ? 1 : -1;
    return [...posts].sort((a, b) => {
      if (a[column] > b[column]) return sortOrder;
      if (a[column] < b[column]) return -sortOrder;
      return 0;
    });
  }, [posts, sortedBy]);

  const pages = Math.ceil(posts?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedPosts.slice(start, end);
  }, [page, sortedPosts]);

  type OmittedKeys = "content" | "images" | "tags" | "updatedAt" | "_v"; // Specify the keys you want to omit

  type TPostWithoutContentAndImages = Omit<TPost, OmittedKeys>; // Create the new type

  const renderCell = useCallback(
    (
      post: TPostWithoutContentAndImages,
      columnKey: keyof TPostWithoutContentAndImages | "actions"
    ) => {
      const cellValue = post[columnKey as keyof TPostWithoutContentAndImages];

      switch (columnKey) {
        case "title":
          return (
            <div className="text-secondary">
              {typeof cellValue === "string" ? cellValue : null}

              <h3 className="text-default-400">
                Posted on: {new Date(post.createdAt).toLocaleDateString()}
              </h3>
            </div>
          );

        case "category":
          return (
            <div className="text-primary">
              {typeof cellValue === "string" ? cellValue : null}
            </div>
          );
        case "likes":
          return (
            <div className="text-primary">
              {typeof cellValue === "number" ? cellValue : null}
            </div>
          );

        case "dislikes":
          return (
            <div className="text-secondary">
              {typeof cellValue === "number" ? cellValue : null}
            </div>
          );
        case "author":
          return (
            <div className="text-secondary">
              {typeof cellValue === "object" ? (
                <div className="">
                  <User
                    name={cellValue?.name}
                    description={
                      <Link href={`/profile/${cellValue?.nickName}`}>
                        {cellValue?.nickName}
                      </Link>
                    }
                    avatarProps={{
                      src: `${cellValue?.profilePhoto}`,
                    }}
                    className="text-default-900"
                  />
                </div>
              ) : null}
            </div>
          );

        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip color="primary" content="View post">
                <Link href={`/dashboard/my-posts/${post._id}`}>
                  <span className="text-xl text-primary cursor-pointer active:opacity-50">
                    <Eye />
                  </span>
                </Link>
              </Tooltip>
              {/* post delete modal */}
              <DeleteConfirmationModal item={post} title="post" />
              {/* <Tooltip color="danger" content="Delete post">

                <span
                  onClick={() => handleDeletePost({ postId: post._id })}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <Trash2 />
                </span>
              </Tooltip> */}
            </div>
          );

        default:
          // Ensure any other value is directly renderable as a ReactNode
          if (
            typeof cellValue === "string" ||
            typeof cellValue === "number" ||
            typeof cellValue === "object"
          ) {
            return (
              <span>{cellValue as keyof TPostWithoutContentAndImages}</span>
            ); // Return strings or numbers directly
          }
          // Return null for non-renderable values
          return null;
      }
    },
    []
  );

  const handleSort = (column: keyof TPost) => {
    let order: SortOrder = "asc";
    if (sortedBy && sortedBy.column === column && sortedBy.order === "asc") {
      order = "desc";
    }
    setSortedBy({ column, order });
  };

  return (
    <div>
      <Table
        aria-label="Post management table with sorting"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
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
              onClick={() => handleSort(column.uid as keyof TPost)}
            >
              {column.name}
              {sortedBy && sortedBy.column === column.uid && (
                <span>{sortedBy.order === "asc" ? "↑" : "↓"}</span>
              )}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(
                    item,
                    columnKey as keyof TPostWithoutContentAndImages | "actions"
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostTable;
