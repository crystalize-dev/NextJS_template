'use client';
import React, { FormEvent, useState } from 'react';
import Image from 'next/image';
import logo_image from '@/public/logo.png';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { customAxios } from '@/axios/customAxios';
import LoginPageWrapper from '../components/wrappers/LoginPageWrapper';
import { motion } from 'framer-motion';

const RegisterPage = () => {
    const [fetching, setFetching] = useState(false);
    const router = useRouter();

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const passwordRepeat = formData.get('passwordRepeat') as String;

        if (!email || !password || !passwordRepeat) {
            toast.error('Fill in all required fields!');
            return;
        }

        if (password !== passwordRepeat) {
            toast.error('Passwords do not match!');
            return;
        }

        setFetching(true);

        try {
            await customAxios('POST', 'register', setFetching, {
                data: { email, password },
                actionOnSuccess: () => {
                    router.push('login');
                },
                loadingString: 'Registering...',
                successString: 'Success! Now you can log in!'
            });
        } catch (error) {
            toast.error('Error occurred!');
        }
    };

    return (
        <LoginPageWrapper>
            <form
                className="flex h-full w-full flex-col items-center justify-center gap-4 p-12"
                onSubmit={submit}
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

                <motion.h1
                    layoutId="login_header"
                    className="mb-4 text-4xl font-bold text-primary"
                >
                    Sign Up
                </motion.h1>

                <Input
                    layoutId="emailInput"
                    type="email"
                    name="email"
                    disabled={fetching}
                    placeholder="E-mail"
                    placeholderType="classic"
                    required
                />

                <Input
                    layoutId="passwordInput"
                    type="password"
                    name="password"
                    disabled={fetching}
                    placeholderType="classic"
                    placeholder="Password"
                    passwordSetup
                    required
                />

                <Input
                    type="password"
                    name="passwordRepeat"
                    disabled={fetching}
                    placeholderType="classic"
                    placeholder="Repeat password"
                    required
                />

                <Button
                    type="submit"
                    variant="colored"
                    className="mt-4 w-full"
                    disabled={fetching}
                >
                    Submit
                </Button>

                <Link
                    href={'/login'}
                    className="flex gap-2 text-sm text-zinc-600 dark:text-white/70"
                >
                    Already have an account?
                    <span className="hover:text-primary hover:underline focus:underline">
                        Sign in
                    </span>
                </Link>
            </form>
        </LoginPageWrapper>
    );
};

export default RegisterPage;
