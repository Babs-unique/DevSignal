import { api } from '../api/api.ts';

type AnalysisSummary = {
    overallAssessment: string;
    marketReadiness: string;
    hiringLikelihood: string;
};

type ExistingSkill = {
    skill: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    confidence: number;
    category: string;
};

type MissingSkill = {
    skill: string;
    importance: 'Nice to Have' | 'Recommended' | 'Important' | 'Critical';
    category: string;
    reason: string;
};

type RecommendationAction = {
    title: string;
    description: string;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedTime: string;
    careerImpact: 'Low Impact' | 'Medium Impact' | 'High Impact' | 'Very High Impact';
};

type KeywordAnalysis = {
    matchedKeywords: string[];
    missingKeywords: string[];
};

type ResumeFeedback = {
    strengths: string[];
    weaknesses: string[];
};

type RadarChartData = {
    skill: string;
    userScore: number;
    marketExpectedScore: number;
};

export type Analysis = {
    _id: string;
    user: string;
    roleTitle: string;
    companyName?: string;
    resumeFileName?: string;
    resumeText: string;
    jobDescription: string;
    matchScore: number;

    analysisSummary: AnalysisSummary;

    existingSkills: ExistingSkill[];

    missingSkills: MissingSkill[];

    recommendationActions: RecommendationAction[];

    keywordAnalysis: KeywordAnalysis;

    resumeFeedback: ResumeFeedback;

    radarChartData: RadarChartData[];

    createdAt: string;
    updatedAt: string;

    __v: number;
};


export type DashboardResponse = {
    latestMetric: Analysis | null;
    analyses: Analysis[];
};

const dashboardSlice = api.injectEndpoints({
    endpoints: (build) => ({
        getDashboard: build.query<DashboardResponse, void>({
            query: () => ({
                url: '/api/v1/dashboard',
                method: 'GET',
            }),
            transformResponse: (response: { data: DashboardResponse }) => response.data,
        }),
        getAnalysesById: build.query<Analysis, string>({
            query: (id) => ({
                url: `/api/v1/history/${id}`,
                method: 'GET',
            }),
            transformResponse: (response: { data: { analysis: Analysis } }) => response.data.analysis,
        }),
    }),
});


export const { useGetDashboardQuery , useGetAnalysesByIdQuery } = dashboardSlice;
