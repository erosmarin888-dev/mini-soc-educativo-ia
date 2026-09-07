const assert = require('assert');
const fs = require('fs');
const path = require('path');
const data = require('../src/data.js');

const uniq = (arr, label) => assert.strictEqual(new Set(arr).size, arr.length, `${label}: IDs duplicados`);
const byId = arr => new Map(arr.map(x => [x.id, x]));
uniq(data.incidents.map(x=>x.id), 'incidents');
uniq(data.alerts.map(x=>x.id), 'alerts');
uniq(data.logs.map(x=>x.id), 'logs');
uniq(data.entities.map(x=>x.id), 'entities');
uniq(data.scenarios.map(x=>x.id), 'scenarios');

const incidents=byId(data.incidents), alerts=byId(data.alerts), logs=byId(data.logs), entities=byId(data.entities), scenarios=byId(data.scenarios);
for (const incident of data.incidents) {
  incident.alertIds.forEach(id=>assert(alerts.has(id), `${incident.id}: alerta inexistente ${id}`));
  incident.logIds.forEach(id=>assert(logs.has(id), `${incident.id}: log inexistente ${id}`));
  incident.entityIds.forEach(id=>assert(entities.has(id), `${incident.id}: entidad inexistente ${id}`));
  if (incident.scenarioId) { assert(scenarios.has(incident.scenarioId), `${incident.id}: escenario inexistente`); assert.strictEqual(scenarios.get(incident.scenarioId).incidentId, incident.id, `${incident.id}: escenario inconsistente`); }
}
for (const alert of data.alerts) {
  assert(incidents.has(alert.incidentId), `${alert.id}: incidente inexistente`);
  assert(incidents.get(alert.incidentId).alertIds.includes(alert.id), `${alert.id}: no está referenciada por su incidente`);
}
for (const scenario of data.scenarios) assert(incidents.has(scenario.incidentId), `${scenario.id}: incidente inexistente`);
for (const entity of data.entities.filter(e=>e.type==='user')) assert(entity.name.endsWith('.example'), `${entity.id}: correo no ficticio`);
const publicTest=/^(192\.0\.2\.|198\.51\.100\.|203\.0\.113\.)/;
const privateIp=/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/;
for (const entity of data.entities.filter(e=>e.type==='ip')) assert(publicTest.test(entity.name)||privateIp.test(entity.name), `${entity.id}: IP fuera de rangos seguros`);
assert(data.meta.classification.includes('SIMULACIÓN'), 'Falta clasificación simulada');
assert.strictEqual(data.incidents.length, 8);
assert.strictEqual(data.alerts.length, 14);
assert.strictEqual(data.logs.length, 84);

const root=path.resolve(__dirname,'..');
['index.html','src/styles.css','src/app.js','src/data.js','README.md','LICENSE','SECURITY.md'].forEach(f=>assert(fs.existsSync(path.join(root,f)), `Falta ${f}`));
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(html.includes('SIMULACIÓN EDUCATIVA'), 'index.html no muestra el disclaimer');
assert(!/https?:\/\//.test(html), 'index.html contiene una URL externa');
const app=fs.readFileSync(path.join(root,'src/app.js'),'utf8');
assert(!/fetch\s*\(/.test(app), 'app.js no debe usar fetch');
console.log(`✓ Dataset válido: ${data.incidents.length} incidentes, ${data.alerts.length} alertas, ${data.logs.length} logs, ${data.scenarios.length} escenarios.`);
