'use server';

//  로그인 폼 컴포넌트에서 받은 폼 데이터
import { LoginFormValues } from '@/components/auth/Login';
import { RegisterFormValues } from '@/components/auth/SignUp';
import { auth } from '@/lib/auth';
import { APIError } from 'better-auth'; // ***************** better-auth APIError

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
        // ******************************************** 에러 처리
        if (error instanceof APIError) {
            console.log(error.message, error.status); // 에러 출력
            if (error.status === 'UNPROCESSABLE_ENTITY') {
                return {
                    success: false,
                    data: null,
                    error: error.message,
                    status: error.status,
                };
            }
        }
    }
}

//  로그인 서버액션 함수 - form 데이터를 받음
export async function loginUser(data: LoginFormValues) {
    try {
        console.log('form data: ', data); // 폼에서 전달받은 데이터 출력

        // bette-auth 의 signUpEmail 함수 호출
        await auth.api.signInEmail({
            body: {
                email: data.email, // 이메일
                password: data.password, // 비번
            },
        });

        return {
            success: true,
            data: data,
            error: null,
        };
    } catch (error) {
        // ******************************************** 에러 처리
        if (error instanceof APIError) {
            console.log(error.message, error.status); // 에러 출력
            if (error.status === 'UNAUTHORIZED') {
                return {
                    success: false,
                    data: null,
                    error: error.message,
                    status: error.status,
                };
            }
        }

        return {
            success: false,
            data: null,
            error: 'Something went wrong',
        };
    }
}
