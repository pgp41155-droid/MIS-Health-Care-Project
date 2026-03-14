// src/mockData.js

export const medicalData = {
  // --- CHEST X-RAY DATA (STATIC) ---
  "XRay1": {
    type: "CXR",
    patientSummary: "No acute abnormalities detected. Cardiac silhouette within normal limits.",
    confidenceScore: 99.2, 
    modelTelemetry: {
      architecture: "DL Model",
      inferenceTime: "142 ms",
      tensorShape: "1 x 3 x 224 x 224",
      activationMap: "Grad-CAM (Global Average Pooling)"
    },
    findingsText: "[Forward Pass Output]: Heart size is normal. The mediastinum is stable. The lungs are clear. No pleural effusion or pneumothorax is identified. Osseous structures are intact. // Feature Extraction Complete.",
    metrics: [
      { name: "Cardiothoracic Ratio (CTR)", value: 0.45, unit: "", status: "Normal", clinicalRange: "<0.50" },
      { name: "Lung Inflation (Rib Count)", value: 9, unit: "Post. Ribs", status: "Good", clinicalRange: "≥8-9" },
      { name: "Aortic Arch Size", value: 3.2, unit: "cm", status: "Normal", clinicalRange: "3.0-3.5 cm" },
      { name: "Pleural Effusion Vol. Est.", value: 0, unit: "mL", status: "Normal", clinicalRange: "<15 mL" },
    ],
    probabilities: [ 
      { condition: "Atelectasis", probability: 3 }, { condition: "Cardiomegaly", probability: 5 },
      { condition: "Consolidation", probability: 1 }, { condition: "Nodule/Mass", probability: 2 },
      { condition: "Pneumonia", probability: 1 }, { condition: "Pneumothorax", probability: 0 },
    ],
    zonalAnalysis: [
      { zone: "RUL", probability: 1 }, { zone: "LUL", probability: 1 },
      { zone: "RML", probability: 1 }, { zone: "LML", probability: 1 },
      { zone: "RLL", probability: 1 }, { zone: "LLL", probability: 1 },
    ],
    insights: [
      "Attention heads primarily focused on hilar and mediastinal contours.",
      "No anomalous pixel clusters detected in the lung parenchyma above the 0.05 threshold.",
      "Bounding box regressions for mass detection returned null."
    ]
  },
  "XRay2": {
    type: "CXR",
    patientSummary: "Right middle and lower lobe opacification detected. High probability of pneumonia.",
    confidenceScore: 95.8,
    modelTelemetry: {
      architecture: "DL Model",
      inferenceTime: "185 ms",
      tensorShape: "1 x 3 x 512 x 512",
      activationMap: "Grad-CAM (Conv5_Block3)"
    },
    findingsText: "[Forward Pass Output]: Markedly increased opacity in the right middle and lower lung zones. Loss of heart silhouette boundary. Prominent air bronchograms. Associated blunting of the right costophrenic angle. The heart size appears mildly enlarged. // Feature Extraction Complete.",
    metrics: [
      { name: "Cardiothoracic Ratio (CTR)", value: 0.53, unit: "", status: "Mildly Enlarged", clinicalRange: "<0.50" },
      { name: "Lung Inflation (Rib Count)", value: 8, unit: "Post. Ribs", status: "Good", clinicalRange: "≥8-9" },
      { name: "Aortic Arch Size", value: 3.4, unit: "cm", status: "Normal", clinicalRange: "3.0-3.5 cm" },
      { name: "Pleural Effusion Vol. Est.", value: 150, unit: "mL", status: "Abnormal", clinicalRange: "<15 mL" },
    ],
    probabilities: [
      { condition: "Atelectasis", probability: 25 }, { condition: "Cardiomegaly", probability: 60 },
      { condition: "Consolidation", probability: 92 }, { condition: "Nodule/Mass", probability: 8 },
      { condition: "Pneumonia", probability: 89 }, { condition: "Pneumothorax", probability: 1 },
    ],
    zonalAnalysis: [
      { zone: "RUL", probability: 2 }, { zone: "LUL", probability: 2 },
      { zone: "RML", probability: 92 }, { zone: "LML", probability: 2 },
      { zone: "RLL", probability: 89 }, { zone: "LLL", probability: 10 }, 
    ],
    insights: [
      "High intensity Grad-CAM activations localized in the right middle/lower spatial grids.",
      "Pixel density analysis indicates alveolar consolidation rather than interstitial thickening.",
      "Costophrenic angle calculation triggered pleural effusion classification."
    ]
  },

  // --- ECG DATA (STATIC) ---
  "ECG1": {
    type: "ECG",
    patientSummary: "Normal Sinus Rhythm. Time-series sequence within standard distribution.",
    confidenceScore: 99.5,
    modelTelemetry: {
      architecture: "DL Model",
      inferenceTime: "84 ms",
      sequenceLength: "5000 timesteps",
      samplingRate: "500 Hz"
    },
    findingsText: "[Sequence Analysis]: Rhythm is regular. PR interval: 156 ms. QRS duration: 92 ms. QT/QTc intervals: 390/415 ms. The P wave morphology is normal. No significant ST segment changes or T wave inversions are seen in any leads. // Time-Series Processing Complete.",
    metrics: [
      { name: "Heart Rate", value: 74, unit: "bpm", status: "Normal", clinicalRange: "60-100 bpm" },
      { name: "PR Interval", value: 156, unit: "ms", status: "Normal", clinicalRange: "120-200 ms" },
      { name: "QRS Duration", value: 92, unit: "ms", status: "Normal", clinicalRange: "80-120 ms" },
      { name: "QT Interval", value: 390, unit: "ms", status: "Normal", clinicalRange: "<440 ms" },
      { name: "QTc Interval", value: 415, unit: "ms", status: "Normal", clinicalRange: "<440 ms" },
    ],
    intervals: [
      { name: "PR", value: 156 }, { name: "QRS", value: 92 },
      { name: "QT", value: 390 }, { name: "QTc", value: 415 },
    ],
    leadAnalysis: [ 
      { lead: "I", deviation: 0.0, status: "Normal" }, { lead: "aVR", deviation: 0.0, status: "Normal" }, { lead: "V1", deviation: 0.0, status: "Normal" }, { lead: "V4", deviation: 0.0, status: "Normal" },
      { lead: "II", deviation: 0.0, status: "Normal" }, { lead: "aVL", deviation: 0.0, status: "Normal" }, { lead: "V2", deviation: 0.0, status: "Normal" }, { lead: "V5", deviation: 0.0, status: "Normal" },
      { lead: "III", deviation: 0.0, status: "Normal" }, { lead: "aVF", deviation: 0.0, status: "Normal" }, { lead: "V3", deviation: 0.0, status: "Normal" }, { lead: "V6", deviation: 0.0, status: "Normal" },
    ],
    rhythmDetails: {
      type: "Normal Sinus Rhythm", pWave: "Present, Normal Morphology",
      stSegment: "Isoelectric (no deviation)", tWave: "Normal, Concordant"
    },
    insights: [
      "LSTM gates successfully identified repeating P-QRS-T complexes without anomaly triggering.",
      "1D-CNN feature extractors found no spatial deviations across the 12 spatial channels (leads).",
      "R-R interval variance is minimal, negating arrhythmic probability."
    ]
  },
  "ECG2": {
    type: "ECG",
    patientSummary: "Atrial Fibrillation with Rapid Ventricular Response (RVR). Sequence irregularity detected.",
    confidenceScore: 97.1,
    modelTelemetry: {
      architecture: "DL Model",
      inferenceTime: "112 ms",
      sequenceLength: "5000 timesteps",
      samplingRate: "500 Hz"
    },
    findingsText: "[Sequence Analysis]: Rhythm is irregularly irregular. Heart rate is 142 bpm. No identifiable P waves. Fibrillatory waves are seen in multiple leads. QRS duration: 88 ms. QTc is 460 ms (mildly prolonged). Non-specific ST depression. // Time-Series Processing Complete.",
    metrics: [
      { name: "Heart Rate", value: 142, unit: "bpm", status: "Critical", clinicalRange: "60-100 bpm" },
      { name: "PR Interval", value: 0, unit: "ms", status: "N/A", clinicalRange: "120-200 ms" },
      { name: "QRS Duration", value: 88, unit: "ms", status: "Normal", clinicalRange: "80-120 ms" },
      { name: "QT Interval", value: 340, unit: "ms", status: "Normal", clinicalRange: "<440 ms" },
      { name: "QTc Interval", value: 460, unit: "ms", status: "Borderline", clinicalRange: "<440 ms" },
    ],
    intervals: [
      { name: "PR", value: 0 }, { name: "QRS", value: 88 },
      { name: "QT", value: 340 }, { name: "QTc", value: 460 },
    ],
    leadAnalysis: [
      { lead: "I", deviation: -0.5, status: "Depression" }, { lead: "aVR", deviation: 0.0, status: "Normal" }, { lead: "V1", deviation: 0.0, status: "Normal" }, { lead: "V4", deviation: -0.2, status: "Normal" },
      { lead: "II", deviation: -0.1, status: "Normal" }, { lead: "aVL", deviation: -0.6, status: "Depression" }, { lead: "V2", deviation: 0.0, status: "Normal" }, { lead: "V5", deviation: -0.7, status: "Depression" },
      { lead: "III", deviation: 0.1, status: "Normal" }, { lead: "aVF", deviation: 0.0, status: "Normal" }, { lead: "V3", deviation: -0.1, status: "Normal" }, { lead: "V6", deviation: -0.5, status: "Depression" },
    ],
    rhythmDetails: {
      type: "Atrial Fibrillation", pWave: "Absent; Fibrillatory waves detected",
      stSegment: "Non-specific ST depression (lateral)", tWave: "T wave flattening (lateral)"
    },
    insights: [
      "High entropy detected in R-R intervals across the time-series array.",
      "Absence of P-wave feature vectors prior to QRS complexes identified by the convolutional layers.",
      "Lateral lead channels indicate ST depression, requiring cross-validation with clinical presentation."
    ]
  }
};

