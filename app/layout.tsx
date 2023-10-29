import './globals.css';
import type { Metadata } from 'next';
import { Petrona, Creepster } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const petrona = Petrona({ subsets: ['latin'] });

const creepster = Creepster({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-creepster',
    weight: '400',
    fallback: ['cursive'],
});

export const metadata: Metadata = {
    title: 'Monster Movie Mate',
    description: 'Horror movie advisor',
    openGraph: {
        images: 'https://monster-movie-mate.vercel.app/og.png',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${petrona.className} ${creepster.variable}`}>
                <div className="grid grid-rows-[min-content] md:h-screen">
                    {children}
                    <Analytics />
                </div>
            </body>
        </html>
    );
}
