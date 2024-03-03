import { IStudyValidationService } from './Index.js';
import { scores } from './../index.js';

export default class StartDate implements IStudyValidationService {
    private startDate: string;
    private score: number = scores.startDate;

    constructor(StartDate: string) { 
        this.startDate = StartDate;
    }

    calculate(): number {
        // Check if Start Date is in the future
        const isValid = new Date(this.startDate) > new Date();
       return isValid ? this.score : 0;
    }
};
