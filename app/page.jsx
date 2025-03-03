'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import i18n from '@/lib/i18n';
import { I18nextProvider } from 'react-i18next';

export default function Home() {
	return (
		<I18nextProvider i18n={i18n}>
			<main className="px-4">
				<Header />
				<Hero />
			</main>
		</I18nextProvider>
	);
}
