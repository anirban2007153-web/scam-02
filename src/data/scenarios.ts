import { ScenarioData, ScanRecord } from '../types';

export const SCENARIOS: Record<string, ScenarioData> = {
  kyc: {
    id: 'kyc',
    name: 'Bank KYC Phishing',
    subtitle: 'Suspicious link & urgency',
    sender: 'Unknown Sender (+1-800-FAKE-KYC)',
    text: 'URGENT! Your account will be blocked. Verify your KYC immediately at example.com',
    risk: 'HIGH RISK',
    category: 'Possible Phishing / Bank Impersonation',
    chips: [
      { text: '✕ Urgent Account Blocking Language', type: 'danger' },
      { text: '✕ Unverified Domain (example.com)', type: 'danger' },
      { text: '✕ Sensitive KYC / Identity Demand', type: 'danger' },
      { text: '✕ Psychological Panic Induction', type: 'danger' },
      { text: '⚠ Shortcode / Masked Sender', type: 'neutral' }
    ],
    heuristics: [
      { label: 'Ultimatum language', detail: 'Threatens that service or bank account will be blocked immediately.' },
      { label: 'Credential harvesting', detail: 'Demands immediate KYC verification over unverified external site.' },
      { label: 'Unverified external link', detail: 'Directs user to unofficial generic host (example.com).' },
      { label: 'Panic inducement', detail: 'Employs uppercase “URGENT!” to deter critical second thought.' }
    ],
    recommendations: [
      { label: 'Never share credentials', detail: 'Never share OTP, PIN, password, or banking credentials under any circumstance.' },
      { label: 'Official App Only', detail: 'Verify account status exclusively through your verified mobile banking application.' },
      { label: 'Do not tap external links', detail: 'Never click hyperlinked text messages from unknown contacts.' },
      { label: 'Report & Block', detail: 'Forward suspicious message to carrier spam shortcode (1909 or 7726) and block sender.' }
    ],
    keypadWarning: {
      title: '⚠️ ScamShield Warning',
      riskHeader: 'RISK: HIGH',
      summary: 'Possible phishing message.',
      instruction: 'Do not open link or share OTP, PIN, password, or banking details. Verify only in official bank app.'
    }
  },
  electricity: {
    id: 'electricity',
    name: 'Electricity Urgent Cut',
    subtitle: 'Utility disconnect panic',
    sender: 'Utility Alert (+91-98765-POWER)',
    text: 'Dear consumer, electricity bill unpaid. Power disconnect tonight 9PM unless paid at tinyurl.com/pay-power',
    risk: 'HIGH RISK',
    category: 'Utility Disconnection Extortion',
    chips: [
      { text: '✕ Same-Day Service Disconnection Threat', type: 'danger' },
      { text: '✕ Obfuscated Shortlink (tinyurl.com)', type: 'danger' },
      { text: '✕ Impersonating Municipal Utility', type: 'danger' },
      { text: '✕ False Emergency Pressure (Tonight 9PM)', type: 'danger' }
    ],
    heuristics: [
      { label: 'Panic deadline', detail: 'Forces hurried payment by threatening immediate power cutoff tonight.' },
      { label: 'Obfuscated URL', detail: 'Shortened link obscures destination server to hide credential phishing form.' },
      { label: 'Payment bypass', detail: 'Directs money transfer outside authorized state electric grid billing software.' }
    ],
    recommendations: [
      { label: 'Do not pay via link', detail: 'Utility providers never mandate bill payment through shortened external URLs.' },
      { label: 'Verify on physical bill', detail: 'Inspect your consumer ID through your official local power utility app or physical bill.' },
      { label: 'Report extortion', detail: 'Flag number to consumer protection fraud portals.' }
    ],
    keypadWarning: {
      title: '⚠️ ScamShield Warning',
      riskHeader: 'RISK: HIGH',
      summary: 'Utility disconnect fraud.',
      instruction: 'Power boards never disconnect via SMS links. Never pay outside official utility counters.'
    }
  },
  prize: {
    id: 'prize',
    name: 'Prize / Lottery Hook',
    subtitle: 'Advance fee solicitation',
    sender: 'Reward Center (+44-7700-PRIZE)',
    text: 'Congratulations! You have been selected for a reward of $10,000. Contact claim manager to claim your prize.',
    risk: 'MEDIUM RISK',
    category: 'Advance-Fee / Lottery Hook',
    chips: [
      { text: '⚠ Unsolicited Cash Prize Lure', type: 'warning' },
      { text: '⚠ Advance Fee Solicitation Trap', type: 'warning' },
      { text: '⚠ Unverified Claim Manager Contact', type: 'warning' },
      { text: '⚠ Zero Prior Participation Record', type: 'warning' }
    ],
    heuristics: [
      { label: 'Unearned lottery claim', detail: 'Claims monetary reward without prior lottery participation or ticket purchase.' },
      { label: 'Advance fee indicator', detail: 'Typically primes victim to pay "processing charges" or "taxes" before release.' },
      { label: 'Generic salutation', detail: 'No personalized recipient details; broadcast to wide candidate pool.' }
    ],
    recommendations: [
      { label: 'Never pay advance fees', detail: 'Legitimate lotteries and sweepstakes never require processing fees to collect prize money.' },
      { label: 'Do not call back', detail: 'Calling back verifies your phone number is active for subsequent social engineering calls.' },
      { label: 'Delete & ignore', detail: 'Delete message immediately and do not engage with sender.' }
    ],
    keypadWarning: {
      title: '⚠️ ScamShield Warning',
      riskHeader: 'RISK: MEDIUM',
      summary: 'Advance-fee lottery hook.',
      instruction: 'Never pay fees or advance tax to claim prizes. Delete SMS and do not call the sender.'
    }
  },
  doctor: {
    id: 'doctor',
    name: 'Doctor Appointment',
    subtitle: 'Legitimate confirmation',
    sender: 'Apex Health Clinic (VERIFIED)',
    text: 'Doctor appointment reminder: Dr. Sharma at Apex Clinic tomorrow at 10:30 AM. Reply N to reschedule.',
    risk: 'LOW RISK',
    category: 'Legitimate / Low Risk Routine Notice',
    chips: [
      { text: '✓ No External Links Included', type: 'safe' },
      { text: '✓ No Sensitive Credential Demand', type: 'safe' },
      { text: '✓ Standard Informational Tone', type: 'safe' },
      { text: '✓ Transparent Reschedule Option', type: 'safe' }
    ],
    heuristics: [
      { label: 'No credential demands', detail: 'Contains no solicitations for banking passwords, OTPs, or credit card numbers.' },
      { label: 'Zero unverified links', detail: 'Message does not divert user to off-platform login screens or external forms.' },
      { label: 'Routine service tone', detail: 'Context matches standard scheduled health appointment reminders.' }
    ],
    recommendations: [
      { label: 'Routine Vigilance', detail: 'Message appears standard. As standard practice, never text passwords or payment PINs.' },
      { label: 'Direct Phone Confirmation', detail: 'If unsure of appointment date, call clinic desk through official saved directory number.' }
    ],
    keypadWarning: {
      title: 'ℹ ScamShield Notice',
      riskHeader: 'RISK: LOW',
      summary: 'Standard routine notice.',
      instruction: 'No immediate threats detected. Reminder: never text banking PINs or OTP passwords.'
    }
  }
};

