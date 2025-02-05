'use client';

import Header from '@/components/Header';
import Compass from '@/components/Compass';
import i18n from '@/lib/i18n';
import { I18nextProvider } from 'react-i18next';

export default function CompassPage() {
	return (
		<I18nextProvider i18n={i18n}>
			<main className="px-4">
				<Header />
				<Compass />
			</main>
		</I18nextProvider>
	);
}
