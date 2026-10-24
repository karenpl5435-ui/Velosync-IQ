import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { StorageService, FullAppData } from './services/storageService';
import { PDFService } from './services/pdfService';
import { usePWA } from './hooks/usePWA';
import { Header } from './components/Header';
import { RealtimeSyncBar } from './components/RealtimeSyncBar';
import { DashboardTab } from './components/tabs/DashboardTab';
import { DiagnosticsObjectivesTab } from './components/tabs/DiagnosticsObjectivesTab';
import { ProcessFlowTab } from './components/tabs/ProcessFlowTab';
import { ProcessCharacterizationTab } from './components/tabs/ProcessCharacterizationTab';
import { ContentCalendarTab } from './components/tabs/ContentCalendarTab';
import { RepositoryTab } from './components/tabs/RepositoryTab';
import { AlliesCRMTab } from './components/tabs/AlliesCRMTab';
import { KPITab } from './components/tabs/KPITab';
import { SecurityProtocolsTab } from './components/tabs/SecurityProtocolsTab';
import { UserManualTab } from './components/tabs/UserManualTab';
import {
  AppSyncState,
  ContentStatus,
  AllyStage,
  CharacterizationRow,
  ContentPost,
  InstitutionalAsset,
  AllyOpportunity,
} from './types';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<FullAppData>(() => StorageService.loadData());
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warn' } | null>(null);

  // Modals
  const [isOpenNewPostModal, setIsOpenNewPostModal] = useState(false);
  const [isOpenNewAllyModal, setIsOpenNewAllyModal] = useState(false);

  // PWA Hook
  const { isInstalled, installApp, uninstallApp } = usePWA();

  // Realtime Sync State
  const [syncState, setSyncState] = useState<AppSyncState>({
    isOnline: true,
    isSyncing: false,
    lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    pingMs: 24,
    hasUnsavedChanges: false,
    eventsLog: [
      {
        id: 'ev-1',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Conexión con el núcleo VeloSync IQ establecida',
        type: 'success',
      },
      {
        id: 'ev-2',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Datos de la Corporación Social Somos Uno cargados',
        type: 'sync',
      },
    ],
  });

  const showToast = useCallback((text: string, type: 'success' | 'info' | 'warn' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Sync simulation ping loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (syncState.isOnline) {
        const jitter = Math.floor(Math.random() * 15) + 18;
        setSyncState((prev) => ({
          ...prev,
          pingMs: jitter,
        }));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [syncState.isOnline]);

  // Listen for storage events across tabs
  useEffect(() => {
    const handleSyncEvent = () => {
      const fresh = StorageService.loadData();
      setData(fresh);
      setSyncState((prev) => ({
        ...prev,
        lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      }));
    };

    window.addEventListener('velosync-sync-event', handleSyncEvent);
    window.addEventListener('storage', handleSyncEvent);

    return () => {
      window.removeEventListener('velosync-sync-event', handleSyncEvent);
      window.removeEventListener('storage', handleSyncEvent);
    };
  }, []);

  // Save changes handler
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      StorageService.saveData(data);
      setIsSaving(false);
      setSaveSuccess(true);
      setHasUnsavedChanges(false);

      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setSyncState((prev) => ({
        ...prev,
        lastSyncedAt: nowTime,
        hasUnsavedChanges: false,
        eventsLog: [
          ...prev.eventsLog,
          {
            id: `ev-save-${Date.now()}`,
            time: nowTime,
            text: 'Cambios guardados y sincronizados con éxito',
            type: 'save',
          },
        ],
      }));

      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.15 },
        });
      } catch (e) {
        // Ignore in environments where canvas is restricted
      }

      showToast('¡Todos los cambios han sido guardados y asegurados en el sistema!');
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 450);
  };

  // Force sync handler
  const handleForceSync = () => {
    setSyncState((prev) => ({ ...prev, isSyncing: true }));
    setTimeout(() => {
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setSyncState((prev) => ({
        ...prev,
        isSyncing: false,
        lastSyncedAt: nowTime,
        pingMs: Math.floor(Math.random() * 12) + 16,
        eventsLog: [
          ...prev.eventsLog,
          {
            id: `ev-sync-${Date.now()}`,
            time: nowTime,
            text: 'Sincronización forzada completada sin discrepancias',
            type: 'sync',
          },
        ],
      }));
      showToast('Sincronización en tiempo real completada con éxito.', 'info');
    }, 600);
  };

  // Toggle online/offline mode
  const handleToggleOnline = () => {
    const nextState = !syncState.isOnline;
    setSyncState((prev) => ({
      ...prev,
      isOnline: nextState,
      eventsLog: [
        ...prev.eventsLog,
        {
          id: `ev-net-${Date.now()}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: nextState
            ? 'Conectividad restaurada. Modo en línea activado.'
            : 'Modo sin conexión activado. Operando con caché PWA.',
          type: nextState ? 'success' : 'warn',
        },
      ],
    }));
    showToast(
      nextState ? 'Conexión en línea reanudada.' : 'Operando en Modo Sin Conexión (Caché local).',
      nextState ? 'success' : 'warn'
    );
  };

  // Export PDF
  const handleExportPDF = () => {
    try {
      PDFService.generateExecutiveReport(data);
      showToast('Informe Ejecutivo en PDF generado y descargado correctamente.', 'success');
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setSyncState((prev) => ({
        ...prev,
        eventsLog: [
          ...prev.eventsLog,
          {
            id: `ev-pdf-${Date.now()}`,
            time: nowTime,
            text: 'Informe oficial de mercadeo exportado a PDF',
            type: 'success',
          },
        ],
      }));
    } catch (e) {
      console.error(e);
      showToast('Error al exportar el PDF. Intente nuevamente.', 'warn');
    }
  };

  // PWA Install / Uninstall actions
  const handleInstall = async () => {
    const ok = await installApp();
    if (ok) {
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.2 },
        });
      } catch (e) {}
      showToast('¡VeloSync IQ se ha instalado como aplicación en este dispositivo!', 'success');
    }
  };

  const handleUninstall = () => {
    uninstallApp();
    showToast('La aplicación ha sido desinstalada y se ha liberado el Service Worker.', 'info');
  };

  // Data reset & backup
  const handleExportBackup = () => {
    StorageService.exportJSON(data);
    showToast('Copia de seguridad JSON descargada.', 'info');
  };

  const handleResetData = () => {
    StorageService.resetAllData();
    const fresh = StorageService.loadData();
    setData(fresh);
    setHasUnsavedChanges(false);
    showToast('Los datos del documento original han sido restablecidos.', 'info');
  };

  // Interactive Updates
  const handleUpdateObjectiveProgress = (problemId: string, specId: string, newProgress: number) => {
    setData((prev) => {
      const updatedObjs = prev.objectives.map((obj) => {
        if (obj.problemId === problemId) {
          return {
            ...obj,
            specificObjectives: obj.specificObjectives.map((s) =>
              s.id === specId ? { ...s, progressPercentage: newProgress } : s
            ),
          };
        }
        return obj;
      });
      return { ...prev, objectives: updatedObjs };
    });
    setHasUnsavedChanges(true);
  };

  const handleAddCharacterizationRow = (newRow: Omit<CharacterizationRow, 'id'>) => {
    const rowWithId: CharacterizationRow = {
      ...newRow,
      id: `char-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      characterization: [...prev.characterization, rowWithId],
    }));
    setHasUnsavedChanges(true);
    showToast('Paso agregado a la matriz de caracterización.', 'success');
  };

  const handleAddPost = (newPost: Omit<ContentPost, 'id'>) => {
    const postWithId: ContentPost = {
      ...newPost,
      id: `post-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      posts: [postWithId, ...prev.posts],
    }));
    setHasUnsavedChanges(true);
    showToast('Publicación registrada exitosamente en el calendario.', 'success');
  };

  const handleUpdatePostStatus = (postId: string, newStatus: ContentStatus) => {
    setData((prev) => ({
      ...prev,
      posts: prev.posts.map((p) => (p.id === postId ? { ...p, status: newStatus } : p)),
    }));
    setHasUnsavedChanges(true);
    showToast(`Estado de la publicación actualizado a: ${newStatus}`, 'info');
  };

  const handleAddAsset = (newAsset: Omit<InstitutionalAsset, 'id'>) => {
    const assetWithId: InstitutionalAsset = {
      ...newAsset,
      id: `asset-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      assets: [assetWithId, ...prev.assets],
    }));
    setHasUnsavedChanges(true);
    showToast('Activo agregado al banco institucional.', 'success');
  };

  const handleAddAlly = (newAlly: Omit<AllyOpportunity, 'id'>) => {
    const allyWithId: AllyOpportunity = {
      ...newAlly,
      id: `ally-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      allies: [allyWithId, ...prev.allies],
    }));
    setHasUnsavedChanges(true);
    showToast('Nuevo aliado registrado en el embudo de relacionamiento.', 'success');
  };

  const handleUpdateAllyStage = (allyId: string, newStage: AllyStage) => {
    setData((prev) => ({
      ...prev,
      allies: prev.allies.map((a) => (a.id === allyId ? { ...a, stage: newStage } : a)),
    }));
    setHasUnsavedChanges(true);
    showToast(`Aliado trasladado a la etapa: ${newStage}`, 'info');
  };

  const handleUpdateKpiValue = (kpiId: string, newValue: number) => {
    setData((prev) => ({
      ...prev,
      kpis: prev.kpis.map((k) => {
        if (k.id === kpiId) {
          const ratio = newValue / k.targetValue;
          let status: 'optimo' | 'alerta' | 'critico' = 'optimo';
          if (ratio < 0.75) status = 'critico';
          else if (ratio < 0.9) status = 'alerta';

          return {
            ...k,
            currentValue: newValue,
            status,
          };
        }
        return k;
      }),
    }));
    setHasUnsavedChanges(true);
    showToast('Medición de indicador actualizada con éxito.', 'success');
  };

  const handleAddCorrectiveAction = (kpiId: string, actionText: string) => {
    setData((prev) => ({
      ...prev,
      kpis: prev.kpis.map((k) =>
        k.id === kpiId ? { ...k, correctiveActions: [...k.correctiveActions, actionText] } : k
      ),
    }));
    setHasUnsavedChanges(true);
    showToast('Acción de mejora continua (PHVA) agregada.', 'success');
  };

  const handleToggleChecklistItem = (protocolId: string, itemId: string) => {
    setData((prev) => ({
      ...prev,
      protocols: prev.protocols.map((prot) => {
        if (prot.id === protocolId) {
          return {
            ...prot,
            checklist: prot.checklist.map((c) =>
              c.id === itemId ? { ...c, verified: !c.verified } : c
            ),
          };
        }
        return prot;
      }),
    }));
    setHasUnsavedChanges(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Realtime Synchronization & Latency Status Bar */}
      <RealtimeSyncBar
        syncState={syncState}
        onForceSync={handleForceSync}
        onToggleOnline={handleToggleOnline}
      />

      {/* Main Header with Actions (Guardar, Exportar PDF, Instalar/Desinstalar) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSave={handleSave}
        onExportPDF={handleExportPDF}
        isSaving={isSaving}
        saveSuccess={saveSuccess}
        hasUnsavedChanges={hasUnsavedChanges}
        isInstalled={isInstalled}
        onInstall={handleInstall}
        onUninstall={handleUninstall}
        onExportBackup={handleExportBackup}
        onResetData={handleResetData}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-xs font-semibold border ${
              toastMessage.type === 'success'
                ? 'bg-emerald-900 text-white border-emerald-700'
                : toastMessage.type === 'warn'
                ? 'bg-amber-900 text-white border-amber-700'
                : 'bg-slate-900 text-white border-slate-700'
            }`}
          >
            {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {toastMessage.type === 'warn' && <AlertCircle className="w-4 h-4 text-amber-400" />}
            {toastMessage.type === 'info' && <Info className="w-4 h-4 text-sky-400" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardTab
            data={data}
            setActiveTab={setActiveTab}
            onOpenNewPost={() => {
              setActiveTab('calendario');
              setIsOpenNewPostModal(true);
            }}
            onOpenNewAlly={() => {
              setActiveTab('alianzas');
              setIsOpenNewAllyModal(true);
            }}
          />
        )}

        {activeTab === 'diagnostico' && (
          <DiagnosticsObjectivesTab
            problems={data.problems}
            objectives={data.objectives}
            onUpdateObjectiveProgress={handleUpdateObjectiveProgress}
          />
        )}

        {activeTab === 'flujograma' && (
          <ProcessFlowTab
            modules={data.modules}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'caracterizacion' && (
          <ProcessCharacterizationTab
            characterizationRows={data.characterization}
            onAddRow={handleAddCharacterizationRow}
          />
        )}

        {activeTab === 'calendario' && (
          <ContentCalendarTab
            posts={data.posts}
            onAddPost={handleAddPost}
            onUpdatePostStatus={handleUpdatePostStatus}
            isOpenNewPostModal={isOpenNewPostModal}
            setIsOpenNewPostModal={setIsOpenNewPostModal}
          />
        )}

        {activeTab === 'repositorio' && (
          <RepositoryTab
            assets={data.assets}
            onAddAsset={handleAddAsset}
          />
        )}

        {activeTab === 'alianzas' && (
          <AlliesCRMTab
            allies={data.allies}
            onAddAlly={handleAddAlly}
            onUpdateAllyStage={handleUpdateAllyStage}
            isOpenNewAllyModal={isOpenNewAllyModal}
            setIsOpenNewAllyModal={setIsOpenNewAllyModal}
          />
        )}

        {activeTab === 'kpis' && (
          <KPITab
            kpis={data.kpis}
            onUpdateKpiValue={handleUpdateKpiValue}
            onAddCorrectiveAction={handleAddCorrectiveAction}
          />
        )}

        {activeTab === 'seguridad' && (
          <SecurityProtocolsTab
            protocols={data.protocols}
            onToggleChecklistItem={handleToggleChecklistItem}
          />
        )}

        {activeTab === 'manual' && <UserManualTab />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">VeloSync IQ</span>
            <span>·</span>
            <span>Corporación Social Somos Uno</span>
            <span>·</span>
            <span>Proceso de Mercadeo y Visibilidad Institucional (PHVA)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Cumplimiento Legal: Ley 1581 (Habeas Data) & ICBF</span>
            <span>·</span>
            <button
              onClick={() => setActiveTab('manual')}
              className="text-sky-600 hover:underline cursor-pointer"
            >
              Manual de Usuario
            </button>
            <span>·</span>
            <button
              onClick={handleExportPDF}
              className="text-rose-600 hover:underline font-semibold cursor-pointer"
            >
              Descargar Informe PDF
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
