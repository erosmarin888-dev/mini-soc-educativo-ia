#!/usr/bin/env python3
"""Generate deterministic, internally consistent simulated SOC data.
No real people, organizations, credentials, or production indicators are used.
"""
from __future__ import annotations
import json, random
from datetime import datetime, timedelta, timezone
from pathlib import Path

SEED = 260907
random.seed(SEED)
BASE_TIME = datetime(2026, 9, 7, 14, 30, tzinfo=timezone.utc)

def iso(minutes_ago: int) -> str:
    return (BASE_TIME - timedelta(minutes=minutes_ago)).isoformat().replace('+00:00', 'Z')

entities = [
 {"id":"USR-001","type":"user","name":"ana.soto@contoso-lab.example","risk":"high","department":"Finanzas"},
 {"id":"USR-002","type":"user","name":"diego.arias@contoso-lab.example","risk":"medium","department":"Operaciones"},
 {"id":"USR-003","type":"user","name":"svc-backup@contoso-lab.example","risk":"high","department":"TI"},
 {"id":"USR-004","type":"user","name":"lucia.mora@contoso-lab.example","risk":"low","department":"Ventas"},
 {"id":"USR-005","type":"user","name":"admin.lab@contoso-lab.example","risk":"high","department":"TI"},
 {"id":"DEV-001","type":"device","name":"FIN-LT-014","risk":"high","os":"Windows 11"},
 {"id":"DEV-002","type":"device","name":"OPS-WS-022","risk":"medium","os":"Windows 11"},
 {"id":"DEV-003","type":"device","name":"SRV-FILE-01","risk":"high","os":"Windows Server 2022"},
 {"id":"DEV-004","type":"device","name":"MKT-LT-009","risk":"low","os":"macOS 15"},
 {"id":"DEV-005","type":"device","name":"SRV-BACKUP-01","risk":"medium","os":"Ubuntu 24.04"},
 {"id":"IP-001","type":"ip","name":"203.0.113.44","risk":"high","geo":"București, RO","classification":"TEST-NET-3"},
 {"id":"IP-002","type":"ip","name":"198.51.100.27","risk":"medium","geo":"Toronto, CA","classification":"TEST-NET-2"},
 {"id":"IP-003","type":"ip","name":"192.0.2.81","risk":"high","geo":"Madrid, ES","classification":"TEST-NET-1"},
 {"id":"IP-004","type":"ip","name":"10.40.12.88","risk":"low","geo":"Red de laboratorio","classification":"RFC1918"},
 {"id":"IP-005","type":"ip","name":"10.40.8.15","risk":"low","geo":"Red de laboratorio","classification":"RFC1918"}
]

