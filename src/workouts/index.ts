import l0rpm55no10 from "./starter/l0-rpm55-1.json";
import l1basic1 from "./starter/l1-basic-1.json";
import gptmay1 from './gpt-3.5-may/1.json';
import gptmay2 from './gpt-3.5-may/2.json';
import gptmay3 from './gpt-3.5-may/3.json';
import gptmay4 from './gpt-3.5-may/4.json';
import gptmay5 from './gpt-3.5-may/5.json';

interface Workout {
    name: string;
    category: string;
    length: number;
    timeline: any[]; // replace any with the actual type if available
}

interface Category {
    label: string;
    workouts: Workout[];
}

type Workouts = {
    [key: string]: Category;
}
export const workouts: Workouts = {
    easy: {
        label: 'Simpleton Starter',
        workouts:
            [
                l0rpm55no10,
                l1basic1,
            ],
    },
    generated: {
        label: 'Generated: ChatGPT 3.5 May 2024',
        workouts: [
            gptmay1,
            gptmay2,
            gptmay3,
            gptmay4,
            gptmay5,
        ]
    }
}