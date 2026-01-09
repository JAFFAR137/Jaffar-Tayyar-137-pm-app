
import React, { useState, useCallback } from 'react';
import { Stakeholder, ScheduleDetails, Risk } from './types';
import { generatePmPlans } from './services/geminiService';
import Header from './components/Header';
import Navbar from './components/Navbar';
import StakeholderForm from './components/StakeholderForm';
import ScheduleForm from './components/ScheduleForm';
import RiskForm from './components/RiskForm';
import Dashboard from './components/Dashboard';
import GeneratedPlan from './components/GeneratedPlan';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { DocumentTextIcon } from './components/icons/DocumentTextIcon';
import { UsersIcon } from './components/icons/UsersIcon';
import { CalendarIcon } from './components/icons/CalendarIcon';
import { ShieldExclamationIcon } from './components/icons/ShieldExclamationIcon';

interface GeneratedPlans {
  stakeholderPlan: string;
  schedulePlan: string;
  riskRegister: string;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('setup');
  
  // Input State
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([
    { id: 1, name: 'Dr. Evelyn Reed', role: 'Project Sponsor', interest: 'High', influence: 'High', expectations: 'Timely delivery and budget adherence.' },
    { id: 2, name: 'John Carter', role: 'Lead Developer', interest: 'Medium', influence: 'High', expectations: 'Clear technical requirements and scope.' },
  ]);
  const [scheduleDetails, setScheduleDetails] = useState<ScheduleDetails>({
    duration: '6 months',
    milestones: 'Phase 1 completion (Month 2), Beta release (Month 4), Final launch (Month 6)',
    reportingFrequency: 'Bi-weekly',
    controlThresholds: '10% variance in schedule or budget',
  });
   const [risks, setRisks] = useState<Risk[]>([
    { id: 1, description: 'Unexpected API changes from a third-party vendor.', probability: 'Medium', impact: 'High', responseStrategy: 'Mitigate by creating an abstraction layer and having a backup plan.' },
    { id: 2, description: 'Key team member might leave the project.', probability: 'Low', impact: 'High', responseStrategy: 'Mitigate through knowledge sharing and documentation.' },
  ]);

  // Output State
  const [generatedPlans, setGeneratedPlans] = useState<GeneratedPlans | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<any>({});


  const validateInputs = useCallback(() => {
    const errors: any = {
        stakeholders: {},
        risks: {},
        schedule: {}
    };

    if (!projectDescription.trim()) {
        errors.projectDescription = 'Project description is required.';
    }

    stakeholders.forEach(s => {
        const stakeholderErrors: any = {};
        if (!s.name.trim()) stakeholderErrors.name = 'Name is required.';
        if (!s.role.trim()) stakeholderErrors.role = 'Role is required.';
        if (!s.expectations.trim()) stakeholderErrors.expectations = 'Key expectations are required.';
        if (Object.keys(stakeholderErrors).length > 0) {
            errors.stakeholders[s.id] = stakeholderErrors;
        }
    });

    if (!scheduleDetails.duration.trim()) errors.schedule.duration = 'Project duration is required.';
    if (!scheduleDetails.milestones.trim()) errors.schedule.milestones = 'Key milestones are required.';
    if (!scheduleDetails.reportingFrequency.trim()) errors.schedule.reportingFrequency = 'Reporting frequency is required.';
    if (!scheduleDetails.controlThresholds.trim()) errors.schedule.controlThresholds = 'Control thresholds are required.';
    
    risks.forEach(r => {
        const riskErrors: any = {};
        if (!r.description.trim()) riskErrors.description = 'Risk description is required.';
        if (!r.responseStrategy.trim()) riskErrors.responseStrategy = 'Response strategy is required.';
        if (Object.keys(riskErrors).length > 0) {
            errors.risks[r.id] = riskErrors;
        }
    });

    // Clean up empty error objects
    if (Object.keys(errors.stakeholders).length === 0) delete errors.stakeholders;
    if (Object.keys(errors.risks).length === 0) delete errors.risks;
    if (Object.keys(errors.schedule).length === 0) delete errors.schedule;

    return errors;
}, [projectDescription, stakeholders, scheduleDetails, risks]);


