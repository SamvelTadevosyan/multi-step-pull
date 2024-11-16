export interface Step {
    id: number;
    title: string;
    options: OptionType[];
}

export interface OptionType {
    icon: string;
    label: string;
}

export type GenericCallback = (...args: any[]) => void;