import React from 'react';
import { AlertTriangle, KeyRound } from 'lucide-react';

const ApiKeyChecker: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-gray-950 text-white flex items-center justify-center z-[100] p-4 animate-subtle-fade-in">
            <div className="w-full max-w-2xl bg-slate-900 border border-red-500/50 rounded-2xl shadow-2xl p-8 text-center glassmorphic">
                <div className="mx-auto w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4 border-2 border-red-500/50">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h1 className="text-3xl font-bold text-red-400 mb-2">Configuration Error</h1>
                <h2 className="text-xl font-semibold mb-4">Gemini API Key is Missing</h2>
                
                <p className="text-gray-300 mb-6">
                    I understand you're eager to get Nihara working, but she can't connect to the AI without a valid API key. 
                    Your key is missing from the deployment environment.
                </p>

                <div className="text-left bg-black/30 p-6 rounded-lg border border-white/10">
                    <h3 className="text-lg font-bold mb-3 flex items-center">
                        <KeyRound className="mr-2 text-blue-400"/>
                        How to Fix This on Netlify
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                        <li>Go to your <strong className="text-white">Netlify Site Dashboard</strong>.</li>
                        <li>Navigate to <strong className="text-white">Site configuration</strong> &rarr; <strong className="text-white">Build & deploy</strong> &rarr; <strong className="text-white">Environment</strong>.</li>
                        <li>Under <strong className="text-white">Environment variables</strong>, click <strong className="text-white">Add a variable</strong>.</li>
                        <li>
                            Enter the following exactly:
                            <div className="bg-gray-800 p-3 rounded-md my-2 text-sm font-mono">
                                <div><span className="text-gray-400">Key:</span> API_KEY</div>
                                <div><span className="text-gray-400">Value:</span> [Paste your Gemini API key here]</div>
                            </div>
                        </li>
                        <li>Click <strong className="text-white">Save</strong>.</li>
                        <li className="font-bold text-yellow-400">
                            CRITICAL: You must redeploy your site for the change to take effect! Go to the "Deploys" tab and trigger a new deploy.
                        </li>
                    </ol>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                    <p className="font-semibold text-gray-400">Why not put the key in the code?</p>
                    <p>
                        Adding your key directly to the code is a major security risk. If you publish your code, your secret key becomes public, allowing anyone to use your AI credits. Environment variables keep your secrets safe on the server.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyChecker;