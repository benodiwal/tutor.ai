"use client";

import React, { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Sidebar from "@/components/shared/sidebar/Sidebar";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/shared/navbar/Navbar";

import NotificationsSystem, { atalhoTheme, useNotifications, setUpNotifications, NotificationsProvider } from "reapop";

interface WorkSpaceProps {
  children: React.ReactNode;
}

const WorkSpace: React.FC<WorkSpaceProps> = ({ children }) => {
  
  const { user, setUser } = useAuth();
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const createProject = async () => {
    const res = await axios.post(`http://localhost:5000/workspace/${params.id}/project/`, {
      workspaceId: params.id,
    }, {

  });

    console.log(res.data.projectId);
    router.push(`${params.id}/project/${res.data.projectId}`);
  
  }

  // useEffect(() => {
  //   getWorkspace(params.id);
  // }, [params.id]);


  return (
    // <div>
    //   <Navbar />
    //   <Sidebar id={params?.id} />
    //    <Button 
    //    onClick={createProject}
    //    className="absolute top-[180px] left-[200px]">
    //     Create Project
    //   </Button>     
    // </div>
    <div className="w-screen h-screen">
      <Sidebar>
        <Navbar />
        <div className='h-full bg-white overflow-y-auto custom-scrollbar relative'>
          {children}
        </div>
      </Sidebar>
    </div>
  );
};

export default WorkSpace;