
export const createFiller = (main: HTMLElement, counter: number, height: string): void => {
    let filler = document.createElement("div");
    filler.className = "filler";
    filler.style.height = height; // Dynamically assign the height from the parameter.
    filler.id = `filler${counter}`; // Unique ID for each filler for potential targeting.
    filler.style.lineHeight = height; // Set line height equal to the element's height for vertical alignment.
    main.appendChild(filler); // Append the filler div to the 'main' container.
};

// Function to create and append image elements dynamically from the photos list.
export const createFillerImg = (main: HTMLElement, photos: string[], counter: number, height: string): void => {
    let filler = document.createElement("img");
    filler.src = photos[counter]; // Assign the image source from a specific index of the photos array.
    filler.className = "filler";
    filler.id = `filler${counter}`;
    filler.style.height = height;
    filler.style.lineHeight = height;
    filler.style.aspectRatio = 'auto'; // Maintain the original aspect ratio.
    filler.style.objectFit = 'cover'; // Ensure the image covers the assigned area.

    main.appendChild(filler); // Append the image element to the 'main' container.
};