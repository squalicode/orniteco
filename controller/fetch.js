/*
XENO-CANTO API DOCS
https://xeno-canto.org/explore/api
https://xeno-canto.org/help/search
*/

export { fetchRecordings, fetchLevelInfo, fetchThemeInfo, fetchThemesInfo, fetchAvailableLanguages, fetchTextInfo };

/**
 * Asynchronously fetches recording(s) data for a bird and sends it into the provided function.
 * @param {string} bird Bird to fetch recording(s) data for.
 * @param {string} minQuality Minimum quality of recording (quality levels go A > E).
 * @param {int} minDuration Minimum duration of recording in seconds.
 * @param {int} maxDuration Maximum duration of recording in seconds.
 * @param {function} callback Function to receive the fetched data as a parameter.
 */
async function fetchRecordings(bird = 'Inventus forfetchus', minQuality = 'c', minDuration = 5, maxDuration = 10, callback) {
    //q_gt:c = Quality_GreaterThan:C (recording quality levels go A > E)
    const endpoint = `https://xeno-canto.org/api/2/recordings?query=${bird.replace(/ /g, '+')}`
        + `+q_gt:${minQuality}`
        + `+len:${minDuration}-${maxDuration}`
        // Momentarily commented out due to what seems to be API problems.
        // Retrieved recordingss might be of noises (flight...) instead of birdsong.
        //+ `+type:song`;
    
    let response = await fetch(endpoint);

    if(response.ok) {
        let data = await response.json();
        callback(data.recordings);
    } else {
        informFetchError(response, this);
    }
}

/**
 * Asynchronously fetches level info from levels.json file.
 * @param {function} callback Function to receive the fetched data as a parameter.
 */
async function fetchLevelInfo(callback) {
    let response = await fetch('./data/levels.json');

    if(response.ok) {
        let data = await response.json();
        callback(data);
    } else {
        informFetchError(response, fetchLevelInfo);
    }
}

/**
 * Asynchronously fetches a given theme info from themes.json file and
 * passes the theme object to the callback function.
 * @param {string} theme Theme to fetch data for.
 * @param {function} callback Function to receive the fetched data as a parameter.
 */
 async function fetchThemeInfo(theme, callback) {
    let response = await fetch('./data/themes.json');

    if(response.ok) {
        let data = await response.json();
        callback(data.filter(t => t.id === theme)[0]);
    } else {
        informFetchError(response, fetchThemeInfo);
    }
}

/**
 * Asynchronously fetches the entire theme info array from themes.json file
 * and passes it to the callback function.
 * @param {function} callback Function to receive the fetched data as a parameter.
 */
 async function fetchThemesInfo(callback) {
    let response = await fetch('./data/themes.json');

    if(response.ok) {
        let data = await response.json();
        callback(data);
    } else {
        informFetchError(response, fetchThemesInfo);
    }
}

/**
 * Asynchronously fetches the available languages object from texts.json file
 * and passes it to the callback function.
 * @param {function} callback Function to receive the fetched data as a parameter.
 */
 async function fetchAvailableLanguages(callback) {
    let response = await fetch('./data/texts.json');

    if(response.ok) {
        let data = await response.json();
        callback(data[0].languages);
    } else {
        informFetchError(response, fetchAvailableLanguages);
    }
}

/**
 * Asynchronously fetches text info from texts.json file. Returns a texts object for a given screen.
 * @param {string} screen Screen (page) to fetch texts for.
 * @param {function} callback Function to receive the fetched data as a parameter.
 */
 async function fetchTextInfo(screen, callback) {
    let response = await fetch('./data/texts.json');

    if(response.ok) {
        let data = await response.json();
        callback(data[0].screens[screen]);
    } else {
        informFetchError(response, fetchTextInfo);
    }
}

function informFetchError(response, func) {
    console.error(
        `Error: could not fetch at \'${func.name}\'. ` +
        `Reason: ${response.status} (${response.statusText}).`
    );
}