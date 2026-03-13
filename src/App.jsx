import React, { useState } from 'react';
import { UploadCloud, Activity, LayoutDashboard, FileText, CheckCircle, AlertTriangle, Loader2, Maximize2, Zap, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, AreaChart, Area, ReferenceLine, ReferenceArea, ScatterChart, Scatter, ZAxis } from 'recharts';
import { medicalData } from './mockData';

const WAIT_TIME_MS = 3000; // 3 seconds for smoother presentation

// --- Chest X-Ray Analysis Dashboard Component ---
function CxrAnalysisDashboard({ data }) {
  // Simple component to color-code based on status
  const StatusBadge = ({ status }) => {
    const baseClass = "px-3 py-1 text-xs font-bold rounded-full";
    if (status === 'Normal') return <span className={`${baseClass} bg-emerald-100 text-emerald-700`}>Normal</span>;
    if (status === 'Abnormal' || status === 'Mildly Enlarged') return <span className={`${baseClass} bg-amber-100 text-amber-700`}>{status}</span>;
    return <span className={`${baseClass} bg-slate-100 text-slate-700`}>{status}</span>;
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Key Metrics & Disease Probability (Top Row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Numerical Metrics Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center"><FileText size={20} className="mr-3 text-blue-500"/> Extracted Anatomical Parameters</h3>
          <div className="space-y-4">
            {data.metrics.map((metric, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-slate-50 pb-3">
                <div className="flex flex-col">
                  <span className="text-slate-600 font-medium">{metric.name}</span>
                  <span className="text-xs text-slate-400">Clinical Range: {metric.clinicalRange}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold">{metric.value} <span className="text-sm text-slate-400">{metric.unit}</span></span>
                  <StatusBadge status={metric.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart: Specific Disease Probabilities */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center"><Target size={20} className="mr-3 text-blue-500"/> Anomaly Probability Matrix (%)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.probabilities} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis dataKey="condition" type="category" interval={0} tick={{fontSize: 12, angle: -30, textAnchor: 'end'}} height={50} />
                <YAxis type="number" domain={[0, 100]} label={{ value: '% Prob.', angle: -90, position: 'insideLeft' }} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <ReferenceLine y={50} stroke="#f43f5e" strokeDasharray="5 5" label={{ value: '50% Threshold', position: 'insideRight', fill: '#f43f5e', fontSize: 10 }} />
                <Bar dataKey="probability" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 2. Zonal Opacity Analysis (Interactive Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center"><Maximize2 size={20} className="mr-3 text-blue-500"/> Zonal Abnormality Analysis</h3>
          <p className="text-sm text-slate-500 mb-5">Probability of consolidation/opacity within specific anatomical lung zones.</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.zonalAnalysis} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis type="number" domain={[0, 100]} unit="%" />
                <Tooltip />
                <Area type="monotone" dataKey="probability" stroke="#3b82f6" fill="#bfdbfe" radius={5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Zonal Diagram Illustration (Simple HTML representation) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
            <h4 className="text-lg font-bold text-slate-700 mb-5">Zone Visualizer</h4>
            <div className="w-48 h-64 border border-slate-200 rounded-lg flex overflow-hidden">
                <div className="flex-1 flex flex-col border-r border-slate-100">
                    <div className="flex-1 p-2 text-center text-xs font-mono bg-blue-50 border-b border-slate-100">RUL: {data.zonalAnalysis[0].probability}%</div>
                    <div className="flex-1 p-2 text-center text-xs font-mono bg-blue-50 border-b border-slate-100">RML: {data.zonalAnalysis[2].probability}%</div>
                    <div className="flex-1 p-2 text-center text-xs font-mono bg-blue-50">RLL: {data.zonalAnalysis[4].probability}%</div>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 p-2 text-center text-xs font-mono bg-slate-50 border-b border-slate-100">LUL: {data.zonalAnalysis[1].probability}%</div>
                    <div className="flex-1 p-2 text-center text-xs font-mono bg-slate-50 border-b border-slate-100">LML: {data.zonalAnalysis[3].probability}%</div>
                    <div className="flex-1 p-2 text-center text-xs font-mono bg-slate-50">LLL: {data.zonalAnalysis[5].probability}%</div>
                </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">Diagram key: RUL = Right Upper Lobe, etc.</p>
        </div>
      </div>

    </div>
  );
}


// --- ECG Analysis Dashboard Component ---
function EcgAnalysisDashboard({ data }) {
  // Helper to color lead deviation
  const getDeviationClass = (dev) => {
    if (dev > 0.5) return 'text-emerald-700 bg-emerald-100'; // Elevation
    if (dev < -0.5) return 'text-red-700 bg-red-100'; // Depression
    return 'text-slate-600 bg-slate-50'; // Normal
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Interval Summary & Key Interpretation (Top Row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Numerical Intervals Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center"><FileText size={20} className="mr-3 text-blue-500"/> Calculated Intervals</h3>
          <div className="space-y-4">
            {data.metrics.map((metric, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-slate-50 pb-3">
                <div className="flex flex-col">
                  <span className="text-slate-600 font-medium">{metric.name}</span>
                  <span className="text-xs text-slate-400">Clinical Range: {metric.clinicalRange}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold">{metric.value} <span className="text-sm text-slate-400">{metric.unit}</span></span>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${metric.status === 'Normal' ? 'bg-emerald-100 text-emerald-700' : metric.status === 'Borderline' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                    {metric.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Scatter Plot: Detailed Interval Analysis */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
          <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center"><Target size={20} className="mr-3 text-blue-500"/> Detailed Interval Plot</h3>
          <p className="text-sm text-slate-500 mb-5">Normalized comparison of intervals. QTc more than 440ms is clinically significant.</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 0, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false}/>
                <XAxis type="category" dataKey="name" name="Interval" interval={0} tick={{fontSize: 12}} />
                <YAxis type="number" dataKey="value" name="Duration" unit="ms" domain={[0, 'dataMax + 50']} />
                <ZAxis type="number" range={[100]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <ReferenceArea y1={120} y2={200} x1="PR" x2="PR" fill="#bef264" fillOpacity={0.1} label={{value: 'Nml PR', position: 'insideBottom', fontSize: 10}} />
                <ReferenceArea y1={80} y2={120} x1="QRS" x2="QRS" fill="#bef264" fillOpacity={0.1} label={{value: 'Nml QRS', position: 'insideBottom', fontSize: 10}} />
                <ReferenceLine y={440} stroke="#f43f5e" label={{value: 'QTc Threshold', position: 'insideTopRight', fill: '#f43f5e', fontSize: 10}} />
                <Scatter data={data.intervals} fill="#3b82f6" line shape="circle" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Lead Analysis Dashboard (Grid View) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center"><Zap size={20} className="mr-3 text-blue-500"/> 12-Lead Morphology Analysis</h3>
          <p className="text-sm text-slate-500 mb-5">ST Segment elevation/depression (mm) measured across all twelve leads.</p>
          <div className="grid grid-cols-4 gap-4">
              {data.leadAnalysis.map((lead, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border ${getDeviationClass(lead.deviation)}`}>
                      <div className="flex justify-between items-center mb-1">
                          <span className="text-lg font-bold">{lead.lead}</span>
                          <span className="text-xs font-mono uppercase">{lead.status}</span>
                      </div>
                      <span className="text-3xl font-bold">{lead.deviation.toFixed(1)} <span className="text-base text-slate-400 font-normal">mm</span></span>
                  </div>
              ))}
          </div>
      </div>

      {/* Rhythm Specific Details */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 grid grid-cols-2 gap-6">
        <div>
            <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center"><Maximize2 size={20} className="mr-3 text-blue-500"/> Specific Rhythm Indicators</h3>
            <div className="space-y-3">
                {Object.entries(data.rhythmDetails).map(([key, value]) => (
                    <div key={key} className="flex items-center">
                        <span className="font-semibold text-slate-700 w-32 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="text-slate-600">{value}</span>
                    </div>
                ))}
            </div>
        </div>
        
        {/* Text Area for AI Findings (New Section) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative">
          <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center"><FileText size={20} className="mr-3 text-blue-500"/> Extracted Image Findings (OCR)</h3>
          <div className="absolute top-6 right-6 px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">Simulated AI Text Extraction</div>
          <p className="text-sm font-mono text-slate-600 bg-slate-50 p-4 rounded-lg h-32 overflow-y-auto mt-2">{data.findingsText}</p>
        </div>
      </div>

    </div>
  );
}


// --- Main Application Component ---
export default function App() {
  const [activeTab, setActiveTab] = useState('CXR');
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, complete
  const [reportData, setReportData] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Extract filename without extension (e.g., "XRay1.jpg" -> "XRay1")
    const nameStr = file.name.split('.')[0];
    setFileName(nameStr);
    
    // Check if the mock data exists for this specific file name
    const data = medicalData[nameStr];
    if (!data) {
      alert(`No hardcoded AI data found for file: ${nameStr}. Please upload XRay1, XRay2, ECG1, or ECG2.`);
      return;
    }

    setUploadState('uploading');
    setReportData(null);

    // Simulate AI processing time
    setTimeout(() => {
      setReportData(data);
      setUploadState('complete');
    }, WAIT_TIME_MS);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      
      {/* LEFT SIDEBAR (No changes) */}
      <div className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-700">
          <Activity className="text-blue-400" size={28} />
          <h1 className="text-xl font-bold tracking-tight">MedAI Vision</h1>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-4 px-2">Diagnostic Models</p>
          <button 
            onClick={() => { setActiveTab('CXR'); setUploadState('idle'); setReportData(null); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'CXR' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            <LayoutDashboard size={20} />
            <span>Chest X-Ray</span>
          </button>
          <button 
            onClick={() => { setActiveTab('ECG'); setUploadState('idle'); setReportData(null); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'ECG' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            <Activity size={20} />
            <span>ECG Analysis</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-10">
        
        {/* Header (Enhanced) */}
        <div className="mb-10 flex justify-between items-center pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {activeTab === 'CXR' ? 'Chest X-Ray Diagnostics' : 'ECG Rhythm Analysis'}
            </h2 >
            <p className="text-slate-600 mt-2">Upload a scan for deep-learning powered clinical insights.</p>
          </div>
          {uploadState === 'complete' && reportData && (
            <button 
                onClick={() => { setUploadState('idle'); setReportData(null); setFileName(''); }}
                className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Analyze Another Report
              </button>
          )}
        </div>

        {/* Upload Section (No changes) */}
        {uploadState === 'idle' && (
          <div className="max-w-3xl mx-auto mt-20 fade-in">
            <label className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-blue-300 rounded-3xl bg-blue-50/50 hover:bg-blue-50 cursor-pointer transition-all shadow-inner">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-16 h-16 text-blue-500 mb-6" />
                <p className="mb-2 text-2xl text-slate-800 font-semibold">Click to upload your {activeTab} report</p>
                <p className="text-base text-slate-600">File names must be {activeTab === 'CXR' ? 'XRay1 - XRay5' : 'ECG1 - ECG5'} (.jpg, .png)</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>
          </div>
        )}

        {/* Processing State (No changes) */}
        {uploadState === 'uploading' && (
          <div className="flex flex-col items-center justify-center h-96">
            <Loader2 className="w-20 h-20 text-blue-600 animate-spin mb-8" />
            <h3 className="text-3xl font-semibold text-slate-800 tracking-tight">AI is Analyzing the Scan</h3>
            <p className="text-slate-600 mt-3 text-lg">Extracting features, identifying anomalies, and compiling clinical insights...</p>
          </div>
        )}

        {/* Dashboard / Report View (Completely Redesigned) */}
        {uploadState === 'complete' && reportData && (
          <div className="space-y-6 fade-in">
            
            {/* 1. Global Summary (Simplified, more clinical) */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {reportData.confidenceScore > 98 ? <CheckCircle className="text-emerald-500" size={36}/> : <AlertTriangle className="text-amber-500" size={36}/>}
                <div className="flex flex-col">
                    <p className="text-sm text-slate-500 uppercase tracking-wider font-bold">Primary Clinical Finding</p>
                    <span className="text-3xl font-semibold text-slate-900">{reportData.patientSummary}</span>
                </div>
              </div>
              <div className="text-right flex items-center space-x-4">
                  <span className="text-5xl font-bold text-blue-600">{reportData.confidenceScore}%</span>
                  <div className="flex flex-col text-slate-500">
                    <span className="font-semibold text-lg">AI</span>
                    <span>Confidence</span>
                  </div>
              </div>
            </div>

            {/* 2. Qualitative Insights (No changes) */}
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center"><Zap size={18} className="mr-2 text-blue-500"/> Specific AI Observations</h3>
              <ul className="space-y-2">
                {reportData.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start text-blue-800">
                    <span className="mr-3 text-blue-500">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Conditional rendering of unique dashboards */}
            {activeTab === 'CXR' && <CxrAnalysisDashboard data={reportData} />}
            {activeTab === 'ECG' && <EcgAnalysisDashboard data={reportData} />}

          </div>
        )}
      </div>
    </div>
  );
}