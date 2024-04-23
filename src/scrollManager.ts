// scrollManager.ts

export const initializeScroll = (main: HTMLElement, scrollCounter: HTMLElement | null, verticalSpace: HTMLElement, fillers: Element[], lastFillers: Element[]) => {
    const mainHeight = parseFloat(window.getComputedStyle(main).height);
    const totalFillersHeight = fillers.length * parseFloat(window.getComputedStyle(fillers[0]).height);
    const maxScrollableDistanceMain = totalFillersHeight - mainHeight;

    const calculateOpacity = (scrollPos: number, index: number): number => {
        const targetScrollStart = mainHeight * index;
        const targetScrollEnd = mainHeight * (index + 1);
        if (scrollPos < targetScrollStart) {
            return 0;
        } else if (scrollPos >= targetScrollStart && scrollPos < targetScrollEnd) {
            return (scrollPos - targetScrollStart) / (targetScrollEnd - targetScrollStart);
        } else if (scrollPos >= targetScrollEnd && index === fillers.length - 1) {
            const remainingScroll = totalFillersHeight - scrollPos;
            return remainingScroll > 0 ? 1 - (remainingScroll / mainHeight) : 1;
        } else {
            return 1;
        }
    };

    main.addEventListener("scroll", () => {
        const scrollPos = main.scrollTop;
        const totalHeight = parseFloat(window.getComputedStyle(verticalSpace).height);
        const scrollPercentage = (scrollPos / maxScrollableDistanceMain) * 100;

        if (scrollCounter) {
            scrollCounter.textContent = scrollPercentage.toFixed(0);
        }

        lastFillers.forEach((item: Element, index: number) => {
            const htmlItem = item as HTMLElement;
            const opacity = calculateOpacity(scrollPos, index);
            htmlItem.style.opacity = `${opacity}`;
        });

        document.documentElement.style.setProperty('--dynamic-hue', scrollPercentage.toString());
    });
};
