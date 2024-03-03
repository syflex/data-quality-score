import ValidationManager from './validation/Index.js';
import studies from './data/studies.json' assert { type: 'json' };

export const scores = {
    applicationDeadline: 20,
    last_updated_date: 10,
    startDate: 10,
    description: 15,
    duration: 20,
    website_link: 10,
    level: 5,
    tuition: 10
}

export type Study = {
    StudyId: number,
    ApplicationDeadline: string,
    StartDate: string,
    Description: string,
    Duration: string,
    DurationValue: number,
    Level: string,
    Link: string,
    LastUpdated: string,
    Tuition?: string,
    TuitionValue?: {
        EUR: number,
        USD: number,
        GBP: number
    }
}

type Studies = Study[];

type Output = {
    studyId: number,
    score: number
}


// const studiesData: Studies = studies;
class StudyService {

    private studiesData: Studies = studies;
    private output: Output[] = [];

    constructor() {
        this.studiesData.map(study => {
           this.output.push(new ValidationManager(study).toJson()) ;
        });
    }

    toJson(): Output[] {
        return this.output;
    }
}

const studiesService = new StudyService;

console.log(studiesService.toJson());