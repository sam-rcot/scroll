// Import the photos function from the photos module.
import photos from "./photos.ts";
import { createFillerImg, createFiller } from "./helpers.ts";
import { initializeScroll } from "./scrollManager.ts";

// Retrieve the 'main' HTML element where dynamic content will be displayed.
const main = document.getElementById("main") as HTMLElement | null;

// Retrieve the 'scrollCounter' element which displays the scroll percentage.
const scrollCounter = document.getElementById("scrollCounter") as HTMLElement | null;

if (main) {
    const fillerCount = 10; // Number of filler images to create.
    const desiredHeightNum = 75; // Height for each filler as a percentage of the viewport height.
    const desiredHeight = `${desiredHeightNum}vh`; // Convert the height to a viewport-height string.
    main.style.height = desiredHeight;

    for (let i = 0; i < fillerCount; i++) {
        createFillerImg(main, photos("landscape"), i, desiredHeight);
    }

    let verticalSpace = document.createElement("div");
    verticalSpace.id = "verticalSpace";
    verticalSpace.className = "verticalSpace";
    verticalSpace.style.height = `${(desiredHeightNum * fillerCount).toString()}vh`;
    main.appendChild(verticalSpace);

    const fillers = Array.from(main.getElementsByClassName("filler"));
    const lastFillers = fillers.slice(1);

    initializeScroll(main, scrollCounter, verticalSpace, fillers, lastFillers);
}