export const INITIAL_SCAN_RECORDS: ScanRecord[] = [
  {
    id: 'scan-1',
    timestamp: 'Just Now',
    messageSnippet: '“URGENT! Your account will be blocked. Verify your KYC immediately at example.com”',
    fullText: 'URGENT! Your account will be blocked. Verify your KYC immediately at example.com',
    risk: 'HIGH RISK',
    indicatorsFlaggedCount: 4,
    scenarioKey: 'kyc'
  },
  {
    id: 'scan-2',
    timestamp: '12 mins ago',
    messageSnippet: '“Congratulations! You have won $10,000 lottery bonus. Contact claim manager to release payment.”',
    fullText: 'Congratulations! You have been selected for a reward of $10,000. Contact claim manager to claim your prize.',
    risk: 'MEDIUM RISK',
    indicatorsFlaggedCount: 2,
    scenarioKey: 'prize'
  },
  {
    id: 'scan-3',
    timestamp: '35 mins ago',
    messageSnippet: '“Doctor appointment reminder: Dr. Sharma at Apex Clinic tomorrow at 10:30 AM. Reply N to reschedule.”',
    fullText: 'Doctor appointment reminder: Dr. Sharma at Apex Clinic tomorrow at 10:30 AM. Reply N to reschedule.',
    risk: 'LOW RISK',
    indicatorsFlaggedCount: 0,
    scenarioKey: 'doctor'
  },
  {
    id: 'scan-4',
    timestamp: '1 hour ago',
    messageSnippet: '“Dear consumer, electricity bill unpaid. Power disconnect tonight 9PM unless paid at tinyurl.com/pay-power”',
    fullText: 'Dear consumer, electricity bill unpaid. Power disconnect tonight 9PM unless paid at tinyurl.com/pay-power',
    risk: 'HIGH RISK',
    indicatorsFlaggedCount: 4,
    scenarioKey: 'electricity'
  }
];

