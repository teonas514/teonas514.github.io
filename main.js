//sections
let settings = document.querySelectorAll(".settings");
let info = document.querySelectorAll(".info");
//button pair
let buttons = document.querySelectorAll(".buttons");
//buttons
let openSettings = document.querySelectorAll(".gear");
let openInfo = document.querySelectorAll(".i");
let close = document.querySelectorAll(".close")
//next-prev buttons
let next = document.querySelector(".next");
let previous = document.querySelector(".previous");

let projectList = document.querySelector("#project-list");
let projects = document.querySelectorAll(".project");

//changing project stuff
class Slideshow {
    constructor(elements) {
        this.elements = elements;
        this.currentListIndex = 1;
    }

    addListIndex(n) {
        this.currentListIndex += n;
        
        if(this.currentListIndex >= this.elements.length) { //wrap
            this.currentListIndex = 0
        }
        else if(this.currentListIndex < 0) {
            this.currentListIndex = this.elements.length -1
        }
    }

    updateClasses(n) {
        this.elements.forEach(element => {
            if(element.classList.contains("slide-in-right") || element.classList.contains("slide-in-left") )
            {
                element.classList.remove("slide-in-right");
                element.classList.remove("slide-in-left");
                void element.offsetWidth;
                if(n != 1)
                {
                    element.classList.add("slide-out-right");
                }
                else{
                    element.classList.add("slide-out-left");
                }
            }
        });
        let element = this.elements[this.currentListIndex]

        element.classList.remove("slide-out-right");
        element.classList.remove("slide-out-left");
        
        void element.offsetWidth;
        if(n != 1)
        {
            element.classList.add("slide-in-left");
        }
        else{
            element.classList.add("slide-in-right");
        }

    }

    assignClasses() {
        this.elements.forEach(element => {
            element.classList.add("slide-out-left");
        });
        let element = this.elements[this.currentListIndex]
        element.classList.remove("slide-out-left");
        void element.offsetWidth;
        element.classList.add("slide-in-right");

    }

    update(n) {
        this.addListIndex(n);
        this.updateClasses(n);
    }
}

let slideshow = new Slideshow(projects);
slideshow.assignClasses();


function setupSlideShowButtons(button,increment) {
    button.addEventListener("click", () => {
            slideshow.update(increment);
    });
}

function SetDisplayNone(elementList){
    for (let i = 0; i<elementList.length; i++) {
        elementList[i].style.display = "none";
    }
}

//button stuff
function updateButtons() {
    for (let i = 0; i<buttons.length; i++) {

        let buttonPair = buttons[i];
        let infoButton = openInfo[i];
        let settingsButton = openSettings[i];
        let infoSection = info[i];
        let settingsSection = settings[i];

        if(infoSection && settingsSection) {
            
            if(infoSection.style.display == "none" && settingsSection.style.display == "none") {
                buttonPair.classList.remove("slide-left");
                void buttonPair.offsetWidth;
                buttonPair.classList.add("slide-back");

            }
            else{
                buttonPair.classList.remove("slide-back");
                void buttonPair.offsetWidth;
                buttonPair.classList.add("slide-left");

                if(infoSection.style.display == "none")
                {
                    infoButton.style = "z-index: 0";
                    settingsButton.style = "z-index: 1";
                }
                else
                {
                    infoButton.style = "z-index: 1";
                    settingsButton.style = "z-index: 0";
                }
            }
        }
    }
}

function setupShowHideButtons(buttonList,showList,hideList) {
    for (let i = 0; i<buttonList.length; i++) {

        let button = buttonList[i];
        let showSection = showList[i];
        let hideSection = hideList[i];

        button.addEventListener("click", () => {
            if (showSection) {
                showSection.style.display = "block";
                if (hideSection) {
                    hideSection.style.display = "none";
                }
            }
            updateButtons();
        });
    }
}

function setupCloseButtons(buttonList) {
    for (let i = 0; i<buttonList.length; i++) {
        let button = buttonList[i]
        button.addEventListener("click", () => {
            button.parentElement.style.display = "none";
            updateButtons()
        });
    }
}

SetDisplayNone(info);
SetDisplayNone(settings);

setupSlideShowButtons(previous,-1);
setupSlideShowButtons(next,1);

setupCloseButtons(close);
setupShowHideButtons(openInfo,info,settings);
setupShowHideButtons(openSettings,settings,info);