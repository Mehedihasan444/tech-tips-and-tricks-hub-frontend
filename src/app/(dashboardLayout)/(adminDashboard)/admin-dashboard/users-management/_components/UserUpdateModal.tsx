"use client";
import { useUpdateUser } from "@/hooks/user.hook";
import { IUser } from "@/types/IUser";
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
import { FilePenLine } from "lucide-react";
import { useState } from "react";
// Example roles and statuses
const roles = ["ADMIN", "USER"];
const statuses = ["ACTIVE", "BLOCKED"];

export default function UserUpdateModal({ user }: { user: IUser }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [role, setRole] = useState(user?.role);
  const [status, setStatus] = useState(user?.status);
  const { mutate: handleUserUpdate } = useUpdateUser();
  const handleSave = () => {
    // Call the onUpdate function to save the changes (e.g., call an API)
    const userData={
        role,
        status,
      };
    
    handleUserUpdate({userId:user._id, userData });
      onOpenChange(); // Close modal after saving
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-transparent">
        <Tooltip color="primary" content="Edit user">
          <FilePenLine className=" text-primary" />
        </Tooltip>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update User Role & Status
              </ModalHeader>
              <ModalBody>
                {/* Role Selection */}
                <label htmlFor="Role">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="p-3 border "
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <label htmlFor="Status">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="p-3 border "
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSave}>
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
