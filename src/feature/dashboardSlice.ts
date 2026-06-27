import { api } from '../api/api.ts';

type AnalysisSummary = {
    overall: string;
    strengths: string[];
    weaknesses: string[];
};


type Skill = string;


type KeywordAnalysis = {
    matchedKeywords: string[];
    missingKeywords: string[];
    keywordMatchPercentage: number;
};


type ResumeFeedback = {
    formatting: string;
    content: string;
    suggestions: string[];
};


type RadarChartData = {
    skill: string;
    value: number;
};


export type Analysis = {
    _id: string;
    user: string;
    roleTitle: string;
    resumeFileName: string;
    resumeText: string;
    jobDescription: string;
    matchScore: number;

    analysisSummary: AnalysisSummary;

    existingSkills: Skill[];

    missingSkills: Skill[];

    recommendationActions: string[];

    keywordAnalysis: KeywordAnalysis;

    resumeFeedback: ResumeFeedback;

    radarChartData: RadarChartData[];

    createdAt: string;
    updatedAt: string;

    __v: number;
};


export type DashboardResponse = {
    lastMetric: {
        totalAnalyses: number;
        averageMatchScore: number;
        latestScore: number;
    };

    analyses: Analysis[];
};


const dashboardSlice = api.injectEndpoints({
    endpoints: (build) => ({
        getDashboard: build.query<DashboardResponse, void>({
            query: () => ({
                url: '/api/v1/dashboard',
                method: 'GET',
            }),
        }),
        getAnalysesById: build.query<Analysis, string>({
            query: (id) => ({
                url: `/api/v1/analysis/${id}`,
                method: 'GET',
            }),
        }),
    }),
});


export const { useGetDashboardQuery , useGetAnalysesByIdQuery } = dashboardSlice;
