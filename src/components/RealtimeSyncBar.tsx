import React, { useState } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, ShieldCheck, Activity, Terminal } from 'lucide-react';
import { AppSyncState } from '../types';

interface RealtimeSyncBarProps {
  syncState: AppSyncState;
  onForceSync: () => void;
  onToggleOnline: () => void;
}

export const RealtimeSyncBar: React.FC<RealtimeSyncBarProps> = ({
  syncState,
  onForceSync,
  onToggleOnline,
}) => {
  const [showLogs, setShowLogs] = useState(false);

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-3 shadow-inner">
      <div className="flex items-center gap-3">
        {/* Online / Offline switch */}
        <button
          onClick={onToggleOnline}
          title="Alternar simulación de conectividad de red"
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition cursor-pointer ${
            syncState.isOnline
              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 hover:bg-emerald-900/60'
              : 'bg-rose-950/80 text-rose-400 border border-rose-800/80 hover:bg-rose-900/60'
          }`}
        >
          {syncState.isOnline ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <Wifi className="w-3.5 h-3.5" />
              <span>En Línea (Tiempo Real)</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <WifiOff className="w-3.5 h-3.5" />
              <span>Modo Sin Conexión (Caché PWA)</span>
            </>
          )}
        </button>

        <div className="hidden sm:flex items-center gap-2 text-slate-400">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>Latencia de red:</span>
          <span className="font-mono text-cyan-300">{syncState.isOnline ? `${syncState.pingMs} ms` : '0 ms (Local)'}</span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Habeas Data & Integridad:</span>
          <span className="text-emerald-400 font-semibold">Cifrado AES-256</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-slate-400 hidden lg:inline">
          Última sincronización: <strong className="text-slate-200">{syncState.lastSyncedAt}</strong>
        </span>

        {syncState.hasUnsavedChanges && (
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] animate-pulse">
            Cambios pendientes por guardar
          </span>
        )}

        <button
          onClick={onForceSync}
          disabled={syncState.isSyncing}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${syncState.isSyncing ? 'animate-spin' : ''}`} />
          <span>{syncState.isSyncing ? 'Sincronizando...' : 'Sincronizar Ahora'}</span>
        </button>

        <button
          onClick={() => setShowLogs(!showLogs)}
          className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
          title="Ver registro de eventos de sincronización"
        >
          <Terminal className="w-3.5 h-3.5 text-violet-400" />
          <span className="hidden sm:inline">Eventos ({syncState.eventsLog.length})</span>
        </button>
      </div>

      {showLogs && (
        <div className="w-full mt-2 pt-2 border-t border-slate-800 bg-slate-950 p-2.5 rounded font-mono text-[11px] text-slate-300 max-h-36 overflow-y-auto">
          <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-800">
            <span className="text-cyan-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Bitácora de Sincronización en Vivo
            </span>
            <button
              onClick={() => setShowLogs(false)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              Cerrar
            </button>
          </div>
          <div className="space-y-1">
            {syncState.eventsLog.slice(-6).reverse().map((ev) => (
              <div key={ev.id} className="flex items-start gap-2">
                <span className="text-slate-500">[{ev.time}]</span>
                <span
                  className={
                    ev.type === 'save'
                      ? 'text-amber-400 font-medium'
                      : ev.type === 'sync'
                      ? 'text-cyan-400'
                      : 'text-emerald-400'
                  }
                >
                  {ev.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