incidents = [
 {"id":"INC-2026-001","title":"Rociado de contraseñas contra cuentas financieras","severity":"high","status":"new","owner":"Sin asignar","createdAt":iso(18),"updatedAt":iso(8),"confidence":92,"tactic":"Credential Access","techniques":["T1110.003"],"scenarioId":"SCN-001","entityIds":["USR-001","USR-002","IP-001"],"alertIds":["ALT-001","ALT-002"],"logIds":["LOG-001","LOG-002","LOG-003","LOG-004","LOG-005"],"summary":"Treinta y siete intentos fallidos distribuidos en dos cuentas, seguidos de un inicio de sesión exitoso para ana.soto desde la misma IP de laboratorio.","hypothesis":"La correlación sugiere password spraying con posible compromiso de una cuenta.","recommendedActions":["Confirmar con la usuaria si reconoce el acceso.","Revocar sesiones activas y forzar restablecimiento de credenciales si no se reconoce.","Bloquear temporalmente la IP simulada en el escenario.","Escalar a L2 por éxito posterior a múltiples fallos."],"aiAssessment":"Prioridad alta: patrón distribuido, éxito posterior y cuenta del área financiera. La conclusión es simulada y requiere validación humana."},
 {"id":"INC-2026-002","title":"Documento de phishing con proceso hijo anómalo","severity":"critical","status":"in_progress","owner":"Analista L1","createdAt":iso(64),"updatedAt":iso(12),"confidence":96,"tactic":"Execution","techniques":["T1204.002","T1059.001"],"scenarioId":"SCN-002","entityIds":["USR-004","DEV-004","IP-003"],"alertIds":["ALT-003","ALT-004","ALT-005"],"logIds":["LOG-006","LOG-007","LOG-008","LOG-009","LOG-010","LOG-011"],"summary":"Un adjunto de correo simulado abrió un proceso de Office que inició PowerShell ofuscado y contactó un dominio de laboratorio.","hypothesis":"Ejecución iniciada por usuario con comportamiento compatible con phishing y descarga de payload.","recommendedActions":["Aislar el dispositivo simulado.","Recolectar árbol de procesos y artefactos del archivo.","Buscar el hash y dominio en el resto del entorno simulado.","Escalar inmediatamente a L2."],"aiAssessment":"Prioridad crítica por cadena de ejecución completa. El modelo local simulado no reemplaza el análisis forense."},
 {"id":"INC-2026-003","title":"Transferencia inusual desde servidor de archivos","severity":"high","status":"in_progress","owner":"Analista L2","createdAt":iso(132),"updatedAt":iso(26),"confidence":88,"tactic":"Exfiltration","techniques":["T1048.003"],"scenarioId":"SCN-003","entityIds":["DEV-003","USR-003","IP-002"],"alertIds":["ALT-006","ALT-007"],"logIds":["LOG-012","LOG-013","LOG-014","LOG-015","LOG-016"],"summary":"El servidor de archivos transfirió 4.8 GB a un destino externo de laboratorio fuera de su línea base.","hypothesis":"Posible exfiltración sobre canal web por una cuenta de servicio usada fuera de patrón.","recommendedActions":["Validar cambio o respaldo autorizado.","Restringir temporalmente la salida del host.","Revisar autenticaciones de svc-backup.","Conservar evidencia de red y proxy."],"aiAssessment":"La desviación de volumen es fuerte, pero puede existir una explicación operativa. Confirmar con el propietario del servicio."},
 {"id":"INC-2026-004","title":"Creación de rol privilegiado fuera de ventana","severity":"medium","status":"new","owner":"Sin asignar","createdAt":iso(205),"updatedAt":iso(190),"confidence":81,"tactic":"Privilege Escalation","techniques":["T1098"],"scenarioId":"SCN-004","entityIds":["USR-005","USR-002","IP-004"],"alertIds":["ALT-008"],"logIds":["LOG-017","LOG-018","LOG-019"],"summary":"Se asignó un rol administrativo a diego.arias fuera de la ventana de mantenimiento y sin referencia de cambio simulada.","hypothesis":"Posible abuso de privilegios o cambio administrativo no documentado.","recommendedActions":["Confirmar aprobación con el propietario del rol.","Revisar la sesión de admin.lab.","Retirar el rol si no existe justificación.","Documentar la decisión y evidencia."],"aiAssessment":"Prioridad media hasta validar autorización. La ausencia de ticket aumenta el riesgo, pero no prueba actividad maliciosa."},
 {"id":"INC-2026-005","title":"Beacon periódico desde estación de operaciones","severity":"high","status":"new","owner":"Sin asignar","createdAt":iso(318),"updatedAt":iso(300),"confidence":90,"tactic":"Command and Control","techniques":["T1071.001"],"scenarioId":"SCN-005","entityIds":["DEV-002","USR-002","IP-003"],"alertIds":["ALT-009","ALT-010"],"logIds":["LOG-020","LOG-021","LOG-022","LOG-023","LOG-024"],"summary":"OPS-WS-022 realizó conexiones HTTPS de 180 bytes cada 60 segundos a un host de laboratorio.","hypothesis":"Patrón compatible con beaconing de comando y control.","recommendedActions":["Aislar el endpoint simulado.","Capturar proceso originador y conexiones.","Buscar el destino en todos los logs.","Escalar para análisis de malware."],"aiAssessment":"Alta regularidad temporal y tamaño estable. Verificar procesos de monitoreo legítimos antes de concluir."},
 {"id":"INC-2026-006","title":"Eliminación masiva de copias de sombra","severity":"critical","status":"resolved","owner":"Analista L2","createdAt":iso(470),"updatedAt":iso(360),"confidence":98,"tactic":"Impact","techniques":["T1490"],"scenarioId":"SCN-006","entityIds":["DEV-001","USR-001"],"alertIds":["ALT-011","ALT-012"],"logIds":["LOG-025","LOG-026","LOG-027","LOG-028"],"summary":"Se detectó vssadmin delete shadows seguido por cifrado de archivos señuelo en FIN-LT-014.","hypothesis":"Simulación de ransomware con inhibición de recuperación.","recommendedActions":["Mantener el dispositivo aislado.","Preservar memoria y artefactos.","Restaurar únicamente desde respaldo validado.","Completar retrospectiva del incidente."],"aiAssessment":"Cadena de impacto de alta confianza. El escenario ya fue contenido dentro de la simulación."},
 {"id":"INC-2026-007","title":"Inicio de sesión imposible entre regiones","severity":"medium","status":"closed_fp","owner":"Analista L1","createdAt":iso(610),"updatedAt":iso(520),"confidence":58,"tactic":"Initial Access","techniques":["T1078"],"scenarioId":None,"entityIds":["USR-004","IP-002","IP-003"],"alertIds":["ALT-013"],"logIds":["LOG-029","LOG-030"],"summary":"Dos accesos geográficamente distantes ocurrieron en siete minutos; uno correspondía a un proxy corporativo de laboratorio.","hypothesis":"Falso positivo por salida de proxy conocida.","recommendedActions":["Mantener la IP en lista de infraestructura validada.","Documentar el criterio de cierre."],"aiAssessment":"La hipótesis de falso positivo está respaldada por la clasificación del proxy simulada."},
 {"id":"INC-2026-008","title":"Pico de errores de autenticación del servicio de respaldo","severity":"low","status":"resolved","owner":"Analista L1","createdAt":iso(760),"updatedAt":iso(700),"confidence":74,"tactic":"Credential Access","techniques":["T1110"],"scenarioId":None,"entityIds":["USR-003","DEV-005","IP-005"],"alertIds":["ALT-014"],"logIds":["LOG-031","LOG-032","LOG-033"],"summary":"Un cambio de contraseña no sincronizado generó errores repetidos en el servicio de respaldo.","hypothesis":"Error operativo confirmado, sin evidencia de ataque.","recommendedActions":["Actualizar la credencial del servicio en el almacén simulado.","Verificar recuperación del conector."],"aiAssessment":"Bajo riesgo tras confirmación operativa. Mantener monitoreo por recurrencia."}
]

