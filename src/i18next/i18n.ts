import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import translationEN from "../locales/en/translation.json";
import translationRU from "../locales/ru/translation.json";
import translationZH from "../locales/zh/translation.json";


const resources = {
    en: {
        translation: translationEN
    },
    ru: {
        translation: translationRU
    },
    zh: {
        translation: translationZH
    }
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: resources,
        fallbackLng: 'en',
        whitelist: ["en","ru", "zh"],
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;
