import React from 'react';
import {
  AlertTriangle,
  Target,
  CheckCircle2,
  TrendingUp,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { OperationalProblem, ObjectiveMatrixItem } from '../../types';

interface DiagnosticsObjectivesTabProps {
  problems: OperationalProblem[];
  objectives: ObjectiveMatrixItem[];
  onUpdateObjectiveProgress: (problemId: string, specId: string, newProgress: number) => void;
}

export const DiagnosticsObjectivesTab: React.FC<DiagnosticsObjectivesTabProps> = ({
  problems,
  objectives,
  onUpdateObjectiveProgress,
}) => {
  return (
    <div className="space-y-8">
      {/* Introduction Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold mb-2">
            <Target className="w-3.5 h-3.5" />
            Secciones 1, 2 y 3 del Documento de Investigación
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Diagnóstico Operativo y Matriz de Objetivos por Problema
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            La Corporación Social Somos Uno identificó 5 problemáticas centrales de comunicación y mercadeo. VeloSync IQ estructura para cada problema un objetivo general de transformación, objetivos específicos medibles con metas cuantitativas y seguimiento de progreso en tiempo real.
          </p>
        </div>
      </div>

      {/* 5 Problems and Objectives Cards */}
      <div className="space-y-6">
        {problems.map((problem, index) => {
          const matrix = objectives.find((o) => o.problemId === problem.id);
          const avgProgress = matrix
            ? Math.round(
                matrix.specificObjectives.reduce((acc, s) => acc + s.progressPercentage, 0) /
                  matrix.specificObjectives.length
              )
            : 0;

          return (
            <div
              key={problem.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition hover:shadow-md"
            >
              {/* Problem Header */}
              <div className="p-5 sm:p-6 bg-slate-50/70 border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center shrink-0 text-sm shadow-xs">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {problem.code}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">
                        {problem.title}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          problem.impactLevel === 'Crítico'
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        Impacto: {problem.impactLevel}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-3xl">
                      {problem.description}
                    </p>
                  </div>
                </div>

                {/* Progress pill */}
                <div className="shrink-0 bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-right">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">
                    Avance de Objetivos
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-sky-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${avgProgress}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-800">{avgProgress}%</span>
                  </div>
                </div>
              </div>

              {/* Operational Risk & Associated Module */}
              <div className="px-6 py-3 bg-amber-50/50 border-b border-slate-100 flex flex-wrap items-center justify-between text-xs gap-3">
                <div className="flex items-center gap-2 text-amber-800 font-medium">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Riesgo Operativo: {problem.operationalRisk}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <Layers className="w-4 h-4 text-sky-600" />
                  <span>Módulo Operativo: <strong>{problem.associatedPHVA}</strong></span>
                </div>
              </div>

              {/* Objectives Body */}
              {matrix && (
                <div className="p-6 space-y-5">
                  {/* General Objective */}
                  <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 block mb-1">
                      Objetivo General Institucional
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-sky-950 leading-relaxed">
                      {matrix.generalObjective}
                    </p>
                  </div>

                  {/* Specific Objectives List */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                      Objetivos Específicos & Metas Operativas (Modificables en Tiempo Real)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {matrix.specificObjectives.map((spec) => (
                        <div
                          key={spec.id}
                          className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 transition flex flex-col justify-between"
                        >
                          <div>
                            <p className="text-xs font-medium text-slate-800 leading-snug">
                              {spec.text}
                            </p>
                            <div className="mt-3 pt-3 border-t border-slate-200/60 space-y-1.5">
                              <div className="text-[11px] text-slate-600">
                                <span className="font-semibold text-slate-700">Meta: </span>
                                {spec.targetIndicator}
                              </div>
                              <div className="text-[11px] text-slate-600">
                                <span className="font-semibold text-slate-700">Responsable: </span>
                                {spec.responsibleRole}
                              </div>
                            </div>
                          </div>

                          {/* Progress Controller Slider */}
                          <div className="mt-4 pt-3 border-t border-slate-200/60">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-[10px] font-semibold text-slate-500 uppercase">
                                Cumplimiento
                              </span>
                              <span className="font-bold text-sky-700">
                                {spec.progressPercentage}%
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={spec.progressPercentage}
                              onChange={(e) =>
                                onUpdateObjectiveProgress(
                                  problem.id,
                                  spec.id,
                                  parseInt(e.target.value)
                                )
                              }
                              className="w-full accent-sky-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                              title="Ajustar avance del objetivo específico"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
