import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Plus,
  Compass,
  ArrowUpRight,
  HelpCircle,
  Edit2,
  RefreshCw,
} from 'lucide-react';
import { KPIIndicator } from '../../types';

interface KPITabProps {
  kpis: KPIIndicator[];
  onUpdateKpiValue: (kpiId: string, newValue: number) => void;
  onAddCorrectiveAction: (kpiId: string, actionText: string) => void;
}

export const KPITab: React.FC<KPITabProps> = ({
  kpis,
  onUpdateKpiValue,
  onAddCorrectiveAction,
}) => {
  const [selectedKpiId, setSelectedKpiId] = useState<string>(kpis[0]?.id || 'kpi-1');
  const [editingValueId, setEditingValueId] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');
  const [newActionText, setNewActionText] = useState('');

  const selectedKpi = kpis.find((k) => k.id === selectedKpiId) || kpis[0];

  const handleStartEdit = (kpi: KPIIndicator) => {
    setEditingValueId(kpi.id);
    setTempValue(kpi.currentValue.toString());
  };

  const handleSaveValue = (kpiId: string) => {
    const parsed = parseFloat(tempValue);
    if (!isNaN(parsed)) {
      onUpdateKpiValue(kpiId, parsed);
    }
    setEditingValueId(null);
  };

  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionText.trim() || !selectedKpi) return;
    onAddCorrectiveAction(selectedKpi.id, newActionText.trim());
    setNewActionText('');
  };

  const getStatusBadge = (status: 'optimo' | 'alerta' | 'critico') => {
    switch (status) {
      case 'optimo':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'alerta':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'critico':
        return 'bg-rose-100 text-rose-800 border-rose-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            Solución Operativa al Problema 4 y Módulo 6 (PHVA)
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Tablero de Indicadores de Rendimiento (KPIs) & Mejora Continua
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Consolida mensualmente el alcance de las publicaciones, la interacción de la comunidad, la asistencia a actividades y el relacionamiento con aliados para formular acciones de mejora verificables.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi) => {
          const compliance = Math.round((kpi.currentValue / kpi.targetValue) * 100);
          const isSelected = kpi.id === selectedKpiId;

          return (
            <div
              key={kpi.id}
              onClick={() => setSelectedKpiId(kpi.id)}
              className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-sky-50/50 border-sky-400 ring-2 ring-sky-100 shadow-md'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    {kpi.code}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize ${getStatusBadge(
                      kpi.status
                    )}`}
                  >
                    {kpi.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug mb-2">
                  {kpi.name}
                </h4>

                {/* Values & Target */}
                <div className="mt-3 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                      Actual
                    </span>
                    {editingValueId === kpi.id ? (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <input
                          type="number"
                          step="any"
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          className="w-20 px-2 py-0.5 text-xs rounded border border-sky-500 focus:outline-none"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveValue(kpi.id);
                          }}
                          className="px-2 py-0.5 bg-sky-600 text-white rounded text-[10px] font-bold"
                        >
                          OK
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl font-extrabold text-slate-900">
                          {kpi.currentValue}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">{kpi.unit}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartEdit(kpi);
                          }}
                          title="Actualizar medición"
                          className="p-1 text-slate-400 hover:text-sky-600 cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                      Meta
                    </span>
                    <span className="text-sm font-bold text-slate-700">
                      {kpi.targetValue} {kpi.unit}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-500">Cumplimiento de Meta:</span>
                    <strong className="text-slate-800">{compliance}%</strong>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        kpi.status === 'optimo'
                          ? 'bg-emerald-500'
                          : kpi.status === 'alerta'
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, compliance)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Frecuencia: {kpi.frequency}</span>
                <span className="text-sky-600 font-semibold flex items-center gap-0.5">
                  Ver Histórico <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Dive: Historical Graph and Corrective Actions */}
      {selectedKpi && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-sky-600">
                {selectedKpi.code} · {selectedKpi.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {selectedKpi.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fórmula de cálculo: <strong className="font-mono text-slate-700">{selectedKpi.formula}</strong>
              </p>
            </div>
            <div className="text-right sm:self-center">
              <span className="text-xs text-slate-500 block">Responsable Oficial</span>
              <span className="text-xs font-bold text-slate-800">{selectedKpi.responsible}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visual Historical Chart */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/70">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-sky-600" />
                <span>Evolución Histórica Semestral</span>
              </h4>

              <div className="flex items-end justify-between gap-2 h-44 pt-4 px-2">
                {selectedKpi.historical.map((point) => {
                  const maxVal = Math.max(...selectedKpi.historical.map((h) => h.value), selectedKpi.targetValue);
                  const heightPercent = Math.max(12, Math.round((point.value / maxVal) * 100));

                  return (
                    <div key={point.month} className="flex-1 flex flex-col items-center gap-2 group">
                      <span className="text-[10px] font-mono font-semibold text-slate-600 group-hover:text-sky-600">
                        {point.value}
                      </span>
                      <div className="w-full max-w-[40px] bg-sky-200 rounded-t-lg group-hover:bg-sky-500 transition-all flex items-end justify-center pb-1">
                        <div
                          className="w-full bg-sky-600 rounded-t-lg transition-all"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {point.month}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>Meta Proyectada: <strong>{selectedKpi.targetValue} {selectedKpi.unit}</strong></span>
                <span className="text-emerald-700 font-medium">Tendencia Positiva</span>
              </div>
            </div>

            {/* PHVA Corrective / Improvement Actions */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Acciones de Mejora Continua (Ciclo PHVA)</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Estrategias correctivas y preventivas formuladas para alcanzar o superar la meta
                </p>
              </div>

              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {selectedKpi.correctiveActions.map((action, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 text-xs text-slate-800 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-200/80 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <p className="leading-snug">{action}</p>
                  </div>
                ))}
              </div>

              {/* Form Add Action */}
              <form onSubmit={handleAddAction} className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Proponer nueva acción correctiva o de optimización..."
                  value={newActionText}
                  onChange={(e) => setNewActionText(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition shrink-0 cursor-pointer shadow-xs"
                >
                  Añadir Acción
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
