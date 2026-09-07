(function(root){
  const data = {
  "meta": {
    "name": "Mini SOC Educativo con IA",
    "version": "1.0.0",
    "generatedAt": "2026-09-07T14:30:00Z",
    "seed": 260907,
    "classification": "SIMULACIÓN EDUCATIVA — DATOS 100% FICTICIOS",
    "organization": "Contoso Lab (organización ficticia)",
    "notice": "No conecta con Microsoft Sentinel, Defender, Entra ID ni ningún sistema real. La IA es una simulación local basada en reglas."
  },
  "entities": [
    {
      "id": "USR-001",
      "type": "user",
      "name": "ana.soto@contoso-lab.example",
      "risk": "high",
      "department": "Finanzas"
    },
    {
      "id": "USR-002",
      "type": "user",
      "name": "diego.arias@contoso-lab.example",
      "risk": "medium",
      "department": "Operaciones"
    },
    {
      "id": "USR-003",
      "type": "user",
      "name": "svc-backup@contoso-lab.example",
      "risk": "high",
      "department": "TI"
    },
    {
      "id": "USR-004",
      "type": "user",
      "name": "lucia.mora@contoso-lab.example",
      "risk": "low",
      "department": "Ventas"
    },
    {
      "id": "USR-005",
      "type": "user",
      "name": "admin.lab@contoso-lab.example",
      "risk": "high",
      "department": "TI"
    },
    {
      "id": "DEV-001",
      "type": "device",
      "name": "FIN-LT-014",
      "risk": "high",
      "os": "Windows 11"
    },
    {
      "id": "DEV-002",
      "type": "device",
      "name": "OPS-WS-022",
      "risk": "medium",
      "os": "Windows 11"
    },
    {
      "id": "DEV-003",
      "type": "device",
      "name": "SRV-FILE-01",
      "risk": "high",
      "os": "Windows Server 2022"
    },
    {
      "id": "DEV-004",
      "type": "device",
      "name": "MKT-LT-009",
      "risk": "low",
      "os": "macOS 15"
    },
    {
      "id": "DEV-005",
      "type": "device",
      "name": "SRV-BACKUP-01",
      "risk": "medium",
      "os": "Ubuntu 24.04"
    },
    {
      "id": "IP-001",
      "type": "ip",
      "name": "203.0.113.44",
      "risk": "high",
      "geo": "București, RO",
      "classification": "TEST-NET-3"
    },
    {
      "id": "IP-002",
      "type": "ip",
      "name": "198.51.100.27",
      "risk": "medium",
      "geo": "Toronto, CA",
      "classification": "TEST-NET-2"
    },
    {
      "id": "IP-003",
      "type": "ip",
      "name": "192.0.2.81",
      "risk": "high",
      "geo": "Madrid, ES",
      "classification": "TEST-NET-1"
    },
    {
      "id": "IP-004",
      "type": "ip",
      "name": "10.40.12.88",
      "risk": "low",
      "geo": "Red de laboratorio",
      "classification": "RFC1918"
    },
    {
      "id": "IP-005",
      "type": "ip",
      "name": "10.40.8.15",
      "risk": "low",
      "geo": "Red de laboratorio",
      "classification": "RFC1918"
    }
  ],
  "incidents": [
    {
      "id": "INC-2026-001",
      "title": "Rociado de contraseñas contra cuentas financieras",
      "severity": "high",
      "status": "new",
      "owner": "Sin asignar",
      "createdAt": "2026-09-07T14:12:00Z",
      "updatedAt": "2026-09-07T14:22:00Z",
      "confidence": 92,
      "tactic": "Credential Access",
      "techniques": [
        "T1110.003"
      ],
      "scenarioId": "SCN-001",
      "entityIds": [
        "USR-001",
        "USR-002",
        "IP-001"
      ],
      "alertIds": [
        "ALT-001",
        "ALT-002"
      ],
      "logIds": [
        "LOG-001",
        "LOG-002",
        "LOG-003",
        "LOG-004",
        "LOG-005"
      ],
      "summary": "Treinta y siete intentos fallidos distribuidos en dos cuentas, seguidos de un inicio de sesión exitoso para ana.soto desde la misma IP de laboratorio.",
      "hypothesis": "La correlación sugiere password spraying con posible compromiso de una cuenta.",
      "recommendedActions": [
        "Confirmar con la usuaria si reconoce el acceso.",
        "Revocar sesiones activas y forzar restablecimiento de credenciales si no se reconoce.",
        "Bloquear temporalmente la IP simulada en el escenario.",
        "Escalar a L2 por éxito posterior a múltiples fallos."
      ],
      "aiAssessment": "Prioridad alta: patrón distribuido, éxito posterior y cuenta del área financiera. La conclusión es simulada y requiere validación humana."
    },
    {
      "id": "INC-2026-002",
      "title": "Documento de phishing con proceso hijo anómalo",
      "severity": "critical",
      "status": "in_progress",
      "owner": "Analista L1",
      "createdAt": "2026-09-07T13:26:00Z",
      "updatedAt": "2026-09-07T14:18:00Z",
      "confidence": 96,
      "tactic": "Execution",
      "techniques": [
        "T1204.002",
        "T1059.001"
      ],
      "scenarioId": "SCN-002",
      "entityIds": [
        "USR-004",
        "DEV-004",
        "IP-003"
      ],
      "alertIds": [
        "ALT-003",
        "ALT-004",
        "ALT-005"
      ],
      "logIds": [
        "LOG-006",
        "LOG-007",
        "LOG-008",
        "LOG-009",
        "LOG-010",
        "LOG-011"
      ],
      "summary": "Un adjunto de correo simulado abrió un proceso de Office que inició PowerShell ofuscado y contactó un dominio de laboratorio.",
      "hypothesis": "Ejecución iniciada por usuario con comportamiento compatible con phishing y descarga de payload.",
      "recommendedActions": [
        "Aislar el dispositivo simulado.",
        "Recolectar árbol de procesos y artefactos del archivo.",
        "Buscar el hash y dominio en el resto del entorno simulado.",
        "Escalar inmediatamente a L2."
      ],
      "aiAssessment": "Prioridad crítica por cadena de ejecución completa. El modelo local simulado no reemplaza el análisis forense."
    },
    {
      "id": "INC-2026-003",
      "title": "Transferencia inusual desde servidor de archivos",
      "severity": "high",
      "status": "in_progress",
      "owner": "Analista L2",
      "createdAt": "2026-09-07T12:18:00Z",
      "updatedAt": "2026-09-07T14:04:00Z",
      "confidence": 88,
      "tactic": "Exfiltration",
      "techniques": [
        "T1048.003"
      ],
      "scenarioId": "SCN-003",
      "entityIds": [
        "DEV-003",
        "USR-003",
        "IP-002"
      ],
      "alertIds": [
        "ALT-006",
        "ALT-007"
      ],
      "logIds": [
        "LOG-012",
        "LOG-013",
        "LOG-014",
        "LOG-015",
        "LOG-016"
      ],
      "summary": "El servidor de archivos transfirió 4.8 GB a un destino externo de laboratorio fuera de su línea base.",
      "hypothesis": "Posible exfiltración sobre canal web por una cuenta de servicio usada fuera de patrón.",
      "recommendedActions": [
        "Validar cambio o respaldo autorizado.",
        "Restringir temporalmente la salida del host.",
        "Revisar autenticaciones de svc-backup.",
        "Conservar evidencia de red y proxy."
      ],
      "aiAssessment": "La desviación de volumen es fuerte, pero puede existir una explicación operativa. Confirmar con el propietario del servicio."
    },
    {
      "id": "INC-2026-004",
      "title": "Creación de rol privilegiado fuera de ventana",
      "severity": "medium",
      "status": "new",
      "owner": "Sin asignar",
      "createdAt": "2026-09-07T11:05:00Z",
      "updatedAt": "2026-09-07T11:20:00Z",
      "confidence": 81,
      "tactic": "Privilege Escalation",
      "techniques": [
        "T1098"
      ],
      "scenarioId": "SCN-004",
      "entityIds": [
        "USR-005",
        "USR-002",
        "IP-004"
      ],
      "alertIds": [
        "ALT-008"
      ],
      "logIds": [
        "LOG-017",
        "LOG-018",
        "LOG-019"
      ],
      "summary": "Se asignó un rol administrativo a diego.arias fuera de la ventana de mantenimiento y sin referencia de cambio simulada.",
      "hypothesis": "Posible abuso de privilegios o cambio administrativo no documentado.",
      "recommendedActions": [
        "Confirmar aprobación con el propietario del rol.",
        "Revisar la sesión de admin.lab.",
        "Retirar el rol si no existe justificación.",
        "Documentar la decisión y evidencia."
      ],
      "aiAssessment": "Prioridad media hasta validar autorización. La ausencia de ticket aumenta el riesgo, pero no prueba actividad maliciosa."
    },
    {
      "id": "INC-2026-005",
      "title": "Beacon periódico desde estación de operaciones",
      "severity": "high",
      "status": "new",
      "owner": "Sin asignar",
      "createdAt": "2026-09-07T09:12:00Z",
      "updatedAt": "2026-09-07T09:30:00Z",
      "confidence": 90,
      "tactic": "Command and Control",
      "techniques": [
        "T1071.001"
      ],
      "scenarioId": "SCN-005",
      "entityIds": [
        "DEV-002",
        "USR-002",
        "IP-003"
      ],
      "alertIds": [
        "ALT-009",
        "ALT-010"
      ],
      "logIds": [
        "LOG-020",
        "LOG-021",
        "LOG-022",
        "LOG-023",
        "LOG-024"
      ],
      "summary": "OPS-WS-022 realizó conexiones HTTPS de 180 bytes cada 60 segundos a un host de laboratorio.",
      "hypothesis": "Patrón compatible con beaconing de comando y control.",
      "recommendedActions": [
        "Aislar el endpoint simulado.",
        "Capturar proceso originador y conexiones.",
        "Buscar el destino en todos los logs.",
        "Escalar para análisis de malware."
      ],
      "aiAssessment": "Alta regularidad temporal y tamaño estable. Verificar procesos de monitoreo legítimos antes de concluir."
    },
    {
      "id": "INC-2026-006",
      "title": "Eliminación masiva de copias de sombra",
      "severity": "critical",
      "status": "resolved",
      "owner": "Analista L2",
      "createdAt": "2026-09-07T06:40:00Z",
      "updatedAt": "2026-09-07T08:30:00Z",
      "confidence": 98,
      "tactic": "Impact",
      "techniques": [
        "T1490"
      ],
      "scenarioId": "SCN-006",
      "entityIds": [
        "DEV-001",
        "USR-001"
      ],
      "alertIds": [
        "ALT-011",
        "ALT-012"
      ],
      "logIds": [
        "LOG-025",
        "LOG-026",
        "LOG-027",
        "LOG-028"
      ],
      "summary": "Se detectó vssadmin delete shadows seguido por cifrado de archivos señuelo en FIN-LT-014.",
      "hypothesis": "Simulación de ransomware con inhibición de recuperación.",
      "recommendedActions": [
        "Mantener el dispositivo aislado.",
        "Preservar memoria y artefactos.",
        "Restaurar únicamente desde respaldo validado.",
        "Completar retrospectiva del incidente."
      ],
      "aiAssessment": "Cadena de impacto de alta confianza. El escenario ya fue contenido dentro de la simulación."
    },
    {
      "id": "INC-2026-007",
      "title": "Inicio de sesión imposible entre regiones",
      "severity": "medium",
      "status": "closed_fp",
      "owner": "Analista L1",
      "createdAt": "2026-09-07T04:20:00Z",
      "updatedAt": "2026-09-07T05:50:00Z",
      "confidence": 58,
      "tactic": "Initial Access",
      "techniques": [
        "T1078"
      ],
      "scenarioId": null,
      "entityIds": [
        "USR-004",
        "IP-002",
        "IP-003"
      ],
      "alertIds": [
        "ALT-013"
      ],
      "logIds": [
        "LOG-029",
        "LOG-030"
      ],
      "summary": "Dos accesos geográficamente distantes ocurrieron en siete minutos; uno correspondía a un proxy corporativo de laboratorio.",
      "hypothesis": "Falso positivo por salida de proxy conocida.",
      "recommendedActions": [
        "Mantener la IP en lista de infraestructura validada.",
        "Documentar el criterio de cierre."
      ],
      "aiAssessment": "La hipótesis de falso positivo está respaldada por la clasificación del proxy simulada."
    },
    {
      "id": "INC-2026-008",
      "title": "Pico de errores de autenticación del servicio de respaldo",
      "severity": "low",
      "status": "resolved",
      "owner": "Analista L1",
      "createdAt": "2026-09-07T01:50:00Z",
      "updatedAt": "2026-09-07T02:50:00Z",
      "confidence": 74,
      "tactic": "Credential Access",
      "techniques": [
        "T1110"
      ],
      "scenarioId": null,
      "entityIds": [
        "USR-003",
        "DEV-005",
        "IP-005"
      ],
      "alertIds": [
        "ALT-014"
      ],
      "logIds": [
        "LOG-031",
        "LOG-032",
        "LOG-033"
      ],
      "summary": "Un cambio de contraseña no sincronizado generó errores repetidos en el servicio de respaldo.",
      "hypothesis": "Error operativo confirmado, sin evidencia de ataque.",
      "recommendedActions": [
        "Actualizar la credencial del servicio en el almacén simulado.",
        "Verificar recuperación del conector."
      ],
      "aiAssessment": "Bajo riesgo tras confirmación operativa. Mantener monitoreo por recurrencia."
    }
  ],
  "alerts": [
    {
      "id": "ALT-001",
      "incidentId": "INC-2026-001",
      "name": "Múltiples fallos distribuidos",
      "severity": "high",
      "source": "Entra ID",
      "time": "2026-09-07T14:12:00Z",
      "rule": "LAB-AUTH-001"
    },
    {
      "id": "ALT-002",
      "incidentId": "INC-2026-001",
      "name": "Éxito posterior a rociado",
      "severity": "high",
      "source": "Entra ID",
      "time": "2026-09-07T14:21:00Z",
      "rule": "LAB-AUTH-002"
    },
    {
      "id": "ALT-003",
      "incidentId": "INC-2026-002",
      "name": "Adjunto sospechoso abierto",
      "severity": "medium",
      "source": "Defender for Office 365",
      "time": "2026-09-07T13:26:00Z",
      "rule": "LAB-MAIL-001"
    },
    {
      "id": "ALT-004",
      "incidentId": "INC-2026-002",
      "name": "Office inició PowerShell",
      "severity": "critical",
      "source": "Defender for Endpoint",
      "time": "2026-09-07T13:29:00Z",
      "rule": "LAB-ENDPOINT-001"
    },
    {
      "id": "ALT-005",
      "incidentId": "INC-2026-002",
      "name": "Conexión a dominio de laboratorio",
      "severity": "high",
      "source": "Proxy",
      "time": "2026-09-07T13:32:00Z",
      "rule": "LAB-NET-001"
    },
    {
      "id": "ALT-006",
      "incidentId": "INC-2026-003",
      "name": "Volumen de salida anómalo",
      "severity": "high",
      "source": "Network",
      "time": "2026-09-07T12:18:00Z",
      "rule": "LAB-EXFIL-001"
    },
    {
      "id": "ALT-007",
      "incidentId": "INC-2026-003",
      "name": "Cuenta de servicio interactiva",
      "severity": "medium",
      "source": "Windows Security",
      "time": "2026-09-07T12:21:00Z",
      "rule": "LAB-AUTH-003"
    },
    {
      "id": "ALT-008",
      "incidentId": "INC-2026-004",
      "name": "Asignación de rol sin cambio",
      "severity": "medium",
      "source": "Entra Audit",
      "time": "2026-09-07T11:05:00Z",
      "rule": "LAB-IAM-001"
    },
    {
      "id": "ALT-009",
      "incidentId": "INC-2026-005",
      "name": "Periodicidad de red sospechosa",
      "severity": "high",
      "source": "Defender for Endpoint",
      "time": "2026-09-07T09:12:00Z",
      "rule": "LAB-C2-001"
    },
    {
      "id": "ALT-010",
      "incidentId": "INC-2026-005",
      "name": "Destino con reputación de laboratorio",
      "severity": "medium",
      "source": "Threat Intel",
      "time": "2026-09-07T09:15:00Z",
      "rule": "LAB-TI-001"
    },
    {
      "id": "ALT-011",
      "incidentId": "INC-2026-006",
      "name": "Eliminación de shadow copies",
      "severity": "critical",
      "source": "Defender for Endpoint",
      "time": "2026-09-07T06:40:00Z",
      "rule": "LAB-RANSOM-001"
    },
    {
      "id": "ALT-012",
      "incidentId": "INC-2026-006",
      "name": "Canary files modificados",
      "severity": "critical",
      "source": "File Integrity",
      "time": "2026-09-07T06:44:00Z",
      "rule": "LAB-RANSOM-002"
    },
    {
      "id": "ALT-013",
      "incidentId": "INC-2026-007",
      "name": "Impossible travel",
      "severity": "medium",
      "source": "Entra ID",
      "time": "2026-09-07T04:20:00Z",
      "rule": "LAB-IDENTITY-001"
    },
    {
      "id": "ALT-014",
      "incidentId": "INC-2026-008",
      "name": "Errores de cuenta de servicio",
      "severity": "low",
      "source": "Syslog",
      "time": "2026-09-07T01:50:00Z",
      "rule": "LAB-SVC-001"
    }
  ],
  "logs": [
    {
      "id": "LOG-001",
      "time": "2026-09-07T14:12:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationFailed",
      "user": "ana.soto@contoso-lab.example",
      "target": "203.0.113.44",
      "result": "failure",
      "detail": "InvalidPassword",
      "simulated": true
    },
    {
      "id": "LOG-002",
      "time": "2026-09-07T14:13:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationFailed",
      "user": "diego.arias@contoso-lab.example",
      "target": "203.0.113.44",
      "result": "failure",
      "detail": "InvalidPassword",
      "simulated": true
    },
    {
      "id": "LOG-003",
      "time": "2026-09-07T14:16:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationFailed",
      "user": "ana.soto@contoso-lab.example",
      "target": "203.0.113.44",
      "result": "failure",
      "detail": "InvalidPassword",
      "simulated": true
    },
    {
      "id": "LOG-004",
      "time": "2026-09-07T14:19:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationFailed",
      "user": "diego.arias@contoso-lab.example",
      "target": "203.0.113.44",
      "result": "failure",
      "detail": "InvalidPassword",
      "simulated": true
    },
    {
      "id": "LOG-005",
      "time": "2026-09-07T14:21:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationSuccess",
      "user": "ana.soto@contoso-lab.example",
      "target": "203.0.113.44",
      "result": "success",
      "detail": "MFAChallengeSatisfied",
      "simulated": true
    },
    {
      "id": "LOG-006",
      "time": "2026-09-07T13:26:00Z",
      "table": "EmailEvents",
      "action": "AttachmentOpened",
      "user": "lucia.mora@contoso-lab.example",
      "target": "192.0.2.81",
      "result": "success",
      "detail": "factura_septiembre.docm",
      "simulated": true
    },
    {
      "id": "LOG-007",
      "time": "2026-09-07T13:28:00Z",
      "table": "DeviceProcessEvents",
      "action": "ProcessCreated",
      "user": "lucia.mora@contoso-lab.example",
      "target": "MKT-LT-009",
      "result": "success",
      "detail": "WINWORD.EXE",
      "simulated": true
    },
    {
      "id": "LOG-008",
      "time": "2026-09-07T13:29:00Z",
      "table": "DeviceProcessEvents",
      "action": "ProcessCreated",
      "user": "lucia.mora@contoso-lab.example",
      "target": "MKT-LT-009",
      "result": "failure",
      "detail": "powershell.exe -enc <SIMULATED>",
      "simulated": true
    },
    {
      "id": "LOG-009",
      "time": "2026-09-07T13:30:00Z",
      "table": "DeviceNetworkEvents",
      "action": "ConnectionSuccess",
      "user": "lucia.mora@contoso-lab.example",
      "target": "192.0.2.81",
      "result": "success",
      "detail": "lab-update.example",
      "simulated": true
    },
    {
      "id": "LOG-010",
      "time": "2026-09-07T13:31:00Z",
      "table": "DeviceFileEvents",
      "action": "FileCreated",
      "user": "lucia.mora@contoso-lab.example",
      "target": "MKT-LT-009",
      "result": "success",
      "detail": "update-lab.bin",
      "simulated": true
    },
    {
      "id": "LOG-011",
      "time": "2026-09-07T13:32:00Z",
      "table": "ProxyLogs",
      "action": "HttpsRequest",
      "user": "lucia.mora@contoso-lab.example",
      "target": "192.0.2.81",
      "result": "success",
      "detail": "/stage2",
      "simulated": true
    },
    {
      "id": "LOG-012",
      "time": "2026-09-07T12:18:00Z",
      "table": "CommonSecurityLog",
      "action": "LargeUpload",
      "user": "svc-backup@contoso-lab.example",
      "target": "198.51.100.27",
      "result": "success",
      "detail": "1.2GB",
      "simulated": true
    },
    {
      "id": "LOG-013",
      "time": "2026-09-07T12:19:00Z",
      "table": "CommonSecurityLog",
      "action": "LargeUpload",
      "user": "svc-backup@contoso-lab.example",
      "target": "198.51.100.27",
      "result": "success",
      "detail": "1.2GB",
      "simulated": true
    },
    {
      "id": "LOG-014",
      "time": "2026-09-07T12:20:00Z",
      "table": "SigninLogs",
      "action": "InteractiveLogin",
      "user": "svc-backup@contoso-lab.example",
      "target": "SRV-FILE-01",
      "result": "success",
      "detail": "UnexpectedLogonType",
      "simulated": true
    },
    {
      "id": "LOG-015",
      "time": "2026-09-07T12:22:00Z",
      "table": "CommonSecurityLog",
      "action": "LargeUpload",
      "user": "svc-backup@contoso-lab.example",
      "target": "198.51.100.27",
      "result": "success",
      "detail": "1.2GB",
      "simulated": true
    },
    {
      "id": "LOG-016",
      "time": "2026-09-07T12:24:00Z",
      "table": "CommonSecurityLog",
      "action": "LargeUpload",
      "user": "svc-backup@contoso-lab.example",
      "target": "198.51.100.27",
      "result": "success",
      "detail": "1.2GB",
      "simulated": true
    },
    {
      "id": "LOG-017",
      "time": "2026-09-07T11:05:00Z",
      "table": "AuditLogs",
      "action": "AddMemberToRole",
      "user": "admin.lab@contoso-lab.example",
      "target": "10.40.12.88",
      "result": "success",
      "detail": "Global Reader",
      "simulated": true
    },
    {
      "id": "LOG-018",
      "time": "2026-09-07T11:07:00Z",
      "table": "AuditLogs",
      "action": "RoleActivated",
      "user": "diego.arias@contoso-lab.example",
      "target": "10.40.12.88",
      "result": "success",
      "detail": "NoTicket",
      "simulated": true
    },
    {
      "id": "LOG-019",
      "time": "2026-09-07T11:20:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationSuccess",
      "user": "admin.lab@contoso-lab.example",
      "target": "10.40.12.88",
      "result": "success",
      "detail": "Password+MFA",
      "simulated": true
    },
    {
      "id": "LOG-020",
      "time": "2026-09-07T09:12:00Z",
      "table": "DeviceNetworkEvents",
      "action": "ConnectionSuccess",
      "user": "diego.arias@contoso-lab.example",
      "target": "192.0.2.81",
      "result": "success",
      "detail": "180 bytes",
      "simulated": true
    },
    {
      "id": "LOG-021",
      "time": "2026-09-07T09:13:00Z",
      "table": "DeviceNetworkEvents",
      "action": "ConnectionSuccess",
      "user": "diego.arias@contoso-lab.example",
      "target": "192.0.2.81",
      "result": "success",
      "detail": "180 bytes",
      "simulated": true
    },
    {
      "id": "LOG-022",
      "time": "2026-09-07T09:14:00Z",
      "table": "DeviceNetworkEvents",
      "action": "ConnectionSuccess",
      "user": "diego.arias@contoso-lab.example",
      "target": "192.0.2.81",
      "result": "success",
      "detail": "180 bytes",
      "simulated": true
    },
    {
      "id": "LOG-023",
      "time": "2026-09-07T09:15:00Z",
      "table": "DeviceProcessEvents",
      "action": "ProcessCreated",
      "user": "diego.arias@contoso-lab.example",
      "target": "OPS-WS-022",
      "result": "success",
      "detail": "telemetry-lab.exe",
      "simulated": true
    },
    {
      "id": "LOG-024",
      "time": "2026-09-07T09:16:00Z",
      "table": "DeviceNetworkEvents",
      "action": "ConnectionSuccess",
      "user": "diego.arias@contoso-lab.example",
      "target": "192.0.2.81",
      "result": "success",
      "detail": "180 bytes",
      "simulated": true
    },
    {
      "id": "LOG-025",
      "time": "2026-09-07T06:40:00Z",
      "table": "DeviceProcessEvents",
      "action": "ProcessCreated",
      "user": "ana.soto@contoso-lab.example",
      "target": "FIN-LT-014",
      "result": "success",
      "detail": "vssadmin delete shadows /all",
      "simulated": true
    },
    {
      "id": "LOG-026",
      "time": "2026-09-07T06:42:00Z",
      "table": "DeviceFileEvents",
      "action": "MassRename",
      "user": "ana.soto@contoso-lab.example",
      "target": "FIN-LT-014",
      "result": "success",
      "detail": "*.locked-lab",
      "simulated": true
    },
    {
      "id": "LOG-027",
      "time": "2026-09-07T06:44:00Z",
      "table": "FileIntegrity",
      "action": "CanaryModified",
      "user": "ana.soto@contoso-lab.example",
      "target": "FIN-LT-014",
      "result": "failure",
      "detail": "finance-canary.xlsx",
      "simulated": true
    },
    {
      "id": "LOG-028",
      "time": "2026-09-07T06:45:00Z",
      "table": "DeviceNetworkEvents",
      "action": "ConnectionBlocked",
      "user": "ana.soto@contoso-lab.example",
      "target": "192.0.2.81",
      "result": "failure",
      "detail": "EDR isolation",
      "simulated": true
    },
    {
      "id": "LOG-029",
      "time": "2026-09-07T04:20:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationSuccess",
      "user": "lucia.mora@contoso-lab.example",
      "target": "198.51.100.27",
      "result": "success",
      "detail": "CorporateProxy",
      "simulated": true
    },
    {
      "id": "LOG-030",
      "time": "2026-09-07T04:27:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationSuccess",
      "user": "lucia.mora@contoso-lab.example",
      "target": "192.0.2.81",
      "result": "success",
      "detail": "TravelAlert",
      "simulated": true
    },
    {
      "id": "LOG-031",
      "time": "2026-09-07T01:50:00Z",
      "table": "Syslog",
      "action": "AuthenticationFailed",
      "user": "svc-backup@contoso-lab.example",
      "target": "10.40.8.15",
      "result": "failure",
      "detail": "ExpiredSecret",
      "simulated": true
    },
    {
      "id": "LOG-032",
      "time": "2026-09-07T01:52:00Z",
      "table": "Syslog",
      "action": "AuthenticationFailed",
      "user": "svc-backup@contoso-lab.example",
      "target": "10.40.8.15",
      "result": "failure",
      "detail": "ExpiredSecret",
      "simulated": true
    },
    {
      "id": "LOG-033",
      "time": "2026-09-07T02:50:00Z",
      "table": "Syslog",
      "action": "AuthenticationSuccess",
      "user": "svc-backup@contoso-lab.example",
      "target": "10.40.8.15",
      "result": "success",
      "detail": "SecretUpdated",
      "simulated": true
    },
    {
      "id": "LOG-034",
      "time": "2026-09-07T14:05:00Z",
      "table": "Syslog",
      "action": "Heartbeat",
      "user": "ana.soto@contoso-lab.example",
      "target": "10.40.8.15",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-035",
      "time": "2026-09-07T13:52:00Z",
      "table": "DnsEvents",
      "action": "DnsQuery",
      "user": "diego.arias@contoso-lab.example",
      "target": "10.40.12.88",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-036",
      "time": "2026-09-07T13:39:00Z",
      "table": "ProxyLogs",
      "action": "HttpsRequest",
      "user": "lucia.mora@contoso-lab.example",
      "target": "portal-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-037",
      "time": "2026-09-07T13:26:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationSuccess",
      "user": "ana.soto@contoso-lab.example",
      "target": "updates-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-038",
      "time": "2026-09-07T13:13:00Z",
      "table": "Syslog",
      "action": "Heartbeat",
      "user": "diego.arias@contoso-lab.example",
      "target": "10.40.8.15",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-039",
      "time": "2026-09-07T13:00:00Z",
      "table": "DnsEvents",
      "action": "DnsQuery",
      "user": "lucia.mora@contoso-lab.example",
      "target": "10.40.12.88",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-040",
      "time": "2026-09-07T12:47:00Z",
      "table": "ProxyLogs",
      "action": "HttpsRequest",
      "user": "ana.soto@contoso-lab.example",
      "target": "portal-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-041",
      "time": "2026-09-07T12:34:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationSuccess",
      "user": "diego.arias@contoso-lab.example",
      "target": "updates-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-042",
      "time": "2026-09-07T12:21:00Z",
      "table": "Syslog",
      "action": "Heartbeat",
      "user": "lucia.mora@contoso-lab.example",
      "target": "10.40.8.15",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-043",
      "time": "2026-09-07T12:08:00Z",
      "table": "DnsEvents",
      "action": "DnsQuery",
      "user": "ana.soto@contoso-lab.example",
      "target": "10.40.12.88",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-044",
      "time": "2026-09-07T11:55:00Z",
      "table": "ProxyLogs",
      "action": "HttpsRequest",
      "user": "diego.arias@contoso-lab.example",
      "target": "portal-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-045",
      "time": "2026-09-07T11:42:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationSuccess",
      "user": "lucia.mora@contoso-lab.example",
      "target": "updates-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-046",
      "time": "2026-09-07T11:29:00Z",
      "table": "Syslog",
      "action": "Heartbeat",
      "user": "ana.soto@contoso-lab.example",
      "target": "10.40.8.15",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-047",
      "time": "2026-09-07T11:16:00Z",
      "table": "DnsEvents",
      "action": "DnsQuery",
      "user": "diego.arias@contoso-lab.example",
      "target": "10.40.12.88",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-048",
      "time": "2026-09-07T11:03:00Z",
      "table": "ProxyLogs",
      "action": "HttpsRequest",
      "user": "lucia.mora@contoso-lab.example",
      "target": "portal-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-049",
      "time": "2026-09-07T10:50:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationSuccess",
      "user": "ana.soto@contoso-lab.example",
      "target": "updates-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-050",
      "time": "2026-09-07T10:37:00Z",
      "table": "Syslog",
      "action": "Heartbeat",
      "user": "diego.arias@contoso-lab.example",
      "target": "10.40.8.15",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-051",
      "time": "2026-09-07T10:24:00Z",
      "table": "DnsEvents",
      "action": "DnsQuery",
      "user": "lucia.mora@contoso-lab.example",
      "target": "10.40.12.88",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-052",
      "time": "2026-09-07T10:11:00Z",
      "table": "ProxyLogs",
      "action": "HttpsRequest",
      "user": "ana.soto@contoso-lab.example",
      "target": "portal-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-053",
      "time": "2026-09-07T09:58:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationSuccess",
      "user": "diego.arias@contoso-lab.example",
      "target": "updates-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-054",
      "time": "2026-09-07T09:45:00Z",
      "table": "Syslog",
      "action": "Heartbeat",
      "user": "lucia.mora@contoso-lab.example",
      "target": "10.40.8.15",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-055",
      "time": "2026-09-07T09:32:00Z",
      "table": "DnsEvents",
      "action": "DnsQuery",
      "user": "ana.soto@contoso-lab.example",
      "target": "10.40.12.88",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-056",
      "time": "2026-09-07T09:19:00Z",
      "table": "ProxyLogs",
      "action": "HttpsRequest",
      "user": "diego.arias@contoso-lab.example",
      "target": "portal-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-057",
      "time": "2026-09-07T09:06:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationSuccess",
      "user": "lucia.mora@contoso-lab.example",
      "target": "updates-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-058",
      "time": "2026-09-07T08:53:00Z",
      "table": "Syslog",
      "action": "Heartbeat",
      "user": "ana.soto@contoso-lab.example",
      "target": "10.40.8.15",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-059",
      "time": "2026-09-07T08:40:00Z",
      "table": "DnsEvents",
      "action": "DnsQuery",
      "user": "diego.arias@contoso-lab.example",
      "target": "10.40.12.88",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-060",
      "time": "2026-09-07T08:27:00Z",
      "table": "ProxyLogs",
      "action": "HttpsRequest",
      "user": "lucia.mora@contoso-lab.example",
      "target": "portal-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-061",
      "time": "2026-09-07T08:14:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationSuccess",
      "user": "ana.soto@contoso-lab.example",
      "target": "updates-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-062",
      "time": "2026-09-07T08:01:00Z",
      "table": "Syslog",
      "action": "Heartbeat",
      "user": "diego.arias@contoso-lab.example",
      "target": "10.40.8.15",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-063",
      "time": "2026-09-07T07:48:00Z",
      "table": "DnsEvents",
      "action": "DnsQuery",
      "user": "lucia.mora@contoso-lab.example",
      "target": "10.40.12.88",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-064",
      "time": "2026-09-07T07:35:00Z",
      "table": "ProxyLogs",
      "action": "HttpsRequest",
      "user": "ana.soto@contoso-lab.example",
      "target": "portal-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-065",
      "time": "2026-09-07T07:22:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationSuccess",
      "user": "diego.arias@contoso-lab.example",
      "target": "updates-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-066",
      "time": "2026-09-07T07:09:00Z",
      "table": "Syslog",
      "action": "Heartbeat",
      "user": "lucia.mora@contoso-lab.example",
      "target": "10.40.8.15",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-067",
      "time": "2026-09-07T06:56:00Z",
      "table": "DnsEvents",
      "action": "DnsQuery",
      "user": "ana.soto@contoso-lab.example",
      "target": "10.40.12.88",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-068",
      "time": "2026-09-07T06:43:00Z",
      "table": "ProxyLogs",
      "action": "HttpsRequest",
      "user": "diego.arias@contoso-lab.example",
      "target": "portal-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-069",
      "time": "2026-09-07T06:30:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationSuccess",
      "user": "lucia.mora@contoso-lab.example",
      "target": "updates-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-070",
      "time": "2026-09-07T06:17:00Z",
      "table": "Syslog",
      "action": "Heartbeat",
      "user": "ana.soto@contoso-lab.example",
      "target": "10.40.8.15",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-071",
      "time": "2026-09-07T06:04:00Z",
      "table": "DnsEvents",
      "action": "DnsQuery",
      "user": "diego.arias@contoso-lab.example",
      "target": "10.40.12.88",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-072",
      "time": "2026-09-07T05:51:00Z",
      "table": "ProxyLogs",
      "action": "HttpsRequest",
      "user": "lucia.mora@contoso-lab.example",
      "target": "portal-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-073",
      "time": "2026-09-07T05:38:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationSuccess",
      "user": "ana.soto@contoso-lab.example",
      "target": "updates-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-074",
      "time": "2026-09-07T05:25:00Z",
      "table": "Syslog",
      "action": "Heartbeat",
      "user": "diego.arias@contoso-lab.example",
      "target": "10.40.8.15",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-075",
      "time": "2026-09-07T05:12:00Z",
      "table": "DnsEvents",
      "action": "DnsQuery",
      "user": "lucia.mora@contoso-lab.example",
      "target": "10.40.12.88",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-076",
      "time": "2026-09-07T04:59:00Z",
      "table": "ProxyLogs",
      "action": "HttpsRequest",
      "user": "ana.soto@contoso-lab.example",
      "target": "portal-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-077",
      "time": "2026-09-07T04:46:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationSuccess",
      "user": "diego.arias@contoso-lab.example",
      "target": "updates-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-078",
      "time": "2026-09-07T04:33:00Z",
      "table": "Syslog",
      "action": "Heartbeat",
      "user": "lucia.mora@contoso-lab.example",
      "target": "10.40.8.15",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-079",
      "time": "2026-09-07T04:20:00Z",
      "table": "DnsEvents",
      "action": "DnsQuery",
      "user": "ana.soto@contoso-lab.example",
      "target": "10.40.12.88",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-080",
      "time": "2026-09-07T04:07:00Z",
      "table": "ProxyLogs",
      "action": "HttpsRequest",
      "user": "diego.arias@contoso-lab.example",
      "target": "portal-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-081",
      "time": "2026-09-07T03:54:00Z",
      "table": "SigninLogs",
      "action": "AuthenticationSuccess",
      "user": "lucia.mora@contoso-lab.example",
      "target": "updates-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-082",
      "time": "2026-09-07T03:41:00Z",
      "table": "Syslog",
      "action": "Heartbeat",
      "user": "ana.soto@contoso-lab.example",
      "target": "10.40.8.15",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-083",
      "time": "2026-09-07T03:28:00Z",
      "table": "DnsEvents",
      "action": "DnsQuery",
      "user": "diego.arias@contoso-lab.example",
      "target": "10.40.12.88",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    },
    {
      "id": "LOG-084",
      "time": "2026-09-07T03:15:00Z",
      "table": "ProxyLogs",
      "action": "HttpsRequest",
      "user": "lucia.mora@contoso-lab.example",
      "target": "portal-lab.example",
      "result": "success",
      "detail": "Background laboratory telemetry",
      "simulated": true
    }
  ],
  "scenarios": [
    {
      "id": "SCN-001",
      "title": "Password spraying con acceso exitoso",
      "difficulty": "Inicial",
      "duration": "15–20 min",
      "incidentId": "INC-2026-001",
      "objective": "Distinguir fallos aislados de un patrón distribuido y decidir cuándo escalar.",
      "skills": [
        "Triage",
        "Identidad",
        "KQL básico"
      ],
      "steps": [
        {
          "title": "Alerta inicial",
          "inject": "Se detectan fallos desde 203.0.113.44 contra dos cuentas."
        },
        {
          "title": "Nueva evidencia",
          "inject": "ana.soto registra un acceso exitoso desde la misma IP."
        },
        {
          "title": "Decisión",
          "inject": "La usuaria no reconoce el acceso simulado."
        }
      ],
      "checklist": [
        "Correlacioné usuario, IP y tiempo",
        "Identifiqué el éxito posterior",
        "Propuse revocar sesión",
        "Escalé con evidencia"
      ],
      "answer": "Verdadero positivo simulado; contener la cuenta y escalar a L2."
    },
    {
      "id": "SCN-002",
      "title": "Phishing con PowerShell",
      "difficulty": "Intermedio",
      "duration": "20–25 min",
      "incidentId": "INC-2026-002",
      "objective": "Reconstruir la cadena correo → proceso → red sin ejecutar artefactos.",
      "skills": [
        "Endpoint",
        "Correo",
        "Árbol de procesos"
      ],
      "steps": [
        {
          "title": "Correo",
          "inject": "Un documento con macros fue abierto."
        },
        {
          "title": "Endpoint",
          "inject": "WINWORD.EXE inicia PowerShell ofuscado."
        },
        {
          "title": "Red",
          "inject": "El host contacta lab-update.example."
        }
      ],
      "checklist": [
        "Identifiqué el proceso padre",
        "Relacioné el dominio",
        "Recomendé aislamiento",
        "Evitó ejecutar el archivo"
      ],
      "answer": "Alta confianza; aislar el endpoint simulado y preservar evidencia."
    },
    {
      "id": "SCN-003",
      "title": "Posible exfiltración web",
      "difficulty": "Intermedio",
      "duration": "20 min",
      "incidentId": "INC-2026-003",
      "objective": "Validar una anomalía de volumen y separar respaldo legítimo de exfiltración.",
      "skills": [
        "Red",
        "Línea base",
        "Cuenta de servicio"
      ],
      "steps": [
        {
          "title": "Volumen",
          "inject": "4.8 GB salieron en cuatro bloques."
        },
        {
          "title": "Identidad",
          "inject": "La cuenta de respaldo tuvo un inicio interactivo."
        },
        {
          "title": "Contexto",
          "inject": "No hay cambio aprobado en el laboratorio."
        }
      ],
      "checklist": [
        "Sumé el volumen total",
        "Revisé el tipo de inicio",
        "Busqué cambio autorizado",
        "Preservé logs de red"
      ],
      "answer": "Sospechoso; restringir salida y escalar hasta confirmar la operación."
    },
    {
      "id": "SCN-004",
      "title": "Asignación privilegiada no documentada",
      "difficulty": "Inicial",
      "duration": "15 min",
      "incidentId": "INC-2026-004",
      "objective": "Verificar autorización antes de retirar privilegios.",
      "skills": [
        "Entra ID",
        "PIM",
        "Documentación"
      ],
      "steps": [
        {
          "title": "Auditoría",
          "inject": "admin.lab asigna Global Reader."
        },
        {
          "title": "Gobernanza",
          "inject": "No existe ticket asociado."
        },
        {
          "title": "Validación",
          "inject": "El propietario del rol no reconoce la solicitud."
        }
      ],
      "checklist": [
        "Verifiqué actor y objetivo",
        "Busqué aprobación",
        "Propuse retirar el rol",
        "Documenté la decisión"
      ],
      "answer": "Cambio no autorizado simulado; revertir y revisar la sesión del actor."
    },
    {
      "id": "SCN-005",
      "title": "Beacon HTTPS periódico",
      "difficulty": "Avanzado",
      "duration": "25 min",
      "incidentId": "INC-2026-005",
      "objective": "Reconocer periodicidad y evitar confundir telemetría legítima con C2.",
      "skills": [
        "Red",
        "Endpoint",
        "Hipótesis"
      ],
      "steps": [
        {
          "title": "Patrón",
          "inject": "Conexiones cada 60 segundos de igual tamaño."
        },
        {
          "title": "Proceso",
          "inject": "telemetry-lab.exe origina las conexiones."
        },
        {
          "title": "Contexto",
          "inject": "El binario no está en la lista permitida del laboratorio."
        }
      ],
      "checklist": [
        "Medí periodicidad",
        "Identifiqué proceso",
        "Contrasté lista permitida",
        "Propuse aislamiento"
      ],
      "answer": "Beaconing sospechoso; aislar y escalar para análisis del binario."
    },
    {
      "id": "SCN-006",
      "title": "Ransomware: inhibición de recuperación",
      "difficulty": "Avanzado",
      "duration": "25–30 min",
      "incidentId": "INC-2026-006",
      "objective": "Priorizar contención y preservación frente a acciones destructivas.",
      "skills": [
        "Impacto",
        "Endpoint",
        "Respuesta"
      ],
      "steps": [
        {
          "title": "Comando",
          "inject": "Se ejecuta vssadmin delete shadows."
        },
        {
          "title": "Impacto",
          "inject": "Archivos señuelo reciben extensión .locked-lab."
        },
        {
          "title": "Contención",
          "inject": "EDR bloquea la conexión y aísla el host."
        }
      ],
      "checklist": [
        "Reconocí T1490",
        "Mantuve aislamiento",
        "Preservé evidencia",
        "Evité restauración prematura"
      ],
      "answer": "Ransomware simulado contenido; preservar y restaurar solo desde respaldo validado."
    }
  ],
  "playbooks": [
    {
      "id": "PB-001",
      "title": "Cuenta posiblemente comprometida",
      "trigger": "Éxito posterior a múltiples fallos",
      "steps": [
        "Validar identidad, IP, tiempo y MFA",
        "Confirmar actividad con la persona",
        "Revocar sesiones si no se reconoce",
        "Forzar cambio de credenciales según política",
        "Escalar con consultas y evidencias"
      ],
      "owner": "SOC L1 → L2"
    },
    {
      "id": "PB-002",
      "title": "Phishing con ejecución",
      "trigger": "Office inicia script o binario",
      "steps": [
        "Aislar el dispositivo en la simulación",
        "Recolectar árbol de procesos",
        "Buscar hash, dominio y remitente",
        "Bloquear indicadores simulados",
        "Escalar para análisis forense"
      ],
      "owner": "SOC L1 → L2"
    },
    {
      "id": "PB-003",
      "title": "Exfiltración sospechosa",
      "trigger": "Volumen de salida fuera de línea base",
      "steps": [
        "Cuantificar volumen y destino",
        "Validar cambio autorizado",
        "Restringir salida de forma reversible",
        "Preservar proxy y red",
        "Escalar a respuesta a incidentes"
      ],
      "owner": "SOC L2"
    },
    {
      "id": "PB-004",
      "title": "Abuso de privilegios",
      "trigger": "Rol asignado sin aprobación",
      "steps": [
        "Identificar actor, objetivo y rol",
        "Validar PIM y ticket",
        "Retirar privilegio si no está autorizado",
        "Revisar sesión y cambios relacionados",
        "Documentar y notificar"
      ],
      "owner": "IAM + SOC"
    },
    {
      "id": "PB-005",
      "title": "Ransomware en endpoint",
      "trigger": "Inhibición de recuperación o cifrado masivo",
      "steps": [
        "Aislar sin apagar",
        "Preservar memoria y artefactos",
        "Buscar alcance lateral",
        "Activar continuidad",
        "Restaurar desde respaldo validado"
      ],
      "owner": "IR / SOC L2"
    }
  ],
  "learning": [
    {
      "id": "MOD-001",
      "title": "Fundamentos de un SOC L1",
      "minutes": 20,
      "topics": [
        "Triage",
        "Severidad",
        "Verdadero/falso positivo",
        "Escalamiento"
      ],
      "exercise": "Explica en una línea qué evidencia cambia la prioridad de un incidente."
    },
    {
      "id": "MOD-002",
      "title": "Identidad y Zero Trust",
      "minutes": 25,
      "topics": [
        "Autenticación vs autorización",
        "MFA",
        "Conditional Access",
        "PIM"
      ],
      "exercise": "Investiga INC-2026-001 y lista usuario, IP, tiempo y resultado."
    },
    {
      "id": "MOD-003",
      "title": "Logs y salud de plataforma",
      "minutes": 20,
      "topics": [
        "Conectores",
        "Ingesta",
        "Heartbeat",
        "Picos anómalos"
      ],
      "exercise": "Localiza el conector degradado y describe qué reportaría un L1."
    },
    {
      "id": "MOD-004",
      "title": "KQL esencial",
      "minutes": 30,
      "topics": [
        "where",
        "project",
        "summarize",
        "sort"
      ],
      "exercise": "Ejecuta una consulta de fallos de autenticación en el laboratorio."
    },
    {
      "id": "MOD-005",
      "title": "Microsoft Security stack",
      "minutes": 30,
      "topics": [
        "Sentinel",
        "Defender XDR",
        "Entra ID",
        "Purview"
      ],
      "exercise": "Asocia cada alerta con su fuente de telemetría."
    },
    {
      "id": "MOD-006",
      "title": "Documentación de incidentes",
      "minutes": 20,
      "topics": [
        "Hipótesis",
        "Evidencia",
        "Acciones",
        "Cierre"
      ],
      "exercise": "Exporta un incidente y verifica que no contenga datos reales."
    }
  ],
  "connectors": [
    {
      "id": "CON-001",
      "name": "Microsoft Entra ID (simulado)",
      "status": "healthy",
      "lastEvent": "2026-09-07T14:21:00Z",
      "events24h": 1284
    },
    {
      "id": "CON-002",
      "name": "Defender for Endpoint (simulado)",
      "status": "healthy",
      "lastEvent": "2026-09-07T14:07:00Z",
      "events24h": 842
    },
    {
      "id": "CON-003",
      "name": "Syslog Linux (simulado)",
      "status": "degraded",
      "lastEvent": "2026-09-07T11:25:00Z",
      "events24h": 93
    },
    {
      "id": "CON-004",
      "name": "Proxy / Network (simulado)",
      "status": "healthy",
      "lastEvent": "2026-09-07T14:05:00Z",
      "events24h": 2108
    },
    {
      "id": "CON-005",
      "name": "Defender for Office 365 (simulado)",
      "status": "healthy",
      "lastEvent": "2026-09-07T13:26:00Z",
      "events24h": 412
    }
  ],
  "kqlExamples": [
    {
      "name": "Fallos de autenticación (1 h)",
      "query": "SigninLogs\n| where TimeGenerated > ago(1h)\n| where Result == \"failure\"\n| project TimeGenerated, User, IPAddress, Detail"
    },
    {
      "name": "Eventos Syslog recientes",
      "query": "Syslog\n| top 100 by TimeGenerated desc"
    },
    {
      "name": "Conteo por tabla",
      "query": "search *\n| summarize Count=count() by Table\n| sort by Count desc"
    },
    {
      "name": "Actividad de una IP",
      "query": "search *\n| where Target == \"203.0.113.44\"\n| sort by TimeGenerated desc"
    }
  ]
};
  root.MINI_SOC_DATA = data;
  if (typeof module !== "undefined" && module.exports) module.exports = data;
})(typeof window !== "undefined" ? window : globalThis);