alerts = [
 {"id":"ALT-001","incidentId":"INC-2026-001","name":"Múltiples fallos distribuidos","severity":"high","source":"Entra ID","time":iso(18),"rule":"LAB-AUTH-001"},
 {"id":"ALT-002","incidentId":"INC-2026-001","name":"Éxito posterior a rociado","severity":"high","source":"Entra ID","time":iso(9),"rule":"LAB-AUTH-002"},
 {"id":"ALT-003","incidentId":"INC-2026-002","name":"Adjunto sospechoso abierto","severity":"medium","source":"Defender for Office 365","time":iso(64),"rule":"LAB-MAIL-001"},
 {"id":"ALT-004","incidentId":"INC-2026-002","name":"Office inició PowerShell","severity":"critical","source":"Defender for Endpoint","time":iso(61),"rule":"LAB-ENDPOINT-001"},
 {"id":"ALT-005","incidentId":"INC-2026-002","name":"Conexión a dominio de laboratorio","severity":"high","source":"Proxy","time":iso(58),"rule":"LAB-NET-001"},
 {"id":"ALT-006","incidentId":"INC-2026-003","name":"Volumen de salida anómalo","severity":"high","source":"Network","time":iso(132),"rule":"LAB-EXFIL-001"},
 {"id":"ALT-007","incidentId":"INC-2026-003","name":"Cuenta de servicio interactiva","severity":"medium","source":"Windows Security","time":iso(129),"rule":"LAB-AUTH-003"},
 {"id":"ALT-008","incidentId":"INC-2026-004","name":"Asignación de rol sin cambio","severity":"medium","source":"Entra Audit","time":iso(205),"rule":"LAB-IAM-001"},
 {"id":"ALT-009","incidentId":"INC-2026-005","name":"Periodicidad de red sospechosa","severity":"high","source":"Defender for Endpoint","time":iso(318),"rule":"LAB-C2-001"},
 {"id":"ALT-010","incidentId":"INC-2026-005","name":"Destino con reputación de laboratorio","severity":"medium","source":"Threat Intel","time":iso(315),"rule":"LAB-TI-001"},
 {"id":"ALT-011","incidentId":"INC-2026-006","name":"Eliminación de shadow copies","severity":"critical","source":"Defender for Endpoint","time":iso(470),"rule":"LAB-RANSOM-001"},
 {"id":"ALT-012","incidentId":"INC-2026-006","name":"Canary files modificados","severity":"critical","source":"File Integrity","time":iso(466),"rule":"LAB-RANSOM-002"},
 {"id":"ALT-013","incidentId":"INC-2026-007","name":"Impossible travel","severity":"medium","source":"Entra ID","time":iso(610),"rule":"LAB-IDENTITY-001"},
 {"id":"ALT-014","incidentId":"INC-2026-008","name":"Errores de cuenta de servicio","severity":"low","source":"Syslog","time":iso(760),"rule":"LAB-SVC-001"}
]