  const handleGeneratePlans = useCallback(async () => {
    setError(null);
    setValidationErrors({});
    
    const validation = validateInputs();
    if (Object.keys(validation).length > 0) {
        setValidationErrors(validation);
        setError('Please fix the validation errors before generating reports.');
        return;
    }
    
    setIsLoading(true);
    setGeneratedPlans(null);

    try {
      const result = await generatePmPlans(projectDescription, stakeholders, scheduleDetails, risks);
      if (result.stakeholderPlan && result.schedulePlan && result.riskRegister) {
        setGeneratedPlans(result);
        setActiveTab('reports');
      } else {
         throw new Error('Received an invalid response from the AI model.');
      }
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [projectDescription, stakeholders, scheduleDetails, risks, validateInputs]);

  const renderContent = () => {
    switch (activeTab) {
        case 'dashboard':
            return <Dashboard 
                projectDescription={projectDescription} 
                stakeholders={stakeholders}
                scheduleDetails={scheduleDetails}
                risks={risks}
            />;
        case 'reports':
             return (
                <div className="space-y-8">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-800/50 rounded-xl border border-slate-700">
                           <svg className="animate-spin h-8 w-8 text-teal-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           <h3 className="text-xl font-bold text-slate-200">Generating Reports...</h3>
                           <p className="text-slate-400">The AI is crafting your PMBOK® plans. This might take a moment.</p>
                        </div>
                    )}
                    {error && <p className="text-red-400 text-center bg-red-500/10 p-4 rounded-md">{error}</p>}
                    
                    {generatedPlans ? (
                        <div className="space-y-6">
                            <GeneratedPlan title="Stakeholder Engagement Plan" content={generatedPlans.stakeholderPlan} />
                            <GeneratedPlan title="Schedule Management Plan" content={generatedPlans.schedulePlan} />
                            <GeneratedPlan title="Risk Register" content={generatedPlans.riskRegister} />
                        </div>
                    ) : (
                        !isLoading && <p className="text-center text-slate-400 py-12">Generate plans from the "Project Setup" tab to see your reports here.</p>
                    )}
                </div>
            );
        case 'setup':
        default:
            return (
                <div className="space-y-8">
                  {/* Forms */}
                  <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700">
                    <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center"><DocumentTextIcon className="h-6 w-6 mr-3" />1. Project Description</h2>
                    <textarea value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} placeholder="Describe your project, its goals, and key deliverables..." className={`w-full h-32 p-3 bg-slate-900 border rounded-md transition-colors ${validationErrors.projectDescription ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-600 focus:ring-teal-500 focus:border-teal-500'}`}/>
                    {validationErrors.projectDescription && <p className="text-red-400 text-sm mt-1">{validationErrors.projectDescription}</p>}
                  </div>
                  <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700">
                    <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center"><UsersIcon className="h-6 w-6 mr-3" />2. Plan Stakeholder Engagement (5.2)</h2>
                    <StakeholderForm stakeholders={stakeholders} setStakeholders={setStakeholders} errors={validationErrors.stakeholders} />
                  </div>
                  <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700">
                    <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center"><CalendarIcon className="h-6 w-6 mr-3" />3. Plan Schedule Management (3.1)</h2>
                    <ScheduleForm scheduleDetails={scheduleDetails} setScheduleDetails={setScheduleDetails} errors={validationErrors.schedule} />
                  </div>
                   <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700">
                    <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center"><ShieldExclamationIcon className="h-6 w-6 mr-3" />4. Identify Risks</h2>
                    <RiskForm risks={risks} setRisks={setRisks} errors={validationErrors.risks} />
                  </div>
                  
                  {/* Generate Button */}
                  <div className="flex flex-col pt-4 sticky bottom-4">
                    <button onClick={handleGeneratePlans} disabled={isLoading} className="w-full flex items-center justify-center bg-teal-600 hover:bg-teal-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                      {isLoading ? ( <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>) : (<SparklesIcon className="h-6 w-6 mr-2" />)}
                      {isLoading ? 'Generating...' : 'Generate AI Reports'}
                    </button>
                    {error && activeTab === 'setup' && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
                  </div>
                </div>
            );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
