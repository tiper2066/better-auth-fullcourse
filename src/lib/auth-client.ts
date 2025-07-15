import { createAuthClient } from 'better-auth/react';

// Better-Auth 클라이언트 인증 함수
export const { signIn, signUp, signOut, useSession } = createAuthClient({
    // baseURL: 'http://localhost:3000',
    // baseURL 은 필요없다. 실제로는 .env 에 설정한 BETTER_AUTH_URL 사용할 것이다.
});

// ************************* SNS(google, github) 로그인 함수
export const signInWithSocial = async (provider: 'google' | 'github') => {
    // better-auth의 signIn.social 함수를 사용
    await signIn.social({
        provider: provider, // 한개면 'github'값을 줌
    });
};