base_logs = [
 ("LOG-001",18,"SigninLogs","AuthenticationFailed","ana.soto@contoso-lab.example","203.0.113.44","failure","InvalidPassword"),
 ("LOG-002",17,"SigninLogs","AuthenticationFailed","diego.arias@contoso-lab.example","203.0.113.44","failure","InvalidPassword"),
 ("LOG-003",14,"SigninLogs","AuthenticationFailed","ana.soto@contoso-lab.example","203.0.113.44","failure","InvalidPassword"),
 ("LOG-004",11,"SigninLogs","AuthenticationFailed","diego.arias@contoso-lab.example","203.0.113.44","failure","InvalidPassword"),
 ("LOG-005",9,"SigninLogs","AuthenticationSuccess","ana.soto@contoso-lab.example","203.0.113.44","success","MFAChallengeSatisfied"),
 ("LOG-006",64,"EmailEvents","AttachmentOpened","lucia.mora@contoso-lab.example","192.0.2.81","success","factura_septiembre.docm"),
 ("LOG-007",62,"DeviceProcessEvents","ProcessCreated","lucia.mora@contoso-lab.example","MKT-LT-009","success","WINWORD.EXE"),
 ("LOG-008",61,"DeviceProcessEvents","ProcessCreated","lucia.mora@contoso-lab.example","MKT-LT-009","failure","powershell.exe -enc <SIMULATED>"),
 ("LOG-009",60,"DeviceNetworkEvents","ConnectionSuccess","lucia.mora@contoso-lab.example","192.0.2.81","success","lab-update.example"),
 ("LOG-010",59,"DeviceFileEvents","FileCreated","lucia.mora@contoso-lab.example","MKT-LT-009","success","update-lab.bin"),
 ("LOG-011",58,"ProxyLogs","HttpsRequest","lucia.mora@contoso-lab.example","192.0.2.81","success","/stage2"),
 ("LOG-012",132,"CommonSecurityLog","LargeUpload","svc-backup@contoso-lab.example","198.51.100.27","success","1.2GB"),
 ("LOG-013",131,"CommonSecurityLog","LargeUpload","svc-backup@contoso-lab.example","198.51.100.27","success","1.2GB"),
 ("LOG-014",130,"SigninLogs","InteractiveLogin","svc-backup@contoso-lab.example","SRV-FILE-01","success","UnexpectedLogonType"),
 ("LOG-015",128,"CommonSecurityLog","LargeUpload","svc-backup@contoso-lab.example","198.51.100.27","success","1.2GB"),
 ("LOG-016",126,"CommonSecurityLog","LargeUpload","svc-backup@contoso-lab.example","198.51.100.27","success","1.2GB"),
 ("LOG-017",205,"AuditLogs","AddMemberToRole","admin.lab@contoso-lab.example","10.40.12.88","success","Global Reader"),
 ("LOG-018",203,"AuditLogs","RoleActivated","diego.arias@contoso-lab.example","10.40.12.88","success","NoTicket"),
 ("LOG-019",190,"SigninLogs","AuthenticationSuccess","admin.lab@contoso-lab.example","10.40.12.88","success","Password+MFA"),
 ("LOG-020",318,"DeviceNetworkEvents","ConnectionSuccess","diego.arias@contoso-lab.example","192.0.2.81","success","180 bytes"),
 ("LOG-021",317,"DeviceNetworkEvents","ConnectionSuccess","diego.arias@contoso-lab.example","192.0.2.81","success","180 bytes"),
 ("LOG-022",316,"DeviceNetworkEvents","ConnectionSuccess","diego.arias@contoso-lab.example","192.0.2.81","success","180 bytes"),
 ("LOG-023",315,"DeviceProcessEvents","ProcessCreated","diego.arias@contoso-lab.example","OPS-WS-022","success","telemetry-lab.exe"),
 ("LOG-024",314,"DeviceNetworkEvents","ConnectionSuccess","diego.arias@contoso-lab.example","192.0.2.81","success","180 bytes"),
 ("LOG-025",470,"DeviceProcessEvents","ProcessCreated","ana.soto@contoso-lab.example","FIN-LT-014","success","vssadmin delete shadows /all"),
 ("LOG-026",468,"DeviceFileEvents","MassRename","ana.soto@contoso-lab.example","FIN-LT-014","success","*.locked-lab"),
 ("LOG-027",466,"FileIntegrity","CanaryModified","ana.soto@contoso-lab.example","FIN-LT-014","failure","finance-canary.xlsx"),
 ("LOG-028",465,"DeviceNetworkEvents","ConnectionBlocked","ana.soto@contoso-lab.example","192.0.2.81","failure","EDR isolation"),
 ("LOG-029",610,"SigninLogs","AuthenticationSuccess","lucia.mora@contoso-lab.example","198.51.100.27","success","CorporateProxy"),
 ("LOG-030",603,"SigninLogs","AuthenticationSuccess","lucia.mora@contoso-lab.example","192.0.2.81","success","TravelAlert"),
 ("LOG-031",760,"Syslog","AuthenticationFailed","svc-backup@contoso-lab.example","10.40.8.15","failure","ExpiredSecret"),
 ("LOG-032",758,"Syslog","AuthenticationFailed","svc-backup@contoso-lab.example","10.40.8.15","failure","ExpiredSecret"),
 ("LOG-033",700,"Syslog","AuthenticationSuccess","svc-backup@contoso-lab.example","10.40.8.15","success","SecretUpdated")
]
logs=[]
for lid,mins,table,action,user,target,result,detail in base_logs:
    logs.append({"id":lid,"time":iso(mins),"table":table,"action":action,"user":user,"target":target,"result":result,"detail":detail,"simulated":True})