export function evaluateText(rawText: string): ScenarioData {
  const lower = rawText.toLowerCase();

  // Check matching known presets first
  if (lower.includes('kyc') || lower.includes('block') || lower.includes('debit') || lower.includes('bank') || lower.includes('suspend') || lower.includes('pan card') || lower.includes('otp')) {
    return {
      ...SCENARIOS.kyc,
      text: rawText
    };
  } else if (lower.includes('power') || lower.includes('electric') || lower.includes('bill') || lower.includes('disconnect') || lower.includes('tinyurl')) {
    return {
      ...SCENARIOS.electricity,
      text: rawText
    };
  } else if (lower.includes('won') || lower.includes('lottery') || lower.includes('prize') || lower.includes('reward') || lower.includes('$') || lower.includes('cash') || lower.includes('bonus') || lower.includes('claim')) {
    return {
      ...SCENARIOS.prize,
      text: rawText
    };
  } else if (lower.includes('doctor') || lower.includes('appointment') || lower.includes('clinic') || lower.includes('hospital') || lower.includes('reschedule')) {
    return {
      ...SCENARIOS.doctor,
      text: rawText
    };
  }

  // Dynamic evaluation for custom text input
  const hasUrgency = lower.includes('urgent') || lower.includes('immediate') || lower.includes('hurry') || lower.includes('act now') || lower.includes('expire');
  const hasLink = lower.includes('http') || lower.includes('www.') || lower.includes('.com') || lower.includes('.xyz') || lower.includes('bit.ly') || lower.includes('.link');
  const hasFinancial = lower.includes('money') || lower.includes('credit') || lower.includes('transfer') || lower.includes('wallet') || lower.includes('refund');

  if (hasUrgency && (hasLink || hasFinancial)) {
    return {
      id: 'custom-high',
      name: 'High Urgency Solicitation',
      subtitle: 'Phishing pattern detected',
      sender: 'Unknown Sender',
      text: rawText,
      risk: 'HIGH RISK',
      category: 'Unverified Urgent Solicitation / Phishing',
      chips: [
        { text: '✕ High-Pressure Urgency Keywords', type: 'danger' },
        ...(hasLink ? [{ text: '✕ Unverified External Link', type: 'danger' as const }] : []),
        ...(hasFinancial ? [{ text: '✕ Financial Transaction Request', type: 'danger' as const }] : []),
        { text: '⚠ Unverified Source', type: 'neutral' }
      ],
      heuristics: [
        { label: 'Urgent psychological trigger', detail: 'Pushes recipient to act rashly without verifying legitimacy.' },
        ...(hasLink ? [{ label: 'Suspicious redirect', detail: 'Diverts recipient to external web destination.' }] : []),
        { label: 'Unverified entity', detail: 'Message originates from non-whitelisted sender address.' }
      ],
      recommendations: [
        { label: 'Do not click links', detail: 'Never tap URLs from unconfirmed phone numbers.' },
        { label: 'Call official helpline', detail: 'Validate any claim directly through verified support channels.' }
      ],
      keypadWarning: {
        title: '⚠️ ScamShield Warning',
        riskHeader: 'RISK: HIGH',
        summary: 'Urgent solicitation flagged.',
        instruction: 'Do not tap links or send money. Call verified support numbers directly.'
      }
    };
  }

  // Fallback to low risk/informational
  return {
    id: 'custom-low',
    name: 'Informational SMS',
    subtitle: 'No high-risk vectors detected',
    sender: 'Direct Sender',
    text: rawText,
    risk: 'LOW RISK',
    category: 'Routine / Low Risk Message',
    chips: [
      { text: '✓ No Known Phishing Keywords', type: 'safe' },
      { text: '✓ No Immediate Threat Language', type: 'safe' }
    ],
    heuristics: [
      { label: 'Indicator evaluation', detail: 'No known urgent ultimatum or credential theft patterns identified in text.' }
    ],
    recommendations: [
      { label: 'Maintain standard vigilance', detail: 'Remember to never share OTPs or passwords over text message.' }
    ],
    keypadWarning: {
      title: 'ℹ ScamShield Notice',
      riskHeader: 'RISK: LOW',
      summary: 'Routine message evaluated.',
      instruction: 'No threats detected. Remember: never share passwords or banking OTPs.'
    }
  };
}
