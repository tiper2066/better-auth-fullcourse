'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AppLogoIcon } from '../common/app-logo-icon';
import { registerUser } from '@/actions/users'; //  registerUser 서버액션 함수
import SocialButtons from './SocialButtons';

// Define schema for form validation with Zod
const registerSchema = z.object({
    firstName: z.string().min(2, 'Firstname must be at least 2 characters'),
    lastName: z.string().min(2, 'Lastname must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export default function SignUp() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    // Initialize form with React Hook Form and Zod validation
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
    });

    // Handle form submission
    async function onSubmit(data: RegisterFormValues) {
        console.log(data);
        setIsSubmitting(true);

        //  주석을 풀고 수정함
        try {
            const result = await registerUser(data);

            if (result.success) {
                toast.success('Success!', {
                    description: '사용자의 계정이 성공적으로 생성되었습니다.',
                });
                // 회원가입에 성공하면 dashboard 페이지로 이동
                router.push('/dashboard');
            } else {
                // ******************************************** 에러 처리 추가
                if (result.status === 'UNPROCESSABLE_ENTITY') {
                    toast.error('Email Exists', {
                        description: result.error,
                    });
                } else {
                    toast.error('Error', {
                        description: result.error,
                    });
                }
                // ******************************************** 에러 처리
            }
        } catch (error) {
            toast.error('Error', {
                description: '서버에 문제가 발생했습니다. 다시 시도해 보세요.',
            });
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className='flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent'>
            <div className='bg-card m-auto h-fit w-full max-w-md rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]'>
                <div className='p-8 pb-6'>
                    <div>
                        <Link href='/' aria-label='go home'>
                            <AppLogoIcon className='h-10 fill-current text-black sm:h-12' />
                        </Link>
                        <h1 className='text-title mb-1 mt-4 text-xl font-semibold'>
                            Create a Tailark Account
                        </h1>
                        <p className='text-sm'>
                            Welcome! Create an account to get started
                        </p>
                    </div>

                    {/* **************** 소셜 버튼 컴포넌트  */}
                    <SocialButtons />

                    <hr className='my-4 border-dashed' />

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-5'
                        >
                            <div className='grid grid-cols-2 gap-3'>
                                <FormField
                                    control={form.control}
                                    name='firstName'
                                    render={({ field }) => (
                                        <FormItem className='space-y-2'>
                                            <FormLabel>Firstname</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='lastName'
                                    render={({ field }) => (
                                        <FormItem className='space-y-2'>
                                            <FormLabel>Lastname</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type='email' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type='password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type='submit'
                                className='w-full'
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? 'Creating Account...'
                                    : 'Continue'}
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className='bg-muted rounded-(--radius) border p-3'>
                    <p className='text-accent-foreground text-center text-sm'>
                        Have an account?
                        <Button asChild variant='link' className='px-2 ml-3'>
                            <Link href='/login'>Sign In</Link>
                        </Button>
                    </p>
                </div>
            </div>
        </section>
    );
}
