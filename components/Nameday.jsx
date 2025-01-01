"use client";

import React, { useState, useEffect, useTransition } from "react";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useRef } from "react";

export default function Nameday() {
    const [namedayData, setNamedayData] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchNamedayData = async () => {
            const namedayApi = "https://svatkyapi.cz/api/day";
            try {
                const namedayResponse = await fetch(namedayApi);
                if (!namedayResponse.ok) {
                    throw new Error(`Error: ${namedayResponse.status}`);
                }
                const data = await namedayResponse.json();
                setNamedayData(data);
            } catch (error) {
                console.error("Error fetching nameday data:", error);
            }
        };

        fetchNamedayData();
    }, []);

    const getDateInfo = () => {
        const date = new Date();
        const locale = getLocale(i18n.language);
        const dayOfWeek = date.toLocaleString(locale, { weekday: "long" });
        const dayNumber = date.getDate();
        const month = date.toLocaleString(locale, { month: "long" });
        return { dayOfWeek, dayNumber, month }
    };
    
    const getLocale = (lang) => {
        switch (lang) {
          case "cz":
            return "cs-CZ";
          case "en":
            return "en-US";
        }
      };

      const namedayRef = useRef(null);

      useEffect(() => {
        {
          gsap.fromTo(
            namedayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: "power2.in" },
          );
        }
      }, []);

    return (
        <div ref={namedayRef} className="my-6">
            {namedayData && (
                <div className="flex flex-col text-sm text-center">
                    <span>
                        {getDateInfo().dayOfWeek} {getDateInfo().dayNumber}. {getDateInfo().month}
                    </span>
                    <span>{t("nameday")}:&nbsp;<span className="font-semibold">{namedayData.name}</span></span>
                </div>
            )}
        </div>
    );
}
