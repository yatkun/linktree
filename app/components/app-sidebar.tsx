"use client";

import * as React from "react"
import {
  AudioWaveform,
  Bot,
  Command,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react"

import { NavDefault } from "./nav-default";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  default: [
    { title: "Dashboard",
      url: "/",
      icon: SquareTerminal,
      isActive: false,
    },
    {
      title: "Daftar Link",
      url: "/link",
      icon: Bot,
      isActive: false,
    },
  ],
  teams: [
    {
      name: "Linktree STAT",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
      
        <NavDefault items={data.default} />
       
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
