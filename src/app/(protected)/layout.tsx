import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth'; //  better-auth 설정
import { headers } from 'next/headers'; //  next.js headers 함수

//  async 비동기 함수로 변경
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    //  better-auth의 getSession 함수를 사용해서 header의 세션정보를 가져옴
    const session = await auth.api.getSession({
        headers: await headers(), // 헤더 정보 가져옴
    });
    //  세션에서 user 정보를 가져옴
    const navUser = {
        name: session?.user.name || '',
        email: session?.user.email || '',
        avatar: session?.user.image || '',
    };

    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
            }
        >
            {/*  세션에서 가져온 user 정보를 사이드바에 전달 */}
            <AppSidebar user={navUser} variant='inset' />
            <SidebarInset>
                <SiteHeader />
                <div className='flex flex-1 flex-col'>{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
};
export default DashboardLayout;
