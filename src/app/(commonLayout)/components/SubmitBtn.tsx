"use client";
import React from "react";
import { Button, Spinner } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

const SubmitBtn = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      size="lg"
      radius="full"
      type="submit"
      disabled={pending}
      variant="bordered"
      color="primary"
    >
      {pending ? <Spinner /> : text}
    </Button>
  );
};

export default SubmitBtn;
