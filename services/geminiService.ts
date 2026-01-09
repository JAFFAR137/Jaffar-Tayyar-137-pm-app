
import { GoogleGenAI, Type } from "@google/genai";
import { Stakeholder, ScheduleDetails, Risk } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        stakeholderPlan: {
            type: Type.STRING,
            description: "A detailed stakeholder engagement plan in Markdown format."
        },
        schedulePlan: {
            type: Type.STRING,
            description: "A detailed schedule management plan in Markdown format."
        },
        riskRegister: {
            type: Type.STRING,
            description: "A detailed risk register in Markdown format, identifying and assessing project risks."
        }
    },
    required: ["stakeholderPlan", "schedulePlan", "riskRegister"]
};

function buildPrompt(projectDescription: string, stakeholders: Stakeholder[], scheduleDetails: ScheduleDetails, risks: Risk[]): string {
    const stakeholderList = stakeholders.map(s => 
        `- Name: ${s.name}\n  Role: ${s.role}\n  Interest: ${s.interest}\n  Influence: ${s.influence}\n  Expectations: ${s.expectations}`
    ).join('\n');
    
    const riskList = risks.map(r => 
        `- Description: ${r.description}\n  Probability: ${r.probability}\n  Impact: ${r.impact}\n  Proposed Response: ${r.responseStrategy}`
    ).join('\n');

    return `
    As an expert Project Management Professional (PMP) certified by PMI, your task is to generate three key project management plans based on the PMBOK® Guide. Use the provided project details to create comprehensive and practical plans.

    **Project Description:**
    ${projectDescription}

    **1. Stakeholders for Plan Stakeholder Engagement (Process 5.2):**
    ${stakeholderList}

    **2. Parameters for Plan Schedule Management (Process 3.1):**
    - Project Duration/Timeline: ${scheduleDetails.duration}
    - Key Milestones: ${scheduleDetails.milestones}
    - Reporting Frequency: ${scheduleDetails.reportingFrequency}
    - Schedule Control Thresholds: ${scheduleDetails.controlThresholds}

    **3. Identified Risks for Risk Register:**
    ${riskList}

    **Instructions:**
    Based on the information above, generate a JSON object containing three detailed management plans/documents. The output must adhere to the provided JSON schema.

    - **stakeholderPlan**: Create a Stakeholder Engagement Plan. Analyze the provided stakeholder list and devise strategies for communication, engagement, and managing expectations for each. Structure this as a formal plan in Markdown format.
    - **schedulePlan**: Create a Schedule Management Plan. Detail the processes for developing, monitoring, and controlling the project schedule. Include sections on schedule model development, units of measure, control thresholds, and reporting formats. Structure this as a formal plan in Markdown format.
    - **riskRegister**: Create a Risk Register. For each identified risk, provide a more detailed assessment, assign a risk score (e.g., qualitative), and elaborate on the response strategy. Format this as a professional risk register in Markdown.

    Ensure all documents are practical, professional, and directly tailored to the provided project context.
    `;
}

export const generatePmPlans = async (
    projectDescription: string, 
    stakeholders: Stakeholder[], 
    scheduleDetails: ScheduleDetails,
    risks: Risk[]
): Promise<{ stakeholderPlan: string; schedulePlan: string; riskRegister: string; }> => {
    
    const prompt = buildPrompt(projectDescription, stakeholders, scheduleDetails, risks);

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.5,
            },
        });
        
        const jsonString = response.text.trim();
        const parsedResponse = JSON.parse(jsonString);

        if (parsedResponse.stakeholderPlan && parsedResponse.schedulePlan && parsedResponse.riskRegister) {
            return parsedResponse;
        } else {
            throw new Error("AI response is missing one or more required plans.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate plans from AI. Please check the console for details.");
    }
};
