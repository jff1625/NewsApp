import { NewsApp } from './NewsApp.js';

import './app.css';



//We don't really need to wait for DCL to load the API content, we only
// need to wait for it to start rendering into the html.
//But if we're to wait for DCL before rendering we would be assuming the app
// IS the page, and not an async-loaded component within another page that
// already finished loading.
//It's simpler to do it this way until we know what the futre requirements will be.
window.addEventListener('DOMContentLoaded', () => {
    const articlesUL = document.getElementById('articles'), 
        filterSELECT = document.querySelectorAll('[name=filter-by-source]')[0],
        showMoreANCHOR = document.getElementById('btnShowMore');
    new NewsApp(articlesUL, filterSELECT, showMoreANCHOR).init();
});