# Add deterministic background telemetry that is not linked to incidents.
actions=[("Heartbeat","Syslog"),("DnsQuery","DnsEvents"),("HttpsRequest","ProxyLogs"),("AuthenticationSuccess","SigninLogs")]
users=["ana.soto@contoso-lab.example","diego.arias@contoso-lab.example","lucia.mora@contoso-lab.example"]
targets=["10.40.8.15","10.40.12.88","portal-lab.example","updates-lab.example"]
for n in range(34,85):
    action,table=actions[(n-34)%len(actions)]
    logs.append({"id":f"LOG-{n:03d}","time":iso(25+(n-34)*13),"table":table,"action":action,"user":users[(n-34)%len(users)],"target":targets[(n-34)%len(targets)],"result":"success","detail":"Background laboratory telemetry","simulated":True})

scenarios = [
 {"id":"SCN-001","title":"Password spraying con acceso exitoso","difficulty":"Inicial","duration":"15–20 min","incidentId":"INC-2026-001","objective":"Distinguir fallos aislados de un patrón distribuido y decidir cuándo escalar.","skills":["Triage","Identidad","KQL básico"],"steps":[{"title":"Alerta inicial","inject":"Se detectan fallos desde 203.0.113.44 contra dos cuentas."},{"title":"Nueva evidencia","inject":"ana.soto registra un acceso exitoso desde la misma IP."},{"title":"Decisión","inject":"La usuaria no reconoce el acceso simulado."}],"checklist":["Correlacioné usuario, IP y tiempo","Identifiqué el éxito posterior","Propuse revocar sesión","Escalé con evidencia"],"answer":"Verdadero positivo simulado; contener la cuenta y escalar a L2."},
 {"id":"SCN-002","title":"Phishing con PowerShell","difficulty":"Intermedio","duration":"20–25 min","incidentId":"INC-2026-002","objective":"Reconstruir la cadena correo → proceso → red sin ejecutar artefactos.","skills":["Endpoint","Correo","Árbol de procesos"],"steps":[{"title":"Correo","inject":"Un documento con macros fue abierto."},{"title":"Endpoint","inject":"WINWORD.EXE inicia PowerShell ofuscado."},{"title":"Red","inject":"El host contacta lab-update.example."}],"checklist":["Identifiqué el proceso padre","Relacioné el dominio","Recomendé aislamiento","Evitó ejecutar el archivo"],"answer":"Alta confianza; aislar el endpoint simulado y preservar evidencia."},
 {"id":"SCN-003","title":"Posible exfiltración web","difficulty":"Intermedio","duration":"20 min","incidentId":"INC-2026-003","objective":"Validar una anomalía de volumen y separar respaldo legítimo de exfiltración.","skills":["Red","Línea base","Cuenta de servicio"],"steps":[{"title":"Volumen","inject":"4.8 GB salieron en cuatro bloques."},{"title":"Identidad","inject":"La cuenta de respaldo tuvo un inicio interactivo."},{"title":"Contexto","inject":"No hay cambio aprobado en el laboratorio."}],"checklist":["Sumé el volumen total","Revisé el tipo de inicio","Busqué cambio autorizado","Preservé logs de red"],"answer":"Sospechoso; restringir salida y escalar hasta confirmar la operación."},
 {"id":"SCN-004","title":"Asignación privilegiada no documentada","difficulty":"Inicial","duration":"15 min","incidentId":"INC-2026-004","objective":"Verificar autorización antes de retirar privilegios.","skills":["Entra ID","PIM","Documentación"],"steps":[{"title":"Auditoría","inject":"admin.lab asigna Global Reader."},{"title":"Gobernanza","inject":"No existe ticket asociado."},{"title":"Validación","inject":"El propietario del rol no reconoce la solicitud."}],"checklist":["Verifiqué actor y objetivo","Busqué aprobación","Propuse retirar el rol","Documenté la decisión"],"answer":"Cambio no autorizado simulado; revertir y revisar la sesión del actor."},
 {"id":"SCN-005","title":"Beacon HTTPS periódico","difficulty":"Avanzado","duration":"25 min","incidentId":"INC-2026-005","objective":"Reconocer periodicidad y evitar confundir telemetría legítima con C2.","skills":["Red","Endpoint","Hipótesis"],"steps":[{"title":"Patrón","inject":"Conexiones cada 60 segundos de igual tamaño."},{"title":"Proceso","inject":"telemetry-lab.exe origina las conexiones."},{"title":"Contexto","inject":"El binario no está en la lista permitida del laboratorio."}],"checklist":["Medí periodicidad","Identifiqué proceso","Contrasté lista permitida","Propuse aislamiento"],"answer":"Beaconing sospechoso; aislar y escalar para análisis del binario."},
 {"id":"SCN-006","title":"Ransomware: inhibición de recuperación","difficulty":"Avanzado","duration":"25–30 min","incidentId":"INC-2026-006","objective":"Priorizar contención y preservación frente a acciones destructivas.","skills":["Impacto","Endpoint","Respuesta"],"steps":[{"title":"Comando","inject":"Se ejecuta vssadmin delete shadows."},{"title":"Impacto","inject":"Archivos señuelo reciben extensión .locked-lab."},{"title":"Contención","inject":"EDR bloquea la conexión y aísla el host."}],"checklist":["Reconocí T1490","Mantuve aislamiento","Preservé evidencia","Evité restauración prematura"],"answer":"Ransomware simulado contenido; preservar y restaurar solo desde respaldo validado."}
]

