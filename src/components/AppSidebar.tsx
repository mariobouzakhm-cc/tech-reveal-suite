import { useState } from 'react';
import { LayoutDashboard, Server, HeadphonesIcon, Settings, LogOut, User, Users, Building2, UserCog } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";

const navigationItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "RPT Machines", url: "/machines", icon: Server },
  { title: "Customer Support", url: "/support", icon: HeadphonesIcon },
];

const adminNavItems = [
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Businesses", url: "/businesses", icon: Building2 },
  { title: "Users", url: "/users", icon: UserCog },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const { user, role, signOut } = useAuth();
  const [environment, setEnvironment] = useState<'dev' | 'prod'>('dev');

  const showEnvDropdown = role === 'admin' || role === 'dev';
  const showAdminMenu = role === 'admin';

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.substring(0, 2).toUpperCase();
  };

  const getRoleDisplay = () => {
    if (role === 'admin') return 'Admin';
    if (role === 'dev') return 'Developer';
    return 'User';
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <span className="text-lg font-bold">C</span>
          </div>
          {open && (
            <span className="text-lg font-semibold text-sidebar-foreground">
              ClicCash
            </span>
          )}
        </div>

        {showEnvDropdown && open && (
          <div className="px-2 pb-2">
            <Select value={environment} onValueChange={(value: 'dev' | 'prod') => setEnvironment(value)}>
              <SelectTrigger className="h-8 bg-sidebar-accent text-sidebar-accent-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dev">Development</SelectItem>
                <SelectItem value="prod">Production</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : ""
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {showAdminMenu && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : ""
                        }
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/settings">
                <Settings />
                <span>Settings</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <Separator className="my-2" />

        <div className="flex items-center gap-2 px-2 py-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          {open && (
            <div className="flex flex-1 flex-col text-sm">
              <span className="font-medium text-sidebar-foreground truncate">
                {user?.email || 'User'}
              </span>
              <span className="text-xs text-sidebar-foreground/60">{getRoleDisplay()}</span>
            </div>
          )}
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={signOut}
                className="w-full"
              >
                <LogOut />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}