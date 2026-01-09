
export interface Stakeholder {
  id: number;
  name: string;
  role: string;
  interest: 'Low' | 'Medium' | 'High';
  influence: 'Low' | 'Medium' | 'High';
  expectations: string;
}

export interface ScheduleDetails {
  duration: string;
  milestones: string;
  reportingFrequency: string;
  controlThresholds: string;
}

export interface Risk {
  id: number;
  description: string;
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  responseStrategy: string;
}
