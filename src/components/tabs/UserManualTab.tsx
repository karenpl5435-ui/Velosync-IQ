import React, { useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  Smartphone,
  ShieldCheck,
  Calendar,
  Handshake,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Save,
  Download,
  UploadCloud,
} from 'lucide-react';

export const UserManualTab: React.FC = () => {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const sections = [
    {
      title: '1. Introducción y Arquitectura de VeloSync IQ',
      icon: BookOpen,
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>VeloSync IQ</strong> es la plataforma de gestión operativa y caracterización del proceso de Mercadeo y Visibilidad Institucional desarrollada a medida para la <strong>Corporación Social Somos Uno</strong>.
          </p>
          <p>
            Su arquitectura integra el ciclo de mejora continua <strong>PHVA (Planear, Hacer, Verificar, Actuar)</strong> con las directrices de calidad ISO 9001:2015, resolviendo de raíz los 5 problemas de dispersión, visibilidad limitada, ausencia de calendario centralizado, falta de seguimiento a métricas y relacionamiento desorganizado con aliados.
          </p>
          <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-sky-900">
            <strong>Objetivo General:</strong> Comunicar de manera clara y continua la labor social de la Corporación, fortalecer su reconocimiento y movilizar el apoyo comunitario y donante con un estricto blindaje legal y ético.
          </div>
        </div>
      ),
    },
    {
      title: '2. ¿Cómo gestionar el Calendario y solicitar contenidos (Brief Único)?',
      icon: Calendar,
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            Para solucionar el Problema 2 (Ausencia de una programación centralizada), ningún área debe publicar de manera aislada. Siga este procedimiento:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li>
              Haga clic en el botón <strong>"Solicitar Pieza (Brief Único)"</strong> en la pestaña <em>Calendario & Contenidos</em>.
            </li>
            <li>
              Defina el título de la actividad, canal (Redes, Web, Boletín, Convocatorias), fecha programada y público destinatario específico.
            </li>
            <li>
              Redacte el mensaje clave institucional asegurándose de reflejar el enfoque solidario y de transformación comunitaria.
            </li>
            <li>
              Verifique mandatoriamente las casillas de <strong>Habeas Data</strong> (si incluye fotos/nombres de participantes) y <strong>Control de Exactitud</strong> (fechas y lugares verificados).
            </li>
            <li>
              La pieza entrará en estado <em>En Revisión</em>. El líder de mercadeo o gerencia otorgará el visto bueno para transicionar a <em>Aprobado</em>, <em>Programado</em> y finalmente <em>Publicado</em>.
            </li>
          </ol>
        </div>
      ),
    },
    {
      title: '3. Repositorio Institucional y Verificación de Habeas Data',
      icon: ShieldCheck,
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            El <strong>Banco de Contenidos</strong> centraliza versiones oficiales de logotipos, portafolios de servicios y memorias fotográficas autorizadas:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Nivel de Confidencialidad:</strong> Los archivos clasificados como <em>Protegido (Menores/Habeas Data)</em> solo pueden ser empleados con autorización de los padres debidamente archivada en formato físico o digital.
            </li>
            <li>
              <strong>Descarga de Formatos:</strong> En la pestaña <em>Protocolos de Seguridad</em> puede imprimir o copiar el <strong>Modelo Oficial de Consentimiento Informado</strong> para hacer firmar en jornadas de campo.
            </li>
            <li>
              <strong>Control de Versiones:</strong> Todo cambio en manuales de marca o portafolios de programas debe registrarse con su número de versión (ej: v1.8, v2.0) y fecha de vigencia.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: '4. Sistematización de Alianzas y Pipeline de Donantes (CRM)',
      icon: Handshake,
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            Convierte gestiones individuales aisladas en una ruta institucional estructurada:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 my-2 text-center text-[10px]">
            <div className="p-2 bg-slate-100 rounded-lg font-bold">1. Identificado</div>
            <div className="p-2 bg-sky-100 text-sky-800 rounded-lg font-bold">2. Contacto Inicial</div>
            <div className="p-2 bg-indigo-100 text-indigo-800 rounded-lg font-bold">3. Presentación</div>
            <div className="p-2 bg-amber-100 text-amber-800 rounded-lg font-bold">4. Negociación</div>
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg font-bold">5. Alianza Activa</div>
          </div>
          <p>
            Al culminar cada llamada o reunión, actualice el campo <strong>Compromiso Actual</strong> y la <strong>Próxima Fecha de Seguimiento</strong>. Esto evita que los prospectos de cooperación se enfríen por falta de seguimiento.
          </p>
        </div>
      ),
    },
    {
      title: '5. Tablero de Indicadores (KPIs) y Registro de Mejora Continua',
      icon: BarChart3,
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            Los 6 indicadores estratégicos cubren alcance, interacción, cumplimiento de calendario, tiempo de respuesta a consultas, alianzas logradas y asistencia a talleres.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Actualización mensual:</strong> Haga clic en el ícono del lápiz junto al valor actual para ingresar la medición real del periodo.
            </li>
            <li>
              <strong>Semáforo de Estado:</strong> Verde indica cumplimiento de la meta; Amarillo alerta de desvíos menores (&lt;10%); Rojo exige la formulación inmediata de un plan de acción correctiva en el ciclo Actuar.
            </li>
            <li>
              <strong>Acciones de Mejora:</strong> En la vista detallada de cada KPI puede proponer y archivar acciones de mejora continua que se incluirán en el informe ejecutivo formal.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: '6. Instalación, Desinstalación y Trabajo Sin Conexión (PWA)',
      icon: Smartphone,
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            VeloSync IQ funciona tanto como aplicación web como aplicación instalable nativa de escritorio o móvil:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Para Instalar:</strong> Pulse el botón <strong>"Instalar Aplicación"</strong> en la cabecera. La plataforma se integrará al menú de inicio y pantalla principal de su dispositivo.
            </li>
            <li>
              <strong>Para Desinstalar:</strong> Cuando la aplicación está activa en su dispositivo, el botón cambia a <strong>"Desinstalar App"</strong>. Al confirmarlo, se purgan las instancias registradas y se libera la caché local de manera segura.
            </li>
            <li>
              <strong>Resiliencia sin conexión:</strong> La aplicación puede consultarse en zonas rurales o comunitarias sin acceso a internet gracias a la persistencia local de datos.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: '7. Guardar Cambios, Sincronización en Tiempo Real y Exportación a PDF',
      icon: Save,
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            Mecanismos para garantizar la integridad y difusión de la información:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Botón "Guardar Cambios":</strong> Cuando realiza modificaciones en objetivos, publicaciones, aliados o KPIs, el botón se ilumina indicando <em>"Guardar Cambios *"</em>. Al pulsarlo, los datos se consolidan con confirmación inmediata y sello de tiempo.
            </li>
            <li>
              <strong>Sincronización en Tiempo Real:</strong> La barra superior monitorea continuamente la conectividad, la latencia en milisegundos y difunde eventos instantáneos en la bitácora interna.
            </li>
            <li>
              <strong>Exportar PDF:</strong> Genera un documento formal de 2 páginas con membrete oficial de la <strong>Corporación Social Somos Uno</strong>, tablas de caracterización ISO, KPIs consolidados, lista de alianzas y certificación de seguridad para presentar ante la Dirección Ejecutiva y la Junta Directiva.
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Manual de Usuario e Inducción Técnica Oficial
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Manual de Operación de VeloSync IQ para Colaboradores
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Consulte las guías paso a paso para operar cada módulo, registrar solicitudes de mercadeo, auditar consentimientos de imagen y generar informes ejecutivos para la Corporación Social Somos Uno.
          </p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {sections.map((sec, index) => {
          const isOpen = openSection === index;
          const Icon = sec.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden transition"
            >
              <button
                onClick={() => setOpenSection(isOpen ? null : index)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{sec.title}</h3>
                </div>
                <div className="text-slate-400">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/40">
                  {sec.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
