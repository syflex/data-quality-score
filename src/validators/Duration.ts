import { IStudyValidationService } from './Index.js';
import { scores } from '../index.js';

const LevelOptions = {
    BACHELOR: 'bachelor',
    MASTER: 'master',
}

const DurationOptions = {
    MONTHS: 'months',
    DAYS: 'days'
}

const DurationRanges = {
    [LevelOptions.MASTER]: { minMonths: 8, maxMonths: 48, minDays: 240, maxDays: 1440 },
    [LevelOptions.BACHELOR]: { minMonths: 12, maxMonths: 84, minDays: 360, maxDays: 2520 }
};

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
        // Duration must be within duration ranges of the study level.
        const durationValue = this.durationValue;
        const level = this.level;
        let isValid = false;

        if (DurationRanges[level]) {
            const range = DurationRanges[level];
            if (this.duration === DurationOptions.MONTHS) {
                isValid = durationValue >= range.minMonths && durationValue <= range.maxMonths;
            } else if (this.duration === DurationOptions.DAYS) {
                isValid = durationValue >= range.minDays && durationValue <= range.maxDays;
            }
        }

        return isValid ? this.score : 0;
    }
}
