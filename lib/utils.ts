import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const abbreviateWalletAddress = (address: string) => {
    const prefixLength = 4;
    const suffixLength = 4;
    const ellipsis = '......';

    if (address.length <= prefixLength + suffixLength) {
        return address;
    }

    const prefix = address.slice(0, prefixLength);
    const suffix = address.slice(-suffixLength);

    return prefix + ellipsis + suffix;
}

export function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number,
) {
    let timer: NodeJS.Timeout | null = null;
    return function (this: any, ...rest: Parameters<T>) {
        if (!timer) {
            func.apply(this, rest);
        }
        timer && clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, rest), wait);
    };
}

export function throttle<T extends (...args: any[]) => void>(func: T, wait: number) {
    let lastTime: number | null = null;
    return function (this: any, ...rest: Parameters<T>) {
        if (!lastTime || (Date.now() - lastTime > wait)) {
            lastTime = Date.now();
            func.apply(this, rest);
        }
    };
}

export const offerType: { [key: number]: string } = {
    1: 'NFT',
    2: 'COIN',
    3: 'GAME',
}

export const duration: { [key: number]: string } = {
    1: '1 Days',
    2: '2 Days',
    3: '3 Days',
    4: '4 Days',
    5: '5 Days',
    6: '6 Days',
    7: '7 Days',
    8: '8 Days',
    9: '9 Days',
    10: '10 Days',
    11: '11 Days',
    12: '12 Days',
    13: '13 Days',
    14: '14 Days',
    15: '15 Days',
    16: '16 Days',
    17: '17 Days',
    18: '18 Days',
    19: '19 Days',
    20: '20 Days',
    21: '21 Days',
    22: '22 Days',
    23: '23 Days',
    24: '24 Days',
    25: '25 Days',
    26: '26 Days',
    27: '27 Days',
    28: '28 Days',
    29: '29 Days',
    30: '30 Days',
}