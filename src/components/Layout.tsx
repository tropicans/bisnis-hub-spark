
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50/30">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Top Header with Sidebar Trigger */}
          <header className="h-16 bg-white border-b border-border flex items-center px-6 shadow-sm">
            <SidebarTrigger className="mr-4" />
            
            <div className="flex-1 flex justify-between items-center">
              <div className="font-poppins text-lg font-semibold text-primary">
                BisnisHub Dashboard
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-sm font-poppins text-muted-foreground">
                  Selamat datang, Admin! 👋
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
