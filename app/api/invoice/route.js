// Même import et loadImageAsBase64FromUrl que ton code actuel
import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { Buffer } from 'buffer';

async function loadImageAsBase64FromUrl(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const base64 = Buffer.from(response.data, 'binary').toString('base64');
  return `data:image/png;base64,${base64}`;
}

async function loadImageAsBase64FromUrljpeg(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const base64 = Buffer.from(response.data, 'binary').toString('base64');
  return `data:image/jpeg;base64,${base64}`;
}

export async function POST(req) {
  try {
    const { customer, email, items, userId } = await req.json();
    const total = items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0);
    const quantity = items.reduce((sum, item) => sum + Number(item.quantity), 0);

    const { data: billInsert, error: billError } = await supabase
      .from('bills')
      .insert([{ clientname: customer, clienttel: email, quantity, total, iduser: userId }]);
    if (billError) throw billError;

    const { data: logoData } = await supabase.from('logos').select('*').eq('iduser', userId).single();
    const { data: usersData } = await supabase.from('users').select('*').eq('id', userId);
    const { data: companyData } = await supabase.from('company').select('*').eq('iduser', userId).single();
    const { count: nombreRecu } = await supabase
      .from("bills").select("*", { count: "exact" }).eq("iduser", userId);

    const logoUrl = "https://fcrrnizcdydzpbzdvcgc.supabase.co/storage/v1/object/public/logos/" + logoData.url;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a5' });
    const pageWidth = doc.internal.pageSize.getWidth();

    // ----- LOGO PROPORTIONNEL -----
    if (logoData && logoData.url) {
      const isJpeg = logoData.url.toLowerCase().includes('.jpg');
      const logoBase64 = isJpeg
        ? await loadImageAsBase64FromUrljpeg(logoUrl)
        : await loadImageAsBase64FromUrl(logoUrl);
      const format = isJpeg ? 'jpeg' : 'png';

      const imgProps = doc.getImageProperties(logoBase64);
      const maxWidth = 40;
      const maxHeight = 20;
      let width = maxWidth;
      let height = (imgProps.height / imgProps.width) * maxWidth;

      if (height > maxHeight) {
        height = maxHeight;
        width = (imgProps.width / imgProps.height) * maxHeight;
      }

      const x = (pageWidth - width) / 2;
      doc.addImage(logoBase64, format, x, 10, width, height);
    }

    const date = new Date().toLocaleDateString('fr-FR');
    const time = new Date().toLocaleTimeString('fr-FR', { timeZone: 'Africa/Niamey' });

    // ----- EN-TÊTE -----
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(companyData.color);
    doc.text(companyData.cmpName, pageWidth / 2, 35, { align: 'center' });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(50);
    doc.text(companyData.adresse, pageWidth / 2, 41, { align: 'center' });
    doc.text(`Tel: ${companyData.cmpTel}`, pageWidth / 2, 46, { align: 'center' });

    // ----- TITRE REÇU -----
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(companyData.color);
    doc.text("REÇU DE PAIEMENT", pageWidth / 2, 60, { align: "center" });

    // ----- INFOS REÇU À GAUCHE & CLIENT À DROITE -----
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(0);

    //-----formattage de la date

    const rawDate = new Date();
const day = String(rawDate.getDate()).padStart(2, '0');
const month = String(rawDate.getMonth() + 1).padStart(2, '0'); // Mois de 0 à 11
const year = String(rawDate.getFullYear()).slice(-4); // 2 derniers chiffres de l'année
const formattedDate = `${day}${month}${year}`;


doc.text(`Reçu No:TKT-000-${formattedDate}-0${nombreRecu}`, 10, 68);
doc.text(`Date: ${date} ${time}`, 10, 74);
doc.text(`Client: ${customer}`, pageWidth - 10, 68, { align: 'right' });
doc.text(`Téléphone: ${email}`, pageWidth - 10, 74, { align: 'right' });



    // ----- TABLEAU PRODUITS -----
    const tableStartY = 85;
    const rowHeight = 8;

    const colX = {
      desc: 10,
      qte: 75,
      prix: 95,
      total: 115
    };

    const colWidth = {
      desc: 60,
      qte: 15,
      prix: 20,
      total: 25
    };

    // Header
    doc.setFillColor(companyData.color);
    doc.setDrawColor(230);
    doc.rect(10, tableStartY, 130, rowHeight, 'F');

    doc.setTextColor(255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Description", colX.desc + 2, tableStartY + 5);
    doc.text("Qté", colX.qte + 2, tableStartY + 5);
    doc.text("Prix", colX.prix + 2, tableStartY + 5);
    doc.text("Total", colX.total + 2, tableStartY + 5);

    // Rows
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0);

    items.forEach((item, i) => {
      const y = tableStartY + rowHeight * (i + 1);
      const itemTotal = Number(item.quantity) * Number(item.price);

      if (i % 2 === 0) {
        doc.setFillColor(245);
        doc.rect(10, y, 130, rowHeight, 'F');
      }

      doc.text(item.description.substring(0, 40), colX.desc + 2, y + 5);
      doc.text(String(item.quantity), colX.qte + 2, y + 5);
      doc.text(`${Number(item.price).toFixed(0)} CFA`, colX.prix + 2, y + 5);
      doc.text(`${itemTotal.toFixed(0)} CFA`, colX.total + 2, y + 5);
    });

    // ----- TOTAL -----
    const totalY = tableStartY + rowHeight * (items.length + 1) + 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(companyData.color);
    doc.text(`\nMontant total: ${total.toFixed(0)} CFA`, pageWidth - 10, totalY, { align: "right" });

    // ----- FOOTER -----
    doc.setDrawColor(180);
    doc.line(10, totalY + 5, pageWidth - 10, totalY + 5);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(80);
    doc.text("Merci pour votre confiance", pageWidth / 2, totalY + 12, { align: "center" });
    doc.text(companyData.cmpName, pageWidth / 2, totalY + 17, { align: "center" });
    doc.text(companyData.adresse, pageWidth / 2, totalY + 22, { align: "center" });

    // ----- RÉPONSE -----
    const pdfData = doc.output('arraybuffer');
    return new NextResponse(Buffer.from(pdfData), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=invoice.pdf',
      },
    });

  } catch (error) {
    console.error("Erreur PDF :", error);
    return new NextResponse('Erreur PDF', { status: 500 });
  }
}
