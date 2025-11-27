import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { v4 as uuidv4 } from 'uuid';
import puppeteer from 'puppeteer';
import {
  CONSULTANT_SYSTEM_PROMPT,
  INITIAL_MESSAGE,
  REPORT_GENERATION_PROMPT,
  MINI_DIAGNOSTIC_TRIGGER
} from './prompts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// In-memory session storage (pour production : utiliser Redis ou DB)
const sessions = new Map();

/**
 * Crée une nouvelle session de consultation
 */
app.post('/api/session/start', (req, res) => {
  const sessionId = uuidv4();

  sessions.set(sessionId, {
    id: sessionId,
    messages: [],
    createdAt: new Date(),
    phase: 'initial', // initial, diagnostic, deep-dive, complete
    questionCount: 0
  });

  res.json({
    sessionId,
    initialMessage: INITIAL_MESSAGE
  });
});

/**
 * Envoie un message et obtient la réponse du consultant
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
      return res.status(400).json({ error: 'sessionId et message requis' });
    }

    const session = sessions.get(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session non trouvée' });
    }

    // Ajouter le message utilisateur
    session.messages.push({
      role: 'user',
      content: message
    });

    session.questionCount++;

    // Déterminer si on doit déclencher le mini-diagnostic
    let systemPrompt = CONSULTANT_SYSTEM_PROMPT;

    // Après 3-4 questions, on suggère le mini-diagnostic
    if (session.questionCount === 4 && session.phase === 'initial') {
      session.phase = 'ready-for-diagnostic';
      systemPrompt += '\n\n' + MINI_DIAGNOSTIC_TRIGGER;
    }

    // Appel à l'API Claude
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      system: systemPrompt,
      messages: session.messages
    });

    const assistantMessage = response.content[0].text;

    // Ajouter la réponse de l'assistant
    session.messages.push({
      role: 'assistant',
      content: assistantMessage
    });

    // Détecter si l'utilisateur veut le rapport complet
    const userWantsFullReport = message.toLowerCase().includes('oui') &&
                                session.phase === 'ready-for-diagnostic';

    if (userWantsFullReport) {
      session.phase = 'deep-dive';
    }

    res.json({
      message: assistantMessage,
      phase: session.phase,
      questionCount: session.questionCount
    });

  } catch (error) {
    console.error('Erreur API:', error);
    res.status(500).json({
      error: 'Erreur lors du traitement de votre message',
      details: error.message
    });
  }
});

/**
 * Génère le rapport final basé sur toute la conversation
 */
app.post('/api/report/generate', async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId requis' });
    }

    const session = sessions.get(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session non trouvée' });
    }

    // Créer un message dédié pour la génération du rapport
    const reportMessages = [
      ...session.messages,
      {
        role: 'user',
        content: 'Génère maintenant le rapport complet basé sur toute notre conversation.'
      }
    ];

    // Appel à Claude pour générer le rapport
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 8000,
      system: REPORT_GENERATION_PROMPT,
      messages: reportMessages
    });

    const reportHTML = response.content[0].text;

    // Nettoyer le HTML si besoin (enlever les ```html)
    const cleanHTML = reportHTML
      .replace(/```html\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    session.phase = 'complete';
    session.reportHTML = cleanHTML;

    res.json({
      html: cleanHTML,
      sessionId
    });

  } catch (error) {
    console.error('Erreur génération rapport:', error);
    res.status(500).json({
      error: 'Erreur lors de la génération du rapport',
      details: error.message
    });
  }
});

/**
 * Génère et télécharge le PDF du rapport
 */
app.post('/api/report/pdf', async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId requis' });
    }

    const session = sessions.get(sessionId);
    if (!session || !session.reportHTML) {
      return res.status(404).json({ error: 'Rapport non trouvé' });
    }

    // HTML complet pour le PDF
    const fullHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rapport - Réduction du Cycle de Vente</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #2c3e50;
      background: white;
      padding: 40px;
    }

    h1 {
      color: #1a202c;
      font-size: 28px;
      margin-bottom: 10px;
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 10px;
    }

    h2 {
      color: #2d3748;
      font-size: 22px;
      margin-top: 30px;
      margin-bottom: 15px;
      padding-left: 10px;
      border-left: 4px solid #3b82f6;
    }

    h3 {
      color: #4a5568;
      font-size: 18px;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 12px;
      text-align: justify;
    }

    ul, ol {
      margin-left: 25px;
      margin-bottom: 15px;
    }

    li {
      margin-bottom: 8px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    th, td {
      padding: 12px;
      text-align: left;
      border: 1px solid #e2e8f0;
    }

    th {
      background-color: #3b82f6;
      color: white;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background-color: #f7fafc;
    }

    .report-section {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }

    .action-item {
      background: #f0f9ff;
      border-left: 4px solid #3b82f6;
      padding: 15px;
      margin: 15px 0;
    }

    .timeline {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      margin: 15px 0;
    }

    .kpi-table {
      background: #ecfdf5;
      border: 2px solid #10b981;
    }

    strong {
      color: #1a202c;
    }

    @media print {
      body {
        padding: 20px;
      }

      h2 {
        page-break-after: avoid;
      }
    }
  </style>
</head>
<body>
  ${session.reportHTML}

  <div style="margin-top: 50px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #718096; font-size: 12px;">
    <p>Rapport généré le ${new Date().toLocaleDateString('fr-FR')} par Sales Cycle Consultant</p>
  </div>
</body>
</html>
    `;

    // Générer le PDF avec Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(fullHTML, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      printBackground: true
    });

    await browser.close();

    // Envoyer le PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="rapport-cycle-vente.pdf"');
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Erreur génération PDF:', error);
    res.status(500).json({
      error: 'Erreur lors de la génération du PDF',
      details: error.message
    });
  }
});

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    sessions: sessions.size,
    timestamp: new Date().toISOString()
  });
});

// Cleanup des vieilles sessions (toutes les heures)
setInterval(() => {
  const oneHourAgo = Date.now() - (60 * 60 * 1000);

  for (const [sessionId, session] of sessions.entries()) {
    if (session.createdAt.getTime() < oneHourAgo) {
      sessions.delete(sessionId);
      console.log(`Session ${sessionId} supprimée (expirée)`);
    }
  }
}, 60 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API ready at http://localhost:${PORT}/api`);
});
