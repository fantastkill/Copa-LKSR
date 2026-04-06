import jsPDF from 'jspdf';
import 'jspdf-autotable';

const valueOrDash = (value) => (value === null || value === undefined || value === '' ? '--' : String(value));
const FIXED_EXPORT_SLUG = 'kart-28-de-fevereiro-copa-lskr';
const FIRST_PLACE_NAME_GOLD = [138, 104, 35];

export const exportRankingToPDF = async (rankings, _championshipTitle, category) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const now = new Date();
      const timestamp = now.toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const pageMargin = 10;
      const tableStartY = 36;
      const tableWidth = pageWidth - pageMargin * 2;

      doc.setTextColor(43, 43, 43);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text(timestamp, pageMargin, 9);
      doc.text(FIXED_EXPORT_SLUG, pageWidth / 2, 9, { align: 'center' });

      doc.setTextColor(118, 118, 118);
      doc.setFontSize(8);
      doc.setCharSpace(1.2);
      doc.text('RANKING', pageMargin, 15);
      doc.setCharSpace(0);

      doc.setTextColor(24, 24, 24);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(17);
      doc.setCharSpace(0.8);
      doc.text('CLASSIFICACAO OFICIAL', pageMargin, 27);
      doc.setCharSpace(0);

      if (!rankings || rankings.length === 0) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Nenhum dado disponivel para a categoria ${category}.`, pageMargin, 37);
        doc.save(`${FIXED_EXPORT_SLUG}.pdf`);
        resolve();
        return;
      }

      const tableColumn = ['POS', '#', 'NOME', 'MV', 'TMV', 'TT', 'DL', 'DA', 'TUV', 'TV', 'VM'];
      const tableRows = rankings.map((entry, index) => [
        valueOrDash(entry.position_label || index + 1),
        valueOrDash(entry.kart_number_snapshot || entry.expand?.pilot_id?.kart_number),
        valueOrDash(entry.expand?.pilot_id?.display_name),
        valueOrDash(entry.mv),
        valueOrDash(entry.tmv),
        valueOrDash(entry.tt),
        valueOrDash(entry.dl),
        valueOrDash(entry.da),
        valueOrDash(entry.tuv),
        valueOrDash(entry.tv),
        valueOrDash(entry.vm)
      ]);

      doc.autoTable({
        startY: tableStartY,
        head: [tableColumn],
        body: tableRows,
        margin: { left: pageMargin, right: pageMargin },
        theme: 'plain',
        tableWidth,
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [84, 84, 84],
          fontSize: 9,
          fontStyle: 'bold',
          halign: 'left'
        },
        bodyStyles: {
          fillColor: [255, 255, 255],
          textColor: [44, 44, 44],
          fontSize: 9,
          halign: 'left'
        },
        styles: {
          cellPadding: { top: 4.2, right: 1.4, bottom: 4.2, left: 1.4 }
        },
        columnStyles: {
          0: { cellWidth: 15 },
          1: { cellWidth: 12 },
          2: { cellWidth: 35 },
          3: { cellWidth: 12 },
          4: { cellWidth: 18 },
          5: { cellWidth: 22 },
          6: { cellWidth: 17 },
          7: { cellWidth: 17 },
          8: { cellWidth: 18 },
          9: { cellWidth: 11 },
          10: { cellWidth: 12 }
        },
        didParseCell: (data) => {
          if (data.section === 'head') {
            data.cell.styles.lineWidth = { top: 0, right: 0, bottom: 0.3, left: 0 };
            data.cell.styles.lineColor = [220, 210, 184];
            return;
          }

          if (data.section === 'body') {
            data.cell.styles.lineWidth = { top: 0, right: 0, bottom: 0.2, left: 0 };
            data.cell.styles.lineColor = [230, 230, 230];

            if (data.row.index === 0 && data.column.index === 2) {
              data.cell.styles.textColor = FIRST_PLACE_NAME_GOLD;
              data.cell.styles.fontStyle = 'bold';
            }
          }
        }
      });

      const tableFinalY = doc.lastAutoTable?.finalY || tableStartY + 40;
      doc.setDrawColor(219, 219, 219);
      doc.setLineWidth(0.25);
      doc.roundedRect(pageMargin, tableStartY, tableWidth, tableFinalY - tableStartY, 4, 4);

      let legendY = Math.max(tableFinalY + 14, pageHeight - 28);
      if (legendY > pageHeight - 18) {
        doc.addPage('a4', 'landscape');
        legendY = 22;
      }

      const legendRow2Y = legendY + 8;
      const legendColumns = [pageMargin + 4, pageMargin + 62, pageMargin + 120, pageMargin + 178];

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(76, 76, 76);

      doc.text('MV = N\u00B0 da melhor volta', legendColumns[0], legendY);
      doc.text('TMV = Tempo da melhor volta', legendColumns[1], legendY);
      doc.text('TT = Tempo total', legendColumns[2], legendY);
      doc.text('DL = Diferenca para o lider', legendColumns[3], legendY);

      doc.text('DA = Diferenca para o anterior', legendColumns[0], legendRow2Y);
      doc.text('TUV = Tempo da ultima volta', legendColumns[1], legendRow2Y);
      doc.text('TV = Total de voltas', legendColumns[2], legendRow2Y);
      doc.text('VM = Velocidade media (km/h)', legendColumns[3], legendRow2Y);

      doc.save(`${FIXED_EXPORT_SLUG}.pdf`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

