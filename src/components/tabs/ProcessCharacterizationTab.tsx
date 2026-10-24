import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Search,
  Filter,
  CheckCircle,
  Building2,
  Users,
  Compass,
  Download,
  Plus,
} from 'lucide-react';
import { CharacterizationRow } from '../../types';

interface ProcessCharacterizationTabProps {
  characterizationRows: CharacterizationRow[];
  onAddRow: (row: Omit<CharacterizationRow, 'id'>) => void;
}

export const ProcessCharacterizationTab: React.FC<ProcessCharacterizationTabProps> = ({
  characterizationRows,
  onAddRow,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [isAddingRow, setIsAddingRow] = useState(false);

  // New row form state
  const [newModuleCode, setNewModuleCode] = useState('Módulo Adicional');
  const [newStage, setNewStage] = useState<'PLANIFICAR' | 'PLANIFICAR / HACER' | 'HACER' | 'HACER / VERIFICAR' | 'VERIFICAR / ACTUAR'>('HACER');
  const [newProvider, setNewProvider] = useState('');
  const [newInputs, setNewInputs] = useState('');
  const [newActivities, setNewActivities] = useState('');
  const [newOutputs, setNewOutputs] = useState('');
  const [newCustomer, setNewCustomer] = useState('');

  const filteredRows = characterizationRows.filter((row) => {
    const matchesFilter = selectedFilter === 'ALL' || row.phvaStage.includes(selectedFilter);
    const matchesSearch =
      row.moduleCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.stepActivities.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.inputs.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.outputs.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.provider.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSaveRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProvider || !newActivities || !newOutputs) return;

    onAddRow({
      moduleCode: newModuleCode,
      phvaStage: newStage,
      provider: newProvider,
      inputs: newInputs,
      stepActivities: newActivities,
      outputs: newOutputs,
      customer: newCustomer || 'Comunidad y áreas de la Corporación',
    });

    setIsAddingRow(false);
    setNewProvider('');
    setNewInputs('');
    setNewActivities('');
    setNewOutputs('');
    setNewCustomer('');
  };

  return (
    <div className="space-y-6">
      {/* Corporate Metadata Box (ISO Sheet Header) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold mb-2">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Caracterización Oficial de Procesos · Sección 5.B
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Matriz de Caracterización: Mercadeo y Visibilidad Institucional
            </h2>
          </div>
          <button
            onClick={() => setIsAddingRow(true)}
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir Registro a Matriz</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              Nombre del Proceso
            </span>
            <p className="font-bold text-slate-900 mt-0.5">
              Mercadeo y visibilidad institucional
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              Líder del Proceso
            </span>
            <p className="font-bold text-slate-900 mt-0.5">
              Responsable / Coordinador(a) del área de Mercadeo
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 lg:col-span-2">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              Alcance Oficial
            </span>
            <p className="text-slate-700 mt-0.5 leading-snug">
              Desde la identificación de necesidades y la planeación de la comunicación institucional hasta la difusión de contenidos, el seguimiento a públicos e indicadores y la implementación de acciones de mejora continua.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100 text-xs text-sky-950">
          <span className="text-[10px] uppercase font-bold text-sky-800 block mb-0.5">
            Objetivo Misional del Proceso
          </span>
          <p className="font-medium leading-relaxed">
            Planear, desarrollar, divulgar y evaluar las acciones de comunicación y mercadeo de la Corporación Social Somos Uno para fortalecer su visibilidad institucional, promover sus programas y actividades, incentivar la participación comunitaria y apoyar el relacionamiento con aliados.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por actividad, salida, insumo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filtrar:
          </span>
          {['ALL', 'PLANIFICAR', 'HACER', 'VERIFICAR', 'ACTUAR'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter === 'ALL' ? 'Todos' : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white font-semibold">
              <tr>
                <th className="py-3 px-4 w-28">Etapa PHVA / Módulo</th>
                <th className="py-3 px-4 w-44">Proveedor</th>
                <th className="py-3 px-4 w-52">Entradas (Información / Material)</th>
                <th className="py-3 px-4">Actividades del Paso</th>
                <th className="py-3 px-4 w-48">Salidas (Resultados / Documentos)</th>
                <th className="py-3 px-4 w-40">Cliente / Destinatario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition align-top">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">{row.moduleCode}</span>
                    <span className="inline-block mt-1 text-[9px] font-extrabold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                      {row.phvaStage}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {row.provider}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 leading-relaxed">
                    {row.inputs}
                  </td>
                  <td className="py-3.5 px-4 text-slate-800 font-medium leading-relaxed">
                    {row.stepActivities}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-800 font-semibold leading-relaxed bg-emerald-50/30">
                    {row.outputs}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {row.customer}
                  </td>
                </tr>
              ))}
              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No se encontraron registros que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Row */}
      {isAddingRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Añadir Paso o Etapa a la Caracterización del Proceso
            </h3>
            <form onSubmit={handleSaveRow} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Módulo / Código</label>
                  <input
                    type="text"
                    value={newModuleCode}
                    onChange={(e) => setNewModuleCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Etapa PHVA</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="PLANIFICAR">PLANIFICAR</option>
                    <option value="PLANIFICAR / HACER">PLANIFICAR / HACER</option>
                    <option value="HACER">HACER</option>
                    <option value="HACER / VERIFICAR">HACER / VERIFICAR</option>
                    <option value="VERIFICAR / ACTUAR">VERIFICAR / ACTUAR</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Proveedor (Área o Actor)</label>
                <input
                  type="text"
                  value={newProvider}
                  onChange={(e) => setNewProvider(e.target.value)}
                  placeholder="Ej: Dirección, Coordinación Social, Líderes comunitarios"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Entradas (Insumos o Documentos)</label>
                <input
                  type="text"
                  value={newInputs}
                  onChange={(e) => setNewInputs(e.target.value)}
                  placeholder="Ej: Informes de campo, fotografías autorizadas, fechas"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Actividades del Paso</label>
                <textarea
                  value={newActivities}
                  onChange={(e) => setNewActivities(e.target.value)}
                  placeholder="Describa la labor realizada en este paso..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Salidas / Resultados</label>
                  <input
                    type="text"
                    value={newOutputs}
                    onChange={(e) => setNewOutputs(e.target.value)}
                    placeholder="Ej: Pieza aprobada, informe consolidado"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Cliente / Destinatario</label>
                  <input
                    type="text"
                    value={newCustomer}
                    onChange={(e) => setNewCustomer(e.target.value)}
                    placeholder="Ej: Donantes, comunidad, Gerencia"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingRow(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-white bg-sky-600 hover:bg-sky-700 font-semibold cursor-pointer shadow-xs"
                >
                  Guardar en Caracterización
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
