export interface Task {
    name: string;
    done: boolean;
}

export interface Category {
    category: string;
    frequency: Frequency;
    tasks: Task[];
}

export interface MasterCategory {
    category: string;
    frequency: Frequency;
    tasks: string[];
}

export enum Frequency {
    DAILY = 'Daily',
    WEEKLY = 'Weekly',
}