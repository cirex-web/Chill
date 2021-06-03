// import {$} from '/external/jquery.js';
import Storage from './storage.js'

$(document).ready(main);

async function main() {
    await Storage.init(displayBlockedSites);
    displayInfo();
    setUpInteractivity();

}

function displayInfo() {
    displayBlockedSites(Storage.getBlockedSites());

}
async function showCurTabData() {
    if (await Storage.currentSiteBlocked()) {
        $(".notice").html(`The current site is <span class="blockedColor">chilled<span>`);
    } else {
        $(".notice").html('The current site is <span class="unblockedColor">unblocked<span>');
    }

}

function displayBlockedSites(blocked_sites) {
    $(".blocked_site_list tr:not(:first)").remove();
    for (let [url, data] of Object.entries(blocked_sites)) {
        let element = document.createElement("tr");
        let classList = data.currently_blocked;
        let status = data.currently_blocked?"Chilled":"Unblocked";
        if(data.request){
            if(data.request.end_time<+new Date()){
                status="Thawed";
                classList+=" bold";
            }else{
                status = "Thawing";
            }
        }
        element.innerHTML = (`<td>${url}</td><td class="${classList} ">${status}</td>
    </tr>`);
        $(".blocked_site_list").append(element);
    }
    showCurTabData();
}

function setUpInteractivity() {
    $("#blockSite").on('click', async() => {
        let url = $("#inputField").val();
        if (url == '') {
            url = await Storage.getURL();
        }
        Storage.blockSite(url);
    });

    $("#openstats").on('click', function() { openTab('stats') });
    $("#openblocked").on('click', function() { openTab('blocked') });
    $("#blockButton").on('click', function() { openContent('blockPage') });
    // document.getElementById("unblockButton").onclick = function() {openContent('unblockPage')};
    $("#goBackButton").on('click', function() { openContent('defaultPage') });
    //document.getElementById("goBackButton2").onclick = function() { openContent('defaultPage') };

    // Default content and tab pages :D
    openContent("defaultPage");
    $("#openblocked").trigger("click");
}


// Start of Merge

function openTab(tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    document.getElementById("open" + tabName).className += " active";
    //evt.currentTarget.className += " active";
}

function openContent(tabName) {
    // Declare all variables
    var i, tabcontent;

    // Get all elements with class="mainContent" and hide them
    tabcontent = document.getElementsByClassName("mainContent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(tabName).style.display = "block";
}