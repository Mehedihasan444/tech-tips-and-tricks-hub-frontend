"use client";

import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme

const Page = () => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      // Add custom handler for Image Upload
      quill.getModule("toolbar").addHandler("image", selectLocalImage);

      // Styles for images
      const style = document.createElement('style');
      style.innerHTML = `
        .ql-editor img {
          max-width: 100%; /* Make images responsive */
          height: auto;    /* Maintain aspect ratio */
          display: block;  /* Make images block-level elements */
          margin: 10px 0; /* Add some spacing around images */
        }
      `;
      document.head.appendChild(style);
    }
  }, [quill]);

  const handleFile = async (files: FileList | null) => {
    if (files) {
      const file = files[0]; // Use only the first file for this example
      console.log("Selected image file:", file);

      // Upload the image and get the public URL
      const url = await uploadImage(file);
      
      if (url) {
        insertImage(url); // Insert the public URL into the Quill editor
      }
    } else {
      console.error("No files were selected.");
    }
  };

  // Mock function to simulate image upload
  const uploadImage = async (file: File) => {
    // Replace this with your actual upload logic
    console.log("Uploading image...",file);

    // Simulating an upload and returning a public URL
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     // Mock URL; replace with actual uploaded image URL
    //     const mockUrl = "https://example.com/your-uploaded-image.jpg"; 
    //     console.log("Image uploaded to:", mockUrl);
    //     resolve(mockUrl);
    //   }, 2000); // Simulating upload delay
    // });
  };

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", "multiple"); // Allow multiple image selection
    input.click();

    input.onchange = () => {
      const files = input.files;
      handleFile(files);
    };
  };

  // Insert image into the Quill editor
  const insertImage = (url) => {
    const range = quill.getSelection();
    if (range) {
      quill.insertEmbed(range.index, "image", url);
      quill.setSelection(range.index + 1); // Move the cursor after the inserted image
      console.log("Inserted image URL:", url); // Log the inserted image URL
    } else {
      console.error("Failed to get selection range for inserting image.");
    }
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // You can handle additional form data submission here
  };

  return (
    <form className="" onSubmit={handleFormSubmit}>
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
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Page;
