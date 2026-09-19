export type RiskLevel = 'HIGH RISK' | 'MEDIUM RISK' | 'LOW RISK';

export type IndicatorType = 'danger' | 'warning' | 'safe' | 'neutral';

export interface IndicatorChip {
  text: string;
  type: IndicatorType;
}

export interface HeuristicItem {
  label: string;
  detail: string;
}

export interface SafetyRecommendation {
  label: string;
  detail: string;
}

export interface KeypadWarning {
  title: string;
  riskHeader: string;
  summary: string;
  instruction: string;
}

export interface ScenarioData {
  id: string;
  name: string;
  subtitle: string;
  text: string;
  risk: RiskLevel;
  category: string;
  chips: IndicatorChip[];
  heuristics: HeuristicItem[];
  recommendations: SafetyRecommendation[];
  keypadWarning: KeypadWarning;
  sender?: string;
}

export interface ScanRecord {
  id: string;
  timestamp: string;
  messageSnippet: string;
  fullText: string;
  risk: RiskLevel;
  indicatorsFlaggedCount: number;
  scenarioKey?: string;
}

export type ActiveView = 'dashboard' | 'analyzer' | 'keypad' | 'history' | 'awareness';
