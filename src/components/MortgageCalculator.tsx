import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

interface MortgageCalculatorProps {
  isDarkMode: boolean;
  onOpenInspection: (title?: string) => void;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  isDarkMode,
  onOpenInspection
}) => {
  const [homePrice, setHomePrice] = useState<number>(3500000);
  const [downPercent, setDownPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);

  const downAmount = (homePrice * downPercent) / 100;
  const loanAmount = homePrice - downAmount;

  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment = Math.round(
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1)
    );
  } else {
    monthlyPayment = Math.round(loanAmount / totalPayments);
  }

  const totalCost = monthlyPayment * totalPayments;
  const totalInterest = Math.max(0, totalCost - loanAmount);
  
  // 5-year estimated property appreciation at 8% annual
  const projectedAppreciation5yr = Math.round(homePrice * Math.pow(1.08, 5));
  const estimatedEquityGain = projectedAppreciation5yr - homePrice;

  return (
    <section id="calculator" className={`py-24 transition-colors ${
      isDarkMode ? 'bg-[#0A0A0B] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1C] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em]">
            <Calculator className="w-3.5 h-3.5" /> Real Estate Financial Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white">
            Mortgage & Investment ROI Calculator
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Plan your purchase with financial transparency. Estimate monthly payments and project 5-year capital appreciation.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className={`p-6 sm:p-10 rounded-sm border shadow-2xl max-w-5xl mx-auto ${
          isDarkMode ? 'bg-[#1A1A1C] border-[#2A2A2C]' : 'bg-white border-slate-200'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Input Controls Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Home Price */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider">
                  <span className="text-slate-400">Property Purchase Price</span>
                  <span className="text-[#D4AF37] text-lg font-bold font-serif">
                    ${homePrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={15000000}
                  step={100000}
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer h-2 bg-[#0A0A0B] rounded-none border border-[#2A2A2C]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-serif">
                  <span>$500K</span>
                  <span>$7.5M</span>
                  <span>$15M+</span>
                </div>
              </div>

              {/* Down Payment % */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider">
                  <span className="text-slate-400">Down Payment ({downPercent}%)</span>
                  <span className="text-[#D4AF37] font-bold">
                    ${downAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={downPercent}
                  onChange={(e) => setDownPercent(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer h-2 bg-[#0A0A0B] rounded-none border border-[#2A2A2C]"
                />
              </div>

              {/* Interest Rate & Term */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5 text-[#D4AF37]" /> Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="15"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className={`w-full px-4 py-2.5 rounded-sm border text-sm font-bold outline-none ${
                      isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Loan Term (Years)
                  </label>
                  <select
                    value={loanTermYears}
                    onChange={(e) => setLoanTermYears(Number(e.target.value))}
                    className={`w-full px-4 py-2.5 rounded-sm border text-sm font-bold outline-none ${
                      isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value={15}>15 Years Fixed</option>
                    <option value={20}>20 Years Fixed</option>
                    <option value={30}>30 Years Fixed</option>
                  </select>
                </div>
              </div>

              {/* Principal & Loan Summary */}
              <div className={`p-4 rounded-sm border grid grid-cols-2 gap-2 text-xs ${
                isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Total Loan Amount</span>
                  <strong className="text-white text-base font-serif">${loanAmount.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Total Interest Payable</span>
                  <strong className="text-[#D4AF37] text-base font-serif">${totalInterest.toLocaleString()}</strong>
                </div>
              </div>

            </div>

            {/* Result Display Box Column (5 cols) */}
            <div className={`lg:col-span-5 p-6 sm:p-8 rounded-sm border text-center space-y-6 shadow-2xl relative overflow-hidden ${
              isDarkMode ? 'bg-[#0A0A0B] border-[#D4AF37]/50' : 'bg-slate-900 text-white border-slate-800'
            }`}>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] block">
                  Estimated Monthly Payment
                </span>
                <div className="text-4xl sm:text-5xl font-black font-serif text-white tracking-tight">
                  ${monthlyPayment.toLocaleString()}
                  <span className="text-xs font-normal text-slate-400">/mo</span>
                </div>
              </div>

              <div className="h-px bg-[#2A2A2C] w-full" />

              {/* 5-Year Equity Projection */}
              <div className="space-y-2 text-left bg-[#1A1A1C] p-4 rounded-sm border border-[#2A2A2C]">
                <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-bold uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4" /> 5-Year Equity Growth Projection
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Est. Property Value (5 Yrs)</span>
                    <strong className="text-white text-base font-serif">${projectedAppreciation5yr.toLocaleString()}</strong>
                  </div>
                  <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-2 py-0.5 rounded-sm">
                    +${estimatedEquityGain.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onOpenInspection(`Financial Advisory for $${homePrice.toLocaleString()} Estate`)}
                className="w-full bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-xs uppercase tracking-wider py-3.5 rounded-sm shadow-lg transition"
              >
                Discuss Financing Options
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
