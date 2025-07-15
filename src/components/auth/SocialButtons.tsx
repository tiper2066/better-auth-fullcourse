import { Icons } from '../common/icons';
import { Button } from '../ui/button';
import { signInWithSocial } from '@/lib/auth-client';

const SocialButtons = () => {
    /*
    // Google 로그인 버튼 클릭 핸들러
    const handleGoogleSignIn = async () => {
        try {
            await signInWithSocial('google');
            // 성공 시 추가적인 리다이렉트나 UI 업데이트 로직은 필요에 따라 추가
        } catch (error) {
            console.error('Google 로그인 실패:', error);
            // 에러 처리 (예: 사용자에게 알림 표시)
        }
    };
    // GitHub 로그인 버튼 클릭 핸들러
    const handleGitHubSignIn = async () => {
        try {
            await signInWithSocial('github');
            // 성공 시 추가적인 리다이렉트나 UI 업데이트 로직은 필요에 따라 추가
        } catch (error) {
            console.error('GitHub 로그인 실패:', error);
            // 에러 처리 (예: 사용자에게 알림 표시)
        }
    };
    */
    // 통합된 소셜 로그인 핸들러
    const handleSocialSignIn = async (provider: 'google' | 'github') => {
        try {
            await signInWithSocial(provider);
            // 성공 시 추가적인 리다이렉트나 UI 업데이트 로직은 필요에 따라 추가
        } catch (error) {
            console.error(`${provider} 로그인 실패:`, error);
            // 에러 처리 (예: 사용자에게 알림 표시)
        }
    };

    return (
        <div className='mt-6 grid grid-cols-2 gap-3'>
            <Button
                type='button'
                variant='outline'
                onClick={() => handleSocialSignIn('google')}
            >
                <Icons.google />
                <span>Google</span>
            </Button>
            <Button
                type='button'
                variant='outline'
                onClick={() => handleSocialSignIn('github')}
            >
                <Icons.gitHub />
                <span>Github</span>
            </Button>
        </div>
    );
};
export default SocialButtons;
