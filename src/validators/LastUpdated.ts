import { IStudyValidationService } from './Index.js';
import { rules } from '../index.js';
import { stringToDate } from '../lib/GeneralHelper.js';

export default class LastUpdated implements IStudyValidationService {
    private lastUpdated: string;
    private score: number = rules.last_updated_date;

    constructor(LastUpdated: string) { 
        this.lastUpdated = LastUpdated;
    }

    calculate(): number {
        // Check if the Last Updated Date is in the past
        const isValid = stringToDate(this.lastUpdated) < new Date();
       return isValid ? this.score : 0;
    }
}