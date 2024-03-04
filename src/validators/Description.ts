import { IStudyValidationService } from './Index.js';
import { scores } from '../index.js';

export default class Description implements IStudyValidationService {
    private description: string;
    private score: number = scores.level;

    constructor(Description: string) { 
        this.description = Description;
    }

    calculate(): number {
        const words = this.description.split(' ');
        return words.length > 5 ? this.score : 0;
    }
}
