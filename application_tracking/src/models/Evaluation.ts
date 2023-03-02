export enum EvaluationActivity {
    basicQualifications = 'basicQualifications',
    intro = 'intro',
    resumeReview = 'resumeReview',
    assessment = 'assessment',
    phoneScreen = 'phoneScreen',
    interview = 'interview'
}

export interface EvaluationActivityDetails {
    time?: number;
    duration?: number;
    place?: string;
    url?: string;
    phone?: string;
    interviewer?: string;
}

export interface Evaluation {
    type: EvaluationActivity;
    id: string;
    scheduled: string;
    sent: string;
    completed: string;
    activityDetails: EvaluationActivityDetails
}