import React, { useState } from 'react';
import { UploadCloud, Activity, LayoutDashboard, FileText, CheckCircle, AlertTriangle, Loader2, Maximize2, Zap, Target, Cpu, Server } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, ReferenceLine, ReferenceArea, ScatterChart, Scatter, ZAxis } from 'recharts';
import { medicalData } from './mockData';

const WAIT_TIME_MS = 3000; 

// --- Chest X-Ray Analysis Dashboard Component ---
function CxrAnalysisDashboard({ data }) {
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
          <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center"><FileText size={20} className="mr-3 text-indigo-500"/> Morphological Computations</h3>
          <div className="space-y-4">
            {data.metrics.map((metric, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-slate-50 pb-3">
                <div className="flex flex-col">
                  <span className="text-slate-600 font-medium">{metric.name}</span>
                  <span className="text-xs text-slate-400">Normal Threshold: {metric.clinicalRange}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold">{metric.value} <span className="text-sm text-slate-400">{metric.unit}</span></span>
                  <StatusBadge status={metric.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Radar Chart: Multi-Class Softmax Probabilities */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center"><Target size={20} className="mr-3 text-indigo-500"/> Softmax Multi-Class Activation</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data.probabilities}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="condition" tick={{ fill: '#475569', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="Probability" dataKey="probability" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 2. Zonal Opacity Analysis (Interactive Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center"><Maximize2 size={20} className="mr-3 text-indigo-500"/> Spatial Zonal Heatmap Data</h3>
          <p className="text-sm text-slate-500 mb-5">Probability density extracted from spatial feature maps.</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.zonalAnalysis} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis type="number" domain={[0, 100]} unit="%" />
                <Tooltip />
                <Area type="monotone" dataKey="probability" stroke="#4f46e5" fill="#c7d2fe" radius={5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Zonal Diagram Illustration */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
            <h4 className="text-lg font-bold text-slate-700 mb-5">Grid Matrix</h4>
            <div className="w-48 h-64 border border-slate-200 rounded-lg flex overflow-hidden">
                <div className="flex-1 flex flex-col border-r border-slate-100">
                    <div className="flex-1 p-2 text-center text-xs font-mono bg-indigo-50 border-b border-slate-100">RUL: {data.zonalAnalysis[0].probability}%</div>
                    <div className="flex-1 p-2 text-center text-xs font-mono bg-indigo-50 border-b border-slate-100">RML: {data.zonalAnalysis[2].probability}%</div>
                    <div className="flex-1 p-2 text-center text-xs font-mono bg-indigo-50">RLL: {data.zonalAnalysis[4].probability}%</div>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 p-2 text-center text-xs font-mono bg-slate-50 border-b border-slate-100">LUL: {data.zonalAnalysis[1].probability}%</div>
                    <div className="flex-1 p-2 text-center text-xs font-mono bg-slate-50 border-b border-slate-100">LML: {data.zonalAnalysis[3].probability}%</div>
                    <div className="flex-1 p-2 text-center text-xs font-mono bg-slate-50">LLL: {data.zonalAnalysis[5].probability}%</div>
                </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">Mapped from tensor output.</p>
        </div>
      </div>

    </div>
  );
}

// --- ECG Analysis Dashboard Component ---
function EcgAnalysisDashboard({ data }) {
  const getDeviationClass = (dev) => {
    if (dev > 0.5) return 'text-emerald-700 bg-emerald-100 border-emerald-300'; 
    if (dev < -0.5) return 'text-red-700 bg-red-100 border-red-300'; 
    return 'text-slate-600 bg-slate-50 border-slate-200'; 
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Interval Summary & Key Interpretation (Top Row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center"><FileText size={20} className="mr-3 text-indigo-500"/> Extracted Vector Metrics</h3>
          <div className="space-y-4">
            {data.metrics.map((metric, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-slate-50 pb-3">
                <div className="flex flex-col">
                  <span className="text-slate-600 font-medium">{metric.name}</span>
                  <span className="text-xs text-slate-400">Validation Range: {metric.clinicalRange}</span>
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
          <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center"><Target size={20} className="mr-3 text-indigo-500"/> Waveform Feature Geometry</h3>
          <p className="text-sm text-slate-500 mb-5">Calculated durations from multi-channel 1D arrays.</p>
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
                <Scatter data={data.intervals} fill="#4f46e5" line shape="circle" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Lead Analysis Dashboard (Grid View) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center"><Zap size={20} className="mr-3 text-indigo-500"/> Channel-Specific ST Amplitude (mm)</h3>
          <div className="grid grid-cols-4 gap-4">
              {data.leadAnalysis.map((lead, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border-2 ${getDeviationClass(lead.deviation)}`}>
                      <div className="flex justify-between items-center mb-1">
                          <span className="text-lg font-bold">{lead.lead}</span>
                          <span className="text-xs font-mono uppercase">{lead.status}</span>
                      </div>
                      <span className="text-3xl font-bold">{lead.deviation.toFixed(1)} <span className="text-base font-normal opacity-60">mm</span></span>
                  </div>
              ))}
          </div>
      </div>

      {/* Rhythm Specific Details */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 grid grid-cols-2 gap-6">
        <div>
            <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center"><Maximize2 size={20} className="mr-3 text-indigo-500"/> Sequence Pattern Classification</h3>
            <div className="space-y-3 font-mono text-sm">
                {Object.entries(data.rhythmDetails).map(([key, value]) => (
                    <div key={key} className="flex items-center">
                        <span className="font-semibold text-slate-500 w-32 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="text-slate-800 bg-white px-2 py-1 rounded border border-slate-200">{value}</span>
                    </div>
                ))}
            </div>
        </div>
        
        {/* Text Area for DL Findings */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-sm relative text-emerald-400 font-mono">
          <h3 className="text-lg font-bold text-white mb-5 flex items-center"><Server size={18} className="mr-3 text-emerald-400"/> Raw NLP Diagnostic Output</h3>
          <div className="absolute top-6 right-6 px-3 py-1 text-[10px] font-bold rounded bg-slate-800 border border-slate-600 text-slate-300 uppercase tracking-widest">Console.log</div>
          <p className="text-xs leading-relaxed mt-2">{data.findingsText}</p>
        </div>
      </div>

    </div>
  );
}

// --- Main Application Component ---
export default function App() {
  const [activeTab, setActiveTab] = useState('CXR');
  const [uploadState, setUploadState] = useState('idle'); 
  const [reportData, setReportData] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const nameStr = file.name.split('.')[0];
    setFileName(nameStr);
    
    // SMART FALLBACK LOGIC FOR PRESENTATION
    let dataKey = nameStr;
    
    if (!medicalData[dataKey]) {
        // If the uploaded filename doesn't perfectly match a key in mockData.js,
        // we guess which one to show so the presentation doesn't break.
        const isAbnormal = nameStr.toLowerCase().includes('abnormal') || nameStr.includes('2');
        if (activeTab === 'CXR') {
            dataKey = isAbnormal ? 'Abnormal_XRay' : 'Normal_XRay';
        } else {
            dataKey = isAbnormal ? 'Abnormal_ECG' : 'Normal_ECG';
        }
        console.log(`Filename "${nameStr}" not explicitly mapped. Defaulting to: ${dataKey}`);
    }

    const data = medicalData[dataKey];

    setUploadState('uploading');
    setReportData(null);

    // Simulate Deep Learning inference time
    setTimeout(() => {
      setReportData(data);
      setUploadState('complete');
    }, WAIT_TIME_MS);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      
      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-slate-950 text-white flex flex-col shadow-xl">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
          <Cpu className="text-indigo-400" size={28} />
          <h1 className="text-xl font-bold tracking-tight">IIML OmniScan</h1>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-4 px-2 font-semibold">Inference Models</p>
          <button 
            onClick={() => { setActiveTab('CXR'); setUploadState('idle'); setReportData(null); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'CXR' ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}
          >
            <LayoutDashboard size={20} />
            <span>Chest X-Ray CNN</span>
          </button>
          <button 
            onClick={() => { setActiveTab('ECG'); setUploadState('idle'); setReportData(null); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'ECG' ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}
          >
            <Activity size={20} />
            <span>ECG Time-Series</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-10">
        
        {/* Header */}
        <div className="mb-10 flex justify-between items-center pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {activeTab === 'CXR' ? 'XRay Report Analysis' : 'ECG Report Analysis'}
            </h2 >
            <p className="text-slate-600 mt-2">Upload input image to run on the neural network.</p>
          </div>
          {uploadState === 'complete' && reportData && (
            <button 
                onClick={() => { setUploadState('idle'); setReportData(null); setFileName(''); }}
                className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
              >
                Run New Inference
              </button>
          )}
        </div>

        {/* Upload Section */}
        {uploadState === 'idle' && (
          <div className="max-w-3xl mx-auto mt-20 fade-in">
            <label className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-indigo-300 rounded-3xl bg-indigo-50/50 hover:bg-indigo-50 cursor-pointer transition-all shadow-inner">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-16 h-16 text-indigo-500 mb-6" />
                <p className="mb-2 text-2xl text-slate-800 font-semibold">Click to load data for {activeTab} inference</p>
                
                {/* UPDATED UI TEXT HERE */}
                <p className="text-base text-slate-600">File name (.jpg, .png)</p>

              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>
          </div>
        )}

        {/* Processing State */}
        {uploadState === 'uploading' && (
          <div className="flex flex-col items-center justify-center h-96">
            <Loader2 className="w-20 h-20 text-indigo-600 animate-spin mb-8" />
            <h3 className="text-3xl font-semibold text-slate-800 tracking-tight">Analysing Report</h3>
            <p className="text-slate-600 mt-3 text-lg font-mono">Extracting feature</p>
          </div>
        )}

        {/* Dashboard / Report View */}
        {uploadState === 'complete' && reportData && (
          <div className="space-y-6 fade-in">
            
            {/* Top Row: Global Summary & Model Telemetry */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Primary Output */}
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex flex-col justify-center lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-slate-500 uppercase tracking-wider font-bold">Network Classification Output</p>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100">Threshold Met</span>
                </div>
                <div className="flex items-start space-x-4">
                  {reportData.confidenceScore > 98 ? <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={32}/> : <AlertTriangle className="text-amber-500 mt-1 flex-shrink-0" size={32}/>}
                  <span className="text-2xl font-semibold text-slate-900 leading-tight">{reportData.patientSummary}</span>
                </div>
              </div>

              {/* Model Telemetry Box */}
              <div className="bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-700 text-white flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center"><Cpu size={16} className="mr-2"/> Telemetry</span>
                    <span className="text-xs bg-slate-800 px-2 py-1 rounded text-emerald-400 font-mono">Status 200</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Architecture:</span> <span className="font-mono text-indigo-300">{reportData.modelTelemetry.architecture}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Latency:</span> <span className="font-mono text-indigo-300">{reportData.modelTelemetry.inferenceTime}</span></div>
                    {reportData.modelTelemetry.tensorShape && <div className="flex justify-between"><span className="text-slate-500">Tensor Shape:</span> <span className="font-mono text-indigo-300">{reportData.modelTelemetry.tensorShape}</span></div>}
                    {reportData.modelTelemetry.sequenceLength && <div className="flex justify-between"><span className="text-slate-500">Sequence:</span> <span className="font-mono text-indigo-300">{reportData.modelTelemetry.sequenceLength}</span></div>}
                    <div className="flex justify-between mt-2 pt-2 border-t border-slate-700"><span className="text-slate-300 font-semibold">Peak Softmax Prob:</span> <span className="font-bold text-lg text-emerald-400">{reportData.confidenceScore}%</span></div>
                  </div>
              </div>
            </div>

            {/* Qualitative Insights */}
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center"><Zap size={18} className="mr-2 text-indigo-500"/> Layer Activation Insights</h3>
              <ul className="space-y-2">
                {reportData.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start text-indigo-800 font-medium">
                    <span className="mr-3 text-indigo-500">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Conditional rendering of unique dashboards */}
            {activeTab === 'CXR' && <CxrAnalysisDashboard data={reportData} />}
            {activeTab === 'ECG' && <EcgAnalysisDashboard data={reportData} />}

          </div>
        )}
      </div>
    </div>
  );
}