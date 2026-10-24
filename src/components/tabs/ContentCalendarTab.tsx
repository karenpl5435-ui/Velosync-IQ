import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Filter,
  CheckCircle,
  Clock,
  Send,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Tag,
  ChevronRight,
} from 'lucide-react';
import { ContentPost, ContentStatus } from '../../types';

interface ContentCalendarTabProps {
  posts: ContentPost[];
  onAddPost: (post: Omit<ContentPost, 'id'>) => void;
  onUpdatePostStatus: (postId: string, newStatus: ContentStatus) => void;
  isOpenNewPostModal: boolean;
  setIsOpenNewPostModal: (open: boolean) => void;
}

export const ContentCalendarTab: React.FC<ContentCalendarTabProps> = ({
  posts,
  onAddPost,
  onUpdatePostStatus,
  isOpenNewPostModal,
  setIsOpenNewPostModal,
}) => {
  const [filterChannel, setFilterChannel] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Form state for unified Brief
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState<ContentPost['channel']>('Redes Sociales');
  const [format, setFormat] = useState<ContentPost['format']>('Infografía / Gráfica');
  const [scheduledDate, setScheduledDate] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [targetAudience, setTargetAudience] = useState('');
  const [keyMessage, setKeyMessage] = useState('');
  const [responsibleAuthor, setResponsibleAuthor] = useState('');
  const [reviewer, setReviewer] = useState('Líder de Mercadeo');
  const [habeasDataAuthorized, setHabeasDataAuthorized] = useState(true);
  const [qualityCheckPassed, setQualityCheckPassed] = useState(true);
  const [notes, setNotes] = useState('');

  const filteredPosts = posts.filter((post) => {
    const matchesChannel = filterChannel === 'ALL' || post.channel === filterChannel;
    const matchesStatus = filterStatus === 'ALL' || post.status === filterStatus;
    return matchesChannel && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !targetAudience || !keyMessage) return;

    onAddPost({
      title,
      channel,
      format,
      scheduledDate,
      targetAudience,
      keyMessage,
      responsibleAuthor: responsibleAuthor || 'Equipo de Comunicaciones',
      reviewer,
      status: 'En Revisión',
      habeasDataAuthorized,
      qualityCheckPassed,
      notes,
    });

    setIsOpenNewPostModal(false);
    // Reset form
    setTitle('');
    setTargetAudience('');
    setKeyMessage('');
    setNotes('');
  };

  const getStatusBadge = (status: ContentStatus) => {
    switch (status) {
      case 'Borrador':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'En Revisión':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Aprobado':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Programado':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Publicado':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold mb-2">
            <CalendarIcon className="w-3.5 h-3.5" />
            Solución Operativa al Problema 2 · Programación Centralizada
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Parrilla y Calendario Editorial Centralizado de Contenidos
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Elimina la difusión desorganizada mediante una parrilla unificada con flujo de aprobación formal, validación de consentimientos de imagen (Habeas Data) y control de calidad institucional antes de cada lanzamiento.
          </p>
        </div>

        <button
          onClick={() => setIsOpenNewPostModal(true)}
          className="shrink-0 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Solicitar Pieza (Brief Único)</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Canal:
          </span>
          {['ALL', 'Redes Sociales', 'Sitio Web', 'Boletín Comunitario', 'Convocatorias', 'Medios Aliados'].map(
            (c) => (
              <button
                key={c}
                onClick={() => setFilterChannel(c)}
                className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                  filterChannel === c
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c === 'ALL' ? 'Todos' : c}
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-500">Estado:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1 rounded-md border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-sky-500"
          >
            <option value="ALL">Todos los Estados</option>
            <option value="Borrador">Borrador</option>
            <option value="En Revisión">En Revisión</option>
            <option value="Aprobado">Aprobado</option>
            <option value="Programado">Programado</option>
            <option value="Publicado">Publicado</option>
          </select>
        </div>
      </div>

      {/* Posts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {post.channel}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                    post.status
                  )}`}
                >
                  {post.status}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug mb-2">
                {post.title}
              </h4>

              <div className="space-y-1.5 text-xs text-slate-600 mb-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p>
                  <strong className="text-slate-700">Público:</strong> {post.targetAudience}
                </p>
                <p className="line-clamp-2">
                  <strong className="text-slate-700">Mensaje Clave:</strong> {post.keyMessage}
                </p>
                <p>
                  <strong className="text-slate-700">Formato:</strong> {post.format}
                </p>
              </div>

              {/* Security & Quality Compliance Tags */}
              <div className="flex items-center gap-2 text-[10px] font-medium text-slate-600 mb-3">
                <span
                  className={`px-2 py-0.5 rounded flex items-center gap-1 ${
                    post.habeasDataAuthorized
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  <ShieldCheck className="w-3 h-3" />
                  {post.habeasDataAuthorized ? 'Habeas Data OK' : 'Falta Consentimiento'}
                </span>
                <span
                  className={`px-2 py-0.5 rounded flex items-center gap-1 ${
                    post.qualityCheckPassed
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  <FileCheck className="w-3 h-3" />
                  {post.qualityCheckPassed ? 'Calidad OK' : 'Revisión Pendiente'}
                </span>
              </div>
            </div>

            {/* Bottom Actions: Scheduled Date and State Transition */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-slate-500 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{post.scheduledDate}</span>
              </div>

              <div className="flex items-center gap-1">
                {post.status === 'Borrador' && (
                  <button
                    onClick={() => onUpdatePostStatus(post.id, 'En Revisión')}
                    className="px-2 py-1 rounded bg-amber-50 text-amber-700 font-semibold hover:bg-amber-100 transition cursor-pointer text-[11px]"
                  >
                    Enviar a Revisión
                  </button>
                )}
                {post.status === 'En Revisión' && (
                  <button
                    onClick={() => onUpdatePostStatus(post.id, 'Aprobado')}
                    className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100 transition cursor-pointer text-[11px] flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3" />
                    <span>Aprobar (Vo.Bo.)</span>
                  </button>
                )}
                {post.status === 'Aprobado' && (
                  <button
                    onClick={() => onUpdatePostStatus(post.id, 'Programado')}
                    className="px-2 py-1 rounded bg-sky-50 text-sky-700 font-semibold hover:bg-sky-100 transition cursor-pointer text-[11px]"
                  >
                    Programar
                  </button>
                )}
                {post.status === 'Programado' && (
                  <button
                    onClick={() => onUpdatePostStatus(post.id, 'Publicado')}
                    className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 font-semibold hover:bg-indigo-100 transition cursor-pointer text-[11px] flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Marcar Publicado</span>
                  </button>
                )}
                {post.status === 'Publicado' && (
                  <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Difundido
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: New Post (Plantilla Común de Brief) */}
      {isOpenNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                  Plantilla Común de Comunicación
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Brief de Solicitud y Programación de Contenido
                </h3>
              </div>
              <button
                onClick={() => setIsOpenNewPostModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Título de la Publicación / Campaña *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Convocatoria Taller Comunitario de Robótica para Jóvenes"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Canal de Difusión</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Redes Sociales">Redes Sociales (IG/FB)</option>
                    <option value="Sitio Web">Sitio Web Institucional</option>
                    <option value="Boletín Comunitario">Boletín Comunitario</option>
                    <option value="Convocatorias">Carteleras / Convocatorias</option>
                    <option value="Medios Aliados">Medios Aliados / Prensa</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Formato</label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Infografía / Gráfica">Infografía / Gráfica</option>
                    <option value="Video & Reel">Video & Reel</option>
                    <option value="Fotografía y Testimonio">Fotografía y Testimonio</option>
                    <option value="Boletín Digital">Boletín Digital</option>
                    <option value="Prensa y Comunicado">Prensa y Comunicado</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Fecha Programada</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Público Prioritario Destinatario *
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Ej: Madres de familia, jóvenes 14-25 años, empresas aliadas"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Mensaje Clave Institucional (Copy o Propósito) *
                </label>
                <textarea
                  value={keyMessage}
                  onChange={(e) => setKeyMessage(e.target.value)}
                  placeholder="¿Qué queremos que la comunidad o aliados conozcan o hagan al ver esta pieza?"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Responsable Solicitante</label>
                  <input
                    type="text"
                    value={responsibleAuthor}
                    onChange={(e) => setResponsibleAuthor(e.target.value)}
                    placeholder="Área de Proyectos, Coordinación de Campo..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Revisor / Aprobador</label>
                  <input
                    type="text"
                    value={reviewer}
                    onChange={(e) => setReviewer(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Protocolos de Seguridad y Calidad */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block">
                  Verificación de Protocolos de Seguridad y Calidad (Mandatorio):
                </span>
                <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={habeasDataAuthorized}
                    onChange={(e) => setHabeasDataAuthorized(e.target.checked)}
                    className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer"
                  />
                  <span>
                    <strong>Consentimiento Habeas Data / Imagen verificado:</strong> Cuenta con autorización expresa para difusión pública (Ley 1581 / ICBF).
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={qualityCheckPassed}
                    onChange={(e) => setQualityCheckPassed(e.target.checked)}
                    className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer"
                  />
                  <span>
                    <strong>Control de Exactitud:</strong> Fechas, teléfonos de contacto y ortografía contrastados con las áreas operativas.
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOpenNewPostModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-white bg-sky-600 hover:bg-sky-700 font-semibold cursor-pointer shadow-xs"
                >
                  Registrar en Calendario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
