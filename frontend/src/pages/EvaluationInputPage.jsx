import { useState, useRef, useCallback } from 'react';
import { api } from '../services/api.js';

const ALLOWED_TYPES = {
  'application/pdf': '.pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'text/plain': '.txt',
};
const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.txt'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getFileExtension(name) {
  const idx = name.lastIndexOf('.');
  return idx !== -1 ? name.slice(idx).toLowerCase() : '';
}

function parseScoreValue(scoreStr) {
  if (!scoreStr) return 0;
  const val = parseFloat(scoreStr.split('/')[0]);
  return isNaN(val) ? 0 : val;
}

function getScoreColorClass(scoreStr) {
  const score = parseScoreValue(scoreStr);
  if (score >= 4.0) return { bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', text: 'High' };
  if (score >= 2.5) return { bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20', text: 'Medium' };
  return { bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20', text: 'Low' };
}

// ---------------------------------------------------------------------------
// Premium Inline SVG Icons
// ---------------------------------------------------------------------------
const IconQuestion = () => (
  <svg className="w-5 h-5 text-theme-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
  </svg>
);

const IconCpu = () => (
  <svg className="w-5 h-5 text-theme-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
  </svg>
);

const IconBookOpen = () => (
  <svg className="w-5 h-5 text-theme-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);

const IconDocument = () => (
  <svg className="w-5 h-5 text-theme-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

const IconUpload = () => (
  <svg className="w-7 h-7 text-theme-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
  </svg>
);

const IconXMark = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const IconExclamation = () => (
  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
  </svg>
);

const IconSpinner = () => (
  <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

const IconArrowPath = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
  </svg>
);

const IconPaperAirplane = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>
);

// ---------------------------------------------------------------------------
// Toast Notification
// ---------------------------------------------------------------------------
function Toast({ toast, onClose }) {
  if (!toast) return null;
  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed top-6 right-6 z-[100] animate-slide-in-right">
      <div
        className={`flex items-start gap-3.5 px-5 py-4 rounded-xl shadow-xl border backdrop-blur-md max-w-md transition-all duration-300 ${
          isSuccess
            ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-100'
            : 'bg-red-950/90 border-red-500/30 text-red-100'
        }`}
      >
        <div className="flex-shrink-0 mt-0.5">
          {isSuccess ? <IconCheck /> : <IconExclamation />}
        </div>
        <div className="flex-1 min-w-0 font-sans">
          <p className="text-sm font-bold tracking-tight text-white">{isSuccess ? 'Success' : 'Error'}</p>
          <p className="text-xs sm:text-sm mt-0.5 opacity-90 leading-relaxed">{toast.message}</p>
          {toast.requestId && (
            <p className="text-[10px] sm:text-xs mt-2 font-mono opacity-60 bg-black/30 text-theme-text-muted px-2 py-0.5 rounded w-fit border border-theme-border/20">
              ID: {toast.requestId}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className={`flex-shrink-0 p-1 rounded-lg transition-colors duration-150 cursor-pointer ${
            isSuccess ? 'hover:bg-emerald-800/40 text-emerald-400' : 'hover:bg-red-800/40 text-red-400'
          }`}
          aria-label="Dismiss notification"
        >
          <IconXMark />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------
function EvaluationInputPage() {
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [referenceAnswer, setReferenceAnswer] = useState('');
  const [document, setDocument] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const fileInputRef = useRef(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((type, message, requestId = null) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ type, message, requestId });
    toastTimer.current = setTimeout(() => setToast(null), 6000);
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(null);
  }, []);

  // --- Ripple animation click handler ---
  const handleRipple = (e) => {
    try {
      const btn = e.currentTarget;
      if (!btn) return;
      const circle = document.createElement('span');
      const diameter = Math.max(btn.clientWidth || 0, btn.clientHeight || 0);
      if (diameter === 0) return;
      const radius = diameter / 2;
      const rect = btn.getBoundingClientRect();

      const clientX = e.clientX ?? 0;
      const clientY = e.clientY ?? 0;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${clientX - rect.left - radius}px`;
      circle.style.top = `${clientY - rect.top - radius}px`;
      circle.classList.add('btn-ripple-span');

      const ripple = btn.getElementsByClassName('btn-ripple-span')[0];
      if (ripple) {
        ripple.remove();
      }
      btn.appendChild(circle);
    } catch (err) {
      console.warn('Ripple effect failed', err);
    }
  };

  // --- File handling ---
  const validateAndSetFile = useCallback((file) => {
    setFileError('');
    if (!file) return;

    const ext = getFileExtension(file.name);
    const mimeValid = Object.keys(ALLOWED_TYPES).includes(file.type);
    const extValid = ALLOWED_EXTENSIONS.includes(ext);

    if (!mimeValid && !extValid) {
      setFileError(`Unsupported file type "${ext || 'unknown'}". Allowed formats: PDF, DOCX, TXT.`);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File is too large. Max size is 10 MB (Selected: ${formatFileSize(file.size)}).`);
      return;
    }
    setDocument(file);
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) validateAndSetFile(file);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = () => {
    setDocument(null);
    setFileError('');
  };

  // --- Form actions ---
  const resetFields = () => {
    setQuestion('');
    setAiResponse('');
    setReferenceAnswer('');
    setDocument(null);
    setFileError('');
  };

  const handleReset = () => {
    resetFields();
    setEvaluationResult(null);
    dismissToast();
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !aiResponse.trim()) return;
 
    setIsSubmitting(true);
    setEvaluationResult(null);
    try {
      const data = await api.submitEvaluation({
        question: question.trim(),
        ai_response: aiResponse.trim(),
        reference_answer: referenceAnswer.trim() || null,
        document: document || null,
      });
      
      // Wait briefly for file write operations on backend, then fetch history
      await new Promise(resolve => setTimeout(resolve, 800));
      const history = await api.getEvaluationHistory();
      const match = history.find(item => item.full_q === question.trim() && item.ai_response === aiResponse.trim()) || history[0];
      setEvaluationResult(match);
      showToast('success', data.message, data.request_id);
    } catch (err) {
      const detail =
        err.response?.data?.detail || err.response?.data?.message || 'Something went wrong. Please try again.';
      showToast('error', typeof detail === 'string' ? detail : JSON.stringify(detail));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = question.trim() && aiResponse.trim();

  return (
    <>
      <Toast toast={toast} onClose={dismissToast} />

      <div className="space-y-8 page-transition-enter select-none">
        
        {/* Glassmorphism Header */}
        <div className="backdrop-blur-md bg-theme-sidebar/40 border border-theme-border/40 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 theme-transition-all">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Evaluation Input
            </h1>
            <p className="text-sm text-theme-text-muted mt-1.5 leading-relaxed max-w-xl">
              Submit AI-generated responses for quality evaluation. Add optional reference answers or context documents to refine evaluation parameters.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-theme-text-muted bg-theme-card/30 px-3 py-1.5 rounded-lg border border-theme-border/20 self-start md:self-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Milestone 1 Ready
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Centered responsive card grid */}
          <div className="rounded-2xl border border-theme-border/45 bg-theme-sidebar/40 backdrop-blur-md theme-transition-all overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-theme-border/20">
              
              {/* Left Column: Required Inputs */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="border-b border-theme-border/20 pb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Evaluation Payload</h3>
                  <span className="text-xs text-theme-accent bg-theme-accent/10 border border-theme-accent/20 px-2 py-0.5 rounded font-semibold">Required</span>
                </div>

                {/* Question Field */}
                <div className="rounded-xl border border-theme-border/40 bg-theme-card/15 p-5 hover:border-theme-accent/50 hover:bg-theme-card/25 focus-within:border-theme-accent focus-within:ring-2 focus-within:ring-theme-accent/15 focus-within:bg-theme-card/35 hover-lift transition-all duration-200 space-y-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-theme-accent/10 border border-theme-accent/20 flex items-center justify-center flex-shrink-0">
                      <IconQuestion />
                    </div>
                    <div className="space-y-0.5">
                      <label htmlFor="question" className="text-sm font-semibold text-theme-text flex items-center gap-1">
                        Question
                        <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <p className="text-xs text-theme-text-muted">The query, prompt, or task instructions fed to the AI model.</p>
                    </div>
                  </div>
                  <textarea
                    id="question"
                    rows={5}
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g. Write a python script to parse a custom CSV schema..."
                    className="w-full bg-transparent text-sm text-theme-text placeholder-theme-text-muted/60 focus:outline-none focus:ring-0 resize-none min-h-[120px] p-0 border-0"
                  />
                </div>

                {/* AI Response Field */}
                <div className="rounded-xl border border-theme-border/40 bg-theme-card/15 p-5 hover:border-theme-accent/50 hover:bg-theme-card/25 focus-within:border-theme-accent focus-within:ring-2 focus-within:ring-theme-accent/15 focus-within:bg-theme-card/35 hover-lift transition-all duration-200 space-y-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-theme-accent/10 border border-theme-accent/20 flex items-center justify-center flex-shrink-0">
                      <IconCpu />
                    </div>
                    <div className="space-y-0.5">
                      <label htmlFor="ai-response" className="text-sm font-semibold text-theme-text flex items-center gap-1">
                        AI Generated Response
                        <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <p className="text-xs text-theme-text-muted">The raw text output generated by the language model to evaluate.</p>
                    </div>
                  </div>
                  <textarea
                    id="ai-response"
                    rows={7}
                    required
                    value={aiResponse}
                    onChange={(e) => setAiResponse(e.target.value)}
                    placeholder="Paste the complete generated model output..."
                    className="w-full bg-transparent text-sm text-theme-text placeholder-theme-text-muted/60 focus:outline-none focus:ring-0 resize-none min-h-[160px] p-0 border-0"
                  />
                </div>
              </div>

              {/* Right Column: Optional Context */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="border-b border-theme-border/20 pb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Ground Truth & Context</h3>
                  <span className="text-xs text-theme-text-muted bg-theme-card/50 border border-theme-border/20 px-2 py-0.5 rounded font-semibold">Optional</span>
                </div>

                {/* Reference Answer Field */}
                <div className="rounded-xl border border-theme-border/40 bg-theme-card/15 p-5 hover:border-theme-accent/50 hover:bg-theme-card/25 focus-within:border-theme-accent focus-within:ring-2 focus-within:ring-theme-accent/15 focus-within:bg-theme-card/35 hover-lift transition-all duration-200 space-y-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-theme-accent/10 border border-theme-accent/20 flex items-center justify-center flex-shrink-0">
                      <IconBookOpen />
                    </div>
                    <div className="space-y-0.5">
                      <label htmlFor="reference-answer" className="text-sm font-semibold text-theme-text">
                        Reference Answer
                      </label>
                      <p className="text-xs text-theme-text-muted">An ideal gold-standard response to cross-reference against.</p>
                    </div>
                  </div>
                  <textarea
                    id="reference-answer"
                    rows={5}
                    value={referenceAnswer}
                    onChange={(e) => setReferenceAnswer(e.target.value)}
                    placeholder="Enter human-validated reference text if available..."
                    className="w-full bg-transparent text-sm text-theme-text placeholder-theme-text-muted/60 focus:outline-none focus:ring-0 resize-none min-h-[120px] p-0 border-0"
                  />
                </div>

                {/* Upload Document Field */}
                <div className="rounded-xl border border-theme-border/40 bg-theme-card/15 p-5 hover:border-theme-accent/50 hover:bg-theme-card/25 hover-lift transition-all duration-200 space-y-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-theme-accent/10 border border-theme-accent/20 flex items-center justify-center flex-shrink-0">
                      <IconDocument />
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-sm font-semibold text-theme-text">
                        Upload Source Document
                      </label>
                      <p className="text-xs text-theme-text-muted">Add context files (PDF, DOCX, TXT) used as reference material.</p>
                    </div>
                  </div>

                  {/* Modern Drag and Drop Area */}
                  {!document && (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative cursor-pointer rounded-xl border border-dashed p-6 text-center transition-all duration-200
                        ${isDragging
                          ? 'border-theme-accent bg-theme-accent/15 scale-[0.99] shadow-inner'
                          : 'border-theme-border/40 bg-theme-card/5 hover:border-theme-accent hover:bg-theme-card/15'
                        }`}
                      id="file-dropzone"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.docx,.txt"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-input"
                      />
                      <div className={`mx-auto mb-2.5 transition-colors duration-200 ${isDragging ? 'text-theme-accent' : 'text-theme-text-muted'}`}>
                        <IconUpload />
                      </div>
                      <p className="text-sm font-medium text-theme-text">
                        {isDragging ? 'Drop file to upload' : 'Click to select or drag & drop'}
                      </p>
                      <p className="text-[11px] text-theme-text-muted mt-1">
                        Accepts PDF, DOCX, TXT up to 10 MB
                      </p>
                    </div>
                  )}

                  {/* Selected File State */}
                  {document && (
                    <div className="flex items-center justify-between rounded-xl border border-theme-accent/30 bg-theme-accent/10 px-4 py-3 animate-fade-in">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-theme-accent/20 flex items-center justify-center flex-shrink-0">
                          <IconDocument />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-theme-text truncate">{document.name}</p>
                          <p className="text-[11px] text-theme-text-muted mt-0.5">{formatFileSize(document.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-1.5 rounded-lg text-theme-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors duration-150 cursor-pointer"
                        aria-label="Remove context document"
                      >
                        <IconXMark />
                      </button>
                    </div>
                  )}

                  {/* File validation warning/error */}
                  {fileError && (
                    <div className="flex items-start gap-2 mt-2 text-xs text-red-200 bg-red-950/20 border border-red-500/30 rounded-lg p-2.5 animate-fade-in">
                      <div className="flex-shrink-0 mt-0.5">
                        <IconExclamation />
                      </div>
                      <span>{fileError}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Form Action Buttons Container */}
            <div className="px-6 sm:px-8 py-5 bg-theme-sidebar/60 border-t border-theme-border/20 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 theme-transition-all">
              <span className="text-[11px] text-theme-text-muted self-start sm:self-center font-medium">
                * Indicates required input payload field.
              </span>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={(e) => { handleRipple(e); handleReset(); }}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-theme-text bg-theme-card border border-theme-border/50 hover:bg-theme-card-hover hover:border-theme-accent transition-all duration-150 disabled:opacity-50 hover:shadow-sm btn-ripple-container cursor-pointer"
                  id="btn-reset"
                >
                  <IconArrowPath />
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  onClick={handleRipple}
                  className="flex-[2] sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-theme-accent hover:brightness-110 shadow-sm shadow-theme-accent/15 hover:shadow-md hover:shadow-theme-accent/30 transition-all duration-200 disabled:opacity-55 disabled:cursor-not-allowed disabled:shadow-none btn-ripple-container cursor-pointer"
                  id="btn-submit"
                >
                  {isSubmitting ? (
                    <>
                      <IconSpinner />
                      Submitting payload...
                    </>
                  ) : (
                    <>
                      <IconPaperAirplane />
                      Submit Evaluation
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </form>

        {evaluationResult && (
          <div className="space-y-6 mt-8 animate-fade-in font-sans pb-10">
            <div className="backdrop-blur-md bg-theme-sidebar/40 border border-theme-border/40 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              
              {/* Report Header */}
              <div className="border-b border-theme-border/20 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-theme-accent"></span>
                    Evaluation Verdict: {evaluationResult.id}
                  </h2>
                  <p className="text-xs text-theme-text-muted mt-1">
                    Evaluated on {evaluationResult.date} using model {evaluationResult.model}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-theme-text-muted uppercase tracking-wider">Overall Score</span>
                  <div className={`px-3 py-1.5 rounded-xl border text-sm font-extrabold font-mono flex items-center gap-2 ${getScoreColorClass(evaluationResult.score).bg}`}>
                    {evaluationResult.score}
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-sans uppercase font-bold bg-white/5">
                      {getScoreColorClass(evaluationResult.score).text}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stored Question & Response Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <span className="text-theme-text-muted font-bold uppercase tracking-wider text-[10px]">Evaluated Question</span>
                  <div className="bg-theme-card/25 border border-theme-border/25 rounded-xl p-4 text-theme-text leading-relaxed whitespace-pre-wrap">
                    {evaluationResult.full_q}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-theme-text-muted font-bold uppercase tracking-wider text-[10px]">AI Generated Response</span>
                  <div className="bg-theme-card/25 border border-theme-border/25 rounded-xl p-4 text-theme-text leading-relaxed whitespace-pre-wrap">
                    {evaluationResult.ai_response}
                  </div>
                </div>
              </div>

              {/* Stored Reference Answer (If present) */}
              {evaluationResult.reference_answer && (
                <div className="space-y-1.5 text-xs">
                  <span className="text-theme-text-muted font-bold uppercase tracking-wider text-[10px]">Reference / Gold Standard</span>
                  <div className="bg-theme-card/20 border border-theme-border/20 rounded-xl p-4 text-theme-text-muted leading-relaxed whitespace-pre-wrap">
                    {evaluationResult.reference_answer}
                  </div>
                </div>
              )}

              {/* Judges Verdicts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                
                {/* Relevance Judge Card */}
                <div className="border border-theme-border/30 rounded-xl p-5 bg-theme-card/10 hover-lift transition-all space-y-3">
                  <div className="flex items-center justify-between border-b border-theme-border/20 pb-2.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-theme-text-muted">Relevance Judge</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${getScoreColorClass(evaluationResult.relevance_score).bg}`}>
                      Score: {evaluationResult.relevance_score}
                    </span>
                  </div>
                  <p className="text-theme-text/90 text-xs leading-relaxed whitespace-pre-wrap font-medium">
                    {evaluationResult.relevance_reason}
                  </p>
                </div>

                {/* Accuracy Judge Card */}
                <div className="border border-theme-border/30 rounded-xl p-5 bg-theme-card/10 hover-lift transition-all space-y-3 lg:col-span-2">
                  <div className="flex items-center justify-between border-b border-theme-border/20 pb-2.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-theme-text-muted">Accuracy Judge</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${getScoreColorClass(evaluationResult.accuracy_score).bg}`}>
                      Score: {evaluationResult.accuracy_score}
                    </span>
                  </div>
                  <div className="space-y-3.5">
                    <p className="text-theme-text/90 text-xs leading-relaxed whitespace-pre-wrap font-medium">
                      {evaluationResult.accuracy_reason}
                    </p>
                    {evaluationResult.supporting_evidence && (
                      <div className="space-y-1.5 pt-2 border-t border-theme-border/15">
                        <span className="text-[10px] font-bold text-theme-text-muted uppercase tracking-wider block">Supporting Evidence Chunks</span>
                        <div className="bg-theme-bg/60 border border-theme-border/35 rounded-lg p-3 text-xs text-theme-text-muted leading-relaxed font-sans whitespace-pre-wrap">
                          {evaluationResult.supporting_evidence}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hallucination Detection Card */}
                <div className="border border-theme-border/30 rounded-xl p-5 bg-theme-card/10 hover-lift transition-all space-y-3 lg:col-span-3">
                  <div className="flex items-center justify-between border-b border-theme-border/20 pb-2.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-theme-text-muted">Hallucination Judge</span>
                    {evaluationResult.hallucination ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        Hallucinations Detected
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        No Hallucinations Found
                      </span>
                    )}
                  </div>
                  {evaluationResult.hallucination ? (
                    <div className="space-y-3">
                      <p className="text-theme-text/80 text-[11px] leading-relaxed">
                        The agent detected unverified or hallucinated claims that have no supporting evidence in the retrieved context:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {evaluationResult.unsupported_claims?.map((item, idx) => (
                          <div key={idx} className="bg-rose-950/15 border border-rose-500/25 rounded-lg p-3.5 space-y-2 text-xs text-theme-text">
                            <div className="font-semibold text-rose-300">
                              Claim: <span className="font-medium text-theme-text select-all">"{item.claim}"</span>
                            </div>
                            <div className="text-theme-text-muted text-[11px]">
                              <span className="font-bold text-[10px] uppercase text-rose-400/80 mr-1">Reason:</span> {item.reason}
                            </div>
                            {item.evidence && (
                              <div className="text-theme-text-muted text-[10px] italic pt-1 border-t border-theme-border/10">
                                <span className="font-bold uppercase text-rose-400/80 mr-1 not-italic">Compared Evidence:</span> {item.evidence}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-theme-text/90 text-xs leading-relaxed font-medium">
                      All factual assertions in the response are successfully supported by the retrieved document context. No unverified claims or hallucinations were detected.
                    </p>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EvaluationInputPage;
