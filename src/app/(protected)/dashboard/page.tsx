import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { SectionCards } from '@/components/section-cards';
import { auth } from '@/lib/auth'; // ************************* 추가
import WelcomeStatement from '@/components/dashboard/Welcome'; // ************************* 추가
import { headers } from 'next/headers'; // ************************* next.js 헤더
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    // ************************* better-auth의 getSession 함수를 사용
    const session = await auth.api.getSession({
        headers: await headers(), //  next.js 헤더에서 세션 정보 가져오기
    });
    // ************************* 사용자 타입 선언
    const navUser = {
        name: session?.user.name || '',
        email: session?.user.email || '',
        avatar: session?.user.image || '',
        role: session?.user.role || '',
    };

    // ************************* 세션이 없는 사용자라면....
    if (!navUser) {
        redirect('/login'); //  로그인 페이지로 이동
    }

    return (
        // 스타일에서 @container/main 제거
        <div className='flex flex-1 flex-col gap-2'>
            {/* ********************** WelcomeStatement 컴포넌트로 세션 정보 전달 */}
            <div className='px-6 py-5'>
                <WelcomeStatement user={navUser} />
            </div>
            <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
                <SectionCards />
                <div className='px-4 lg:px-6'>
                    <ChartAreaInteractive />
                </div>
            </div>
        </div>
    );
}
