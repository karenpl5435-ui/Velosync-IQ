export type PHVAStage = 'PLANIFICAR' | 'PLANIFICAR / HACER' | 'HACER' | 'HACER / VERIFICAR' | 'VERIFICAR / ACTUAR';

export interface OperationalProblem {
  id: string;
  code: string;
  title: string;
  description: string;
  impactLevel: 'Alto' | 'Medio' | 'Crítico';
  operationalRisk: string;
  associatedPHVA: string;
}

export interface ObjectiveMatrixItem {
  id: string;
  problemId: string;
  problemTitle: string;
  generalObjective: string;
  specificObjectives: {
    id: string;
    text: string;
    targetIndicator: string;
    progressPercentage: number;
    responsibleRole: string;
  }[];
}

export interface PHVAModule {
  id: string;
  stepNumber: number;
  code: string;
  name: string;
  phvaStage: PHVAStage;
  description: string;
  provider: string;
  inputs: string[];
  activities: string[];
  outputs: string[];
  client: string;
  operationalTips: string;
}

export interface CharacterizationRow {
  id: string;
  moduleCode: string;
  phvaStage: PHVAStage;
  provider: string;
  inputs: string;
  stepActivities: string;
  outputs: string;
  customer: string;
}

export type ContentStatus = 'Borrador' | 'En Revisión' | 'Aprobado' | 'Programado' | 'Publicado';

export interface ContentPost {
  id: string;
  title: string;
  channel: 'Redes Sociales' | 'Sitio Web' | 'Boletín Comunitario' | 'Convocatorias' | 'Medios Aliados';
  format: 'Infografía / Gráfica' | 'Video & Reel' | 'Fotografía y Testimonio' | 'Boletín Digital' | 'Prensa y Comunicado';
  scheduledDate: string;
  targetAudience: string;
  keyMessage: string;
  responsibleAuthor: string;
  reviewer: string;
  status: ContentStatus;
  habeasDataAuthorized: boolean;
  qualityCheckPassed: boolean;
  notes?: string;
}

export interface InstitutionalAsset {
  id: string;
  name: string;
  category: 'Programas y Servicios' | 'Identidad & Logos' | 'Fotografías y Testimonios' | 'Material de Convocatorias' | 'Plantillas y Formatos';
  lastUpdated: string;
  responsibleArea: string;
  version: string;
  confidentialityLevel: 'Público Institucional' | 'Uso Restringido' | 'Protegido (Menores/Habeas Data)';
  habeasDataCertified: boolean;
  format: string;
  description: string;
}

export type AllyStage = 'Identificado' | 'Acercamiento Inicial' | 'Presentación Institucional' | 'En Negociación' | 'Alianza Activa';

export interface AllyOpportunity {
  id: string;
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  sector: 'Empresa Privada' | 'ONG / Fundación' | 'Sector Público' | 'Cooperación Internacional' | 'Comunidad y Líderes';
  stage: AllyStage;
  potentialSupport: string;
  lastInteractionDate: string;
  nextFollowUpDate: string;
  commitments: string;
  estimatedContribution: string;
}

export interface KPIIndicator {
  id: string;
  code: string;
  name: string;
  category: 'Visibilidad' | 'Interacción y Engagement' | 'Eficiencia Operativa' | 'Alianzas y Sostenibilidad' | 'Participación Comunitaria';
  currentValue: number;
  targetValue: number;
  unit: string;
  formula: string;
  frequency: 'Mensual' | 'Bimestral' | 'Trimestral';
  responsible: string;
  status: 'optimo' | 'alerta' | 'critico';
  trend: 'up' | 'down' | 'stable';
  historical: { month: string; value: number }[];
  correctiveActions: string[];
}

export interface SecurityProtocol {
  id: string;
  code: string;
  title: string;
  category: 'Protección de Datos' | 'Derechos de Imagen' | 'Control de Calidad' | 'Control de Acceso' | 'Trazabilidad y Respaldo';
  legalBase: string;
  objective: string;
  mandatoryGuidelines: string[];
  checklist: { id: string; label: string; verified: boolean }[];
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  module: string;
  author: string;
  status: 'info' | 'success' | 'warning';
}

export interface AppSyncState {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncedAt: string;
  pingMs: number;
  hasUnsavedChanges: boolean;
  eventsLog: { id: string; time: string; text: string; type: 'success' | 'sync' | 'save' | 'warn' }[];
}
