import React, { useState } from 'react';
import {
  FolderArchive,
  Search,
  Plus,
  ShieldCheck,
  FileText,
  Clock,
  Download,
  Lock,
  Tag,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { InstitutionalAsset } from '../../types';

interface RepositoryTabProps {
  assets: InstitutionalAsset[];
  onAddAsset: (asset: Omit<InstitutionalAsset, 'id'>) => void;
}

export const RepositoryTab: React.FC<RepositoryTabProps> = ({ assets, onAddAsset }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Asset Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<InstitutionalAsset['category']>('Programas y Servicios');
  const [responsibleArea, setResponsibleArea] = useState('');
  const [version, setVersion] = useState('1.0');
  const [confidentialityLevel, setConfidentialityLevel] = useState<InstitutionalAsset['confidentialityLevel']>('Público Institucional');
  const [habeasDataCertified, setHabeasDataCertified] = useState(true);
  const [format, setFormat] = useState('PDF / Documento');
  const [description, setDescription] = useState('');

  const filteredAssets = assets.filter((asset) => {
    const matchesCat = selectedCategory === 'ALL' || asset.category === selectedCategory;
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.responsibleArea.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSaveAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;

    onAddAsset({
      name,
      category,
      lastUpdated: new Date().toISOString().split('T')[0],
      responsibleArea: responsibleArea || 'Área de Mercadeo',
      version,
      confidentialityLevel,
      habeasDataCertified,
      format,
      description,
    });

    setIsModalOpen(false);
    setName('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold mb-2">
            <FolderArchive className="w-3.5 h-3.5" />
            Solución Operativa al Problema 3 · Repositorio Institucional
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Banco Centralizado de Información, Recursos y Autorizaciones
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Elimina la dispersión de archivos consolidando logotipos oficiales, portafolios de programas vigentes, plantillas de solicitud y carpetas fotográficas con certificación de protección de datos personales.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="shrink-0 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Activo Institucional</span>
        </button>
      </div>

      {/* Search & Categories Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por nombre, descripción, área..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'Programas y Servicios', 'Identidad & Logos', 'Fotografías y Testimonios', 'Plantillas y Formatos'].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'Todos' : cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
                  {asset.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  v{asset.version}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug mb-2">
                {asset.name}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {asset.description}
              </p>

              <div className="space-y-1.5 text-[11px] text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Área Custodia:</span>
                  <span>{asset.responsibleArea}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Formato:</span>
                  <span className="font-mono text-slate-800">{asset.format}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Nivel de Reserva:</span>
                  <span className="text-slate-800">{asset.confidentialityLevel}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                {asset.habeasDataCertified ? (
                  <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" /> Habeas Data OK
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-700 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <AlertCircle className="w-3 h-3" /> En Validación
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                <Clock className="w-3 h-3" />
                <span>{asset.lastUpdated}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Asset */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Registrar Activo Institucional en Repositorio
            </h3>
            <form onSubmit={handleSaveAsset} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nombre del Activo o Recurso *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Portafolio de Empleabilidad Somos Uno 2026"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Categoría</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Programas y Servicios">Programas y Servicios</option>
                    <option value="Identidad & Logos">Identidad & Logos</option>
                    <option value="Fotografías y Testimonios">Fotografías y Testimonios</option>
                    <option value="Material de Convocatorias">Material de Convocatorias</option>
                    <option value="Plantillas y Formatos">Plantillas y Formatos</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Versión / Código</label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="Ej: 1.0, 2.1"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Área Custodia</label>
                  <input
                    type="text"
                    value={responsibleArea}
                    onChange={(e) => setResponsibleArea(e.target.value)}
                    placeholder="Ej: Coordinación Social"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Formato de Archivo</label>
                  <input
                    type="text"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    placeholder="Ej: PDF / DOCX / JPG HD"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nivel de Confidencialidad</label>
                <select
                  value={confidentialityLevel}
                  onChange={(e) => setConfidentialityLevel(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Público Institucional">Público Institucional (Libre Difusión)</option>
                  <option value="Uso Restringido">Uso Restringido (Solo Aliados y Prensa)</option>
                  <option value="Protegido (Menores/Habeas Data)">Protegido (Menores / Habeas Data)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Descripción del Contenido</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detalles sobre vigencia, alcance y utilización correcta del recurso..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700 pt-1">
                <input
                  type="checkbox"
                  checked={habeasDataCertified}
                  onChange={(e) => setHabeasDataCertified(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer"
                />
                <span>Certificado en cumplimiento de Habeas Data y directrices legales</span>
              </label>

              <div className="mt-5 flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-white bg-sky-600 hover:bg-sky-700 font-semibold cursor-pointer shadow-xs"
                >
                  Guardar en Repositorio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
