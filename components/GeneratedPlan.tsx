
import React from 'react';

interface GeneratedPlanProps {
    title: string;
    content: string;
}

const GeneratedPlan: React.FC<GeneratedPlanProps> = ({ title, content }) => {
    // A simple function to render markdown-like text with basic formatting
    const renderContent = (text: string) => {
        return text.split('\n').map((line, index) => {
            if (line.startsWith('### ')) {
                return <h4 key={index} className="text-lg font-semibold text-sky-400 mt-4 mb-2">{line.substring(4)}</h4>;
            }
            if (line.startsWith('## ')) {
                return <h3 key={index} className="text-xl font-bold text-teal-400 mt-6 mb-3 border-b border-slate-600 pb-2">{line.substring(3)}</h3>;
            }
            if (line.startsWith('# ')) {
                return <h2 key={index} className="text-2xl font-bold text-teal-300 mt-8 mb-4">{line.substring(2)}</h2>;
            }
            if (line.startsWith('- ')) {
                return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
            }
            if (line.trim() === '') {
                return <br key={index} />;
            }
            return <p key={index} className="text-slate-300 leading-relaxed">{line}</p>;
        });
    };

    return (
        <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-teal-400 mb-4">{title}</h2>
            <div className="prose prose-invert prose-sm md:prose-base max-w-none space-y-3">
                {renderContent(content)}
            </div>
        </div>
    );
};

export default GeneratedPlan;
