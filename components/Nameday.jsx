'use client';

import i18n from '@/lib/i18n';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Nameday() {
	const [namedayData, setNamedayData] = useState(null);
	const { t } = useTranslation();

	useEffect(() => {
		const fetchNamedayData = async () => {
			try {
				const namedayResponse = await fetch('https://svatkyapi.cz/api/day');
				if (!namedayResponse.ok) {
					throw new Error(`Error: ${namedayResponse.status}`);
				}
				const data = await namedayResponse.json();
				setNamedayData(data);
			} catch (error) {
				console.error('Error fetching nameday data:', error);
			}
		};

		fetchNamedayData();
	}, []);

	const getDateInfo = () => {
		const date = new Date();
		const locale = getLocale(i18n.language);
		const dayOfWeek = date.toLocaleString(locale, {
			weekday: 'long',
		});
		const dayNumber = date.getDate();
		const month = date.toLocaleString(locale, {
			month: 'long',
		});
		const year = date.toLocaleString(locale, {
			year: 'numeric',
		});
		return { dayOfWeek, dayNumber, month, year };
	};

	const getLocale = (lang) => {
		switch (lang) {
			case 'cz':
				return 'cs-CZ';
			case 'en':
				return 'en-US';
		}
	};

	return (
		<div className="flex flex-col text-sm text-center">
			<div>
				{getDateInfo().dayOfWeek} {getDateInfo().dayNumber}. {getDateInfo().month}{' '}
				{getDateInfo().year}
			</div>
			<div>
				<span>{t('nameday')}:&nbsp;</span>
				{namedayData && <span className="font-semibold">{namedayData.name}</span>}
			</div>
		</div>
	);
}
