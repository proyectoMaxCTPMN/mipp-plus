import jsPDF from "jspdf";
import "jspdf-autotable";
import { autoTable } from 'jspdf-autotable';


export default function generarPDF(informacion, titulo, nombreCompleto, excluir = []) {
  // Crear documento
  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.text(titulo, 14, 20);

  // Nombre completo
  doc.setFontSize(12);
  doc.text(`Nombre completo: ${nombreCompleto}`, 14, 30);

  // Procesar datos excluyendo las keys
  const filtered = Object.entries(informacion)
    .filter(([k]) => !excluir.includes(k));

  // Convertir a formato de tabla
  const head = [['Campo', 'Valor']];
  const body = filtered.map(([k, v]) => [k, String(v)]);

  // Insertar tabla
  autoTable(doc, {
    startY: 40,
    head,
    body,
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [41, 128, 185] }
  });


  // Descargar
  doc.save(`${nombreCompleto} Solicitud.pdf`);
}