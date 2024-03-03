import { rules } from '../index.js';
import { IStudyValidationService } from './Index.js';

export type ApplicationDeadlineDataType = {
    applicationDeadline: string;
    startDate: string;
}

export default class ApplicationDeadline implements IStudyValidationService {
    private applicationDeadline: string;
    private startDate: string;
    private score: number = rules.applicationDeadline;

    constructor(applicationDeadline: string, startDate: string) { 
        this.applicationDeadline = applicationDeadline;
        this.startDate = applicationDeadline
    }

    calculate(): number {
        // Check if Application Deadline is 5 months before the Start Date
        const deadlineDate = this.stringToDate(this.applicationDeadline);
        const startDate = this.stringToDate(this.startDate);

        const fiveMonthsBeforeStartDate = new Date(startDate);
        
        fiveMonthsBeforeStartDate.setMonth(fiveMonthsBeforeStartDate.getMonth() - 5);

        const isValid = deadlineDate.getTime() === fiveMonthsBeforeStartDate.getTime() || deadlineDate < fiveMonthsBeforeStartDate;

        return isValid ? this.score : 0;
    }

    stringToDate(date: string): Date {
        let dateParts = date.split("-");
        let dateObject = new Date(+dateParts[2], dateParts[1] as any - 1, +dateParts[0]);
        return dateObject
    }
}