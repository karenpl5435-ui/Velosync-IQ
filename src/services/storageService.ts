import {
  OperationalProblem,
  ObjectiveMatrixItem,
  PHVAModule,
  CharacterizationRow,
  ContentPost,
  InstitutionalAsset,
  AllyOpportunity,
  KPIIndicator,
  SecurityProtocol,
  ActivityLog,
} from '../types';
import {
  INITIAL_PROBLEMS,
  INITIAL_OBJECTIVES,
  INITIAL_PHVA_MODULES,
  INITIAL_CHARACTERIZATION_ROWS,
  INITIAL_POSTS,
  INITIAL_ASSETS,
  INITIAL_ALLIES,
  INITIAL_KPIS,
  INITIAL_SECURITY_PROTOCOLS,
} from '../data/initialData';

const STORAGE_KEYS = {
  PROBLEMS: 'velosync_problems_v1',
  OBJECTIVES: 'velosync_objectives_v1',
  MODULES: 'velosync_modules_v1',
  CHARACTERIZATION: 'velosync_characterization_v1',
  POSTS: 'velosync_posts_v1',
  ASSETS: 'velosync_assets_v1',
  ALLIES: 'velosync_allies_v1',
  KPIS: 'velosync_kpis_v1',
  PROTOCOLS: 'velosync_protocols_v1',
  LOGS: 'velosync_logs_v1',
  LAST_SAVED: 'velosync_last_saved',
};

export interface FullAppData {
  problems: OperationalProblem[];
  objectives: ObjectiveMatrixItem[];
  modules: PHVAModule[];
  characterization: CharacterizationRow[];
  posts: ContentPost[];
  assets: InstitutionalAsset[];
  allies: AllyOpportunity[];
  kpis: KPIIndicator[];
  protocols: SecurityProtocol[];
  logs: ActivityLog[];
  lastSaved: string;
}

export const StorageService = {
  loadData(): FullAppData {
    try {
      const problems = localStorage.getItem(STORAGE_KEYS.PROBLEMS);
      const objectives = localStorage.getItem(STORAGE_KEYS.OBJECTIVES);
      const modules = localStorage.getItem(STORAGE_KEYS.MODULES);
      const characterization = localStorage.getItem(STORAGE_KEYS.CHARACTERIZATION);
      const posts = localStorage.getItem(STORAGE_KEYS.POSTS);
      const assets = localStorage.getItem(STORAGE_KEYS.ASSETS);
      const allies = localStorage.getItem(STORAGE_KEYS.ALLIES);
      const kpis = localStorage.getItem(STORAGE_KEYS.KPIS);
      const protocols = localStorage.getItem(STORAGE_KEYS.PROTOCOLS);
      const logs = localStorage.getItem(STORAGE_KEYS.LOGS);
      const lastSaved = localStorage.getItem(STORAGE_KEYS.LAST_SAVED) || new Date().toISOString();

      return {
        problems: problems ? JSON.parse(problems) : INITIAL_PROBLEMS,
        objectives: objectives ? JSON.parse(objectives) : INITIAL_OBJECTIVES,
        modules: modules ? JSON.parse(modules) : INITIAL_PHVA_MODULES,
        characterization: characterization ? JSON.parse(characterization) : INITIAL_CHARACTERIZATION_ROWS,
        posts: posts ? JSON.parse(posts) : INITIAL_POSTS,
        assets: assets ? JSON.parse(assets) : INITIAL_ASSETS,
        allies: allies ? JSON.parse(allies) : INITIAL_ALLIES,
        kpis: kpis ? JSON.parse(kpis) : INITIAL_KPIS,
        protocols: protocols ? JSON.parse(protocols) : INITIAL_SECURITY_PROTOCOLS,
        logs: logs ? JSON.parse(logs) : [
          {
            id: 'log-init',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            action: 'Sistema VeloSync IQ inicializado con éxito',
            module: 'Núcleo Operativo',
            author: 'Sistema',
            status: 'success',
          },
        ],
        lastSaved,
      };
    } catch (e) {
      console.error('Error cargando datos de LocalStorage:', e);
      return {
        problems: INITIAL_PROBLEMS,
        objectives: INITIAL_OBJECTIVES,
        modules: INITIAL_PHVA_MODULES,
        characterization: INITIAL_CHARACTERIZATION_ROWS,
        posts: INITIAL_POSTS,
        assets: INITIAL_ASSETS,
        allies: INITIAL_ALLIES,
        kpis: INITIAL_KPIS,
        protocols: INITIAL_SECURITY_PROTOCOLS,
        logs: [],
        lastSaved: new Date().toISOString(),
      };
    }
  },

  saveData(data: FullAppData): void {
    try {
      const now = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(data.problems));
      localStorage.setItem(STORAGE_KEYS.OBJECTIVES, JSON.stringify(data.objectives));
      localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(data.modules));
      localStorage.setItem(STORAGE_KEYS.CHARACTERIZATION, JSON.stringify(data.characterization));
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(data.posts));
      localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(data.assets));
      localStorage.setItem(STORAGE_KEYS.ALLIES, JSON.stringify(data.allies));
      localStorage.setItem(STORAGE_KEYS.KPIS, JSON.stringify(data.kpis));
      localStorage.setItem(STORAGE_KEYS.PROTOCOLS, JSON.stringify(data.protocols));
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(data.logs));
      localStorage.setItem(STORAGE_KEYS.LAST_SAVED, now);

      // Dispatch cross-tab and in-tab event for real-time sync reflection
      window.dispatchEvent(new CustomEvent('velosync-sync-event', { detail: { timestamp: now } }));
    } catch (e) {
      console.error('Error guardando en LocalStorage:', e);
    }
  },

  exportJSON(data: FullAppData): void {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `VeloSync_IQ_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  resetAllData(): void {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    localStorage.removeItem('velosync_installed_state');
    window.dispatchEvent(new CustomEvent('velosync-sync-event', { detail: { timestamp: new Date().toISOString() } }));
  },
};