playbooks = [
 {"id":"PB-001","title":"Cuenta posiblemente comprometida","trigger":"Éxito posterior a múltiples fallos","steps":["Validar identidad, IP, tiempo y MFA","Confirmar actividad con la persona","Revocar sesiones si no se reconoce","Forzar cambio de credenciales según política","Escalar con consultas y evidencias"],"owner":"SOC L1 → L2"},
 {"id":"PB-002","title":"Phishing con ejecución","trigger":"Office inicia script o binario","steps":["Aislar el dispositivo en la simulación","Recolectar árbol de procesos","Buscar hash, dominio y remitente","Bloquear indicadores simulados","Escalar para análisis forense"],"owner":"SOC L1 → L2"},
 {"id":"PB-003","title":"Exfiltración sospechosa","trigger":"Volumen de salida fuera de línea base","steps":["Cuantificar volumen y destino","Validar cambio autorizado","Restringir salida de forma reversible","Preservar proxy y red","Escalar a respuesta a incidentes"],"owner":"SOC L2"},
 {"id":"PB-004","title":"Abuso de privilegios","trigger":"Rol asignado sin aprobación","steps":["Identificar actor, objetivo y rol","Validar PIM y ticket","Retirar privilegio si no está autorizado","Revisar sesión y cambios relacionados","Documentar y notificar"],"owner":"IAM + SOC"},
 {"id":"PB-005","title":"Ransomware en endpoint","trigger":"Inhibición de recuperación o cifrado masivo","steps":["Aislar sin apagar","Preservar memoria y artefactos","Buscar alcance lateral","Activar continuidad","Restaurar desde respaldo validado"],"owner":"IR / SOC L2"}
]

