import React, { useState } from 'react';
import {
  FileText,
  Save,
  Download,
  Trash2,
  UploadCloud,
  Check,
  Smartphone,
  Layers,
  Sparkles,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSave: () => void;
  onExportPDF: () => void;
  isSaving: boolean;
  saveSuccess: boolean;
  hasUnsavedChanges: boolean;
  isInstalled: boolean;
  onInstall: () => void;
  onUninstall: () => void;
  onExportBackup: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onSave,
  onExportPDF,
  isSaving,
  saveSuccess,
  hasUnsavedChanges,
  isInstalled,
  onInstall,
  onUninstall,
  onExportBackup,
  onResetData,
}) => {
  const [showUninstallModal, setShowUninstallModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Tablero Principal' },
    { id: 'diagnostico', label: '1. Diagnóstico & Objetivos' },
    { id: 'flujograma', label: '2. Flujograma PHVA (6 Módulos)' },
    { id: 'caracterizacion', label: '3. Caracterización de Procesos' },
    { id: 'calendario', label: '4. Calendario & Contenidos' },
    { id: 'repositorio', label: '5. Banco de Contenidos' },
    { id: 'alianzas', label: '6. Alianzas & Donantes (CRM)' },
    { id: 'kpis', label: '7. Indicadores (KPIs)' },
    { id: 'seguridad', label: '8. Protocolos de Seguridad' },
    { id: 'manual', label: '9. Manual de Usuario' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Banner & Corporate Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 via-cyan-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-sky-600/20 ring-2 ring-sky-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                  VeloSync <span className="text-sky-600 font-extrabold">IQ</span>
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 uppercase tracking-wider">
                  v2.6 Enterprise
                </span>
                {isInstalled && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <Smartphone className="w-3 h-3" /> App Instalada
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Corporación Social Somos Uno · Optimización Operativa & Proceso de Mercadeo
              </p>
            </div>
          </div>

          {/* Action Buttons: Guardar, Exportar PDF, Instalar/Desinstalar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Guardar / Guardar Cambios Button */}
            <button
              onClick={onSave}
              disabled={isSaving}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer ${
                saveSuccess
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 ring-2 ring-emerald-200'
                  : hasUnsavedChanges
                  ? 'bg-sky-600 text-white hover:bg-sky-700 ring-2 ring-sky-300 animate-pulse'
                  : 'bg-slate-800 text-white hover:bg-slate-900'
              }`}
              title="Guardar todos los cambios en el sistema"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-100" />
                  <span>¡Cambios Guardados!</span>
                </>
              ) : isSaving ? (
                <>
                  <UploadCloud className="w-4 h-4 animate-bounce text-sky-200" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{hasUnsavedChanges ? 'Guardar Cambios *' : 'Guardar Datos'}</span>
                </>
              )}
            </button>

            {/* Exportar a PDF Button */}
            <button
              onClick={onExportPDF}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 hover:border-rose-300 transition shadow-xs cursor-pointer"
              title="Descargar informe ejecutivo formal en formato PDF"
            >
              <FileText className="w-4 h-4 text-rose-600" />
              <span>Exportar PDF</span>
            </button>

            {/* Instalar / Desinstalar Button */}
            {!isInstalled ? (
              <button
                onClick={onInstall}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition shadow-xs cursor-pointer"
                title="Instalar VeloSync IQ como aplicación de escritorio / móvil"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Instalar Aplicación</span>
              </button>
            ) : (
              <button
                onClick={() => setShowUninstallModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition shadow-xs cursor-pointer"
                title="Desinstalar la aplicación y limpiar recursos locales"
              >
                <Trash2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Desinstalar App</span>
              </button>
            )}

            {/* Backup & System Options */}
            <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
              <button
                onClick={onExportBackup}
                title="Descargar copia de seguridad en JSON"
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowResetModal(true)}
                title="Restablecer datos originales del documento"
                className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
              >
                <Layers className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation with horizontal scroll on mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <nav className="flex space-x-1 overflow-x-auto py-1 scrollbar-none text-xs font-medium">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-md whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-bold border-b-2 border-sky-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Uninstall Confirmation Modal */}
      {showUninstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              ¿Desinstalar VeloSync IQ del dispositivo?
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Esta acción desinstalará el modo de aplicación de escritorio/móvil y purgará los registros temporales del Service Worker en este navegador. Tus datos guardados permanecerán protegidos en el almacenamiento local.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowUninstallModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onUninstall();
                  setShowUninstallModal(false);
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition cursor-pointer shadow-xs"
              >
                Confirmar Desinstalación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Restablecer datos originales del proceso
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              ¿Deseas recargar la caracterización inicial, diagnóstico operativo, indicadores y tablas tal como fueron definidas en la investigación de la Corporación Social Somos Uno?
            </p>
            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onResetData();
                  setShowResetModal(false);
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 transition cursor-pointer shadow-xs"
              >
                Restablecer Todo
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
