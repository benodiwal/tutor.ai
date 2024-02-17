"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation";

export default function Home() {
  
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <div className="flex items-center justify-between h-[80px] bg-black/30 shadow-xl p-4 px-8">
      <p className="font-bold text-[30px]">
        EasyFlow
      </p>
      {
        isAuthenticated ? (
          <Button 
          onClick={() => router.push("/overview")}
          className="text-white">
            DashBoard
          </Button>
        ) : (
          <div className="">
            <Button 
            onClick={() => router.push("/login")}
            className="text-white">
              Sign In
            </Button>
          </div>
        )
      }
    </div>
    )
}