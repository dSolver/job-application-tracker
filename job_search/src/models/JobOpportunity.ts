export interface JobOpportunity {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    salary: string;
    PCs?: Array<{ id: string, minScore: number }>;
}