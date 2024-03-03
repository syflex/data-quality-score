import { IStudyValidationService } from './Index.js';
import { scores } from '../index.js';


export default class Duration implements IStudyValidationService {
    private duration: string;
    private durationValue: number = 0;
    private level: string;
    private score: number = scores.duration;

    constructor(Duration: string, DurationValue: number, Level: string) { 
        this.duration = Duration;
        this.durationValue = DurationValue;
        this.level = Level;
    }

    calculate(): number {
        let isValid = false;
        if (this.level === 'master') {
            isValid = (this.duration === 'months' && this.durationValue >= 8 && this.durationValue <= 48) ||
                    (this.duration === 'days' && this.durationValue >= 240 && this.durationValue <= 1440);
        } else if (this.level === 'bachelor') {
            isValid = (this.duration === 'months' && this.durationValue >= 12 && this.durationValue <= 84) ||
                    (this.duration === 'days' && this.durationValue >= 360 && this.durationValue <= 2520);
        }
        return isValid ? this.score : 0;
    }
}