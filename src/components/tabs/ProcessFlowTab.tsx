import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Send,
  Sliders,
  Users,
  Compass,
  FileCheck,
  Lightbulb,
  ExternalLink,
} from 'lucide-react';
import { PHVAModule } from '../../types';

interface ProcessFlowTabProps {
  modules: PHVAModule[];
  setActiveTab: (tab: string) => void;
}

export const ProcessFlowTab: React.FC<ProcessFlowTabProps> = ({ modules, setActiveTab }) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(modules[0]?.id || 'mod-1');

  const selectedModule = modules.find((m) => m.id === selectedModuleId) || modules[0];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'PLANIFICAR':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'PLANIFICAR / HACER':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'HACER':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'HACER / VERIFICAR':
        return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      case 'VERIFICAR / ACTUAR':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            Sección 4 del Documento Oficial Somos Uno
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Flujograma del Proceso por Módulos Operativos (Ciclo PHVA)
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            El proceso de Mercadeo y Visibilidad Institucional se organiza en 6 módulos operativos interrelacionados que garantizan desde la identificación estratégica de necesidades hasta la difusión, evaluación y mejora continua.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('caracterizacion')}
          className="shrink-0 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <span>Ver Matriz Caracterización ISO</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Flow Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {modules.map((mod, index) => {
          const isSelected = mod.id === selectedModuleId;
          return (
            <button
              key={mod.id}
              onClick={() => setSelectedModuleId(mod.id)}
              className={`p-4 rounded-xl border text-left transition relative cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-sky-600 text-white border-sky-600 shadow-md ring-2 ring-sky-200'
                  : 'bg-white text-slate-800 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-sky-700 text-sky-100' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    PASO {mod.stepNumber}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-white/20 text-white' : getStageColor(mod.phvaStage)
                    }`}
                  >
                    {mod.phvaStage.split(' ')[0]}
                  </span>
                </div>
                <h4
                  className={`text-xs font-bold leading-tight ${
                    isSelected ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {mod.name}
                </h4>
              </div>

              <div className="mt-3 pt-2 border-t border-current/10 flex items-center justify-between text-[10px]">
                <span className={isSelected ? 'text-sky-100' : 'text-slate-500'}>
                  {mod.code}
                </span>
                <ArrowRight
                  className={`w-3.5 h-3.5 ${
                    isSelected ? 'text-sky-200 translate-x-0.5' : 'text-slate-400'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Module Inspector */}
      {selectedModule && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden animate-in fade-in">
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-sky-400">
                  {selectedModule.code} · PASO {selectedModule.stepNumber} DE 6
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 uppercase">
                  Ciclo: {selectedModule.phvaStage}
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight">
                {selectedModule.name}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {selectedModule.description}
              </p>
            </div>

            <div className="shrink-0 p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-right">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                Cliente / Destinatario
              </span>
              <p className="text-xs font-bold text-sky-300 mt-0.5 max-w-xs">
                {selectedModule.client}
              </p>
            </div>
          </div>

          {/* Grid of Inputs, Activities, and Outputs */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Entradas Requeridas */}
            <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200/80">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider mb-3">
                <FileText className="w-4 h-4 text-sky-600" />
                <span>Entradas Requeridas</span>
              </div>
              <div className="text-[11px] text-slate-500 mb-3 font-medium">
                Proveedor: <strong className="text-slate-700">{selectedModule.provider}</strong>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedModule.inputs.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Actividades Clave del Paso */}
            <div className="bg-sky-50/40 p-5 rounded-xl border border-sky-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider mb-3">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <span>Actividades Operativas</span>
              </div>
              <div className="text-[11px] text-slate-500 mb-3 font-medium">
                Responsable principal: <strong className="text-slate-700">Equipo de Mercadeo</strong>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-800">
                {selectedModule.activities.map((act, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Salidas / Documentos Resultantes */}
            <div className="bg-emerald-50/40 p-5 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider mb-3">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Salidas / Documentos</span>
              </div>
              <div className="text-[11px] text-slate-500 mb-3 font-medium">
                Evidencia trazable: <strong className="text-slate-700">Auditables en Calidad</strong>
              </div>
              <ul className="space-y-2 text-xs text-slate-800">
                {selectedModule.outputs.map((out, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Operational Tip Footer */}
          <div className="px-6 py-4 bg-amber-50/60 border-t border-amber-100 flex items-center gap-3 text-xs text-amber-900">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Recomendación Operativa:</strong> {selectedModule.operationalTips}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
