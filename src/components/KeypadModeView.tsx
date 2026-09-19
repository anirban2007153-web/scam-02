import React, { useState, useEffect } from 'react';
import { ScenarioData, ActiveView } from '../types';
import { Smartphone, ArrowLeft, Phone, PhoneOff, Zap, Loader2, RefreshCw } from 'lucide-react';

interface KeypadModeViewProps {
  currentScenario: ScenarioData;
  smsText: string;
  onSwitchView: (view: ActiveView) => void;
  onOpenInWebAnalyzer: () => void;
}

export const KeypadModeView: React.FC<KeypadModeViewProps> = ({
  currentScenario,
  smsText,
  onSwitchView,
  onOpenInWebAnalyzer,
}) => {
  // Keypad simulation states: 1: Message Received, 2: Analyzing, 3: Warning Displayed
  const [keypadState, setKeypadState] = useState<1 | 2 | 3>(1);
  const [clockTime, setClockTime] = useState<string>('10:45');
  const [alertKey, setAlertKey] = useState<number>(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setClockTime(`${hrs}:${mins}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleStartAnalysis = () => {
    if (keypadState === 1) {
      setKeypadState(2);
      setTimeout(() => {
        setKeypadState(3);
        setAlertKey(prev => prev + 1);
      }, 1200);
    } else if (keypadState === 3) {
      // Re-trigger alert visual flash
      setAlertKey(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setKeypadState(1);
  };

  const isDanger = currentScenario.risk === 'HIGH RISK';
  const isMedium = currentScenario.risk === 'MEDIUM RISK';
  const isSafe = currentScenario.risk === 'LOW RISK';

  return (
    <div className="space-y-6" id="view-keypad-mode">
      {/* Top Banner Card */}
      <div className="bg-[#121d36] rounded-xl border border-cyan-900/50 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                KEYPAD PHONE MODE
              </span>
              <span className="text-xs font-mono text-slate-400">Basic 2G Feature Phone Simulator</span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Simulating plain-text warning messages on monochrome & low-resolution displays for non-smartphone accessibility.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 flex-shrink-0">
          <button
            type="button"
            onClick={() => onSwitchView('analyzer')}
            className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition flex items-center space-x-1.5 shadow-md shadow-cyan-500/20 focus:outline-none cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Return to SMS Analyzer</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* PHONE CHASSIS COLUMN */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="text-center mb-2 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-mono font-semibold text-cyan-400 tracking-wider uppercase">
              Simulated 2G Feature Phone
            </span>
          </div>

          <div className="w-[300px] sm:w-[320px] bg-gradient-to-b from-[#1c2434] via-[#141b29] to-[#0c111a] rounded-[44px] p-5 shadow-2xl border-4 border-slate-700/80 relative flex flex-col items-center select-none">
            {/* Earpiece slit */}
            <div className="w-16 h-1.5 bg-slate-900 rounded-full border border-slate-700/60 mb-4"></div>

            <div className="text-[10px] font-mono tracking-widest text-slate-500 font-semibold mb-2 uppercase">
              SCAMSHIELD 2G-EDITION
            </div>

            {/* LCD SCREEN */}
            <div
              key={alertKey}
              id="phone-screen"
              className={`lcd-screen w-full h-[220px] rounded-lg p-3 flex flex-col justify-between transition-colors duration-300 border-2 border-[#54664c] relative overflow-hidden ${
                keypadState === 3 && (isDanger || isMedium) ? 'alert-state' : ''
              }`}
            >
              {/* LCD Status Header */}
              <div className="flex items-center justify-between text-xs tracking-wider pb-1 border-b border-[#2b3a24]/40 font-bold">
                <div className="flex items-center space-x-1">
                  <span>▲▲▲▲</span>
                  <span className="text-[11px]">2G</span>
                </div>
                <span>{clockTime}</span>
                <div className="flex items-center space-x-1">
                  <span>[||||]</span>
                </div>
              </div>

              {/* LCD Screen Dynamic Content */}
              <div className="my-auto py-1 space-y-1">
                {keypadState === 1 && (
                  <>
                    <div className="flex items-center justify-between font-bold text-xs uppercase border-b border-[#2b3a24]/30 pb-0.5">
                      <span>★ New Message</span>
                      <span>1/1</span>
                    </div>
                    <div className="text-xs leading-tight font-semibold">
                      <span className="block text-[11px]">From: {currentScenario.sender || 'Unknown Sender'}</span>
                      <p className="mt-1 text-sm leading-snug line-clamp-4">
                        “{smsText || currentScenario.text}”
                      </p>
                    </div>
                  </>
                )}

                {keypadState === 2 && (
                  <div className="text-center my-auto py-3 space-y-2">
                    <span className="block text-sm font-bold animate-pulse text-[#152312]">
                      &gt;&gt;&gt; ANALYZING &gt;&gt;&gt;
                    </span>
                    <p className="text-xs leading-tight font-semibold">
                      ScamShield is checking this message...
                    </p>
                    <div className="text-xs font-mono tracking-widest text-[#23351d] pt-1 font-bold">
                      [■■■■■■■□□□]
                    </div>
                  </div>
                )}

                {keypadState === 3 && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between font-bold text-xs uppercase border-b border-current pb-0.5">
                      <span>{currentScenario.keypadWarning.title}</span>
                      <span className="font-bold underline">{currentScenario.keypadWarning.riskHeader}</span>
                    </div>
                    <p className="text-xs leading-tight font-bold pt-0.5">
                      {currentScenario.keypadWarning.summary}
                    </p>
                    <p className="text-[11px] leading-snug">
                      {currentScenario.keypadWarning.instruction}
                    </p>
                  </div>
                )}
              </div>

              {/* LCD Softkey Labels */}
              <div className="flex items-center justify-between text-xs font-bold pt-1 border-t border-[#2b3a24]/40 uppercase">
                {keypadState === 1 && (
                  <>
                    <span>Options</span>
                    <span className="cursor-pointer underline" onClick={handleStartAnalysis}>Open</span>
                    <span className="cursor-pointer" onClick={handleReset}>Back</span>
                  </>
                )}
                {keypadState === 2 && (
                  <>
                    <span>Cancel</span>
                    <span>Wait</span>
                    <span>Back</span>
                  </>
                )}
                {keypadState === 3 && (
                  <>
                    <span className="cursor-pointer" onClick={handleReset}>Exit</span>
                    <span>Help</span>
                    <span className="cursor-pointer" onClick={handleReset}>Back</span>
                  </>
                )}
              </div>
            </div>

            {/* HARDWARE KEYPAD BUTTONS */}
            <div className="mt-5 w-full px-2 flex flex-col items-center">
              {/* Softkey Bars */}
              <div className="w-full flex justify-between items-center px-3 mb-2">
                <button
                  type="button"
                  onClick={handleStartAnalysis}
                  title="Left Softkey - Open / Inspect"
                  className="w-12 h-3.5 bg-slate-700/80 rounded-sm border border-slate-600 shadow active:translate-y-0.5 hover:bg-slate-600 focus:outline-none cursor-pointer"
                />
                <button
                  type="button"
                  onClick={handleReset}
                  title="Right Softkey - Back / Reset"
                  className="w-12 h-3.5 bg-slate-700/80 rounded-sm border border-slate-600 shadow active:translate-y-0.5 hover:bg-slate-600 focus:outline-none cursor-pointer"
                />
              </div>

              {/* Call / OK D-Pad / End row */}
              <div className="w-full flex items-center justify-between px-2 mb-3">
                <button
                  type="button"
                  onClick={handleStartAnalysis}
                  title="Call / OK / Start Scan"
                  className="w-11 h-8 rounded-lg bg-emerald-700 border border-emerald-500 shadow flex items-center justify-center text-white active:scale-95 hover:bg-emerald-600 focus:outline-none cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                </button>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleStartAnalysis}
                  title="OK / Select Key"
                  className="w-16 h-12 bg-slate-800 rounded-xl border-2 border-slate-600 flex items-center justify-center shadow-inner relative cursor-pointer active:scale-95 transition hover:border-cyan-400"
                >
                  <div className="w-6 h-5 bg-slate-700 rounded-md border border-slate-500 flex items-center justify-center text-[9px] font-mono text-slate-300 font-bold">
                    OK
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset keypad simulation / End call"
                  className="w-11 h-8 rounded-lg bg-rose-700 border border-rose-500 shadow flex items-center justify-center text-white active:scale-95 hover:bg-rose-600 focus:outline-none cursor-pointer"
                >
                  <PhoneOff className="w-4 h-4" />
                </button>
              </div>

              {/* 3x4 Number Grid */}
              <div className="w-full grid grid-cols-3 gap-2 px-1 text-center font-mono">
                {[
                  { key: '1', sub: '. , _' },
                  { key: '2', sub: 'ABC' },
                  { key: '3', sub: 'DEF' },
                  { key: '4', sub: 'GHI' },
                  { key: '5', sub: 'JKL' },
                  { key: '6', sub: 'MNO' },
                  { key: '7', sub: 'PQRS' },
                  { key: '8', sub: 'TUV' },
                  { key: '9', sub: 'WXYZ' },
                  { key: '*', sub: '+' },
                  { key: '0', sub: '␣' },
                  { key: '#', sub: '⇧' },
                ].map(item => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={item.key === '#' ? handleReset : handleStartAnalysis}
                    className="bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 rounded-lg py-1.5 text-slate-200 shadow-sm text-xs font-bold active:scale-95 transition focus:outline-none cursor-pointer"
                  >
                    {item.key} <span className="block text-[8px] font-normal text-slate-400">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-500 mt-3">Concept demonstration only • Local simulation</span>
        </div>

        {/* RIGHT SIMULATOR CONTROLS COLUMN */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-[#121d36] rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Keypad Phone SMS Demonstration</h3>
                <span
                  className={`px-2.5 py-1 rounded text-xs font-mono font-medium border ${
                    keypadState === 1
                      ? 'bg-blue-950 text-cyan-300 border-blue-800'
                      : keypadState === 2
                      ? 'bg-amber-950 text-amber-300 border-amber-800 animate-pulse'
                      : isDanger
                      ? 'bg-rose-950 text-rose-300 border-rose-800'
                      : isMedium
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  }`}
                >
                  {keypadState === 1
                    ? 'Message received'
                    : keypadState === 2
                    ? 'Analyzing message...'
                    : 'Warning displayed on simulated keypad phone'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                This simulation shows how a suspicious message is reviewed by the ScamShield engine and followed by a clear, formatted warning SMS for basic-phone users.
              </p>
            </div>

            {/* Loaded SMS Card */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">Currently Loaded SMS in Simulator</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    keypadState === 3
                      ? isDanger
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : isMedium
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-slate-900 text-amber-400 border-amber-900/60'
                  }`}
                >
                  {keypadState === 3 ? currentScenario.risk : 'Unreviewed'}
                </span>
              </div>
              <div className="text-xs space-y-1 pt-1">
                <div className="flex items-center space-x-2 text-slate-300">
                  <span className="font-semibold text-slate-400">Sender:</span>
                  <span className="font-mono text-white">{currentScenario.sender || 'Unknown Sender'}</span>
                </div>
                <div className="flex items-start space-x-2 text-slate-300">
                  <span className="font-semibold text-slate-400 whitespace-nowrap">Message:</span>
                  <span className="text-white italic">“{smsText || currentScenario.text}”</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleStartAnalysis}
                disabled={keypadState === 2}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wider uppercase transition shadow-lg shadow-cyan-500/20 flex items-center space-x-2 focus:outline-none cursor-pointer disabled:opacity-50"
              >
                {keypadState === 2 ? (
                  <>
                    <Loader2 className="h-4 w-4 text-slate-950 animate-spin" />
                    <span>Analyzing message...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                    <span>{keypadState === 3 ? 'View Warning Again' : 'Send to ScamShield'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 transition focus:outline-none cursor-pointer flex items-center space-x-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Simulation</span>
              </button>

              <button
                type="button"
                onClick={() => onSwitchView('analyzer')}
                className="px-4 py-2.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 hover:text-white font-semibold text-xs border border-cyan-800/80 transition flex items-center space-x-1.5 focus:outline-none cursor-pointer"
              >
                <span>Return to SMS Analyzer →</span>
              </button>
            </div>

            {/* Result on Keypad Panel */}
            {keypadState === 3 && (
              <div
                className={`bg-slate-950 border rounded-xl p-5 space-y-3 ${
                  isDanger
                    ? 'border-rose-900/60'
                    : isMedium
                    ? 'border-amber-900/60'
                    : 'border-emerald-900/60'
                }`}
              >
                <div
                  className={`flex items-center justify-between border-b pb-2 ${
                    isDanger ? 'border-rose-950' : isMedium ? 'border-amber-950' : 'border-emerald-950'
                  }`}
                >
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isDanger ? 'bg-rose-500' : isMedium ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                    ></span>
                    <span>Simulated Analysis Result</span>
                  </h4>
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                      isDanger
                        ? 'bg-rose-600 text-white'
                        : isMedium
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {currentScenario.risk}
                  </span>
                </div>

                <div className="text-xs space-y-2 text-slate-300">
                  <p>
                    <strong className="text-white">Risk Level:</strong>{' '}
                    <span
                      className={`font-bold ${
                        isDanger ? 'text-rose-400' : isMedium ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {currentScenario.risk}
                    </span>
                  </p>
                  <p>
                    <strong className="text-white">Possible Category:</strong>{' '}
                    <span>{currentScenario.category}</span>
                  </p>
                  <p>
                    <strong className="text-white">Suspicious Indicators:</strong>{' '}
                    <span>
                      {currentScenario.chips.map(c => c.text.replace(/^[✕⚠✓]\s*/, '')).join(', ')}
                    </span>
                  </p>
                  <p className="text-emerald-400 font-medium">
                    {isSafe
                      ? '✓ Routine verification notice sent to simulated basic phone display.'
                      : '✓ High-priority safety warning broadcasted to simulated basic phone display.'}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Notice sent to 2G handset</span>
                  <button
                    type="button"
                    onClick={onOpenInWebAnalyzer}
                    className="text-cyan-400 hover:text-cyan-300 font-mono text-xs underline focus:outline-none cursor-pointer"
                  >
                    Open in Web Analyzer
                  </button>
                </div>
              </div>
            )}

            <p className="text-[11px] text-slate-500 italic pt-2 border-t border-slate-800/60">
              “This is a simulated workflow. Frontend simulation sandbox - no live telecom or backend connected. No real SMS is sent, received, intercepted, or connected to a keypad phone.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
