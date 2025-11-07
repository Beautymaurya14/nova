import { Rocket, ArrowRight } from 'lucide-react';

interface WelcomePageProps {
  onGetStarted: () => void;
}

export const WelcomePage = ({ onGetStarted }: WelcomePageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-block p-6 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-3xl mb-8 animate-pulse">
          <Rocket className="w-20 h-20 text-white" />
        </div>

        <h1 className="text-6xl font-bold text-white mb-6">
          6-Month AI Engineer Roadmap
        </h1>

        <p className="text-2xl text-slate-300 mb-4">
          Nov 2025 - Apr 2026 | Get Hired Plan
        </p>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-8 mb-10 border border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-6">Your Mission</h2>
          <div className="space-y-3 text-left text-slate-300 text-lg">
            <p>Build one killer project that will get you hired</p>
            <p>Master the AI stack: Python, FastAPI, LlamaIndex, RAG</p>
            <p>Sharpen your C++ DSA skills daily (1 hour/day)</p>
            <p>Deploy a live, production-ready AI application</p>
            <p>Land a ₹10-15 LPA AI Engineer role</p>
          </div>
        </div>

        <button
          onClick={onGetStarted}
          className="group px-10 py-5 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xl font-bold rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto"
        >
          Get Started
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="mt-8 text-slate-500 text-sm">
          Your code and live demos will do the talking. Show, don't tell.
        </p>
      </div>
    </div>
  );
};
