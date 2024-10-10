/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import PageTitle from "@/app/(dashboardLayout)/components/_page-title/PageTitle";
import { postCategories, postTags } from "./constant";
import { toast } from "sonner";
import { extractAndProcessImages } from "./_utils/extractAndProcessImages";
import Image from "next/image";
import { useCreatePost } from "@/hooks/post.hook";

export default function CreatePost() {
  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState(new Set([]));
  const [pictures, setPictures] = useState<File[] | []>([]);

  const {
    mutate: handleCreatePost,
    // isPending: createPostPending,
    isSuccess,
  } = useCreatePost();

  const handleSelectionChange = (e: any) => {
    setSelectedTags(new Set(e.target.value.split(",")));
  };
  useEffect(() => {
    const selectLocalImage = () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.setAttribute("multiple", "multiple"); // Allow multiple image selection
      input.click();

      input.onchange = () => {
        const files = input.files;
        // Check if files are present and append them
        if (files) {
          setPictures((prevPictures) => [
            ...prevPictures,
            ...Array.from(files),
          ]);

          // Array.from(files).forEach((file, index) => {
          //   formData.append(`images[${index}]`, file);
          // });
        }
      };
    };

    if (quill) {
      const toolbar = quill.getModule("toolbar") as any; // Cast as 'any' if type is not available
      toolbar.addHandler("image", selectLocalImage);
    }

    if (isSuccess) {
      setSelectedCategory(""); // Reset category
      setSelectedTags(new Set([])); // Reset tags
      if (quill) {
        quill.setText(""); // Reset quill editor
      }
    } 
  }, [quill, isSuccess, pictures]);

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || selectedTags.size === 0 || !title || !quill) {
      toast.warning("Please fill up all input fields!");
      return;
    }


    // Append the Quill editor content as HTML
    const quillContent = quill.root.innerHTML;
    const { cleanedContent } = extractAndProcessImages(quillContent);
    const postData = {
      content: cleanedContent,
      title,
      category: selectedCategory,
      tags: Array.from(selectedTags),
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(postData));
    pictures.forEach((file) => {
      formData.append("postImages", file);
    });
    // for (let picture of pictures) {
    //   formData.append("postImages", picture);
    // }


    handleCreatePost(formData);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto rounded-lg p-6">
        <PageTitle title="Create a New Post"></PageTitle>
        <form onSubmit={handleSubmit}>
          {/* Post title */}
          <div className="mb-6">
            <Input
              isRequired
              name="title"
              className=""
              variant={"underlined"}
              label="Post Title"
              placeholder="Enter Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Select Category */}
          <div className="mb-6">
            <Select
              isRequired
              id="category"
              name="category"
              className=""
              variant={"underlined"}
              label="Select your relevant Category"
              placeholder="Select a Category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {postCategories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Select Tags */}
          <div className="mb-6">
            <Select
              label="Select your relevant Tags"
              isRequired
              name="tags"
              variant={"underlined"}
              selectionMode="multiple"
              placeholder="Select Tags"
              selectedKeys={selectedTags}
              className=""
              onChange={handleSelectionChange}
            >
              {postTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Quill Editor */}
          <div className="border border-gray-500 rounded-md p-2 overflow-hidden flex flex-col">
            {/* Sticky toolbar */}
            <div
              className="sticky top-0 bg-white z-10"
              style={{ borderBottom: "1px solid #ccc" }}
            >
              {/* Quill toolbar will automatically appear here */}
            </div>

            {/* Scrollable Text Area */}
            <div
              ref={quillRef}
              style={{
                height: "400px", // Editor height
                background: "white",
                overflowY: "auto", // Scrollable text area
                padding: "10px",
              }}
            />
            <div className="pt-2 flex gap-2">
              {pictures?.map((image, index) => (
                <Image
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={"picture"}
                  width={100}
                  height={100}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            {/* <Button
              color="secondary"
              variant="light"
              onPress={() => console.log("Post closed")}
            >
              Cancel
            </Button> */}
            <Button
              className="bg-secondary text-white shadow-lg shadow-indigo-500/20"
              type="submit"
            >
              Submit Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
