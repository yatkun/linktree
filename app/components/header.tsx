"use client";

//components header

import * as React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ButtonMode from "./button-mode";
import { Separator } from "@/components/ui/separator";


export function Header() {
  

  return (
    <>
      {/* <div className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
        </div>
        <div className="flex items-center gap-2">
          <ButtonMode />
        </div>
      </div> */}

      <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
           
          </div>
          <div className="ml-auto px-3">
     
           <ButtonMode />
          </div>
        </header>
    </>
  );
}
