
let Storage = function () {
    let blocked_sites;
    let blocked_site_callback;
    let init = async function (callback) {
        blocked_site_callback = callback;
        blocked_sites = await getDataFromKey("blocked_sites");
        listenForUpdates();
    },
        listenForUpdates = function () {
            // Updates blocked site list
            chrome.storage.onChanged.addListener(function (changes) {
                for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
                    if (key === "blocked_sites") {
                        blocked_sites = newValue;
                        blocked_site_callback(blocked_sites);
                    }
                }
            });

        },
        blockSite = function (URL) {

            sendMessage("block_site", {
                URL: URL
            });
        },
        getDataFromKey = function (key) {
            return new Promise((re) => {
                chrome.storage.sync.get([key], function (result) {
                    re(result[key] || {});
                });
            });
        },
        getBlockedSites = function () {
            return blocked_sites
        },
        currentSiteBlocked = function () {
            return new Promise(async (re) => {
                let url = await getURL();
                
                let site_data_exists = !!(blocked_sites[url]);
                re(site_data_exists&&blocked_sites[url].currently_blocked);
                
            });
        },
        getURL = function () {
            return new Promise((re) => {
                chrome.windows.getCurrent(w => {
                    chrome.tabs.query({ active: true, windowId: w.id }, tabs => {
                        let url = new URL(tabs[0].url).hostname.replace("www.","");
                        re(url);
                    });
                });
            });

        },

        sendMessage = function (type, data) {
            data.type = type;
            chrome.runtime.sendMessage(data, function (response) {
                displayMessage(response);
            });
        },
        displayMessage = function (mes) {
            $(".message_pane").html(mes);
        }
    return {
        blockSite,
        getBlockedSites,
        currentSiteBlocked,
        init,
        getURL
    }
}();

export default Storage;