/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useDeletePost } from "@/hooks/post.hook";
import { useDeleteUser } from "@/hooks/user.hook";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { Trash2 } from "lucide-react";

export default function DeleteConfirmationModal({
  item,
  title,
}: {
  item: any;
  title: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: handleDeleteUser, isPending: isUserLoading } =
    useDeleteUser(); // Use update post hook
  const { mutate: handleDeletePost, isPending: isPostLoading } =
    useDeletePost(); // Use update post hook

  const handleDelete = () => {
    if (title === "user") {
      handleDeleteUser({ userId: item._id });
    } else if (title === "post"){
      handleDeletePost({ postId: item._id });
    }
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-transparent">
        <Tooltip color="danger" content={`Delete ${title}`}>
          <Trash2 className="text-danger" />
        </Tooltip>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete User
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete the {title}{" "}
                  <strong>{item?.name}</strong>? This action cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={handleDelete}
                  isLoading={title === "user" ? isUserLoading : isPostLoading}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
{
  /* <span
onClick={}
className="text-lg text-danger cursor-pointer active:opacity-50"
>
<Trash2 />
</span> */
}
