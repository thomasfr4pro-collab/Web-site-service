/**
 * Sales Cycle Consultant - Frontend Application
 */

// Configuration
const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3000/api'
  : '/api';

// State
let sessionId = null;
let isWaitingForResponse = false;

// DOM Elements
const chatView = document.getElementById('chat-view');
const reportView = document.getElementById('report-view');
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const actionButtons = document.getElementById('action-buttons');
const generateReportButton = document.getElementById('generate-report-button');
const reportContent = document.getElementById('report-content');
const downloadPdfButton = document.getElementById('download-pdf-button');
const backToChatButton = document.getElementById('back-to-chat-button');
const loadingOverlay = document.getElementById('loading-overlay');

// Initialize
async function init() {
  try {
    showLoading('Initialisation de la session...');

    const response = await fetch(`${API_URL}/session/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'initialisation de la session');
    }

    const data = await response.json();
    sessionId = data.sessionId;

    // Afficher le message initial
    addMessage('assistant', data.initialMessage);

    hideLoading();
    userInput.focus();

  } catch (error) {
    console.error('Erreur d\'initialisation:', error);
    hideLoading();
    alert('Erreur lors de l\'initialisation. Veuillez recharger la page.');
  }
}

// Add message to chat
function addMessage(role, content) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;

  const label = document.createElement('div');
  label.className = 'message-label';
  label.textContent = role === 'user' ? 'Vous' : 'Consultant';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';

  // Parse markdown-like formatting
  contentDiv.innerHTML = parseMarkdown(content);

  messageDiv.appendChild(label);
  messageDiv.appendChild(contentDiv);
  chatContainer.appendChild(messageDiv);

  // Scroll to bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Simple markdown parser
function parseMarkdown(text) {
  let html = text;

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  // Lists
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>');

  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // Line breaks
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/^(?!<[hul])/gim, '<p>');
  html = html.replace(/(?!<\/[hul]>)$/gim, '</p>');

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr>');

  return html;
}

// Send message
async function sendMessage() {
  const message = userInput.value.trim();

  if (!message || isWaitingForResponse) {
    return;
  }

  // Add user message to chat
  addMessage('user', message);

  // Clear input
  userInput.value = '';
  userInput.style.height = 'auto';

  // Disable input
  isWaitingForResponse = true;
  sendButton.disabled = true;
  userInput.disabled = true;

  showLoading('Analyse en cours...');

  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionId,
        message
      })
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi du message');
    }

    const data = await response.json();

    // Add assistant response
    addMessage('assistant', data.message);

    // Check if we should show the report button
    if (shouldShowReportButton(data)) {
      actionButtons.classList.remove('hidden');
    }

    hideLoading();

  } catch (error) {
    console.error('Erreur:', error);
    hideLoading();
    addMessage('assistant', '❌ Désolé, une erreur s\'est produite. Pouvez-vous reformuler ?');
  } finally {
    isWaitingForResponse = false;
    sendButton.disabled = false;
    userInput.disabled = false;
    userInput.focus();
  }
}

// Determine if we should show report button
function shouldShowReportButton(data) {
  // Show button after phase deep-dive or if conversation is long enough
  return data.phase === 'deep-dive' && data.questionCount >= 8;
}

// Generate report
async function generateReport() {
  showLoading('Génération du rapport en cours...');

  try {
    const response = await fetch(`${API_URL}/report/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionId
      })
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la génération du rapport');
    }

    const data = await response.json();

    // Display report
    reportContent.innerHTML = data.html;

    // Switch to report view
    chatView.classList.remove('active');
    reportView.classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);

    hideLoading();

  } catch (error) {
    console.error('Erreur:', error);
    hideLoading();
    alert('Erreur lors de la génération du rapport. Veuillez réessayer.');
  }
}

// Download PDF
async function downloadPDF() {
  showLoading('Génération du PDF...');

  try {
    const response = await fetch(`${API_URL}/report/pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionId
      })
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la génération du PDF');
    }

    // Download file
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport-cycle-vente-${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    hideLoading();

  } catch (error) {
    console.error('Erreur:', error);
    hideLoading();
    alert('Erreur lors du téléchargement du PDF. Veuillez réessayer.');
  }
}

// Back to chat
function backToChat() {
  reportView.classList.remove('active');
  chatView.classList.add('active');
  userInput.focus();
}

// Show loading
function showLoading(text = 'Chargement...') {
  loadingOverlay.classList.remove('hidden');
  const loadingText = loadingOverlay.querySelector('.loading-text');
  if (loadingText) {
    loadingText.textContent = text;
  }
}

// Hide loading
function hideLoading() {
  loadingOverlay.classList.add('hidden');
}

// Event Listeners
sendButton.addEventListener('click', sendMessage);

userInput.addEventListener('keydown', (e) => {
  // Send on Enter (without Shift)
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Auto-resize textarea
userInput.addEventListener('input', () => {
  userInput.style.height = 'auto';
  userInput.style.height = userInput.scrollHeight + 'px';
});

generateReportButton.addEventListener('click', generateReport);
downloadPdfButton.addEventListener('click', downloadPDF);
backToChatButton.addEventListener('click', backToChat);

// Initialize app on load
window.addEventListener('DOMContentLoaded', init);

// Handle page unload
window.addEventListener('beforeunload', (e) => {
  if (chatContainer.children.length > 1) {
    e.preventDefault();
    e.returnValue = '';
  }
});
