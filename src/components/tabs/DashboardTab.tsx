import React from 'react';
import {
  Users,
  Calendar,
  Handshake,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  FileCheck2,
  Share2,
} from 'lucide-react';
import { FullAppData } from '../../services/storageService';

interface DashboardTabProps {
  data: FullAppData;
  setActiveTab: (tab: string) => void;
  onOpenNewPost: () => void;
  onOpenNewAlly: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  data,
  setActiveTab,
  onOpenNewPost,
  onOpenNewAlly,
}) => {
  const publishedCount = data.posts.filter((p) => p.status === 'Publicado' || p.status === 'Programado').length;
  const activeAlliesCount = data.allies.filter((a) => a.stage === 'Alianza Activa').length;
  const inNegotiationCount = data.allies.filter((a) => a.stage === 'En Negociación').length;

  const avgKpiCompliance = Math.round(
    data.kpis.reduce((acc, k) => acc + Math.min(100, (k.currentValue / k.targetValue) * 100), 0) /
      data.kpis.length
  );

  return (
    <div className="space-y-6">
      {/* Welcome & Corporate Presentation Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-900 via-sky-800 to-indigo-950 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            Sistema de Gestión de Mercadeo y Visibilidad Institucional
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            VeloSync IQ — Corporación Social Somos Uno
          </h2>
          <p className="mt-2 text-sm text-sky-100/90 leading-relaxed">
            Plataforma centralizada para optimizar los procesos de comunicación, resolver las 5 fallas de diagnóstico operativo, coordinar el calendario de contenidos, sistematizar alianzas y medir indicadores con estricto apego a la normativa de Habeas Data y protección de derechos.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('caracterizacion')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-sky-900 hover:bg-sky-50 transition shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <span>Ver Caracterización de Procesos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenNewPost}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600/80 hover:bg-sky-500 text-white border border-sky-400/30 transition cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Programar Publicación</span>
            </button>
            <button
              onClick={onOpenNewAlly}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600/80 hover:bg-indigo-500 text-white border border-indigo-400/30 transition cursor-pointer flex items-center gap-1.5"
            >
              <Handshake className="w-4 h-4" />
              <span>Nueva Alianza</span>
            </button>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />
      </div>

      {/* KPI Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Alcance Mensual */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Alcance Acumulado (Mensual)</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">18,450</h3>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+7.2% vs mes anterior</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Cumplimiento Calendario */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Cumplimiento Calendario</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">91.5%</h3>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mt-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Meta institucional: 90%</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Alianzas y Cooperación */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Alianzas y Donantes</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{activeAlliesCount} Activas</h3>
            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold mt-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{inNegotiationCount} en negociación</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Handshake className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Salud Global KPIs */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Efectividad General (KPIs)</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{avgKpiCompliance}%</h3>
            <div className="flex items-center gap-1.5 text-xs text-sky-600 font-semibold mt-1">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>6 indicadores evaluados</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Ciclo PHVA & Diagnóstico */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Ciclo PHVA & Solución a Problemas */}
        <div className="lg:col-span-2 space-y-6">
          {/* PHVA Interactive Lifecycle Block */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Ciclo de Mejora Continua PHVA
                </h3>
                <p className="text-xs text-slate-500">
                  Estructuración de los 6 módulos operativos según la norma de calidad
                </p>
              </div>
              <button
                onClick={() => setActiveTab('flujograma')}
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Ver Flujograma</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {/* PLANIFICAR */}
              <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 hover:border-sky-300 transition">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-sky-200/70 text-sky-800 uppercase">
                  Planificar
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-2">Módulos 1 y 2</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  Planeación estratégica, recolección y validación de información institucional.
                </p>
                <div className="mt-3 text-[10px] text-sky-700 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Estado: Estandarizado
                </div>
              </div>

              {/* HACER */}
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 hover:border-indigo-300 transition">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-indigo-200/70 text-indigo-800 uppercase">
                  Hacer
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-2">Módulos 3 y 4</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  Diseño de contenidos, revisión de calidad, Vo.Bo. y programación en canales.
                </p>
                <div className="mt-3 text-[10px] text-indigo-700 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Estado: En Ejecución
                </div>
              </div>

              {/* VERIFICAR */}
              <div className="p-4 rounded-xl bg-cyan-50/60 border border-cyan-100 hover:border-cyan-300 transition">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-cyan-200/70 text-cyan-800 uppercase">
                  Verificar
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-2">Módulos 5 y 6</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  Difusión, interacción con públicos y medición de KPIs frente a metas.
                </p>
                <div className="mt-3 text-[10px] text-cyan-700 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Estado: Monitoreo Activo
                </div>
              </div>

              {/* ACTUAR */}
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 hover:border-emerald-300 transition">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-200/70 text-emerald-800 uppercase">
                  Actuar
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-2">Módulo 6</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  Formulación e implementación de planes de mejora continua y ajustes.
                </p>
                <div className="mt-3 text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Estado: Mejora Continua
                </div>
              </div>
            </div>
          </div>

          {/* Diagnóstico Operativo: Los 5 Problemas Solucionados */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Diagnóstico Operativo & Solución Implementada
                </h3>
                <p className="text-xs text-slate-500">
                  Estatus de intervención de los 5 hallazgos de la investigación
                </p>
              </div>
              <button
                onClick={() => setActiveTab('diagnostico')}
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Ver Matriz Completa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {data.problems.map((problem) => (
                <div
                  key={problem.id}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                        {problem.code}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">
                        {problem.title}
                      </h4>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          problem.impactLevel === 'Crítico'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {problem.impactLevel}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {problem.description}
                    </p>
                  </div>
                  <div className="text-right sm:self-center shrink-0">
                    <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      Solución Integrada en IQ
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Calendario Próximo & Protocolos */}
        <div className="space-y-6">
          {/* Próximas Publicaciones */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>Parrilla Próxima</span>
              </h4>
              <button
                onClick={() => setActiveTab('calendario')}
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 cursor-pointer"
              >
                Ver todo
              </button>
            </div>

            <div className="space-y-3">
              {data.posts.slice(0, 3).map((post) => (
                <div key={post.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/70">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-sky-700">{post.channel}</span>
                    <span className="text-slate-500 font-mono">{post.scheduledDate}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 line-clamp-1">{post.title}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span
                      className={`px-2 py-0.5 rounded-full font-medium ${
                        post.status === 'Programado'
                          ? 'bg-blue-100 text-blue-700'
                          : post.status === 'Aprobado'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {post.status}
                    </span>
                    <span className="text-slate-500">Resp: {post.responsibleAuthor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seguridad y Habeas Data Quick Check */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-2xl text-white shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold">Protocolos & Cumplimiento</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Cada contenido antes de ser publicado debe contar con consentimiento de Habeas Data firmado y validación de calidad documental.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-800/80">
                <span className="text-slate-300">Ley 1581 (Habeas Data)</span>
                <span className="text-emerald-400 font-semibold">100% Cumplido</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-800/80">
                <span className="text-slate-300">Derechos de Imagen</span>
                <span className="text-emerald-400 font-semibold">Verificado</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-800/80">
                <span className="text-slate-300">Control de Exactitud</span>
                <span className="text-emerald-400 font-semibold">Activo</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('seguridad')}
              className="mt-4 w-full py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition text-center cursor-pointer shadow-xs"
            >
              Auditar Protocolos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
