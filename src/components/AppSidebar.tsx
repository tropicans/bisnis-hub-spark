import { useState } from "react"
import { Home, ShoppingCart, Package, Calculator, Settings, Menu, X } from "lucide-react" // <-- Tambahkan Settings di sini
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Sales", url: "/sales", icon: ShoppingCart },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Accounting", url: "/accounting", icon: Calculator },
  { title: "Pengaturan", url: "/settings", icon: Settings }, // <-- Tambahkan item ini
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/"
    return currentPath.startsWith(path)
  }

  const getNavClassName = (path: string) => {
    const active = isActive(path)
    return `w-full flex items-center transition-all duration-200 ${
      active
        ? "bg-primary text-primary-foreground shadow-md"
        : "text-foreground hover:bg-accent/10 hover:text-accent"
    }`
  }

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r bg-white shadow-sm transition-all duration-300`}>
      <SidebarContent className="py-6">
        {/* Logo Section */}
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BH</span>
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <h1 className="font-poppins font-bold text-lg text-primary">BisnisHub</h1>
                <p className="text-xs text-muted-foreground">AIO Bisnis Solution</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={`px-6 font-poppins font-medium text-muted-foreground ${collapsed ? "hidden" : ""}`}>
            Main Menu
          </SidebarGroupLabel>

          <SidebarGroupContent className="px-3 mt-4">
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className={`${collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"} flex-shrink-0`} />
                      {!collapsed && (
                        <span className="font-poppins font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        {!collapsed && (
          <div className="mt-auto px-6 py-4 border-t">
            <div className="text-xs text-muted-foreground text-center font-poppins">
              Dibuat oleh Yudhi © 2025
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}