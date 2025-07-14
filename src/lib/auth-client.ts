import { createAuthClient } from 'better-auth/react';

export const { signIn, signUp, useSession } = createAuthClient({
    // baseURL: 'http://localhost:3000',
    // baseURL 은 필요없다. 실제로는 .env 에 설정한 BETTER_AUTH_URL 사용할 것이다.
});
