/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FormEvent, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { toast } from "sonner";
import {
  postCategories,
  postTags,
} from "@/app/(dashboardLayout)/(userDashboard)/dashboard/create-post/constant";
import { useCreatePost } from "@/hooks/post.hook";
import { extractAndProcessImages } from "@/app/(dashboardLayout)/(userDashboard)/dashboard/create-post/_utils/extractAndProcessImages";
import Image from "next/image";

export default function CreatePost() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
    <>
      <Button onPress={onOpen} color="secondary">
        Create Post
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
        radius="lg"
        size={"3xl"}
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border rounded-md  text-primary",
          header: "border-b-[1px] ",
          footer: "border-t-[1px] ",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  Create Your Post
                </ModalHeader>
                <ModalBody className="flex flex-col mb-2 gap-4 h-[450px] overflow-y-scroll">
                  <div className="">
                    {/* Post title */}
                    <div className="mb-6 ">
                      <Input
                        id="title"
                        isRequired
                        name="title"
                        className="!text-primary"
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

                    {/* Sticky toolbar */}
                    <div
                      className="border border-gray-500 rounded-md p-2 overflow-hidden flex flex-col"
                      style={{
                        cursor: "text",
                        borderRadius: "8px",
                        height: "100%", // Full height for the container
                      }}
                    >
                      {/* Toolbar (Sticky at the top) */}
                      <div
                        className="sticky top-0 bg-white z-10"
                        style={{
                          borderBottom: "1px solid #ccc", // Add border to separate toolbar from content
                        }}
                      >
                        {/* Quill toolbar will automatically appear here */}
                      </div>

                      {/* Scrollable Text Area */}
                      <div
                        ref={quillRef}
                        style={{
                          height: "100%",
                          background: "white", // Full height for the text editor area
                          overflowY: "auto", // Make text area scrollable
                          minHeight: "320px", // Minimum height for text editor area
                          padding: "10px", // Add padding to text area
                        }}
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter className="justify-between">
                  <div className="float-left flex gap-2 h-16">
                    {pictures?.map((image, index) => (
                      <Image
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={"picture"}
                        width={70}
                        height={100}
                        className="object-cover "
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button color="primary" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      className="bg-primary text-white shadow-lg shadow-indigo-500/20"
                      type="submit"
                      // onPress={() => {
                      //   onClose();
                      // }}
                    >
                      Post
                    </Button>
                  </div>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
