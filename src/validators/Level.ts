import { IStudyValidationService } from './Index.js';
import { scores } from '../index.js';

export default class Level implements IStudyValidationService {
    private level: string;
    private score: number = scores.level;

    constructor(Level: string) { 
        this.level = Level;
    }

    calculate(): number {
       return this.level ? this.score : 0;
    }
}