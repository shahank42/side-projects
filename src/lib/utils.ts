import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDateWithAgo = (inputDate: string) => {
    const currentDate = new Date();
    const inputDateObj = new Date(inputDate);

    // Calculate the difference in milliseconds
    const difference = currentDate.getTime() - inputDateObj.getTime();
    
    // Convert the difference to days
    const daysDifference = Math.floor(difference / (1000 * 3600 * 24));

    let agoString = '';

    agoString = daysDifference === 1 ? 'day' : 'days';
    // if (daysDifference < 7) {
    //     agoString = daysDifference === 1 ? 'day' : 'days';
    // } else if (daysDifference < 30) {
    //     const weeksDifference = Math.floor(daysDifference / 7);
    //     agoString = weeksDifference === 1 ? 'week' : 'weeks';
    // } else if (daysDifference < 365) {
    //     const monthsDifference = Math.floor(daysDifference / 30);
    //     agoString = monthsDifference === 1 ? 'month' : 'months';
    // } else {
    //     const yearsDifference = Math.floor(daysDifference / 365);
    //     agoString = yearsDifference === 1 ? 'year' : 'years';
    // }

    // Format the input date
    const formattedDate = inputDateObj.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return `${formattedDate} (${daysDifference} ${agoString} ago)`;
}


export const formatDate = (inputDate: string) => {
    const inputDateObj = new Date(inputDate);

    // Format the input date
    const formattedDate = inputDateObj.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return formattedDate;
}


type FlyAndScaleParams = {
    y?: number;
    x?: number;
    start?: number;
    duration?: number;
};

export const getOwnerAndRepoNameFromGithubUrl = (url: string): { owner: string, repoName: string } | null => {
    // Split the URL by "/"
    const parts = url.split("/");

    // Check if the URL is valid and contains the expected parts
    if (parts.length >= 5 && parts[2] === "github.com") {
        const owner = parts[3];
        const repoName = parts[4];

        // Remove any additional parts after the repo name
        const repoNameParts = repoName.split("#")[0].split("?")[0];

        return { owner, repoName: repoNameParts };
    }

    return null;
}

export const flyAndScale = (
    node: Element,
    params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;

    const scaleConversion = (
        valueA: number,
        scaleA: [number, number],
        scaleB: [number, number]
    ) => {
        const [minA, maxA] = scaleA;
        const [minB, maxB] = scaleB;

        const percentage = (valueA - minA) / (maxA - minA);
        const valueB = percentage * (maxB - minB) + minB;

        return valueB;
    };

    const styleToString = (
        style: Record<string, number | string | undefined>
    ): string => {
        return Object.keys(style).reduce((str, key) => {
            if (style[key] === undefined) return str;
            return str + `${key}:${style[key]};`;
        }, "");
    };

    return {
        duration: params.duration ?? 200,
        delay: 0,
        css: (t) => {
            const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
            const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
            const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

            return styleToString({
                transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                opacity: t
            });
        },
        easing: cubicOut
    };
};