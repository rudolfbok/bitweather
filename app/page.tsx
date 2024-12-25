"use client"; // Ensures this component is client-side

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FavoritesSlider from "@/components/FavoritesSlider";
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n'; // Import the i18n configuration

export default function Home() {
  return (
    <I18nextProvider i18n={i18n}>
      <main className="bg-gradient-to-b from-default_color_1 to-default_color_2 text-white md:h-screen font-inter md:overflow-hidden">
        <Header />
        <FavoritesSlider />
        <Hero />
      </main>
    </I18nextProvider>
  );
}

