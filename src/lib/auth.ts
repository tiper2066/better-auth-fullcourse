import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import db from '../../prisma/db';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: 'postgresql', // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        autoSignIn: true, // SignUp (회원가입 후 자동 로그인기능)
    },
    account: {
        // 하나의 계정으로 여러 인증방법 연결을 허용함(
        accountLinking: {
            enabled: true, // 이메일 & 비번인증, 구글인증 등 모두 사용가능
        },
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            // ********************************************************************** 추가
            mapProfileToUser: (profile) => {
                return {
                    firstName: profile.name.split(' ')[0],
                    lastName: profile.name.split(' ')[1],
                };
            },
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // ********************************************************************** 추가
            mapProfileToUser: (profile) => {
                return {
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                };
            },
        },
    },
    // *************************************************** user 테이블에 필드를 추가한다.
    user: {
        additionalFields: {
            role: {
                type: 'string',
                required: false,
                defaultValue: 'USER', // schema 에 설정한 role 이름
                input: false, // 사용자가 입력하도록 허용안함
            },
            firstName: {
                type: 'string',
                required: true, // 필수 입력
            },
            lastName: {
                type: 'string',
                required: true, // 필수 입력
            },
        },
    },
    plugins: [nextCookies()],
});
