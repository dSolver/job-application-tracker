import { JobOpportunity } from './../models/JobOpportunity';

import axios from 'axios'

const ax = axios.create({
    baseURL: '/api'
})

export const SearchService = {
    searchJobs: async (keyword: string) => {
        const { data } = await ax.get('/jobs', {
            params: {
                q: keyword
            }
        })

        return data as JobOpportunity[]
    },
    getJobById: async (jobId: string) => {
        const { data } = await ax.get('/jobs/' + jobId)
        return data as JobOpportunity
    }
}