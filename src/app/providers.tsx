'use client'

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

type ProvidersProps = {
    children: React.ReactNode;
}

export function Providers({children}: ProvidersProps) {
    return (
        <SessionProvider>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </SessionProvider>
    )
}