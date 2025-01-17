"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
import { CloudUpload } from "lucide-react";
import Image from "next/image";




interface StoryCardProps {
  imageUrl: string;
  userImage: string;
  username: string;
  isAddStory?: boolean;
  timestamp:string;
  onClick?: () => void;
}

export function StoryCard({ imageUrl, userImage, username, isAddStory,timestamp, onClick }: StoryCardProps) {
  

  return (
    <div
      onClick={onClick}
      className="relative flex-shrink-0 cursor-pointer group w-[120px] h-[200px] rounded-xl overflow-hidden transition-transform duration-200 ease-in-out hover:scale-[1.02]"
    >
      <Image
        width={100}
        height={200}
        src={imageUrl}
        alt={`${username}'s story`}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />

      {!isAddStory ? (
        <>
          <div className="absolute top-4 left-4" >
            <div className="rounded-full p-[2px] bg-gradient-to-br from-teal-500 via-purple-500 to-pink-500">
              <Avatar
                src={userImage}
                className="w-10 h-10 border-2 border-white"
                fallback={username[0]}
              />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white text-sm font-medium truncate">{username}</p>
            <span className="text-white/80 text-xs ">{timestamp}</span>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center mb-2">
            <button>


              <AddStoryModal />
            </button>
          </div>
          <p className="text-sm font-medium">Create Story</p>
        </div>
      )}
    </div>
  );
}

const AddStoryModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (<>
    <div className="flex flex-wrap gap-3">
      <Button onPress={() => onOpen()} className="bg-transparent text-white ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      </Button>

    </div>
    <Modal isOpen={isOpen} size={"md"} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Story</ModalHeader>
            <ModalBody>
            <div className="relative w-full h-[160px] rounded-lg mb-2 border-2 border-dashed border-teal-400 hover:border-teal-500 transition-colors group">
                <input
                  type="file"
                  accept="image/*"
                  // onChange={(e) => setFile(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <span className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-500 mb-2 group-hover:bg-teal-200 transition-colors">
                    <CloudUpload/>
                  </span>
                  <span className="text-sm text-gray-500">Click to upload</span>
                  <span className="text-xs text-gray-400 mt-1">
                    or drag and drop
                  </span>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
              Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </>)
}

