import { IStudyValidationService } from './Index.js';
import { rules } from '../index.js';
import { ObjectValues, ObjectKeys } from '../lib/TypeHelpers.js';

// TYPES
type Currency = 'EUR' | 'USD' | 'GBP';
export type TuitionTypes = ObjectValues<typeof TuitionType> | undefined;
export type TuitionValueType = {
    [K in Currency]: number 
} | undefined;
type MaxTuitionValuesType = {
    [K in Currency]: { yearly: number, semester: number, credits: number }
}

//  CONSTANTS
const TuitionType = {
    yearly: 'yearly',
    semester: 'semester',
    credits: 'credits'
} as const;
const maxTuitionValues: MaxTuitionValuesType = {
    'EUR': { 'yearly': 65000, 'semester': 15000, 'credits': 2200 },
    'USD': { 'yearly': 83800, 'semester': 30000, 'credits': 2300 },
    'GBP': { 'yearly': 90250, 'semester': 30000, 'credits': 1700 }
};

// CLASS
export default class Tuition implements IStudyValidationService {
    private tuition: TuitionTypes;
    private tuitionValue?: TuitionValueType;
    private score: number = rules.tuition;

    constructor(tuition: TuitionTypes, tuitionValue?: TuitionValueType) { 
        this.tuition = tuition;
        this.tuitionValue = tuitionValue;
    }

    calculate(): number {
        const currencies: Currency[] = ['EUR', 'USD', 'GBP'];
        const isValid = currencies.every((currency) => {
            if (!this.tuitionValue || !this.tuition) return false;

            return this.tuitionValue[currency] <= maxTuitionValues[currency][this.tuition];
        });
        return isValid ? this.score : 0;
    }
}