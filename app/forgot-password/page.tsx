'use client';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Icon from '../components/Icon/Icon';
import { customAxios } from '@/axios/customAxios';
import logo_image from '@/public/logo.png';
import LoginPageWrapper from '../components/wrappers/LoginPageWrapper';

const ForgotPage: React.FC = () => {
    const [fetching, setFetching] = useState(false);
    const router = useRouter();

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('resetEmail') as string;

        if (!email) {
            toast.error('Fill in all required fields!');
            return;
        }

        await customAxios('POST', 'forgot-password', setFetching, {
            data: { email },
            loadingString: 'Sending letter...',
            actionOnSuccess: () => {
                router.push('/login');
            },
            successString: 'Check your email!'
        });
    };

    return (
        <LoginPageWrapper>
            <form
                onSubmit={submit}
                className="relative flex h-full w-full flex-col items-center justify-center gap-4 p-12"
            >
                <Icon
                    className="lg:border-light-border lg:dark:border-dark-border absolute left-4 top-4 !size-8 rounded-md border-solid bg-light p-1 lg:-left-12 lg:top-4 lg:border dark:bg-dark dark:text-white"
                    icon="arrowLeft"
                    onClick={() => router.back()}
                />

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
                    Forgot password
                </h1>

                <Input
                    layoutId="emailLogin"
                    type="email"
                    placeholder="Email"
                    disabled={fetching}
                    icon="mail"
                    required
                    name="resetEmail"
                    placeholderType="classic"
                    className="mt-8 lg:mt-0"
                />

                <Button
                    type="submit"
                    layoutId="submitButton"
                    variant="colored"
                    className="w-full"
                    disabled={fetching}
                >
                    Reset
                </Button>
            </form>
        </LoginPageWrapper>
    );
};

export default ForgotPage;
