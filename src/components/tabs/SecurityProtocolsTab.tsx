import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  Download,
  Printer,
  Copy,
  Check,
  Scale,
} from 'lucide-react';
import { SecurityProtocol } from '../../types';

interface SecurityProtocolsTabProps {
  protocols: SecurityProtocol[];
  onToggleChecklistItem: (protocolId: string, itemId: string) => void;
}

export const SecurityProtocolsTab: React.FC<SecurityProtocolsTabProps> = ({
  protocols,
  onToggleChecklistItem,
}) => {
  const [copiedConsent, setCopiedConsent] = useState(false);
  const [selectedProtocolId, setSelectedProtocolId] = useState<string>(protocols[0]?.id || 'prot-1');

  const selectedProtocol = protocols.find((p) => p.id === selectedProtocolId) || protocols[0];

  const consentFormTemplate = `FORMATO DE AUTORIZACIÓN EXPRESA PARA EL TRATAMIENTO DE DATOS PERSONALES Y USO DE IMAGEN
CORPORACIÓN SOCIAL SOMOS UNO — NIT: 900.XXX.XXX-X

Yo, ____________________________________________________, identificado(a) con C.C. Nº ________________________,
actuando en nombre propio / en representación del menor _____________________________________________________,
autorizo de manera libre, voluntaria, previa y debidamente informada a la CORPORACIÓN SOCIAL SOMOS UNO para:

1. Recolectar, almacenar y utilizar los datos personales suministrados con fines estrictamente misionales y comunitarios.
2. Capturar, editar y publicar imágenes fotográficas y grabaciones audiovisuales donde participe en actividades comunitarias,
   para ser difundidas en medios institucionales (redes sociales, portal web, boletines y memorias de gestión).
3. Entiendo que esta autorización no persigue fines comerciales lucrativos y que en cualquier momento puedo ejercer
   mis derechos de conocer, actualizar, rectificar o revocar este consentimiento según lo estipulado en la Ley 1581 de 2012.

Firma del Titular o Representante Legal: _____________________________________
Cédula de Ciudadanía: _______________________
Teléfono de Contacto: _______________________
Fecha: _____ de _______________ de 2026`;

  const handleCopyConsent = () => {
    navigator.clipboard.writeText(consentFormTemplate);
    setCopiedConsent(true);
    setTimeout(() => setCopiedConsent(false), 2500);
  };

  const handlePrintConsent = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Formato de Autorización - Corporación Social Somos Uno</title>
            <style>
              body { font-family: sans-serif; padding: 40px; line-height: 1.6; font-size: 13px; }
              h2 { text-align: center; color: #0369a1; margin-bottom: 25px; }
              .box { border: 1px solid #cbd5e1; padding: 25px; border-radius: 8px; }
              .footer { margin-top: 50px; }
            </style>
          </head>
          <body>
            <div class="box">
              <pre style="white-space: pre-wrap; font-family: inherit;">${consentFormTemplate}</pre>
            </div>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-2">
            <Scale className="w-3.5 h-3.5 text-sky-600" />
            Marco Jurídico y Protocolos de Seguridad Operativa
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Protocolos de Seguridad, Habeas Data y Control de Calidad
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Garantiza una implementación técnica y social exitosa, escalable y conforme a la Ley Estatutaria 1581 de 2012 y el Código de la Infancia y Adolescencia en cada pieza de comunicación y gestión de datos.
          </p>
        </div>
      </div>

      {/* Protocols Navigation & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Protocol Selector List */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Protocolos Operativos
          </span>
          {protocols.map((prot) => {
            const isSelected = prot.id === selectedProtocolId;
            const completedCount = prot.checklist.filter((c) => c.verified).length;
            const isFullyCompliant = completedCount === prot.checklist.length;

            return (
              <button
                key={prot.id}
                onClick={() => setSelectedProtocolId(prot.id)}
                className={`w-full p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-100 shadow-xs'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="font-bold text-slate-500">{prot.code}</span>
                    <span
                      className={`font-semibold px-2 py-0.5 rounded-full ${
                        isFullyCompliant
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {completedCount}/{prot.checklist.length} Verificados
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {prot.title}
                  </h4>
                </div>

                <div className="mt-3 text-[10px] text-slate-500 font-medium">
                  Base: {prot.legalBase}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Protocol Deep Dive */}
        {selectedProtocol && (
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-sky-600">
                  {selectedProtocol.code}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {selectedProtocol.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {selectedProtocol.title}
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-1">
                <strong>Fundamento Legal:</strong> {selectedProtocol.legalBase}
              </p>
            </div>

            {/* Objective */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider block mb-1">
                Propósito del Protocolo
              </span>
              <p className="text-slate-700 leading-relaxed">{selectedProtocol.objective}</p>
            </div>

            {/* Mandatory Guidelines */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Directrices Operativas Mandatorias
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedProtocol.mandatoryGuidelines.map((g, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Checklist */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Lista de Chequeo de Cumplimiento (Auditoría en Tiempo Real)
              </h4>
              <div className="space-y-2">
                {selectedProtocol.checklist.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 hover:bg-slate-50 transition cursor-pointer text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={item.verified}
                      onChange={() => onToggleChecklistItem(selectedProtocol.id, item.id)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                    />
                    <span
                      className={`leading-snug ${
                        item.verified ? 'text-slate-800 font-medium' : 'text-slate-500'
                      }`}
                    >
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Model Consent Form Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-sky-400" />
              Modelo Oficial de Consentimiento Informado (Habeas Data & Uso de Imagen)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Plantilla jurídica lista para imprimir o copiar para trabajo de campo con comunidades y donantes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyConsent}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedConsent ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedConsent ? '¡Copiado!' : 'Copiar Texto'}</span>
            </button>
            <button
              onClick={handlePrintConsent}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Formato</span>
            </button>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap border border-slate-800">
          {consentFormTemplate}
        </div>
      </div>
    </div>
  );
};
