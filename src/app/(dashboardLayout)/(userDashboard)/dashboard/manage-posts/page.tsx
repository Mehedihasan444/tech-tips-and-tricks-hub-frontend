"use client";
import React, { useState } from "react";
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
import { Edit, Eye, FilePenLine, Trash2 } from "lucide-react";

const statusColorMap = {
  published: "success",
  draft: "warning",
  archived: "danger",
};

const columns = [
  { name: "TITLE", uid: "title" },
  { name: "AUTHOR", uid: "author" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const posts = [
  {
    id: 1,
    title: "How to Build a React App from Scratch",
    description:
      "Learn how to set up a new React project, structure components, and manage state effectively.",
    upvotes: 150,
    downvotes: 12,
    date: "2024-09-30",
    status: "Draft",
    categories: ["React", "Frontend"],
    name: "Tony Reichert",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    media: [
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg",
      "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
      "https://static.vecteezy.com/system/resources/thumbnails/039/210/128/small_2x/ai-generated-beautiful-nature-mountain-scenery-professionalgraphy-photo.jpg",
      "https://www.vecteezy.com/video/14927511-soap-bubbles-floating-in-the-air-with-natural-green-blurred-bokeh-background-for-children-and-kids-in-the-park",
      "https://gratisography.com/wp-content/uploads/2024/01/gratisography-covered-in-confetti-800x525.jpg",
      "https://youtu.be/Dyv_8ABdtUg",
      "https://www.youtube.com/shorts/ohGWuS46Ldc?feature=share",
    ],
  },
  {
    id: 2,
    title: "Mastering JavaScript Closures and Scope",
    description:
      "Explore JavaScript closures, a powerful concept that helps you write cleaner and more efficient code.",
    upvotes: 200,
    downvotes: 30,
    status: "vacation",
    name: "Tony Reichert",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    date: "2024-09-29",
    categories: ["JavaScript", "Functional Programming"],
    media: ["/images/js-closures.jpg"],
    video: "https://www.example.com/js-closures-tutorial.mp4", // Video URL
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox: When to Use Which",
    description:
      "Understand the differences between CSS Grid and Flexbox, and learn when to use each for responsive designs.",
    upvotes: 120,
    downvotes: 8,
    status: "vacation",
    name: "Tony Reichert",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    date: "2024-09-28",
    categories: ["CSS", "HTML", "Frontend"],
    media: [
      "/images/css-grid-flexbox.jpg",
      "https://www.example.com/css-grid-flexbox-video.mp4",
    ],
  },
  {
    id: 4,
    title: "Demystifying Async/Await in JavaScript",
    description:
      "This guide helps you grasp asynchronous JavaScript and master promises, async, and await for better control over async operations.",
    upvotes: 175,
    downvotes: 25,
    status: "active",
    date: "2024-09-27",
    name: "Tony Reichert",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    categories: ["JavaScript", "Asynchronous Programming"],
    media: [
      "/images/async-await.jpg",
      "https://www.example.com/async-await-tutorial.mp4",
    ],
  },
  {
    id: 5,
    title: "Responsive Design with CSS Grid: Practical Examples",
    description:
      "Learn how to create beautiful and fully responsive layouts using CSS Grid with hands-on examples.",
    upvotes: 90,
    downvotes: 5,
    date: "2024-09-26",
    name: "Tony Reichert",
    status: "paused",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    categories: ["CSS", "Responsive Design"],
    media: ["/images/responsive-design-grid.jpg"],
  },
];

export default function ManagePosts() {
  const [sortedBy, setSortedBy] = useState(null);

  // Sort the data based on the column selected
  const sortedPosts = posts.sort((a, b) => {
    if (!sortedBy) return 0;
    const order = sortedBy.order === "asc" ? 1 : -1;
    return a[sortedBy.column] > b[sortedBy.column] ? order : -order;
  });
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(posts.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return posts.slice(start, end);
}, [page, posts]);
  const renderCell = React.useCallback((post, columnKey) => {
    const cellValue = post[columnKey];

    switch (columnKey) {
      case "title":
        return (
          <div className="text-secondary ">
            {cellValue}
            <h3 className="text-default-400">
              posted on: {new Date("07/10/2024").toLocaleDateString()}
            </h3>
          </div>
        );
      case "author":
        return (
          <div className="flex items-center">
            <User
              avatarProps={{ radius: "lg", src: post.avatar }}
              name={post.name}
            />
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[cellValue]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="primary" content="View post">
              <span className="text-xl text-primary cursor-pointer active:opacity-50">
                <Eye />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="Edit post">
              <span className="text-lg text-primary cursor-pointer active:opacity-50">
                <FilePenLine />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete post">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Trash2 />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const handleSort = (column) => {
    let order = "asc";
    if (sortedBy && sortedBy.column === column && sortedBy.order === "asc") {
      order = "desc";
    }
    setSortedBy({ column, order });
  };

  return (
    <div className="container mx-auto p-6 bg-white  rounded-lg">
      <h1 className="text-2xl mb-6 border-l-5 border-primary font-bold pl-5">Manage Posts</h1>
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
              onClick={() => handleSort(column.uid)}
              
            >
              {column.name}
              {sortedBy && sortedBy.column === column.uid && (
                <span>{sortedBy.order === "asc" ? "↑" : "↓"}</span>
              )}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sortedPosts}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
