import { useState } from 'react';
import { ActiveView, ScenarioData, ScanRecord } from './types';
import { SCENARIOS, INITIAL_SCAN_RECORDS, evaluateText } from './data/scenarios';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { KeypadModeView } from './components/KeypadModeView';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [smsInput, setSmsInput] = useState<string>(
    'URGENT! Your account will be blocked. Verify your KYC immediately at example.com'
  );
  const [currentScenario, setCurrentScenario] = useState<ScenarioData>(SCENARIOS.kyc);
  const [scanRecords, setScanRecords] = useState<ScanRecord[]>(INITIAL_SCAN_RECORDS);
  const [totalAnalyzed, setTotalAnalyzed] = useState<number>(17);
  const [highRiskCount, setHighRiskCount] = useState<number>(7);
  const [safetyTipsStudied] = useState<number>(8);

  const handleSelectScenario = (scenarioKey: string) => {
    const data = SCENARIOS[scenarioKey];
    if (data) {
      setCurrentScenario(data);
      setSmsInput(data.text);
    }
  };

  const handleAnalyze = () => {
    const textToAnalyze = smsInput.trim() || 'URGENT! Your account will be blocked. Verify your KYC immediately at example.com';
    const result = evaluateText(textToAnalyze);
    setCurrentScenario(result);
    setTotalAnalyzed(prev => prev + 1);
    if (result.risk === 'HIGH RISK') {
      setHighRiskCount(prev => prev + 1);
    }

    // Add new record to top of history
    const newRecord: ScanRecord = {
      id: `scan-${Date.now()}`,
      timestamp: 'Just Now',
      messageSnippet: `“${textToAnalyze.slice(0, 70)}${textToAnalyze.length > 70 ? '...' : ''}”`,
      fullText: textToAnalyze,
      risk: result.risk,
      indicatorsFlaggedCount: result.chips.filter(c => c.type === 'danger').length,
    };
    setScanRecords(prev => [newRecord, ...prev.slice(0, 9)]);

    // Smooth scroll to result
    setTimeout(() => {
      const resCard = document.getElementById('dashboard-result-card');
      if (resCard) {
        resCard.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleClear = () => {
    setSmsInput('');
  };

  const handleResetText = () => {
    setSmsInput(currentScenario.text);
  };

  const handleSimulateOnKeypad = () => {
    setActiveView('keypad');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchView = (view: ActiveView) => {
    setActiveView(view);
    if (view === 'analyzer') {
      setTimeout(() => {
        const sec = document.getElementById('dashboard-analyzer-section');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
        const input = document.getElementById('dashboard-sms-input');
        if (input) input.focus();
      }, 50);
    } else if (view === 'history') {
      setTimeout(() => {
        const hSec = document.getElementById('dashboard-history-section');
        if (hSec) hSec.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (view === 'awareness') {
      setTimeout(() => {
        const aSec = document.getElementById('dashboard-awareness-section');
        if (aSec) aSec.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (view === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#080d1a] text-slate-200 min-h-screen font-sans antialiased retro-grid flex flex-col md:flex-row selection:bg-cyan-500 selection:text-white">
      {/* Persistent Left Sidebar Navigation */}
      <Sidebar activeView={activeView} onSelectView={handleSwitchView} />

      {/* Main Viewport Container */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {/* Top Bar with Dual Mode Switcher */}
        <Header activeView={activeView} onSelectView={handleSwitchView} />

        {/* Main Content Area */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8 flex-1">
          {activeView === 'keypad' ? (
            <KeypadModeView
              currentScenario={currentScenario}
              smsText={smsInput}
              onSwitchView={handleSwitchView}
              onOpenInWebAnalyzer={() => handleSwitchView('analyzer')}
            />
          ) : (
            <DashboardView
              smsInput={smsInput}
              onSmsInputChange={setSmsInput}
              currentScenario={currentScenario}
              onSelectScenario={handleSelectScenario}
              onAnalyze={handleAnalyze}
              onClear={handleClear}
              onResetText={handleResetText}
              onSimulateOnKeypad={handleSimulateOnKeypad}
              onSwitchView={handleSwitchView}
              scanRecords={scanRecords}
              totalAnalyzed={totalAnalyzed}
              highRiskCount={highRiskCount}
              safetyTipsStudied={safetyTipsStudied}
            />
          )}
        </div>

        {/* Site Footer */}
        <footer className="mt-auto border-t border-slate-800/80 bg-[#090f20] px-6 py-4 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-white font-semibold">ScamShield</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Cybersecurity Prototype for College Hackathon Presentation</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-slate-500 font-mono">
            <span>SIMULATED FRONTEND ONLY</span>
            <span>NO TELECOM CONNECTIONS</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
