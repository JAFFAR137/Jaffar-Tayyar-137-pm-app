
import React from 'react';
import { Risk } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';

interface RiskFormProps {
  risks: Risk[];
  setRisks: React.Dispatch<React.SetStateAction<Risk[]>>;
}

const RiskForm: React.FC<RiskFormProps> = ({ risks, setRisks }) => {
  
  const addRisk = () => {
    const newRisk: Risk = {
      id: Date.now(),
      description: '',
      probability: 'Medium',
      impact: 'Medium',
      responseStrategy: '',
    };
    setRisks([...risks, newRisk]);
  };

  const removeRisk = (id: number) => {
    setRisks(risks.filter(s => s.id !== id));
  };

  const handleRiskChange = (id: number, field: keyof Omit<Risk, 'id'>, value: string) => {
    setRisks(
      risks.map(r =>
        r.id === id ? { ...r, [field]: value } : r
      )
    );
  };

  return (
    <div className="space-y-6">
      {risks.map((risk) => (
        <div key={risk.id} className="p-4 bg-slate-900/70 border border-slate-700 rounded-lg space-y-4 relative">
          <button
              onClick={() => removeRisk(risk.id)}
              className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition-colors"
              aria-label="Remove Risk"
          >
              <TrashIcon className="h-5 w-5" />
          </button>
          
          <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Risk Description</label>
              <textarea
                  value={risk.description}
                  onChange={(e) => handleRiskChange(risk.id, 'description', e.target.value)}
                  placeholder="e.g., Key supplier for component X might face delivery delays."
                  className="w-full h-20 bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Probability</label>
                   <select
                      value={risk.probability}
                      onChange={(e) => handleRiskChange(risk.id, 'probability', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                  </select>
              </div>
               <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Impact</label>
                   <select
                      value={risk.impact}
                      onChange={(e) => handleRiskChange(risk.id, 'impact', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                  </select>
              </div>
          </div>
          <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Response Strategy</label>
              <input
                  type="text"
                  value={risk.responseStrategy}
                  onChange={(e) => handleRiskChange(risk.id, 'responseStrategy', e.target.value)}
                  placeholder="e.g., Mitigate by identifying an alternative supplier."
                  className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
          </div>
        </div>
      ))}
       <button
        onClick={addRisk}
        className="w-full flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-teal-300 font-semibold py-2 px-4 rounded-md transition-colors"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Add Risk
      </button>
    </div>
  );
};

export default RiskForm;
