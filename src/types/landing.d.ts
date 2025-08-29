
declare global {
    interface Stat {
        value: string;
        label: string;
    }
    interface FaqItem {
        id: string;
        question: string;
        answer: string;
        hasImage?: boolean;
    }
}

export {}
