import { Evaluation } from './Evaluation';

export interface JobApplication {
    id: string;
    jobId: string;
    candidateId: string;
    evaluations: Evaluation[];
}

