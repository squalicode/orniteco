import { getLanguage } from './settings.js'
import { fetchTextInfo } from './fetch.js';

// To translate
// const body = document.querySelector('.index-nav a:nth-of-type(1)');

const language = getLanguage();

function translateTexts() {
    fetchTextInfo('about', (texts) => {
        document.documentElement.lang = language;

        document.body.innerHTML = texts.body[language];
    });
}

translateTexts();