// --- DYNAMIC DATA GENERATORS FOR RANDOM FILE UPLOADS ---

// Utility to generate random numbers within a range
const getRandomFloat = (min, max, decimals = 1) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRandomNormalCXR = () => {
  const ctr = getRandomFloat(0.40, 0.49, 2);
  const archSize = getRandomFloat(3.0, 3.5, 1);
  const ribCount = getRandomInt(8, 10);
  const inferenceTime = getRandomInt(125, 165);
  const confidence = getRandomFloat(97.5, 99.8, 1);

  return {
    type: "CXR",
    patientSummary: "No acute abnormalities detected. Computer vision targets within normal physiological variance.",
    confidenceScore: confidence,
    modelTelemetry: {
      architecture: "DL Model",
      inferenceTime: `${inferenceTime} ms`,
      tensorShape: "1 x 3 x 224 x 224",
      activationMap: "Grad-CAM (Global Average Pooling)"
    },
    findingsText: `[Forward Pass Output]: Heart size is normal (CTR ${ctr}). The mediastinum is stable. The lungs are clear. No pleural effusion or pneumothorax is identified. Osseous structures are intact. // Feature Extraction Complete.`,
    metrics: [
      { name: "Cardiothoracic Ratio (CTR)", value: ctr, unit: "", status: "Normal", clinicalRange: "<0.50" },
      { name: "Lung Inflation (Rib Count)", value: ribCount, unit: "Post. Ribs", status: "Good", clinicalRange: "≥8-9" },
      { name: "Aortic Arch Size", value: archSize, unit: "cm", status: "Normal", clinicalRange: "3.0-3.5 cm" },
      { name: "Pleural Effusion Vol. Est.", value: 0, unit: "mL", status: "Normal", clinicalRange: "<15 mL" },
    ],
    probabilities: [ 
      { condition: "Atelectasis", probability: getRandomInt(0, 4) }, { condition: "Cardiomegaly", probability: getRandomInt(1, 5) },
      { condition: "Consolidation", probability: getRandomInt(0, 2) }, { condition: "Nodule/Mass", probability: getRandomInt(0, 3) },
      { condition: "Pneumonia", probability: getRandomInt(0, 2) }, { condition: "Pneumothorax", probability: getRandomInt(0, 1) },
    ],
    zonalAnalysis: [
      { zone: "RUL", probability: getRandomInt(0, 2) }, { zone: "LUL", probability: getRandomInt(0, 2) },
      { zone: "RML", probability: getRandomInt(0, 2) }, { zone: "LML", probability: getRandomInt(0, 2) },
      { zone: "RLL", probability: getRandomInt(0, 2) }, { zone: "LLL", probability: getRandomInt(0, 2) },
    ],
    insights: [
      "Attention heads primarily focused on hilar and mediastinal contours.",
      "No anomalous pixel clusters detected in the lung parenchyma above the 0.05 threshold.",
      "Bounding box regressions for mass detection returned null."
    ]
  };
};

