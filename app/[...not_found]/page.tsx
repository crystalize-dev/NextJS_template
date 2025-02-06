'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '../components/UI/Button';
import Image from 'next/image';
import not_found_image from '@/public/404.webp';

const NotFoundPage = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative size-96">
                <Image
                    alt="404"
                    src={not_found_image}
                    width={500}
                    height={500}
                    className="h-full w-full"
                    priority
                />
            </div>
            <h1 className="text-4xl font-bold text-primary dark:text-white">
                Page does not exists!
            </h1>

            <Button
                type="button"
                variant="colored"
                onClick={() => router.back()}
            >
                Go back?
            </Button>
        </div>
    );
};

export default NotFoundPage;
