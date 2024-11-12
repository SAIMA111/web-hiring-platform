import React, { createContext, useReducer } from 'react';
import jobReducer from './jobReducer';

const initJobs = [ 
    {
        id: 1,
        title: 'Frontend Developer',
        description: 'We are looking for a frontend developer to join our team.',
    },
    {
        id: 2,
        title: 'Software Engineer',
        description: 'We are looking for a software engineer to join our team.',
    },
   
    {
        id: 3,
        title: 'Backend Developer',
        description: 'We are looking for a backend developer to join our team.',
    }, 
    {
        id: 4,
        title: 'data scientist ',
        description: 'We are looking for a data scientist  to join our team.',
    }
]

const candidateData = [
    {
        id: 1,
        name: 'Saima',
        applicationDate: '2024-11-11',
        resumeLink: '/path/to/resume1.pdf',
        status: 'Under Review',
        email: 'saima@gmail.com',
        contact: '987654321',
        skills: ['JavaScript'],
        experience: '3 years'
    },
    {
        id: 2,
        name: 'Biva',
        applicationDate: '2024-11-11',
        resumeLink: '/path/to/resume2.pdf',
        status: 'Interview Scheduled',
        email: 'biva@gmail.com',
        contact: '1234-5678',
        skills: ['Frontend Developer'],
        experience: '3 years'
    },
];

const initialState = {
    jobs: initJobs,  // List of jobs
    assessments: {},  // Store assessments for each job,
    candidates: candidateData,  // List of candidates
};

export const JobContext = createContext(initialState);

export const JobProvider = ({ children }) => {
    const [state, dispatch] = useReducer(jobReducer, initialState);

    return (
        <JobContext.Provider value={{ state, dispatch }}>
            {children}
        </JobContext.Provider>
    );
};
