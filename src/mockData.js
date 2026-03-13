// src/mockData.js

export const medicalData = {
  // --- CHEST X-RAY DATA ---
  "XRay1": {
    type: "CXR",
    patientSummary: "No acute abnormalities detected. Cardiac size within normal limits.",
    confidenceScore: 99.2,
    findingsText: "Findings: Heart size is normal. The mediastinum is stable. The lungs are clear. No pleural effusion or pneumothorax is identified. Osseous structures are intact. /\\ Imp: Normal study.",
    metrics: [
      { name: "Cardiothoracic Ratio (CTR)", value: 0.45, unit: "", status: "Normal", clinicalRange: "<0.50" },
      { name: "Lung Inflation (Rib Count)", value: 9, unit: "Post. Ribs", status: "Good", clinicalRange: "≥8-9" },
      { name: "Aortic Arch Size", value: 3.2, unit: "cm", status: "Normal", clinicalRange: "3.0-3.5 cm" },
      { name: "Pleural Effusion (L/R)", value: "None / None", unit: "", status: "Normal", clinicalRange: "None" },
    ],
    probabilities: [ // Disease-specific detection
      { condition: "Atelectasis", probability: 3, previous: 2 },
      { condition: "Cardiomegaly", probability: 5, previous: 5 },
      { condition: "Consolidation", probability: 1, previous: 1 },
      { condition: "Nodule/Mass", probability: 2, previous: 2 },
      { condition: "Pneumonia", probability: 1, previous: 1 },
      { condition: "Pneumothorax", probability: 0, previous: 0.5 },
    ],
    // Zonal analysis of lung opacity: % probability of abnormality in each region
    zonalAnalysis: [
      { zone: "RUL", probability: 1 }, { zone: "LUL", probability: 1 },
      { zone: "RML", probability: 1 }, { zone: "LML", probability: 1 },
      { zone: "RLL", probability: 1 }, { zone: "LLL", probability: 1 },
    ],
    insights: [
      "No focal opacity to suggest consolidation, mass, or nodule.",
      "The mediastinal and hilar contours are within normal limits.",
      "Bony structures and soft tissues are unremarkable."
    ]
  },
  "XRay2": {
    type: "CXR",
    patientSummary: "Right middle and lower lobe opacification, highly indicative of pneumonia. Moderate pleural effusion present.",
    confidenceScore: 95.8,
    findingsText: "Findings: Markedly increased opacity in the right middle and lower lung zones. Loss of heart silhouette boundary. Prominent air bronchograms. Associated blunting of the right costophrenic angle. The heart size appears mildly enlarged. Trace left pleural effusion. /\\ Imp: Consolidation pattern in the right lung.",
    metrics: [
      { name: "Cardiothoracic Ratio (CTR)", value: 0.53, unit: "", status: "Mildly Enlarged", clinicalRange: "<0.50" },
      { name: "Lung Inflation (Rib Count)", value: 8, unit: "Post. Ribs", status: "Good", clinicalRange: "≥8-9" },
      { name: "Aortic Arch Size", value: 3.4, unit: "cm", status: "Normal", clinicalRange: "3.0-3.5 cm" },
      { name: "Pleural Effusion (L/R)", value: "Trace / Moderate", unit: "", status: "Abnormal", clinicalRange: "None" },
    ],
    probabilities: [
      { condition: "Atelectasis", probability: 25, previous: 10 },
      { condition: "Cardiomegaly", probability: 60, previous: 5 },
      { condition: "Consolidation", probability: 92, previous: 2 },
      { condition: "Nodule/Mass", probability: 8, previous: 2 },
      { condition: "Pneumonia", probability: 89, previous: 1 },
      { condition: "Pneumothorax", probability: 1, previous: 0.5 },
    ],
    zonalAnalysis: [
      { zone: "RUL", probability: 2 }, { zone: "LUL", probability: 2 },
      { zone: "RML", probability: 92 }, { zone: "LML", probability: 2 },
      { zone: "RLL", probability: 89 }, { zone: "LLL", probability: 10 }, // Increased trace LLL
    ],
    insights: [
      "Severe opacification and air bronchograms in the right middle and lower lobes strongly suggest alveolar consolidation.",
      "Mild cardiomegaly is detected (CTR 0.53).",
      "Trace left and moderate right pleural effusions are identified."
    ]
  },

  // --- ECG DATA ---
  "ECG1": {
    type: "ECG",
    patientSummary: "Normal Sinus Rhythm. All intervals within the physiological range.",
    confidenceScore: 99.5,
    findingsText: "Findings: Rhythm is regular. PR interval: 156 ms. QRS duration: 92 ms. QT/QTc intervals: 390/415 ms. The P wave morphology is normal. No significant ST segment changes or T wave inversions are seen in any leads. /\\ Imp: Normal ECG.",
    metrics: [
      { name: "Heart Rate", value: 74, unit: "bpm", status: "Normal", clinicalRange: "60-100 bpm" },
      { name: "PR Interval", value: 156, unit: "ms", status: "Normal", clinicalRange: "120-200 ms" },
      { name: "QRS Duration", value: 92, unit: "ms", status: "Normal", clinicalRange: "80-120 ms" },
      { name: "QT Interval", value: 390, unit: "ms", status: "Normal", clinicalRange: "<440 ms" },
      { name: "QTc Interval", value: 415, unit: "ms", status: "Normal", clinicalRange: "<440 ms" },
    ],
    intervals: [
      { name: "PR", value: 156 },
      { name: "QRS", value: 92 },
      { name: "QT", value: 390 },
      { name: "QTc", value: 415 },
    ],
    leadAnalysis: [ // Lead-specific ST deviation
      { lead: "I", deviation: 0.0, status: "Normal" }, { lead: "aVR", deviation: 0.0, status: "Normal" }, { lead: "V1", deviation: 0.0, status: "Normal" }, { lead: "V4", deviation: 0.0, status: "Normal" },
      { lead: "II", deviation: 0.0, status: "Normal" }, { lead: "aVL", deviation: 0.0, status: "Normal" }, { lead: "V2", deviation: 0.0, status: "Normal" }, { lead: "V5", deviation: 0.0, status: "Normal" },
      { lead: "III", deviation: 0.0, status: "Normal" }, { lead: "aVF", deviation: 0.0, status: "Normal" }, { lead: "V3", deviation: 0.0, status: "Normal" }, { lead: "V6", deviation: 0.0, status: "Normal" },
    ],
    rhythmDetails: {
      type: "Normal Sinus Rhythm",
      pWave: "Present, Normal Morphology",
      stSegment: "Isoelectric (no deviation)",
      tWave: "Normal, Concordant"
    },
    insights: [
      "P waves are upright in leads I, II, aVF, and inverted in aVR, confirming sinus origin.",
      "The intervals are within optimal physiological limits.",
      "No dynamic ST-T changes indicative of ischemia or infarction."
    ]
  },
  "ECG2": {
    type: "ECG",
    patientSummary: "Atrial Fibrillation with Rapid Ventricular Response (RVR). Acute rate control required.",
    confidenceScore: 97.1,
    findingsText: "Findings: Rhythm is irregularly irregular. Heart rate is 142 bpm. No identifiable P waves. Fibrillatory waves are seen in multiple leads. QRS duration: 88 ms. QTc is 460 ms (mildly prolonged). Non-specific ST depression and T wave flattening are noted in the lateral leads (I, aVL, V5-V6). /\\ Imp: Atrial Fibrillation.",
    metrics: [
      { name: "Heart Rate", value: 142, unit: "bpm", status: "Critical", clinicalRange: "60-100 bpm" },
      { name: "PR Interval", value: 0, unit: "ms", status: "N/A", clinicalRange: "120-200 ms" },
      { name: "QRS Duration", value: 88, unit: "ms", status: "Normal", clinicalRange: "80-120 ms" },
      { name: "QT Interval", value: 340, unit: "ms", status: "Normal", clinicalRange: "<440 ms" },
      { name: "QTc Interval", value: 460, unit: "ms", status: "Borderline", clinicalRange: "<440 ms" },
    ],
    intervals: [
      { name: "PR", value: 0 },
      { name: "QRS", value: 88 },
      { name: "QT", value: 340 },
      { name: "QTc", value: 460 },
    ],
    leadAnalysis: [
      { lead: "I", deviation: -0.5, status: "Depression" }, { lead: "aVR", deviation: 0.0, status: "Normal" }, { lead: "V1", deviation: 0.0, status: "Normal" }, { lead: "V4", deviation: -0.2, status: "Normal" },
      { lead: "II", deviation: -0.1, status: "Normal" }, { lead: "aVL", deviation: -0.6, status: "Depression" }, { lead: "V2", deviation: 0.0, status: "Normal" }, { lead: "V5", deviation: -0.7, status: "Depression" },
      { lead: "III", deviation: 0.1, status: "Normal" }, { lead: "aVF", deviation: 0.0, status: "Normal" }, { lead: "V3", deviation: -0.1, status: "Normal" }, { lead: "V6", deviation: -0.5, status: "Depression" },
    ],
    rhythmDetails: {
      type: "Atrial Fibrillation",
      pWave: "Absent; Fibrillatory waves (f-waves)",
      stSegment: "Non-specific ST depression (lateral)",
      tWave: "T wave flattening (lateral)"
    },
    insights: [
      "The rhythm is irregularly irregular with a high ventricular rate of 142 bpm.",
      "No discrete P waves can be identified, and fibrillatory waves are present.",
      "Lateral ST depression (I, aVL, V5, V6) may indicate rate-related ischemia. Urgent rate control is indicated."
    ]
  }
};