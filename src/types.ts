export interface Step {
    id: number;
    title: string;
    options: OptionType[];
}

export interface OptionType {
    id: number;
    icon: string;
    label: string;
}
