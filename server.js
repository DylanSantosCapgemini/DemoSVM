const express = require('express');
const crypto = require('crypto');
const path = require('path');
const app = express();
app.use(express.json({ limit: '100kb' }));
app.use(express.static(__dirname));

const TOKEN_URL = process.env.TOKEN_URL;
const LEADS_URL = process.env.LEADS_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SOURCE = process.env.LEAD_SOURCE || 'portalxx';

app.post('/api/leads', async (req, res) => {
  if (!TOKEN_URL || !LEADS_URL || !CLIENT_ID || !CLIENT_SECRET) return res.status(500).json({message:'Configuração segura da integração não encontrada.'});
  if (!req.body?.email || req.body?.lgpdConsent !== true) return res.status(400).json({message:'Informe um e-mail válido e aceite o tratamento de dados.'});
  try {
    const tokenResponse = await fetch(TOKEN_URL, { method:'POST', headers:{client_id:CLIENT_ID,client_secret:CLIENT_SECRET,'Content-Type':'application/json'}, body:'{}' });
    const tokenBody = await tokenResponse.json().catch(() => ({}));
    if (!tokenResponse.ok || !tokenBody.access_token) throw new Error('Falha ao obter token OAuth.');
    const leadResponse = await fetch(LEADS_URL, { method:'POST', headers:{Authorization:`Bearer ${tokenBody.access_token}`,'Content-Type':'application/json','X-Correlation-Id':crypto.randomUUID(),source:SOURCE}, body:JSON.stringify(req.body) });
    const leadBody = await leadResponse.json().catch(() => ({}));
    return res.status(leadResponse.status).json(leadBody);
  } catch (error) { return res.status(502).json({message:error.message || 'Falha de comunicação com a API.'}); }
});
app.listen(process.env.PORT || 3000, () => console.log('Aplicação disponível em http://localhost:' + (process.env.PORT || 3000)));
