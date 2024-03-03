import { IStudyValidationService } from './Index.js';
import { scores } from '../index.js';

export default class Description implements IStudyValidationService {
    private description: string;
    private score: number = scores.level;

    constructor(Description: string) { 
        this.description = Description;
    }

    calculate(): number {
       return this.description ? this.score : 0;
    }
}