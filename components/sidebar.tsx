"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Home, Settings, Users, Inbox, BarChart3, FileText, LayoutGrid, Atom, HardDrive } from "lucide-react"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { ProfileMenu } from "@/components/profile-menu"
import { SidebarProvider, SidebarRail } from "@/components/ui/sidebar"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "#" },
    { icon: Users, label: "Users", href: "#" },
    { icon: Inbox, label: "Inbox", href: "#" },
    { label: "separator"},
    { icon: FileText, label: "Documents", href: "#" },
    { icon: LayoutGrid, label: "menu", href: "#" },
    { icon: Atom, label: "menu", href: "#" },
    { icon: HardDrive, label: "menu", href: "#" },
  ]

  return (
    <SidebarProvider>
      <aside
        className={`transition-all duration-300 ease-in-out bg-sidebar border-r border-sidebar-border flex flex-col fixed h-full ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
      {/* Header */}

      {/* <div className={'flex items-center justify-center p-4  border-sidebar-border'+ (isCollapsed ? 'flex-col' : 'flex-row-reverse ')}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-center"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div> */}
      <div className="absolute h-full w-[5px] cursor-w-resize right-[-2.5px]"   onClick={() => setIsCollapsed(!isCollapsed)}></div>
      <div className={'flex items-center justify-center p-4  border-sidebar-border gap-5 '+ (isCollapsed ? 'flex-col' : 'flex-row-reverse ')}>
       
        <div className="flex items-center">
          <Image
        src="/logo.png"
        alt="Logo"
        width={24}
        height={24}
        priority
        unoptimized
        style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto gap-2.5">
        {menuItems.map((item) =>
          item.label !== "separator" ? (
            (() => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`border border-[transparent] hover:border-[#A8D9D9] flex items-center gap-3 px-4 py-3 rounded-[46px] transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground ${
                    isCollapsed ? "justify-center" : ""
                  }`}
                >
                  {Icon && <Icon size={20} className="shrink-0" />}
                  {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </a>
              );
            })()
          ) : (
            <hr key="separator" className="border-t border-sidebar-border border-dashed border-2 my-4" />
          )
        )}
      </nav>

        {/* Profile Menu */}
        <div className="p-4 border-t border-sidebar-border">
          <ProfileMenu isCollapsed={isCollapsed} />
        </div>
      </aside>

      
        
    </SidebarProvider>
  )
}
