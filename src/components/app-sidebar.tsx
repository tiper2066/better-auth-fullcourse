'use client';

import * as React from 'react';
import {
    IconCamera,
    IconChartBar,
    IconDashboard,
    IconDatabase,
    IconFileAi,
    IconFileDescription,
    IconFileWord,
    IconFolder,
    IconHelp,
    IconInnerShadowTop,
    IconListDetails,
    IconReport,
    IconSearch,
    IconSettings,
    IconUsers,
} from '@tabler/icons-react';

import { NavDocuments } from '@/components/nav-documents';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser, NavUserProps } from '@/components/nav-user'; //  NavUserProps 추가
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        {
            title: 'Dashboard',
            url: '#',
            icon: IconDashboard,
        },
        {
            title: 'Lifecycle',
            url: '#',
            icon: IconListDetails,
        },
        {
            title: 'Analytics',
            url: '#',
            icon: IconChartBar,
        },
        {
            title: 'Projects',
            url: '#',
            icon: IconFolder,
        },
        {
            title: 'Team',
            url: '#',
            icon: IconUsers,
        },
    ],
    navClouds: [
        {
            title: 'Capture',
            icon: IconCamera,
            isActive: true,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
        {
            title: 'Proposal',
            icon: IconFileDescription,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
        {
            title: 'Prompts',
            icon: IconFileAi,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: 'Settings',
            url: '#',
            icon: IconSettings,
        },
        {
            title: 'Get Help',
            url: '#',
            icon: IconHelp,
        },
        {
            title: 'Search',
            url: '#',
            icon: IconSearch,
        },
    ],
    documents: [
        {
            name: 'Data Library',
            url: '#',
            icon: IconDatabase,
        },
        {
            name: 'Reports',
            url: '#',
            icon: IconReport,
        },
        {
            name: 'Word Assistant',
            url: '#',
            icon: IconFileWord,
        },
    ],
};

//   user 정보를 props로 전달받음
export function AppSidebar({
    user,
    ...props
}: React.ComponentProps<typeof Sidebar> & { user: NavUserProps }) {
    return (
        <Sidebar collapsible='offcanvas' {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className='data-[slot=sidebar-menu-button]:!p-1.5'
                        >
                            <a href='#'>
                                <IconInnerShadowTop className='!size-5' />
                                <span className='text-base font-semibold'>
                                    Acme Inc.
                                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavDocuments items={data.documents} />
                <NavSecondary items={data.navSecondary} className='mt-auto' />
            </SidebarContent>
            <SidebarFooter>
                {/*  아바타 게정 메뉴에 user 정보를 전달 */}
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