export const generateRandomNormalECG = () => {
  const hr = getRandomInt(62, 95);
  const pr = getRandomInt(130, 190);
  const qrs = getRandomInt(82, 110);
  const qt = getRandomInt(360, 400);
  const qtc = qt + getRandomInt(15, 30);
  const inferenceTime = getRandomInt(75, 95);
  const confidence = getRandomFloat(98.1, 99.9, 1);

  return {
    type: "ECG",
    patientSummary: "Normal Sinus Rhythm. Time-series vectors align with normative healthy datasets.",
    confidenceScore: confidence,
    modelTelemetry: {
      architecture: "DL Model",
      inferenceTime: `${inferenceTime} ms`,
      sequenceLength: "5000 timesteps",
      samplingRate: "500 Hz"
    },
    findingsText: `[Sequence Analysis]: Rhythm is regular. HR: ${hr} bpm. PR interval: ${pr} ms. QRS duration: ${qrs} ms. QT/QTc intervals: ${qt}/${qtc} ms. The P wave morphology is normal. No significant ST segment changes. // Time-Series Processing Complete.`,
    metrics: [
      { name: "Heart Rate", value: hr, unit: "bpm", status: "Normal", clinicalRange: "60-100 bpm" },
      { name: "PR Interval", value: pr, unit: "ms", status: "Normal", clinicalRange: "120-200 ms" },
      { name: "QRS Duration", value: qrs, unit: "ms", status: "Normal", clinicalRange: "80-120 ms" },
      { name: "QT Interval", value: qt, unit: "ms", status: "Normal", clinicalRange: "<440 ms" },
      { name: "QTc Interval", value: qtc, unit: "ms", status: "Normal", clinicalRange: "<440 ms" },
    ],
    intervals: [
      { name: "PR", value: pr }, { name: "QRS", value: qrs },
      { name: "QT", value: qt }, { name: "QTc", value: qtc },
    ],
    leadAnalysis: [ 
      { lead: "I", deviation: getRandomFloat(-0.1, 0.1, 1), status: "Normal" }, { lead: "aVR", deviation: getRandomFloat(-0.1, 0.1, 1), status: "Normal" }, { lead: "V1", deviation: getRandomFloat(-0.1, 0.1, 1), status: "Normal" }, { lead: "V4", deviation: getRandomFloat(-0.1, 0.1, 1), status: "Normal" },
      { lead: "II", deviation: getRandomFloat(-0.1, 0.1, 1), status: "Normal" }, { lead: "aVL", deviation: getRandomFloat(-0.1, 0.1, 1), status: "Normal" }, { lead: "V2", deviation: getRandomFloat(-0.1, 0.1, 1), status: "Normal" }, { lead: "V5", deviation: getRandomFloat(-0.1, 0.1, 1), status: "Normal" },
      { lead: "III", deviation: getRandomFloat(-0.1, 0.1, 1), status: "Normal" }, { lead: "aVF", deviation: getRandomFloat(-0.1, 0.1, 1), status: "Normal" }, { lead: "V3", deviation: getRandomFloat(-0.1, 0.1, 1), status: "Normal" }, { lead: "V6", deviation: getRandomFloat(-0.1, 0.1, 1), status: "Normal" },
    ],
    rhythmDetails: {
      type: "Normal Sinus Rhythm", pWave: "Present, Normal Morphology",
      stSegment: "Isoelectric (no deviation)", tWave: "Normal, Concordant"
    },
    insights: [
      "LSTM gates successfully identified repeating P-QRS-T complexes without anomaly triggering.",
      "1D-CNN feature extractors found no spatial deviations across the 12 spatial channels (leads).",
      "R-R interval variance is minimal, negating arrhythmic probability."
    ]
  };
};