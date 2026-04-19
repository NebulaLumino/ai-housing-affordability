'use client';

import { useState } from 'react';

export default function HousingAffordability() {
  const [form, setForm] = useState({
    annualIncome: '', monthlyDebt: '', downPayment: '', creditScore: '',
    targetCity: '', homePrice: '', loanTerm: '30',
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate analysis');
      setResult(data.result || '');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/20 mb-6">
            <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3">AI Housing Affordability Calculator</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Go beyond the 28/36 rule. Get a lifestyle-adjusted affordability analysis that tells you what you can truly afford.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6 text-amber-400">Your Housing Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Annual Gross Income ($)</label>
                <input name="annualIncome" value={form.annualIncome} onChange={handleChange} required placeholder="e.g. 90000"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Monthly Debt Payments ($)</label>
                <input name="monthlyDebt" value={form.monthlyDebt} onChange={handleChange} required placeholder="e.g. 400"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Down Payment ($)</label>
                <input name="downPayment" value={form.downPayment} onChange={handleChange} required placeholder="e.g. 30000"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Credit Score</label>
                <input name="creditScore" value={form.creditScore} onChange={handleChange} required placeholder="e.g. 720"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Target City</label>
                <input name="targetCity" value={form.targetCity} onChange={handleChange} required placeholder="e.g. Austin, TX"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Target Home Price ($)</label>
                  <input name="homePrice" value={form.homePrice} onChange={handleChange} required placeholder="e.g. 350000"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Loan Term</label>
                  <select name="loanTerm" value={form.loanTerm} onChange={handleChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors">
                    <option value="15">15 years</option>
                    <option value="20">20 years</option>
                    <option value="30">30 years</option>
                  </select>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-amber-800 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                {loading ? (
                  <><svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Analyzing Affordability...</>
                ) : '🏠 Calculate True Affordability'}
              </button>
            </form>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6 text-amber-400">AI Affordability Analysis</h2>
            {error && <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 text-red-400">{error}</div>}
            {!loading && !result && !error && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <svg className="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                <p className="text-lg text-center">Enter your details to get your<br/><span className="text-amber-400 font-medium">true affordability analysis</span></p>
              </div>
            )}
            {loading && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-4">
                <svg className="animate-spin h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                <p className="text-lg">Calculating your true budget...</p>
              </div>
            )}
            {!loading && result && (
              <div className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed">
                {result}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
