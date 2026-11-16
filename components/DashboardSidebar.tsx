
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  FileText,
  Bookmark,
  CalendarClock,
  UserRound,
  Settings,
  PlusCircle,
  BriefcaseBusiness,
  Users,
  Building2,
  ClipboardList,
  Wallet,
  LogOut,
  type LucideIcon,
} from "lucide-react";

import logo from "@/app/Images/logo.png";
import { useSession, signOut } from "@/lib/auth-client"; import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";


type Role = "seeker" | "recruiter" | "admin";

type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

const NAV_CONFIG: Record<Role, { label: string; items: NavItem[] }[]> = {
  seeker: [
    {
      label: "Overview",
      items: [
        { title: "Dashboard", href: "/dashboard/seeker", icon: LayoutDashboard },
      ],
    },
    {
      label: "Find Work",
      items: [
        { title: "Browse Jobs", href: "/dashboard/seeker/jobs", icon: Search },
        { title: "Saved Jobs", href: "/dashboard/seeker/saved", icon: Bookmark },
        { title: "My Applications", href: "/dashboard/seeker/applications", icon: FileText },
        { title: "Interviews", href: "/dashboard/seeker/interviews", icon: CalendarClock },
      ],
    },
    {
      label: "Account",
      items: [
        { title: "My Profile", href: "/dashboard/seeker/profile", icon: UserRound },
        { title: "Settings", href: "/dashboard/seeker/settings", icon: Settings },
      ],
    },
  ],

  recruiter: [
    {
      label: "Overview",
      items: [
        { title: "Dashboard", href: "/dashboard/recruiter", icon: LayoutDashboard },
      ],
    },
    {
      label: "Manage",
      items: [
        { title: "Post a Job", href: "/dashboard/recruiter/create-job", icon: PlusCircle },
        { title: "Manage Jobs", href: "/dashboard/recruiter/manage-jobs", icon: BriefcaseBusiness },
        { title: "Applicants", href: "/dashboard/recruiter/applicants", icon: Users },
        { title: "Interviews", href: "/dashboard/recruiter/interviews", icon: CalendarClock },
      ],
    },
    {
      label: "Company",
      items: [
        { title: "Company Profile", href: "/dashboard/recruiter/company", icon: Building2 },
        { title: "Settings", href: "/dashboard/recruiter/settings", icon: Settings },
      ],
    },
  ],

  admin: [
    {
      label: "Overview",
      items: [
        { title: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
      ],
    },
    {
      label: "Platform",
      items: [
        { title: "Users", href: "/dashboard/admin/users", icon: Users },
        { title: "Companies", href: "/dashboard/admin/companies", icon: Building2 },
        { title: "Jobs", href: "/dashboard/admin/jobs", icon: ClipboardList },
        { title: "Payments", href: "/dashboard/admin/Payments", icon: Wallet },
      ],
    },
    {
      label: "System",
      items: [
        { title: "Settings", href: "/dashboard/admin/settings", icon: Settings },
      ],
    },
  ],
};

const ROLE_BADGE: Record<Role, string> = {
  seeker: "Job Seeker",
  recruiter: "Recruiter",
  admin: "Administrator",
};

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const role: Role = pathname.includes("/recruiter")
    ? "recruiter"
    : pathname.includes("/admin")
      ? "admin"
      : "seeker";

  const groups = NAV_CONFIG[role];
  const displayName = user?.name || "Guest";
  const displayEmail = user?.email || "Not signed in";

  const isActivePath = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const router = useRouter();

  const userInitials = displayName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 1)
    .join("")
    .toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  }
  

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Link href="/">
            <Image
              src={logo}
              alt="Hireloop"
              className="h-7 w-auto group-data-[collapsible=icon]:hidden"
            />
          </Link>

          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-300 group-data-[collapsible=icon]:hidden">
            {ROLE_BADGE[role]}
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActivePath(item.href)}
                      tooltip={item.title}
                      className="data-active:bg-[#6e56f8]/20 data-active:text-[#a89bff]"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {isPending ? (
              <div className="flex items-center gap-2 px-2 py-1.5">
                <Skeleton className="size-8 rounded-full" />
                <div className="space-y-1.5 group-data-[collapsible=icon]:hidden">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2.5 w-32" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 group-data-[collapsible=icon]:justify-center">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#6e56f8] text-xs font-semibold text-white">
                  {userInitials}
                </span>

                <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                  <p className="truncate text-sm font-medium">{displayName}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {displayEmail}
                  </p>
                </div>
              </div>
            )}
          </SidebarMenuItem>

          <SidebarMenuItem>
            {user ? (
              <SidebarMenuButton
                onClick={handleSignOut}
                tooltip="Sign out"
                className="text-red-600"
              >
                <LogOut />
                <span>Sign Out</span>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton render={<Link href="/sign-in" />} tooltip="Sign in">
                <UserRound />
                <span>Sign in</span>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export { DashboardSidebar };
