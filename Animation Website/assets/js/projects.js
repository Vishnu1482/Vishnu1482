document.addEventListener("DOMContentLoaded", function() {
    showContent(allCon);
});
const allCon = document.getElementById("all-content");
const archiCon = document.getElementById("architecture-content");
const buildingCon = document.getElementById("building-content");
const gardenCon = document.getElementById("garden-content");
const interiorCon = document.getElementById("interior-content");
const officeCon = document.getElementById("office-content");
const workspaceCon = document.getElementById("workspace-content");

function showContent(element) {
    allCon.style.display = "none";
    archiCon.style.display = "none";
    buildingCon.style.display = "none";
    gardenCon.style.display = "none";
    interiorCon.style.display = "none";
    officeCon.style.display = "none";
    workspaceCon.style.display = "none";

    element.style.display = "";
}

function allFunc() {
    showContent(allCon);
}

function architectureFunc() {
    showContent(archiCon);
}

function buildingFunc() {
    showContent(buildingCon);
}

function gardenFunc() {
    showContent(gardenCon);
}

function interiorFunc() {
    showContent(interiorCon);
}

function officeFunc() {
    showContent(officeCon);
}

function workspaceFunc() {
    showContent(workspaceCon);
}






const counterItem = document.getElementsByClassName("counter-item");
const increment = [];

function itemFunction() {
    for (let i = 0; i < counterItem.length; i++) {
        increment.push(1);
        // console.log(increment);
        if (increment[i] != counterItem[i].getAttribute("max-data")) {
            increment[i]++;
        }
        counterItem[i].innerHTML = increment[i];
    }
}
// setInterval(itemFunction, 5);

const count = document.getElementById("counters");
window.onscroll = function () {
    let time = setInterval(() => {
        let topEle = count.offsetTop;
        let botEle = count.offsetTop + count.clientHeight;
        let topScreen = window.scrollY;
        let botScreen = window.scrollY + window.innerHeight;

        if (botScreen > topEle && topScreen < botEle) {
            itemFunction();
        } else {
            clearInterval(time);
        }
    }, 50);
}