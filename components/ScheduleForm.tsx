
import React from 'react';
import { ScheduleDetails } from '../types';

interface ScheduleFormProps {
    scheduleDetails: ScheduleDetails;
    setScheduleDetails: React.Dispatch<React.SetStateAction<ScheduleDetails>>;
    errors?: Partial<Record<keyof ScheduleDetails, string>>;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ scheduleDetails, setScheduleDetails, errors }) => {
    
    const handleChange = (field: keyof ScheduleDetails, value: string) => {
        setScheduleDetails(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Project Duration</label>
                <input
                    type="text"
                    value={scheduleDetails.duration}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    placeholder="e.g., 9 months, Q3-Q4 2024"
                    className={`w-full bg-slate-900 border rounded-md p-2 focus:ring-1 transition-colors ${errors?.duration ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-teal-500'}`}
                />
                {errors?.duration && <p className="text-red-400 text-xs mt-1">{errors.duration}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Key Milestones</label>
                <textarea
                    value={scheduleDetails.milestones}
                    onChange={(e) => handleChange('milestones', e.target.value)}
                    placeholder="List major milestones, e.g., 'Design complete, Prototype ready, User testing'"
                    className={`w-full h-24 bg-slate-900 border rounded-md p-2 focus:ring-1 transition-colors ${errors?.milestones ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-teal-500'}`}
                />
                {errors?.milestones && <p className="text-red-400 text-xs mt-1">{errors.milestones}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Reporting Frequency</label>
                <input
                    type="text"
                    value={scheduleDetails.reportingFrequency}
                    onChange={(e) => handleChange('reportingFrequency', e.target.value)}
                    placeholder="e.g., Weekly, Bi-weekly, Monthly"
                    className={`w-full bg-slate-900 border rounded-md p-2 focus:ring-1 transition-colors ${errors?.reportingFrequency ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-teal-500'}`}
                />
                {errors?.reportingFrequency && <p className="text-red-400 text-xs mt-1">{errors.reportingFrequency}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Control Thresholds</label>
                <input
                    type="text"
                    value={scheduleDetails.controlThresholds}
                    onChange={(e) => handleChange('controlThresholds', e.target.value)}
                    placeholder="e.g., '10% cost variance'"
                    className={`w-full bg-slate-900 border rounded-md p-2 focus:ring-1 transition-colors ${errors?.controlThresholds ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-teal-500'}`}
                />
                {errors?.controlThresholds && <p className="text-red-400 text-xs mt-1">{errors.controlThresholds}</p>}
            </div>
        </div>
    );
};

export default ScheduleForm;
