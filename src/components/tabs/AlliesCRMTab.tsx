import React, { useState } from 'react';
import {
  Handshake,
  Plus,
  Building,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Clock,
  Filter,
  UserCheck,
} from 'lucide-react';
import { AllyOpportunity, AllyStage } from '../../types';

interface AlliesCRMTabProps {
  allies: AllyOpportunity[];
  onAddAlly: (ally: Omit<AllyOpportunity, 'id'>) => void;
  onUpdateAllyStage: (allyId: string, newStage: AllyStage) => void;
  isOpenNewAllyModal: boolean;
  setIsOpenNewAllyModal: (open: boolean) => void;
}

const STAGES: AllyStage[] = [
  'Identificado',
  'Acercamiento Inicial',
  'Presentación Institucional',
  'En Negociación',
  'Alianza Activa',
];

export const AlliesCRMTab: React.FC<AlliesCRMTabProps> = ({
  allies,
  onAddAlly,
  onUpdateAllyStage,
  isOpenNewAllyModal,
  setIsOpenNewAllyModal,
}) => {
  const [filterSector, setFilterSector] = useState<string>('ALL');

  // Form State
  const [organizationName, setOrganizationName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sector, setSector] = useState<AllyOpportunity['sector']>('Empresa Privada');
  const [stage, setStage] = useState<AllyStage>('Identificado');
  const [potentialSupport, setPotentialSupport] = useState('');
  const [commitments, setCommitments] = useState('');
  const [estimatedContribution, setEstimatedContribution] = useState('');
  const [nextFollowUpDate, setNextFollowUpDate] = useState(
    new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]
  );

  const filteredAllies = allies.filter((a) => {
    return filterSector === 'ALL' || a.sector === filterSector;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationName || !contactPerson) return;

    onAddAlly({
      organizationName,
      contactPerson,
      email,
      phone,
      sector,
      stage,
      potentialSupport: potentialSupport || 'Apoyo en especie / voluntariado',
      lastInteractionDate: new Date().toISOString().split('T')[0],
      nextFollowUpDate,
      commitments: commitments || 'Agendar primera reunión exploratoria',
      estimatedContribution: estimatedContribution || 'Por definir en mesa de trabajo',
    });

    setIsOpenNewAllyModal(false);
    // Reset Form
    setOrganizationName('');
    setContactPerson('');
    setEmail('');
    setPhone('');
    setPotentialSupport('');
    setCommitments('');
    setEstimatedContribution('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <Handshake className="w-3.5 h-3.5" />
            Solución Operativa al Problema 5 · Base de Datos y Embudo de Alianzas
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Sistematización de Alianzas, Donantes y Cooperación Comunitaria
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Estandariza la ruta de relacionamiento institucional con empresas, fundaciones y entidades gubernamentales, asegurando el cumplimiento de compromisos y la sostenibilidad de los proyectos sociales.
          </p>
        </div>

        <button
          onClick={() => setIsOpenNewAllyModal(true)}
          className="shrink-0 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Oportunidad / Aliado</span>
        </button>
      </div>

      {/* Filter by Sector */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="font-semibold text-slate-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Sector:
          </span>
          {['ALL', 'Empresa Privada', 'ONG / Fundación', 'Sector Público', 'Cooperación Internacional', 'Comunidad y Líderes'].map(
            (sec) => (
              <button
                key={sec}
                onClick={() => setFilterSector(sec)}
                className={`px-3 py-1 rounded-md font-semibold whitespace-nowrap transition cursor-pointer ${
                  filterSector === sec
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sec === 'ALL' ? 'Todos' : sec}
              </button>
            )
          )}
        </div>
      </div>

      {/* Pipeline Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 overflow-x-auto pb-4">
        {STAGES.map((currentStage) => {
          const stageAllies = filteredAllies.filter((a) => a.stage === currentStage);

          return (
            <div
              key={currentStage}
              className="bg-slate-100/70 p-3.5 rounded-2xl border border-slate-200/70 flex flex-col min-w-[240px]"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 leading-tight">
                  {currentStage}
                </h4>
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                  {stageAllies.length}
                </span>
              </div>

              {/* Ally Cards */}
              <div className="space-y-3 flex-1">
                {stageAllies.map((ally) => (
                  <div
                    key={ally.id}
                    className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs space-y-2 hover:shadow-xs transition"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                        {ally.sector}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-slate-900 leading-snug">
                      {ally.organizationName}
                    </h5>

                    <p className="text-[11px] text-slate-600">
                      <strong>Contacto:</strong> {ally.contactPerson}
                    </p>

                    <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                      <strong>Apoyo:</strong> {ally.potentialSupport}
                    </p>

                    <div className="p-2 rounded bg-amber-50/70 border border-amber-100 text-[10px] text-amber-900">
                      <strong>Compromiso:</strong> {ally.commitments}
                    </div>

                    <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between pt-1">
                      <span>Seguimiento:</span>
                      <strong className="text-slate-700">{ally.nextFollowUpDate}</strong>
                    </div>

                    {/* Stage Transition Control */}
                    <div className="pt-2 border-t border-slate-100">
                      <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                        Mover Etapa:
                      </label>
                      <select
                        value={ally.stage}
                        onChange={(e) => onUpdateAllyStage(ally.id, e.target.value as AllyStage)}
                        className="w-full text-[11px] py-1 px-1.5 rounded border border-slate-200 bg-slate-50 font-medium focus:ring-1 focus:ring-indigo-500"
                      >
                        {STAGES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                {stageAllies.length === 0 && (
                  <div className="py-8 text-center text-slate-400 text-[11px] border-2 border-dashed border-slate-200 rounded-xl">
                    Sin aliados en esta fase
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: New Ally */}
      {isOpenNewAllyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 my-8">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Registrar Nueva Oportunidad / Aliado Estratégico
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nombre de la Organización / Empresa / Entidad *
                </label>
                <input
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="Ej: Fundación Éxito, Bancolombia RSE, Junta Comunal"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Contacto Principal *</label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Nombre y cargo"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Sector</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Empresa Privada">Empresa Privada</option>
                    <option value="ONG / Fundación">ONG / Fundación</option>
                    <option value="Sector Público">Sector Público / Alcaldía</option>
                    <option value="Cooperación Internacional">Cooperación Internacional</option>
                    <option value="Comunidad y Líderes">Comunidad y Líderes Locales</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@entidad.org"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Teléfono / WhatsApp</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+57 (604)..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Etapa de la Relación</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Próxima Fecha de Seguimiento</label>
                  <input
                    type="date"
                    value={nextFollowUpDate}
                    onChange={(e) => setNextFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Apoyo Potencial / Línea de Trabajo</label>
                <input
                  type="text"
                  value={potentialSupport}
                  onChange={(e) => setPotentialSupport(e.target.value)}
                  placeholder="Ej: Financiación de 100 refrigerios, donación de pintura, becas"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Compromiso Actual / Siguiente Tarea</label>
                <textarea
                  value={commitments}
                  onChange={(e) => setCommitments(e.target.value)}
                  placeholder="Describa el acuerdo de la última reunión o tarea pendiente..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mt-5 flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOpenNewAllyModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 font-semibold cursor-pointer shadow-xs"
                >
                  Registrar Aliado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
