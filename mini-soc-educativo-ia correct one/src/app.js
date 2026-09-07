(function () {
  'use strict';
  const D = window.MINI_SOC_DATA;
  if (!D) throw new Error('No se pudo cargar el dataset simulado.');

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const esc = (value) => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const fmtDate = (value, withDate = true) => new Intl.DateTimeFormat('es-CR', { timeZone: 'UTC', ...(withDate ? {day:'2-digit', month:'short'} : {}), hour:'2-digit', minute:'2-digit', hour12:false }).format(new Date(value)) + ' UTC';
  const labels = { critical:'Crítica', high:'Alta', medium:'Media', low:'Baja', new:'Nuevo', in_progress:'En curso', resolved:'Resuelto', closed_fp:'Falso positivo', healthy:'Saludable', degraded:'Degradado', failure:'Fallo', success:'Éxito' };
  const colors = { critical:'#b42318', high:'#b42318', medium:'#b85e00', low:'#1769a0' };
  const STORAGE = 'mini-soc-edu-v1';

  function loadState() {
    try { return JSON.parse(localStorage.getItem(STORAGE)) || {}; } catch (_) { return {}; }
  }
  let state = Object.assign({ incidentOverrides:{}, scenarioProgress:{}, learningProgress:{}, chat:[], lastQuery:'' }, loadState());
  function saveState() { localStorage.setItem(STORAGE, JSON.stringify(state)); }
  function effectiveIncident(i) { return Object.assign({}, i, state.incidentOverrides[i.id] || {}); }
  function getIncident(id) { const item = D.incidents.find(x => x.id === id); return item ? effectiveIncident(item) : null; }
  function badge(value) { return `<span class="badge ${esc(value)}">${esc(labels[value] || value)}</span>`; }
  function toast(message) {
    const el = document.createElement('div'); el.className = 'toast'; el.textContent = message;
    $('#toast-region').appendChild(el); setTimeout(() => el.remove(), 3200);
  }
  function download(name, content, type = 'application/json') {
    const blob = new Blob([content], {type: type + ';charset=utf-8'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 200);
  }
  function csvCell(v) { const s = String(v ?? ''); return `"${s.replace(/"/g,'""')}"`; }
  function exportCSV(rows, fields, name) {
    const body = [fields.map(csvCell).join(','), ...rows.map(r => fields.map(f => csvCell(r[f])).join(','))].join('\n');
    download(name, '\ufeff' + body, 'text/csv');
  }
  function openModal(html) { $('#modal-content').innerHTML = html; $('#modal').showModal(); }
  function closeModal() { $('#modal').close(); }
  function pageHead(kicker, title, description, actions = '') {
    return `<div class="page-head"><div><p class="eyebrow">${esc(kicker)}</p><h1>${esc(title)}</h1><p class="lead">${esc(description)}</p></div>${actions ? `<div class="actions">${actions}</div>` : ''}</div>`;
  }
  function simDisclaimer(short = false) {
    return `<div class="disclaimer"><strong>SIMULADO</strong><span>${short ? 'Todos los datos, entidades y resultados de IA son ficticios.' : esc(D.meta.notice)}</span></div>`;
  }
  function setBreadcrumb(text) { $('#breadcrumb').textContent = text; }
  function setActive(route) { $$('.nav-list a').forEach(a => a.classList.toggle('active', a.dataset.route === route)); }

  function metrics() {
    const incidents = D.incidents.map(effectiveIncident);
    const open = incidents.filter(i => ['new','in_progress'].includes(i.status));
    return {
      open: open.length,
      urgent: open.filter(i => ['critical','high'].includes(i.severity)).length,
      alerts: D.alerts.length,
      degraded: D.connectors.filter(c => c.status === 'degraded').length,
      scenarioPct: Math.round(Object.values(state.scenarioProgress).filter(x => x.completed).length / D.scenarios.length * 100) || 0
    };
  }

  function incidentRows(items) {
    if (!items.length) return `<tr><td colspan="7"><div class="empty"><strong>Sin coincidencias</strong>Ajusta los filtros de búsqueda.</div></td></tr>`;
    return items.map(i => `<tr data-clickable="true" data-incident="${esc(i.id)}" tabindex="0" aria-label="Abrir ${esc(i.id)}">
      <td><b>${esc(i.id)}</b></td><td class="wrap">${esc(i.title)}</td><td>${badge(i.severity)}</td><td>${badge(i.status)}</td><td>${esc(i.owner)}</td><td>${esc(i.confidence)}%</td><td>${esc(fmtDate(i.updatedAt))}</td>
    </tr>`).join('');
  }

  function recentIncidentTable(limit = 5) {
    const items = D.incidents.map(effectiveIncident).sort((a,b) => new Date(b.updatedAt)-new Date(a.updatedAt)).slice(0,limit);
    return `<div class="table-wrap"><table><thead><tr><th>ID</th><th>Incidente</th><th>Severidad</th><th>Estado</th><th>Propietario</th><th>Conf.</th><th>Actualizado</th></tr></thead><tbody>${incidentRows(items)}</tbody></table></div>`;
  }

  function eventChart() {
    const base = new Date(D.meta.generatedAt).getTime();
    const buckets = Array.from({length:12}, (_,idx) => ({label:`-${11-idx}h`, critical:0, high:0, medium:0, low:0, total:0}));
    D.logs.forEach(log => { const hours = Math.floor((base-new Date(log.time).getTime())/3600000); if (hours >= 0 && hours < 12) buckets[11-hours].total++; });
    D.alerts.forEach(a => { const hours = Math.floor((base-new Date(a.time).getTime())/3600000); if (hours >= 0 && hours < 12) buckets[11-hours][a.severity]++; });
    const max = Math.max(...buckets.map(b=>b.total),1);
    return `<div class="pulse-chart" role="img" aria-label="Volumen de eventos simulados por hora">${buckets.map(b => {
      const sev = b.critical ? 'high' : b.high ? 'high' : b.medium ? 'medium' : 'low';
      return `<div class="pulse-bar ${sev}" style="height:${Math.max(6,b.total/max*100)}%" title="${esc(b.label)}: ${b.total} eventos, ${b.high+b.critical} alertas altas/críticas"><span>${esc(b.label)}</span></div>`;
    }).join('')}</div><div class="legend"><span><i style="background:${colors.high}"></i>Alta/crítica</span><span><i style="background:${colors.medium}"></i>Media</span><span><i style="background:${colors.low}"></i>Telemetría base</span></div>`;
  }

  function severityBreakdown() {
    const counts = ['critical','high','medium','low'].map(s => [s,D.incidents.map(effectiveIncident).filter(i=>i.severity===s).length]);
    const max = Math.max(...counts.map(x=>x[1]),1);
    return `<div class="severity-list">${counts.map(([s,n]) => `<div class="severity-row"><span>${esc(labels[s])}</span><div class="track"><b style="width:${n/max*100}%;background:${colors[s]}"></b></div><b>${n}</b></div>`).join('')}</div>`;
  }

  function renderOverview() {
    setBreadcrumb('Resumen operativo'); setActive('overview');
    const m = metrics();
    $('#main').innerHTML = pageHead('Turno de laboratorio · dataset fijo', 'Resumen operativo', 'Practica priorización, salud de ingesta y triage con un entorno completamente ficticio.', `<button class="button" data-go="incidents">Iniciar triage</button><button class="ghost-button" data-export="snapshot">Exportar snapshot</button>`) +
    `<section class="grid kpi-grid" aria-label="Indicadores principales">
      <article class="kpi danger"><div class="kpi-label">Incidentes abiertos <span>NOW</span></div><div class="kpi-value">${m.open}</div><div class="kpi-note">Estados Nuevo + En curso</div></article>
      <article class="kpi warning"><div class="kpi-label">Prioridad urgente <span>P1/P2</span></div><div class="kpi-value">${m.urgent}</div><div class="kpi-note">Altos o críticos sin cerrar</div></article>
      <article class="kpi info"><div class="kpi-label">Alertas correlacionadas <span>24H</span></div><div class="kpi-value">${m.alerts}</div><div class="kpi-note">Todas provienen del dataset local</div></article>
      <article class="kpi"><div class="kpi-label">Progreso escenarios <span>LAB</span></div><div class="kpi-value">${m.scenarioPct}%</div><div class="kpi-note">Guardado solo en este navegador</div></article>
    </section>
    <section class="grid dashboard-grid">
      <div class="stack">
        <article class="panel"><div class="panel-head"><div><p class="eyebrow">Telemetría</p><h2>Pulso de eventos · últimas 12 h del dataset</h2></div><span class="data-note">${D.logs.length} logs</span></div><div class="panel-body">${eventChart()}</div></article>
        <article class="panel"><div class="panel-head"><h2>Cola priorizada</h2><button class="ghost-button" data-go="incidents">Ver todos</button></div>${recentIncidentTable(5)}</article>
      </div>
      <div class="stack">
        <article class="panel"><div class="panel-head"><h2>Salud de conectores</h2>${m.degraded ? badge('degraded') : badge('healthy')}</div><div class="panel-body">${D.connectors.map(c=>`<div class="connector"><i class="dot ${c.status}"></i><div><b>${esc(c.name)}</b><small>${c.events24h.toLocaleString('es')} eventos · último ${fmtDate(c.lastEvent)}</small></div>${badge(c.status)}</div>`).join('')}</div></article>
        <article class="panel"><div class="panel-head"><h2>Distribución por severidad</h2></div><div class="panel-body">${severityBreakdown()}</div></article>
        ${simDisclaimer(true)}
      </div>
    </section>`;
  }

  function renderIncidents() {
    setBreadcrumb('Incidentes'); setActive('incidents');
    const incidents = D.incidents.map(effectiveIncident).sort((a,b) => ({critical:4,high:3,medium:2,low:1}[b.severity]-({critical:4,high:3,medium:2,low:1}[a.severity])) || new Date(b.updatedAt)-new Date(a.updatedAt));
    $('#main').innerHTML = pageHead('Triage L1', 'Incidentes simulados', 'Filtra, investiga, cambia estados y exporta evidencia sin afectar ningún entorno real.', `<button class="ghost-button" data-export="incidents">Exportar CSV</button>`) +
      `<article class="panel"><div class="filters"><label><span>Buscar</span><input id="incident-search" type="search" placeholder="ID, título, propietario o táctica"></label><label><span>Severidad</span><select id="severity-filter"><option value="">Todas</option><option value="critical">Crítica</option><option value="high">Alta</option><option value="medium">Media</option><option value="low">Baja</option></select></label><label><span>Estado</span><select id="status-filter"><option value="">Todos</option><option value="new">Nuevo</option><option value="in_progress">En curso</option><option value="resolved">Resuelto</option><option value="closed_fp">Falso positivo</option></select></label></div>
      <div class="table-wrap"><table><thead><tr><th>ID</th><th>Incidente</th><th>Severidad</th><th>Estado</th><th>Propietario</th><th>Confianza</th><th>Actualizado</th></tr></thead><tbody id="incident-body">${incidentRows(incidents)}</tbody></table></div><div class="panel-body data-note" id="incident-count">Mostrando ${incidents.length} de ${incidents.length} incidentes.</div></article>`;
    const apply = () => {
      const q = $('#incident-search').value.trim().toLowerCase(), sev=$('#severity-filter').value, status=$('#status-filter').value;
      const filtered = incidents.filter(i => (!q || [i.id,i.title,i.owner,i.tactic].join(' ').toLowerCase().includes(q)) && (!sev || i.severity===sev) && (!status || i.status===status));
      $('#incident-body').innerHTML = incidentRows(filtered); $('#incident-count').textContent = `Mostrando ${filtered.length} de ${incidents.length} incidentes.`;
    };
    ['#incident-search','#severity-filter','#status-filter'].forEach(s => $(s).addEventListener('input',apply));
  }

  function entityCards(ids) {
    return ids.map(id => D.entities.find(e=>e.id===id)).filter(Boolean).map(e => `<div class="fact"><span>${esc(e.type)} · ${esc(e.id)}</span><b>${esc(e.name)}</b><small>${badge(e.risk)}</small></div>`).join('');
  }

  function renderIncident(id) {
    const i = getIncident(id); if (!i) return navigate('incidents');
    setBreadcrumb(`Incidentes / ${i.id}`); setActive('incidents');
    const logs = i.logIds.map(id=>D.logs.find(l=>l.id===id)).filter(Boolean).sort((a,b)=>new Date(a.time)-new Date(b.time));
    const alerts = i.alertIds.map(id=>D.alerts.find(a=>a.id===id)).filter(Boolean);
    const scenario = D.scenarios.find(s=>s.id===i.scenarioId);
    $('#main').innerHTML = pageHead('Investigación guiada', i.id, 'Detalle correlacionado de un incidente ficticio. Las modificaciones se guardan localmente.', `<button class="ghost-button" data-go="incidents">← Volver</button><button class="button" data-export-incident="${esc(i.id)}">Exportar JSON</button>`) +
      `<section class="panel incident-hero ${esc(i.severity)}"><div class="incident-titleline"><div><div class="actions">${badge(i.severity)} ${badge(i.status)}</div><h2 style="margin:12px 0 8px">${esc(i.title)}</h2><p>${esc(i.summary)}</p></div><div style="min-width:210px"><label><span>Estado del laboratorio</span><select id="incident-status"><option value="new">Nuevo</option><option value="in_progress">En curso</option><option value="resolved">Resuelto</option><option value="closed_fp">Falso positivo</option></select></label><label style="display:block;margin-top:10px"><span>Propietario</span><select id="incident-owner"><option>Sin asignar</option><option>Analista L1</option><option>Analista L2</option><option>IAM + SOC</option></select></label></div></div><div class="incident-meta"><span>Creado ${fmtDate(i.createdAt)}</span><span>Actualizado ${fmtDate(i.updatedAt)}</span><span>Confianza ${i.confidence}%</span><span>${esc(i.tactic)} · ${esc(i.techniques.join(', '))}</span></div></section>
      <section class="grid detail-grid"><div class="stack">
        <article class="panel"><div class="panel-head"><h2>Hipótesis y evidencia</h2></div><div class="panel-body"><div class="callout"><h3>Hipótesis de trabajo</h3><p>${esc(i.hypothesis)}</p></div><h3 style="margin-top:18px">Alertas correlacionadas</h3><div class="fact-grid">${alerts.map(a=>`<div class="fact"><span>${esc(a.id)} · ${esc(a.source)}</span><b>${esc(a.name)}</b><small>${badge(a.severity)} · ${fmtDate(a.time)}</small></div>`).join('')}</div><h3 style="margin-top:18px">Entidades</h3><div class="fact-grid">${entityCards(i.entityIds)}</div></div></article>
        <article class="panel"><div class="panel-head"><h2>Línea de tiempo de evidencia</h2><span class="data-note">${logs.length} eventos</span></div><div class="panel-body timeline">${logs.map(l=>`<div class="timeline-item"><time>${fmtDate(l.time)}</time><b>${esc(l.action)} · ${esc(l.table)}</b><small>${esc(l.user)} → ${esc(l.target)} · ${esc(l.detail)}</small></div>`).join('')}</div></article>
        <article class="panel"><div class="panel-head"><h2>Acciones recomendadas</h2></div><div class="panel-body"><ol class="playbook-steps">${i.recommendedActions.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div></article>
      </div><aside class="stack">
        <div class="ai-box"><h3>✦ Evaluación IA simulada</h3><p>${esc(i.aiAssessment)}</p><p class="data-note" style="margin-top:10px">Generada localmente a partir de reglas y campos del dataset. No es asesoría de seguridad.</p></div>
        <article class="panel"><div class="panel-head"><h3>Ficha rápida</h3></div><div class="panel-body"><div class="stat-line"><span>Alertas</span><b>${alerts.length}</b></div><div class="stat-line"><span>Logs</span><b>${logs.length}</b></div><div class="stat-line"><span>Entidades</span><b>${i.entityIds.length}</b></div><div class="stat-line"><span>Técnicas</span><b>${esc(i.techniques.join(', '))}</b></div></div></article>
        ${scenario ? `<article class="card"><p class="card-kicker">Escenario asociado</p><h3>${esc(scenario.title)}</h3><p>${esc(scenario.objective)}</p><button class="button" data-scenario="${esc(scenario.id)}">Abrir ejercicio</button></article>` : ''}
        ${simDisclaimer(true)}
      </aside></section>`;
    $('#incident-status').value = i.status; $('#incident-owner').value = i.owner;
    const update = () => { state.incidentOverrides[i.id] = { status:$('#incident-status').value, owner:$('#incident-owner').value, updatedAt:D.meta.generatedAt }; saveState(); updateNavCount(); toast('Cambio guardado solo en este navegador.'); };
    $('#incident-status').addEventListener('change', update); $('#incident-owner').addEventListener('change', update);
  }

  function runQuery(query) {
    let rows = D.logs.slice(); const q = query.trim();
    const first = q.split(/\n/).map(x=>x.trim()).find(Boolean) || 'search *';
    if (!/^search\s+\*/i.test(first)) rows = rows.filter(r => r.table.toLowerCase() === first.toLowerCase());
    if (/Result\s*==\s*["']failure["']/i.test(q)) rows = rows.filter(r=>r.result==='failure');
    if (/Result\s*==\s*["']success["']/i.test(q)) rows = rows.filter(r=>r.result==='success');
    const target = q.match(/(?:Target|IPAddress)\s*==\s*["']([^"']+)["']/i); if (target) rows = rows.filter(r=>r.target===target[1]);
    const user = q.match(/(?:User|UserPrincipalName)\s*==\s*["']([^"']+)["']/i); if (user) rows = rows.filter(r=>r.user===user[1]);
    const ago = q.match(/ago\((\d+)([hm])\)/i); if (ago) { const ms = Number(ago[1])*(ago[2].toLowerCase()==='h'?3600000:60000), base=new Date(D.meta.generatedAt).getTime(); rows=rows.filter(r=>base-new Date(r.time).getTime()<=ms); }
    if (/summarize\s+Count\s*=\s*count\(\)\s+by\s+Table/i.test(q)) {
      const counts={}; rows.forEach(r=>counts[r.table]=(counts[r.table]||0)+1); return Object.entries(counts).map(([Table,Count])=>({Table,Count})).sort((a,b)=>b.Count-a.Count);
    }
    rows.sort((a,b)=>new Date(b.time)-new Date(a.time)); const top=q.match(/top\s+(\d+)/i); if (top) rows=rows.slice(0,Number(top[1])); return rows;
  }

  function resultTable(rows) {
    if (!rows.length) return '<div class="empty"><strong>0 resultados</strong>La consulta no encontró eventos en el dataset simulado.</div>';
    if ('Count' in rows[0]) return `<div class="table-wrap"><table><thead><tr><th>Tabla</th><th>Conteo</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(r.Table)}</td><td>${r.Count}</td></tr>`).join('')}</tbody></table></div>`;
    return `<div class="table-wrap" style="max-height:340px"><table><thead><tr><th>Tiempo</th><th>Tabla</th><th>Acción</th><th>Usuario</th><th>Destino</th><th>Resultado</th><th>Detalle</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${fmtDate(r.time)}</td><td>${esc(r.table)}</td><td>${esc(r.action)}</td><td>${esc(r.user)}</td><td>${esc(r.target)}</td><td>${badge(r.result)}</td><td>${esc(r.detail)}</td></tr>`).join('')}</tbody></table></div>`;
  }

  function renderLogs() {
    setBreadcrumb('Logs + KQL'); setActive('logs'); const initial = state.lastQuery || D.kqlExamples[0].query;
    $('#main').innerHTML = pageHead('Laboratorio de consultas', 'Logs + KQL', 'Ejecuta un subconjunto educativo de KQL sobre 84 eventos ficticios. No se envía nada fuera del navegador.', `<button class="ghost-button" data-export="logs">Exportar logs CSV</button>`) + simDisclaimer(true) +
      `<section class="grid code-layout" style="margin-top:16px"><article class="panel"><div class="panel-head"><h2>Consultas guiadas</h2></div><div class="panel-body query-list">${D.kqlExamples.map((q,idx)=>`<button data-query="${idx}"><b>${esc(q.name)}</b><br><small>${esc(q.query.split('\n')[0])}</small></button>`).join('')}<div class="callout"><h3>Subconjunto compatible</h3><p>Tablas, <code>where</code> por usuario/destino/resultado, <code>ago()</code>, <code>top</code> y <code>summarize count() by Table</code>.</p></div></div></article>
      <div class="stack"><article class="panel"><div class="panel-head"><h2>Editor KQL simulado</h2><button class="button" id="run-query">▶ Ejecutar</button></div><div class="panel-body"><textarea class="code-editor" id="query-editor" spellcheck="false" aria-label="Editor KQL">${esc(initial)}</textarea></div></article>
      <article class="panel"><div class="panel-head"><h2>Resultados</h2><span class="data-note" id="query-count">Listo</span></div><div class="panel-body"><div class="result-meta"><span>Motor local · sin red</span><span id="query-time">—</span></div><div id="query-results"></div></div></article></div></section>`;
    const execute = () => { const start=performance.now(), query=$('#query-editor').value, rows=runQuery(query); state.lastQuery=query; saveState(); $('#query-results').innerHTML=resultTable(rows); $('#query-count').textContent=`${rows.length} filas`; $('#query-time').textContent=`${Math.max(1,Math.round(performance.now()-start))} ms simulados`; };
    $('#run-query').addEventListener('click',execute); $$('.query-list button[data-query]').forEach(b=>b.addEventListener('click',()=>{$('#query-editor').value=D.kqlExamples[Number(b.dataset.query)].query;execute();})); execute();
  }

  function scenarioCard(s) {
    const p=state.scenarioProgress[s.id]||{}, pct=p.completed?100:Math.round(((p.checked||[]).length/s.checklist.length)*100)||0;
    return `<article class="card"><p class="card-kicker">${esc(s.difficulty)} · ${esc(s.duration)}</p><h3>${esc(s.title)}</h3><p>${esc(s.objective)}</p><div class="topic-tags">${s.skills.map(x=>`<span>${esc(x)}</span>`).join('')}</div><footer><div style="flex:1;margin-right:12px"><div class="progress"><i style="width:${pct}%"></i></div><small>${pct}% completado</small></div><button class="button" data-scenario="${esc(s.id)}">${p.completed?'Revisar':'Iniciar'}</button></footer></article>`;
  }
  function renderScenarios() {
    setBreadcrumb('Escenarios'); setActive('scenarios');
    $('#main').innerHTML = pageHead('Práctica guiada', 'Escenarios de incidente', 'Seis ejercicios progresivos conectados con los mismos incidentes, alertas, entidades y logs del dashboard.') + simDisclaimer(true) + `<section class="grid scenario-grid" style="margin-top:16px">${D.scenarios.map(scenarioCard).join('')}</section>`;
  }
  function openScenario(id) {
    const s=D.scenarios.find(x=>x.id===id), p=state.scenarioProgress[id]||{checked:[]}; if(!s)return;
    const incident=getIncident(s.incidentId);
    openModal(`<p class="eyebrow">${esc(s.id)} · ${esc(s.difficulty)}</p><h2>${esc(s.title)}</h2><p>${esc(s.objective)}</p>${simDisclaimer(true)}<h3 style="margin-top:20px">Inyecciones del escenario</h3><div class="stack">${s.steps.map((x,idx)=>`<div class="scenario-step"><strong>Paso ${idx+1} · ${esc(x.title)}</strong><p>${esc(x.inject)}</p></div>`).join('')}</div><h3 style="margin-top:20px">Checklist del analista</h3><div class="checklist">${s.checklist.map((x,idx)=>`<label class="check-item"><input type="checkbox" data-check="${idx}" ${p.checked.includes(idx)?'checked':''}><span>${esc(x)}</span></label>`).join('')}</div><div class="actions" style="margin-top:18px"><button class="button" id="complete-scenario">Calificar ejercicio</button><button class="ghost-button" data-open-incident="${esc(incident.id)}">Abrir ${esc(incident.id)}</button></div><div id="scenario-feedback"></div>`);
    $('#complete-scenario').addEventListener('click',()=>{const checked=$$('input[data-check]',$('#modal')).filter(x=>x.checked).map(x=>Number(x.dataset.check)), score=Math.round(checked.length/s.checklist.length*100); state.scenarioProgress[id]={checked,completed:score===100,score};saveState();$('#scenario-feedback').innerHTML=`<div class="callout" style="margin-top:16px"><h3>Puntuación: ${score}%</h3><p>${score===100?esc(s.answer):'Completa todos los puntos antes de cerrar el caso. Revisa evidencia, decisión y documentación.'}</p></div>`;toast('Progreso del escenario guardado.');});
  }

  function renderPlaybooks() {
    setBreadcrumb('Playbooks'); setActive('playbooks');
    $('#main').innerHTML = pageHead('Respuesta documentada', 'Playbooks operativos', 'Procedimientos educativos y reversibles para practicar escalamiento. No automatizan acciones reales.', `<button class="ghost-button" onclick="window.print()">Imprimir</button>`) + `<section class="grid playbook-grid">${D.playbooks.map(p=>`<article class="card"><p class="card-kicker">${esc(p.id)} · ${esc(p.owner)}</p><h3>${esc(p.title)}</h3><p><b>Disparador:</b> ${esc(p.trigger)}</p><ol class="playbook-steps">${p.steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></article>`).join('')}</section><div style="margin-top:16px">${simDisclaimer()}</div>`;
  }

  function assistantReply(text) {
    const q=text.toLowerCase();
    const id=(text.match(/INC-2026-\d{3}/i)||[])[0];
    if(id){const i=getIncident(id.toUpperCase());if(i)return `${i.id} — ${i.title}\nSeveridad: ${labels[i.severity]}; estado: ${labels[i.status]}; confianza: ${i.confidence}%.\nHipótesis: ${i.hypothesis}\nSiguiente paso sugerido: ${i.recommendedActions[0]}\n\nEvaluación simulada: valida siempre con evidencia humana.`;}
    if(q.includes('prior')||q.includes('crític')||q.includes('critico')){const rank={critical:4,high:3,medium:2,low:1};const open=D.incidents.map(effectiveIncident).filter(i=>['new','in_progress'].includes(i.status)).sort((a,b)=>rank[b.severity]-rank[a.severity]);return `Prioridad sugerida por reglas:\n${open.map((i,n)=>`${n+1}. ${i.id} — ${i.title} (${labels[i.severity]})`).join('\n')}\n\nCriterio: severidad, estado y confianza del dataset; no es una decisión autónoma.`;}
    if(q.includes('conector')||q.includes('ingesta')||q.includes('salud')){const c=D.connectors.find(x=>x.status==='degraded');return `${c.name} figura degradado: último evento ${fmtDate(c.lastEvent)} y ${c.events24h} eventos en 24 h simuladas. Un L1 debería verificar alcance, documentar la brecha y escalar; no modificar la configuración sin autorización.`;}
    if(q.includes('ip')||q.match(/\d{1,3}(\.\d{1,3}){3}/)){const match=(q.match(/\d{1,3}(?:\.\d{1,3}){3}/)||[])[0]||'203.0.113.44', rows=D.logs.filter(l=>l.target===match), linked=D.incidents.map(effectiveIncident).filter(i=>i.entityIds.some(id=>{const e=D.entities.find(x=>x.id===id);return e&&e.name===match;}));return `${match} aparece en ${rows.length} logs directos y ${linked.length} incidentes: ${linked.map(i=>i.id).join(', ')||'ninguno'}. Es una dirección reservada para documentación o laboratorio, no un IOC real.`;}
    if(q.includes('kql')||q.includes('consulta')) return `Prueba en Logs + KQL:\nSigninLogs\n| where TimeGenerated > ago(1h)\n| where Result == "failure"\n| project TimeGenerated, User, IPAddress, Detail\n\nEl motor es educativo y solo implementa un subconjunto de KQL.`;
    if(q.includes('explica')||q.includes('resumen')) return `Este laboratorio correlaciona ${D.alerts.length} alertas en ${D.incidents.length} incidentes usando ${D.logs.length} logs ficticios. La cola combina identidad, endpoint, correo, red y auditoría. El flujo recomendado es: priorizar → validar usuario/IP/tiempo/patrón → formular hipótesis → contener de forma reversible → escalar y documentar.`;
    return `Puedo ayudarte a priorizar incidentes, resumir un ID como INC-2026-001, revisar salud de conectores, buscar una IP del laboratorio o proponer una consulta KQL. Mi respuesta se genera localmente con reglas: no soy un modelo conectado ni consulto datos externos.`;
  }
  function renderAssistant() {
    setBreadcrumb('Copiloto IA'); setActive('assistant');
    if(!state.chat.length) state.chat=[{role:'assistant',text:`Hola. Soy el copiloto simulado del Mini SOC. Trabajo únicamente con ${D.incidents.length} incidentes y ${D.logs.length} logs ficticios cargados en tu navegador.`}];
    $('#main').innerHTML = pageHead('Asistente local basado en reglas', 'Copiloto IA simulado', 'Haz preguntas sobre el dataset. No usa un modelo externo, no aprende y no toma acciones.') + `<section class="chat-shell">${simDisclaimer()}<div class="prompt-chips"><button>¿Qué priorizo?</button><button>Resume INC-2026-002</button><button>Revisa la salud de conectores</button><button>Dame una consulta KQL</button></div><div class="chat-window" id="chat-window">${state.chat.map(m=>`<div class="message ${m.role}">${esc(m.text)}<small>${m.role==='assistant'?'Respuesta local simulada':'Tu consulta'}</small></div>`).join('')}</div><form class="chat-form" id="chat-form"><input id="chat-input" maxlength="300" autocomplete="off" placeholder="Ej.: Resume INC-2026-001" aria-label="Pregunta al copiloto simulado"><button class="button" type="submit">Enviar</button></form></section>`;
    const send=(text)=>{if(!text.trim())return;state.chat.push({role:'user',text:text.trim()},{role:'assistant',text:assistantReply(text.trim())});state.chat=state.chat.slice(-20);saveState();renderAssistant();setTimeout(()=>{$('#chat-window').scrollTop=$('#chat-window').scrollHeight;},0);};
    $('#chat-form').addEventListener('submit',e=>{e.preventDefault();send($('#chat-input').value);});$$('.prompt-chips button').forEach(b=>b.addEventListener('click',()=>send(b.textContent)));
  }

  function renderLearning() {
    setBreadcrumb('Ruta de estudio'); setActive('learning');
    const completed=Object.values(state.learningProgress).filter(Boolean).length;
    $('#main').innerHTML = pageHead('1 hora diaria + práctica opcional', 'Ruta de estudio SOC L1', 'Módulos alineados con fundamentos, identidad, salud de plataforma, KQL, stack Microsoft y documentación.') + `<div class="panel" style="margin-bottom:16px"><div class="panel-body"><div class="stat-line"><span>Progreso total</span><b>${completed}/${D.learning.length}</b></div><div class="progress"><i style="width:${completed/D.learning.length*100}%"></i></div><p class="data-note">Sugerencia: 20 min contenido · 20 min notas · 20 min preguntas · 15–20 min práctica opcional.</p></div></div><section class="grid learning-grid">${D.learning.map((m,idx)=>`<article class="card"><p class="card-kicker">Módulo ${idx+1} · ${m.minutes} min</p><h3>${esc(m.title)}</h3><div class="topic-tags">${m.topics.map(x=>`<span>${esc(x)}</span>`).join('')}</div><p><b>Ejercicio:</b> ${esc(m.exercise)}</p><footer><label class="check-item" style="width:100%"><input type="checkbox" data-module="${esc(m.id)}" ${state.learningProgress[m.id]?'checked':''}><span>Marcar como completado</span></label></footer></article>`).join('')}</section>`;
    $$('[data-module]').forEach(x=>x.addEventListener('change',()=>{state.learningProgress[x.dataset.module]=x.checked;saveState();renderLearning();toast('Progreso de estudio actualizado.');}));
  }

  function renderAbout() {
    setBreadcrumb('Acerca del laboratorio'); setActive('about');
    $('#main').innerHTML = pageHead('Transparencia por diseño', 'Acerca del Mini SOC', 'Qué simula, qué no hace y cómo usarlo de forma segura en formación o portafolio.') + `<section class="grid about-grid"><article class="panel"><div class="panel-head"><h2>Alcance educativo</h2></div><div class="panel-body"><p>Este proyecto reproduce el flujo visual de un SOC L1: revisión de incidentes, validación de salud de ingesta, análisis de alertas, consultas tipo KQL, escenarios y documentación.</p><div class="callout"><h3>No es una herramienta de seguridad</h3><p>No detecta amenazas reales, no contiene dispositivos, no administra identidades y no sustituye Microsoft Sentinel, Defender XDR, Entra ID ni el criterio de un analista.</p></div><h3 style="margin-top:18px">Datos</h3><ul><li>Organización ficticia: Contoso Lab.</li><li>Dominios <code>.example</code>, IPs TEST-NET y direcciones privadas.</li><li>${D.incidents.length} incidentes, ${D.alerts.length} alertas, ${D.logs.length} logs.</li><li>Generación determinística con semilla ${D.meta.seed}.</li></ul></div></article><article class="panel"><div class="panel-head"><h2>IA responsable</h2></div><div class="panel-body"><p>El “copiloto” usa condiciones JavaScript y texto predefinido. No existe inferencia remota, aprendizaje, perfilado ni envío de prompts.</p><div class="stat-line"><span>Conexiones de red</span><b>0</b></div><div class="stat-line"><span>Dependencias externas</span><b>0</b></div><div class="stat-line"><span>Persistencia</span><b>localStorage</b></div><div class="stat-line"><span>Acciones reales</span><b>0</b></div><p class="data-note">Consulta docs/AI_TRANSPARENCY.md y docs/DATA_MODEL.md en el repositorio.</p></div></article><article class="panel"><div class="panel-head"><h2>Flujo recomendado L1</h2></div><div class="panel-body"><ol class="playbook-steps"><li>Ordenar por severidad y estado.</li><li>Validar usuario, IP, tiempo, patrón y fuente.</li><li>Formular una hipótesis sin confundirla con un hecho.</li><li>Documentar evidencia y acciones reversibles.</li><li>Escalar según impacto y autoridad.</li></ol></div></article><article class="panel"><div class="panel-head"><h2>Atajos</h2></div><div class="panel-body"><div class="stat-line"><span>Ir a Incidentes</span><b>g i</b></div><div class="stat-line"><span>Ir a Logs</span><b>g l</b></div><div class="stat-line"><span>Ir a Escenarios</span><b>g s</b></div><div class="stat-line"><span>Ayuda</span><b>?</b></div><div class="stat-line"><span>Cerrar modal</span><b>Esc</b></div></div></article></section><div style="margin-top:16px">${simDisclaimer()}</div>`;
  }

  function navigate(route) { location.hash = `#/${route}`; }
  function router() {
    const path=(location.hash||'#/overview').replace(/^#\//,'').split('/').filter(Boolean); const route=path[0]||'overview';
    const renderers={overview:renderOverview,incidents:()=>path[1]?renderIncident(path[1]):renderIncidents(),logs:renderLogs,scenarios:renderScenarios,playbooks:renderPlaybooks,assistant:renderAssistant,learning:renderLearning,about:renderAbout};
    (renderers[route]||renderOverview)(); window.scrollTo(0,0); $('#sidebar').classList.remove('open'); $('#menu-button').setAttribute('aria-expanded','false');
  }
  function updateNavCount(){const n=D.incidents.map(effectiveIncident).filter(i=>['new','in_progress'].includes(i.status)).length;$('#nav-incident-count').textContent=n;}
  function showHelp(){openModal(`<p class="eyebrow">Navegación rápida</p><h2>Atajos de teclado</h2><div class="stat-line"><span>Ir a Incidentes</span><b>g luego i</b></div><div class="stat-line"><span>Ir a Logs + KQL</span><b>g luego l</b></div><div class="stat-line"><span>Ir a Escenarios</span><b>g luego s</b></div><div class="stat-line"><span>Abrir esta ayuda</span><b>?</b></div><p class="data-note">Los atajos no se activan mientras escribes en un campo.</p>`);}

  document.addEventListener('click', e => {
    const go=e.target.closest('[data-go]'); if(go)navigate(go.dataset.go);
    const row=e.target.closest('[data-incident]'); if(row)navigate(`incidents/${row.dataset.incident}`);
    const scenario=e.target.closest('[data-scenario]'); if(scenario)openScenario(scenario.dataset.scenario);
    const openI=e.target.closest('[data-open-incident]'); if(openI){closeModal();navigate(`incidents/${openI.dataset.openIncident}`);}
    const exp=e.target.closest('[data-export]'); if(exp){if(exp.dataset.export==='incidents')exportCSV(D.incidents.map(effectiveIncident),['id','title','severity','status','owner','confidence','tactic','createdAt','updatedAt'],'incidentes-simulados.csv');if(exp.dataset.export==='logs')exportCSV(D.logs,['id','time','table','action','user','target','result','detail'],'logs-simulados.csv');if(exp.dataset.export==='snapshot')download('mini-soc-snapshot.json',JSON.stringify({meta:D.meta,metrics:metrics(),incidentStatus:D.incidents.map(effectiveIncident)},null,2));toast('Archivo simulado exportado.');}
    const expI=e.target.closest('[data-export-incident]'); if(expI){const i=getIncident(expI.dataset.exportIncident);download(`${i.id}-simulado.json`,JSON.stringify({disclaimer:D.meta.classification,incident:i,alerts:i.alertIds.map(id=>D.alerts.find(a=>a.id===id)),logs:i.logIds.map(id=>D.logs.find(l=>l.id===id)),entities:i.entityIds.map(id=>D.entities.find(x=>x.id===id))},null,2));toast('Incidente exportado con disclaimer.');}
  });
  document.addEventListener('keydown', e=>{const row=e.target.closest&&e.target.closest('[data-incident]');if(row&&(e.key==='Enter'||e.key===' ')){e.preventDefault();navigate(`incidents/${row.dataset.incident}`);}});
  let gPressed=false;document.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName))return;if(e.key==='?')showHelp();if(e.key==='g'){gPressed=true;setTimeout(()=>gPressed=false,900);return;}if(gPressed){if(e.key==='i')navigate('incidents');if(e.key==='l')navigate('logs');if(e.key==='s')navigate('scenarios');gPressed=false;}});
  $('#menu-button').addEventListener('click',()=>{const open=$('#sidebar').classList.toggle('open');$('#menu-button').setAttribute('aria-expanded',String(open));});
  $('#help-button').addEventListener('click',showHelp);$('.modal-close').addEventListener('click',closeModal);$('#modal').addEventListener('click',e=>{if(e.target===$('#modal'))closeModal();});
  $('#reset-lab').addEventListener('click',()=>{openModal(`<p class="eyebrow">Acción local</p><h2>Restablecer laboratorio</h2><p>Se eliminarán cambios de estado, progreso de escenarios, módulos completados y chat guardados en este navegador. El dataset base no cambia.</p><button class="danger-button" id="confirm-reset">Restablecer ahora</button>`);setTimeout(()=>{$('#confirm-reset').addEventListener('click',()=>{localStorage.removeItem(STORAGE);state={incidentOverrides:{},scenarioProgress:{},learningProgress:{},chat:[],lastQuery:''};closeModal();updateNavCount();router();toast('Laboratorio restablecido.');});},0);});
  window.addEventListener('hashchange',router);
  $('#data-version').textContent=`dataset v${D.meta.version}`;$('#dataset-clock').textContent=fmtDate(D.meta.generatedAt);updateNavCount();router();
})();
