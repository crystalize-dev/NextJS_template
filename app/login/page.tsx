'use client';
import React, { FormEvent, useState } from 'react';
import Image from 'next/image';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import logo_image from '@/public/logo.png';
import LoginPageWrapper from '../components/wrappers/LoginPageWrapper';
import { motion } from 'framer-motion';

const Login = () => {
    const [fetching, setFetching] = useState(false);
    const router = useRouter();

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) {
            toast.error('Fill in all required fields!');
            return;
        }

        setFetching(true);
        const toastId = toast.loading('Entering...');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            if (result && result.error) {
                toast.error(result.error);
            } else {
                toast.success('Success!');
                router.push('/');
            }

            setFetching(false);
        } catch (error) {
            toast.error('Error occurred!');
        } finally {
            toast.dismiss(toastId);
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
                    Sign In
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
                    forgotPassword
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
                    href={'/register'}
                    className="flex gap-2 text-sm text-zinc-600 dark:text-white/70"
                >
                    Don`t have an account yet?
                    <span className="hover:text-primary hover:underline focus:underline">
                        Sign up
                    </span>
                </Link>
            </form>
        </LoginPageWrapper>
    );
};

export default Login;
