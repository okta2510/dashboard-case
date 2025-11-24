"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Home, Settings, Users, FileText, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProfileMenu } from "@/components/profile-menu"
import { SidebarProvider, SidebarRail } from "@/components/ui/sidebar"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "#" },
    { icon: Users, label: "Users", href: "#" },
    { icon: FileText, label: "Documents", href: "#" },
    { label: "separator"},
    { icon: BarChart3, label: "Analytics", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ]

  return (
    <SidebarProvider>
      <aside
        className={`transition-all duration-300 ease-in-out bg-sidebar border-r border-sidebar-border flex flex-col fixed h-full ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && <h1 className="text-lg font-bold text-sidebar-foreground">Menu</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto gap-2.5">
        {menuItems.map((item) =>
          item.label !== "separator" ? (
            <a
              key={item.label}
              href={item.href}
              className={`border border-[transparent] hover:border-[#A8D9D9] flex items-center gap-3 px-4 py-3 rounded-[46px] ] transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground ${
          isCollapsed ? "justify-center" : ""
              }`}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </a>
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

      <SidebarRail />
    </SidebarProvider>
  )
}