learning = [
 {"id":"MOD-001","title":"Fundamentos de un SOC L1","minutes":20,"topics":["Triage","Severidad","Verdadero/falso positivo","Escalamiento"],"exercise":"Explica en una línea qué evidencia cambia la prioridad de un incidente."},
 {"id":"MOD-002","title":"Identidad y Zero Trust","minutes":25,"topics":["Autenticación vs autorización","MFA","Conditional Access","PIM"],"exercise":"Investiga INC-2026-001 y lista usuario, IP, tiempo y resultado."},
 {"id":"MOD-003","title":"Logs y salud de plataforma","minutes":20,"topics":["Conectores","Ingesta","Heartbeat","Picos anómalos"],"exercise":"Localiza el conector degradado y describe qué reportaría un L1."},
 {"id":"MOD-004","title":"KQL esencial","minutes":30,"topics":["where","project","summarize","sort"],"exercise":"Ejecuta una consulta de fallos de autenticación en el laboratorio."},
 {"id":"MOD-005","title":"Microsoft Security stack","minutes":30,"topics":["Sentinel","Defender XDR","Entra ID","Purview"],"exercise":"Asocia cada alerta con su fuente de telemetría."},
 {"id":"MOD-006","title":"Documentación de incidentes","minutes":20,"topics":["Hipótesis","Evidencia","Acciones","Cierre"],"exercise":"Exporta un incidente y verifica que no contenga datos reales."}
]

connectors = [
 {"id":"CON-001","name":"Microsoft Entra ID (simulado)","status":"healthy","lastEvent":iso(9),"events24h":1284},
 {"id":"CON-002","name":"Defender for Endpoint (simulado)","status":"healthy","lastEvent":iso(23),"events24h":842},
 {"id":"CON-003","name":"Syslog Linux (simulado)","status":"degraded","lastEvent":iso(185),"events24h":93},
 {"id":"CON-004","name":"Proxy / Network (simulado)","status":"healthy","lastEvent":iso(25),"events24h":2108},
 {"id":"CON-005","name":"Defender for Office 365 (simulado)","status":"healthy","lastEvent":iso(64),"events24h":412}
]

kql_examples = [
 {"name":"Fallos de autenticación (1 h)","query":"SigninLogs\n| where TimeGenerated > ago(1h)\n| where Result == \"failure\"\n| project TimeGenerated, User, IPAddress, Detail"},
 {"name":"Eventos Syslog recientes","query":"Syslog\n| top 100 by TimeGenerated desc"},
 {"name":"Conteo por tabla","query":"search *\n| summarize Count=count() by Table\n| sort by Count desc"},
 {"name":"Actividad de una IP","query":"search *\n| where Target == \"203.0.113.44\"\n| sort by TimeGenerated desc"}
]

data = {
 "meta":{"name":"Mini SOC Educativo con IA","version":"1.0.0","generatedAt":BASE_TIME.isoformat().replace('+00:00','Z'),"seed":SEED,"classification":"SIMULACIÓN EDUCATIVA — DATOS 100% FICTICIOS","organization":"Contoso Lab (organización ficticia)","notice":"No conecta con Microsoft Sentinel, Defender, Entra ID ni ningún sistema real. La IA es una simulación local basada en reglas."},
 "entities":entities,"incidents":incidents,"alerts":alerts,"logs":logs,"scenarios":scenarios,"playbooks":playbooks,"learning":learning,"connectors":connectors,"kqlExamples":kql_examples
}
out = Path(__file__).resolve().parents[1] / 'src' / 'data.js'
out.write_text('(function(root){\n  const data = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n  root.MINI_SOC_DATA = data;\n  if (typeof module !== "undefined" && module.exports) module.exports = data;\n})(typeof window !== "undefined" ? window : globalThis);\n',encoding='utf-8')
print(f'Generated {out} with {len(incidents)} incidents, {len(alerts)} alerts, {len(logs)} logs.')
