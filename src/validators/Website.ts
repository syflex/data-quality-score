import { IStudyValidationService } from './Index.js';
import { scores } from '../index.js';

export default class Website implements IStudyValidationService {
    private website: string;
    private score: number = scores.level;

    constructor(Website: string) { 
        this.website = Website;
    }

    calculate(): number {
        // Check if the Website Link is a valid URL
        const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)?[a-z0-9-]+\.[a-z]{2,}(\.[a-z]{2,})?$/i;
        const isValid = urlPattern.test(this.website);
       return isValid ? this.score : 0;
    }
}