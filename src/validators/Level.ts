import { IStudyValidationService } from './Index.js';
import { rules } from '../index.js';

export default class Level implements IStudyValidationService {
    private level: string;
    private score: number = rules.level;

    constructor(Level: string) { 
        this.level = Level;
    }

    calculate(): number {
       return this.level ? this.score : 0;
    }
}