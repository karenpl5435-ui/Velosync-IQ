import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FullAppData } from './storageService';

export const PDFService = {
  generateExecutiveReport(data: FullAppData): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;

    // Header styling
    doc.setFillColor(2, 132, 199); // Sky blue brand color
    doc.rect(0, 0, pageWidth, 24, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('CORPORACIÓN SOCIAL SOMOS UNO', margin, 11);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('VeloSync IQ — Plataforma de Gestión Eficiente y Caracterización de Procesos', margin, 18);

    const todayStr = new Date().toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    doc.text(`Fecha: ${todayStr}`, pageWidth - margin - 35, 18);

    let currentY = 32;

    // Title Section
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('INFORME EJECUTIVO DE GESTIÓN Y CARACTERIZACIÓN DE PROCESOS', margin, currentY);

    currentY += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(
      'Proceso: Mercadeo y Visibilidad Institucional | Ciclo PHVA: Planear, Hacer, Verificar, Actuar',
      margin,
      currentY
    );

    currentY += 8;

    // Section 1: Diagnóstico Operativo
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text('1. Diagnóstico Operativo (5 Problemas Clave y Nivel de Impacto)', margin, currentY);
    currentY += 3;

    const problemsRows = data.problems.map((p) => [
      p.code,
      p.title,
      p.impactLevel,
      p.operationalRisk,
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Código', 'Problema Operativo', 'Impacto', 'Riesgo Identificado']],
      body: problemsRows,
      theme: 'grid',
      headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], fontSize: 8, fontStyle: 'bold' },
      bodyStyles: { fontSize: 7.5, textColor: [51, 65, 85] },
      columnStyles: {
        0: { cellWidth: 18, fontStyle: 'bold' },
        1: { cellWidth: 55 },
        2: { cellWidth: 20 },
        3: { cellWidth: 'auto' },
      },
      margin: { left: margin, right: margin },
    });

    currentY = (doc as any).lastAutoTable.finalY + 8;

    // Section 2: Matriz de Caracterización
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text('2. Matriz de Caracterización del Proceso (ISO / PHVA)', margin, currentY);
    currentY += 3;

    const charRows = data.characterization.map((c) => [
      c.moduleCode,
      c.phvaStage,
      c.provider,
      c.stepActivities,
      c.outputs,
      c.customer,
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Módulo', 'Etapa', 'Proveedor', 'Actividades Clave', 'Salidas / Documentos', 'Cliente']],
      body: charRows,
      theme: 'striped',
      headStyles: { fillColor: [2, 132, 199], textColor: [255, 255, 255], fontSize: 7.5, fontStyle: 'bold' },
      bodyStyles: { fontSize: 6.5, textColor: [30, 41, 59] },
      columnStyles: {
        0: { cellWidth: 16, fontStyle: 'bold' },
        1: { cellWidth: 22 },
        2: { cellWidth: 32 },
        3: { cellWidth: 50 },
        4: { cellWidth: 35 },
        5: { cellWidth: 'auto' },
      },
      margin: { left: margin, right: margin },
    });

    // Page 2: Indicadores de Rendimiento y Alianzas
    doc.addPage();
    let p2Y = 16;

    doc.setFillColor(30, 41, 59);
    doc.rect(0, 0, pageWidth, 6, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text('3. Análisis Detallado de Indicadores de Rendimiento (KPIs)', margin, p2Y);
    p2Y += 4;

    const kpiRows = data.kpis.map((k) => {
      const compliance = Math.round((k.currentValue / k.targetValue) * 100);
      return [
        k.code,
        k.name,
        k.formula,
        `${k.targetValue} ${k.unit}`,
        `${k.currentValue} ${k.unit}`,
        `${compliance}%`,
        k.status.toUpperCase(),
      ];
    });

    autoTable(doc, {
      startY: p2Y,
      head: [['Código', 'Indicador', 'Fórmula', 'Meta', 'Actual', 'Cumpl.', 'Estado']],
      body: kpiRows,
      theme: 'grid',
      headStyles: { fillColor: [15, 118, 110], textColor: [255, 255, 255], fontSize: 7.5, fontStyle: 'bold' },
      bodyStyles: { fontSize: 7, textColor: [30, 41, 59] },
      columnStyles: {
        0: { cellWidth: 20, fontStyle: 'bold' },
        1: { cellWidth: 42 },
        2: { cellWidth: 50 },
        3: { cellWidth: 22 },
        4: { cellWidth: 22 },
        5: { cellWidth: 15, fontStyle: 'bold' },
        6: { cellWidth: 'auto' },
      },
      margin: { left: margin, right: margin },
    });

    p2Y = (doc as any).lastAutoTable.finalY + 8;

    // Section 4: Alianzas Estratégicas y Pipeline
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text('4. Sistematización de Alianzas y Oportunidades de Cooperación', margin, p2Y);
    p2Y += 4;

    const allyRows = data.allies.map((a) => [
      a.organizationName,
      a.sector,
      a.stage,
      a.potentialSupport,
      a.commitments,
      a.nextFollowUpDate,
    ]);

    autoTable(doc, {
      startY: p2Y,
      head: [['Organización Aliada', 'Sector', 'Etapa Relación', 'Apoyo Potencial', 'Compromiso Actual', 'Próx. Seguimiento']],
      body: allyRows,
      theme: 'striped',
      headStyles: { fillColor: [67, 56, 202], textColor: [255, 255, 255], fontSize: 7.5, fontStyle: 'bold' },
      bodyStyles: { fontSize: 7, textColor: [30, 41, 59] },
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 22 },
        2: { cellWidth: 28 },
        3: { cellWidth: 35 },
        4: { cellWidth: 38 },
        5: { cellWidth: 'auto' },
      },
      margin: { left: margin, right: margin },
    });

    p2Y = (doc as any).lastAutoTable.finalY + 8;

    // Section 5: Protocolos de Seguridad y Firma
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text('5. Cumplimiento de Protocolos de Seguridad y Habeas Data', margin, p2Y);
    p2Y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const securityText =
      'Se certifica que la Corporación Social Somos Uno da estricto cumplimiento a la Ley 1581 de 2012 (Habeas Data) y al Código de la Infancia y Adolescencia para toda fotografía, testimonio y dato personal recolectado y publicado. Las piezas cuentan con lista de chequeo de calidad y aprobación por la Coordinación de Mercadeo y Dirección.';
    const splitSecurity = doc.splitTextToSize(securityText, pageWidth - margin * 2);
    doc.text(splitSecurity, margin, p2Y);

    p2Y += splitSecurity.length * 4 + 14;

    // Signature blocks
    const colW = (pageWidth - margin * 2) / 2;
    doc.setDrawColor(203, 213, 225);
    doc.line(margin + 10, p2Y, margin + colW - 10, p2Y);
    doc.line(margin + colW + 10, p2Y, margin + colW * 2 - 10, p2Y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text('Responsable / Coordinación de Mercadeo', margin + 15, p2Y + 4);
    doc.text('Dirección Ejecutiva / Gerencia General', margin + colW + 15, p2Y + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text('Corporación Social Somos Uno', margin + 15, p2Y + 8);
    doc.text('Corporación Social Somos Uno', margin + colW + 15, p2Y + 8);

    // Save PDF
    doc.save(`VeloSync-IQ_Informe_Mercadeo_SomosUno_${new Date().toISOString().split('T')[0]}.pdf`);
  },
};
