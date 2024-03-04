import { scores } from '../index.js';
import { stringToDate } from '../lib/GeneralHelper.js';
import { IStudyValidationService } from './Index.js';

export default class ApplicationDeadline implements IStudyValidationService {
    private applicationDeadline: string;
    private startDate: string;
    private score: number = scores.applicationDeadline;

    constructor(applicationDeadline: string, startDate: string) { 
        this.applicationDeadline = applicationDeadline;
        this.startDate = startDate
    }

    calculate(): number {
        // Check if Application Deadline is 5 months before the Start Date
        const deadlineDate = stringToDate(this.applicationDeadline);
        const startDate = stringToDate(this.startDate);

        const fiveMonthsBeforeStartDate = new Date(startDate);
        fiveMonthsBeforeStartDate.setMonth(fiveMonthsBeforeStartDate.getMonth() - 5);
        const isValid = deadlineDate.getTime() === fiveMonthsBeforeStartDate.getTime() || deadlineDate < fiveMonthsBeforeStartDate;
        
        return isValid ? this.score : 0;
    }
}
