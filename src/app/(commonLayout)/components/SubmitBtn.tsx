"use client";
import React from "react";
import { Button, Spinner } from "@nextui-org/react";


const SubmitBtn = ({ text,isLoading }: { text: string ,isLoading:boolean}) => {

  return (
    <Button
      size="lg"
      radius="full"
      type="submit"
      disabled={isLoading}
      variant="bordered"
      color="primary"
    >
      {isLoading ? <Spinner /> : text}
    </Button>
  );
};

export default SubmitBtn;
