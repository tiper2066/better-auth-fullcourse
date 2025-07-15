'use client';

import { useEffect, useState } from 'react';
import { NavUserProps } from '../nav-user'; // NavUserProps 프롭스 타입

const WelcomeStatement = ({ user }: { user: NavUserProps }) => {
    const [currentTime, setCurrentTime] = useState(''); // 현재 시간 상태변수
    const [greeting, setGreeting] = useState(''); // 인사말 상태변수

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours();

            // 하루에 한번 인사 설정
            if (hours < 12) {
                setGreeting('Good Morning'); // 오전인사
            } else if (hours < 17) {
                setGreeting('Good Afternoon'); // 오후 인사
            } else {
                setGreeting('Good Evening');
            }
            // 타입을 국제시간포맷옵션으로 설정
            const options: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            setCurrentTime(now.toLocaleDateString('en-US', options));
        };

        updateTime();
        const interval = setInterval(updateTime, 60000); // 1분마다 갱신

        return () => clearInterval(interval); // 언마운트 시 클리어
    }, []);

    // 만일 세션이 없는 사용자라면...
    if (!user) {
        return (
            // blue-50에서 우측방향으로 indigo-50 으로 그라디언트 배경색
            <div className='bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm'>
                <div className='animate-pulse'>
                    <div className='h-6 bg-gray-200 rounded w-1/3 mb-2'></div>
                    <div className='h-4 bg-gray-200 rounded w-1/4'></div>
                </div>
            </div>
        );
    }
    // 세션이 있는 로그인 사용자라면..
    return (
        <div className='bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm border border-blue-100'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-800 mb-1'>
                        {greeting}, {user.name}!
                    </h1>
                    <p className='text-gray-600 flex items-center gap-2'>
                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                            {user.role}
                        </span>
                        <span className='text-sm'>{currentTime}</span>
                    </p>
                    <p className='text-gray-700 mt-2'>
                        Welcome to your dashboard. Ready to make today
                        productive?
                    </p>
                </div>
                <div className='hidden md:block'>
                    <div className='w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white front-bold text-lg'>
                        {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join(' ')
                            .toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WelcomeStatement;
