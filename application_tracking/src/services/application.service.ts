import { Evaluation, EvaluationActivity, EvaluationActivityDetails } from './../models/Evaluation';

import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { JobApplication } from '../models/JobApplication'

const ax = axios.create({
    baseURL: '/api'
})

const randPhone = () => {
    const n: number[] = []
    for (let i = 0; i < 10; i++) {
        n.push(Math.floor(Math.random() * 10))
    }

    return `(${n[0]}${n[1]}${n[2]}) ${n[3]}${n[4]}${n[5]}-${n[6]}${n[7]}${n[8]}${n[9]}`
}

const DEFAULT_EVALUATIONS = (type: EvaluationActivity): Evaluation => {
    const def: Evaluation = {
        id: uuidv4(),
        type,
        scheduled: new Date().toISOString(),
        sent: new Date().toISOString(),
        completed: '',
        activityDetails: {}
    }
    switch (type) {
        case EvaluationActivity.intro:
            return {
                ...def,
                type,
                id: uuidv4(),
                activityDetails: {
                    phone: randPhone()
                }
            }
        case EvaluationActivity.basicQualifications:
        default:
            return {
                type,
                id: uuidv4(),
                scheduled: new Date().toISOString(),
                sent: new Date().toISOString(),
                completed: '',
                activityDetails: {}
            }
    }
}

export const ApplicationService = {
    fetchApplication: async (id: string) => {
        const { data } = await ax.get('applications/' + id)

        return data as JobApplication
    },
    fetchApplications: async () => {
        const { data } = await ax.get('applications')

        return data as JobApplication[]
    },
    applyJob: async (jobId: string, candidateId: string) => {
        const application: JobApplication = {
            id: uuidv4(),
            jobId,
            candidateId,
            evaluations: []
        }

        await ax.post('applications', application)
    },
    addEvaluation: async (id: string, type: EvaluationActivity) => {
        const application = await ApplicationService.fetchApplication(id)
        application.evaluations.push(DEFAULT_EVALUATIONS(type))
        ApplicationService.updateApplication(application)
    },
    updateApplication: async (application: JobApplication) => {
        await ax.put('applications/' + application.id, application)
    }
}