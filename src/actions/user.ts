'use server';

import { RegisterFormValues } from '@/components/auth/SignUp';
import { auth } from '@/lib/auth';

// 회원 등록 서버액션 함수 - form 데이터를 받음
export async function registerUser(data: RegisterFormValues) {
    try {
        console.log('form data: ', data); // 폼에서 전달받은 데이터 출력

        // bette-auth 의 signUpEmail 함수 호출
        await auth.api.signUpEmail({
            body: {
                email: data.email, // 이메일
                password: data.password, // 비번
                name: `${data.firstName} ${data.lastName}`, // 이름 + 성
                firstName: data.firstName, // 이름
                lastName: data.lastName, // 성
            },
        });

        return {
            success: true,
            data: data,
            error: null,
        };
    } catch (error) {
        console.log('error: ', error); // 에러 출력
        return {
            success: false,
            data: null,
            error: 'Something went wrong',
        };
    }
}
