'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { customAxios } from '@/axios/customAxios';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { UserType } from '@/app/types/UserType';
import Input from '@/app/components/UI/Input';
import Button from '@/app/components/UI/Button';
import logo_image from '@/public/logo.png';
import LoginPageWrapper from '@/app/components/wrappers/LoginPageWrapper';

const ForgotPage = ({ params }: any) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [fetching, setFetching] = useState(false);
    const router = useRouter();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const password = formData.get('passwordReset');
        const passwordRepeat = formData.get('passwordResetRepeat');

        if (!password || !passwordRepeat) {
            toast.error('Fill in all required fields!');
            return;
        }

        if (password !== passwordRepeat) {
            toast.error('Passwords do not match!');
            return;
        }

        if (!user) {
            toast.error('User not found!');
            router.push('/login');
            return;
        }

        try {
            await customAxios('POST', 'reset-password', setFetching, {
                data: {
                    password,
                    user
                },
                actionOnSuccess: () => {
                    router.push('/login');
                },
                loadingString: 'Resetting password...',
                successString: 'Success! Now you can log in!'
            });
        } catch (error) {
            toast.error('Failed to reset password. Please try again later.');
        }
    };

    useEffect(() => {
        customAxios('POST', 'verify-token', setFetching, {
            data: {
                token: params.token
            },
            loadingString: 'Checking token...',
            successString: 'All ok! You can reset your password',
            actionOnFailure: () => {
                router.push('/login');
            },
            actionOnSuccess: (data) => {
                setUser(data as UserType);
            }
        });
    }, [params.token, router]);

    return (
        <LoginPageWrapper>
            <form
                onSubmit={submit}
                className={`flex h-full w-full flex-col items-center justify-center gap-4 p-12`}
            >
                <div className="relative size-28">
                    <Image
                        alt="logo"
                        src={logo_image}
                        priority
                        width={500}
                        height={500}
                        className="h-full w-full"
                    />
                </div>

                <h1 className="mb-4 text-4xl font-bold text-primary">
                    Reset password
                </h1>

                <Input
                    type="password"
                    required
                    name="passwordReset"
                    placeholder="New password"
                    disabled={fetching}
                    placeholderType="classic"
                    passwordSetup
                />

                <Input
                    type="password"
                    name="passwordResetRepeat"
                    required
                    disabled={fetching}
                    placeholder="Repeat new password"
                    placeholderType="classic"
                />

                <Button
                    type="submit"
                    layoutId="submitButton"
                    variant="colored"
                    className="mt-8 w-full lg:mt-0"
                    disabled={fetching}
                >
                    Reset
                </Button>
            </form>
        </LoginPageWrapper>
    );
};

export default ForgotPage;
