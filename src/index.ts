// Import the photos function from the photos module.
import photos from "./photos.ts";

// Retrieve the 'main' HTML element where dynamic content will be displayed.
const main = document.getElementById("main") as HTMLElement | null;

// Retrieve the 'scrollCounter' element which displays the scroll percentage.
const scrollCounter = document.getElementById("scrollCounter") as HTMLElement | null;

// Function to create and append div elements with specified height and styling.
const createFiller = (counter: number, height: string): void => {
    if (main) {
        let filler = document.createElement("div");
        filler.className = "filler";
        filler.style.height = height; // Dynamically assign the height from the parameter.
        filler.id = `filler${counter}`; // Unique ID for each filler for potential targeting.
        filler.style.lineHeight = height; // Set line height equal to the element's height for vertical alignment.
        main.appendChild(filler); // Append the filler div to the 'main' container.
    }
};

// Function to create and append image elements dynamically from the photos list.
const createFillerImg = (counter: number, height: string): void => {
    if (main) {
        let filler = document.createElement("img");
        filler.src = photos("landscape")[counter]; // Assign the image source from a specific index of the photos array.
        filler.className = "filler";
        filler.id = `filler${counter}`;
        filler.style.height = height;
        filler.style.lineHeight = height;
        filler.style.aspectRatio = 'auto'; // Maintain the original aspect ratio.
        filler.style.objectFit = 'cover'; // Ensure the image covers the assigned area.

        main.appendChild(filler); // Append the image element to the 'main' container.
    }
};

// Main execution block that sets dynamic heights and initializes the scroll functionality.
if (main) {
    const fillerCount = 10; // Number of filler images to create.
    const desiredHeightNum = 75; // Height for each filler as a percentage of the viewport height.
    const desiredHeight = `${desiredHeightNum}vh`; // Convert the height to a viewport-height string.
    main.style.height = desiredHeight; // Set the height of the 'main' element.

    // Create multiple filler images with a dynamic height of 75vh.
    for (let i = 0; i < fillerCount; i++) {
        createFillerImg(i, desiredHeight);
    }

    // Create additional vertical space after the last filler to allow for scrolling.
    let verticalSpace = document.createElement("div");
    verticalSpace.id = "verticalSpace";
    verticalSpace.className = "verticalSpace";
    verticalSpace.style.height = `${(desiredHeightNum * fillerCount).toString()}vh`;

    main.appendChild(verticalSpace); // Append the vertical space element to the 'main' container.

    // Calculate the total scrollable distance and initialize opacity settings for fade-in effect.
    const fillers = Array.from(main.getElementsByClassName("filler"));
    const lastFillers = fillers.slice(1);
    (fillers[0] as HTMLElement).style.opacity = '1'; // Set the first filler to full opacity initially.
    const totalFillersHeight = fillers.length * parseFloat(window.getComputedStyle(fillers[0]).height);
    const mainHeight = parseFloat(window.getComputedStyle(main).height);
    const maxScrollableDistanceMain = totalFillersHeight - mainHeight;

    // Function to calculate opacity based on scroll position and filler index.
    const calculateOpacity = (scrollPos: number, index: number, mainHeight: number, totalHeight: number): number => {
        const targetScrollStart = mainHeight * index;
        const targetScrollEnd = mainHeight * (index + 1);
        if (scrollPos < targetScrollStart) {
            return 0; // Below the start point of the current filler.
        } else if (scrollPos >= targetScrollStart && scrollPos < targetScrollEnd) {
            return (scrollPos - targetScrollStart) / (targetScrollEnd - targetScrollStart); // Fade in as scroll progresses.
        } else if (scrollPos >= targetScrollEnd && index === fillers.length - 1) {
            const remainingScroll = totalHeight - scrollPos;
            return remainingScroll > 0 ? 1 - (remainingScroll / mainHeight) : 1; // Fade out towards the end for the last filler.
        } else {
            return 1; // Above the end point of the current filler (except the last one).
        }
    }

    // Add a scroll event listener to the 'main' container to update fillers' opacity and scroll percentage.
    main.addEventListener("scroll", (e) => {
        const scrollPos = main.scrollTop; // Current vertical scroll position of the 'main' element.
        const totalHeight = parseFloat(window.getComputedStyle(verticalSpace).height);
        const scrollPercentage = (scrollPos / maxScrollableDistanceMain) * 100; // Calculate scroll percentage.

        if (scrollCounter) {
            scrollCounter.textContent = scrollPercentage.toFixed(0); // Display the rounded scroll percentage.
            lastFillers.forEach((item: Element, index: number) => {
                const htmlItem = item as HTMLElement;
                const opacity = calculateOpacity(scrollPos, index, mainHeight, maxScrollableDistanceMain);
                htmlItem.style.opacity = `${opacity}`; // Update opacity based on calculated value.
            });
        }

        // Optionally, update a CSS variable based on scroll for dynamic CSS effects.
        document.documentElement.style.setProperty('--dynamic-hue', scrollPercentage.toString());
    });

    // Log each filler's index for debugging purposes.
    fillers.forEach((item: Element, index) => {
        console.log(index);
        item.textContent = (index + 1).toString();
    })
}
