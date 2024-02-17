"use client";

import React from "react";
import { PlusSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

const OverView = () => {

  const router = useRouter();

  const createSubject = async () => {
    const { data } = await axios.post(
      "http://localhost:5000/workspace",
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    console.log(data.data);

    router.push(`/workspace/${data.data._id}`);
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen w-full">
        <Button
          onClick={() => createSubject()}
          className="w-[500px] h-[100px] flex items-center gap-[20px]"
        >
          <PlusSquareIcon size={60} color="white" />
          <p className="text-white font-bold text-[30px]">Create Subject</p>
        </Button>
      </div>
    </div>
  );
};

export default OverView;