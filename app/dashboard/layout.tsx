import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { DashboardSidebar } from "@/components/DashboardSidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="dark min-h-svh bg-background text-foreground">
            <SidebarProvider defaultOpen={true}>
                <DashboardSidebar />

                <SidebarInset>
                    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                    </header>

                    <div className="flex flex-1 flex-col p-4 md:p-6">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}

export default DashboardLayout
