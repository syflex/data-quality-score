import { Study } from '..';
import ApplicationDeadline from './ApplicationDeadline.js';
import StartDate from './StartDate.js';
import Duration from './Duration.js';
import Level from './Level.js';
import Tuition, { TuitionTypes, TuitionValueType } from './Tuition.js';
import Description from './Description.js';
import Website from './Website.js';
import LastUpdated from './LastUpdated.js';

export interface IStudyValidationService {
    calculate(): number;
}

type ParamsType = 
| [string] 
| [string, string]
| [string, number, string] 
| [TuitionTypes, TuitionValueType]

type ValidationClassType = new (...args: any[]) => IStudyValidationService;

type ValidationClass = {
    class: ValidationClassType,
    params: ParamsType
}

export default class ValidationManager{
    private score: number = 0;
    private studyId: number;

    constructor(study: Study){
        this.studyId = study.StudyId;
        const validationClasses = this.createValidationClasses(study);

        validationClasses.forEach(({ class: ValidationClass, params }) => {
            const instance = this.createValidationInstance(ValidationClass, params);
            this.score += instance.calculate();
        });
    }

    createValidationClasses(study: Study): ValidationClass[] {
        return [
            { class: ApplicationDeadline, params: [study.ApplicationDeadline, study.StartDate] },
            { class: StartDate, params: [study.StartDate] },
            { class: Duration, params: [study.Duration, study.DurationValue, study.Level] },
            { class: Level, params: [study.Level] },
            { class: Tuition, params: [study.Tuition as TuitionTypes, study.TuitionValue] },
            { class: Description, params: [study.Description] },
            { class: Website, params: [study.Link] },
            { class: LastUpdated, params: [study.LastUpdated] },
        ];
    }
    
    private createValidationInstance(ValidationClass: ValidationClassType, params: ParamsType): IStudyValidationService {
        return new ValidationClass(...params);
    }

    toJson(){
        return {
            studyId: this.studyId,
            score: this.score
        }
    }
}