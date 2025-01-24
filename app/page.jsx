'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default function Home() {
	return (
		<I18nextProvider i18n={i18n}>
			<main className="min-h-screen px-4">
				<Header />
				<Hero />
			</main>
		</I18nextProvider>
	);
}
