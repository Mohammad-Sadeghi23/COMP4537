import { STRINGS } from "../lang/messages/en/strings.js";

export class UserInterface {
    constructor() {
        document.title = STRINGS.TITLE;
        document.getElementById("numberLabel").innerText = STRINGS.BUTTON_LABEL;
        document.getElementById("submitButton").innerText = STRINGS.BTN_START;
    }

    // set message on the UI
    setMessage(text) {
        document.getElementById("msg").innerText = text;
    }

    // creates and mounts buttons to the DOM
    static mountButtons(buttonObjs) {

        // check if the buttonContainer exists, if so remove it
        const existingContainer = document.getElementById("buttonContainer");

        if (existingContainer) {
            existingContainer.remove();
        }

        // create a container for buttons
        const container = document.createElement("div");
        container.id = "buttonContainer";

        // append buttons to container
        for (const b of buttonObjs) container.appendChild(b.el);

        // append container to body
        document.body.appendChild(container);
        return container;
    }

    // randomly position buttons within the viewport
    static scrambleUIButtons(container) {

        // get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        for (const el of container.children) {
            el.style.position = "absolute";

            const maxLeft = Math.max(0, viewportWidth - el.offsetWidth);
            const maxTop = Math.max(0, viewportHeight - el.offsetHeight);

            el.style.left = Math.floor(Math.random() * (maxLeft + 1)) + "px";
            el.style.top = Math.floor(Math.random() * (maxTop + 1)) + "px";
        }
    }

    static enableButtons(container) {
        for (const el of container.children) el.disabled = false;
    }

    static disableButtons(container) {
        for (const el of container.children) el.disabled = true;
    }

    static hideNumbers(container) {
        for (const el of container.children) el.innerText = "";
    }

    static wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}