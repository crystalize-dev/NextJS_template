'use client';
import { signOut, useSession } from 'next-auth/react';
import Button from './components/UI/Button';

export default function Home() {
    console.log(useSession());
    return (
        <main className="flex h-full w-full flex-col items-center justify-center gap-4 bg-white/20">
            <p>Hello page!</p>
            <Button type="button" variant="colored" onClick={() => signOut()}>
                sign out
            </Button>
        </main>
    );
}
