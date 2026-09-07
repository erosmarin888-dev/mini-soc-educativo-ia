# Mini SOC Educativo con IA

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Project Type](https://img.shields.io/badge/Project-Educational%20SOC-blue)
![Data](https://img.shields.io/badge/Data-100%25%20Simulated-orange)
![License](https://img.shields.io/badge/License-MIT-green)

A functional educational Security Operations Center simulation designed to demonstrate how security events are analyzed, correlated, prioritized, and transformed into incidents.

The project provides an interactive SOC dashboard, simulated security telemetry, incident investigations, KQL examples, response playbooks, and AI-assisted triage using deterministic local rules.

> **Important:** This project uses fictional and simulated cybersecurity data. It does not monitor a real network, connect to production systems, or replace a SIEM.

## Live Demo

[Open the Mini SOC Dashboard](YOUR-GITHUB-PAGES-LINK)

## Project Preview

![Mini SOC Dashboard](docs/assets/dashboard-overview.png)

## Project Objectives

The Mini SOC was created to demonstrate practical understanding of:

- Security monitoring workflows
- Alert triage and prioritization
- Incident investigation
- Event correlation
- KQL-based threat hunting
- MITRE ATT&CK mapping
- Security playbooks
- SOC metrics and reporting
- Responsible use of AI in cybersecurity
- Separation between simulated data and real telemetry

## SOC Workflow

```text
Devices
   ↓
Security Events
   ↓
Analysis and Correlation
   ↓
Security Alerts
   ↓
Incidents
   ↓
Investigation
   ↓
Analyst Response
```

## Main Features

### SOC Overview

The main dashboard provides a centralized view of the simulated security environment, including:

- Security score
- Active incidents
- Alert severity distribution
- Security-event timeline
- Highest-risk entities
- Recent security alerts
- Investigation status
- SOC operational metrics

### Incident Management

The application includes eight correlated security incidents with:

- Incident ID and title
- Severity and status
- Assigned analyst
- Working hypothesis
- Related alerts and entities
- Investigation timeline
- MITRE ATT&CK techniques
- Recommended response actions
- Simulated AI assessment
- JSON export
- Local status and ownership changes

### Security Alerts

Alerts include contextual information such as:

- Alert name
- Timestamp
- Severity
- Detection source
- Affected entities
- Current status
- Description
- Recommended analyst action
- Related incident

### Logs and KQL

The educational KQL laboratory includes examples based on tables such as:

- `SigninLogs`
- `Syslog`
- Network telemetry
- Endpoint telemetry

These queries demonstrate how a SOC analyst can investigate authentication activity, suspicious processes, network behavior, and endpoint events.

### Simulated Incident Scenarios

The project contains six interactive scenarios:

1. Password spraying
2. Phishing with PowerShell activity
3. Potential data exfiltration
4. Privilege abuse
5. HTTPS beaconing
6. Ransomware behavior and recovery inhibition

Each scenario is clearly identified as simulated and is designed for defensive cybersecurity education.

### SOC Playbooks

The project provides operational playbooks for common SOC investigations, including:

- Initial incident triage
- Suspicious authentication
- Phishing investigation
- Endpoint containment
- Potential data exfiltration

### Local SOC Copilot

The application includes a rule-based SOC assistant that:

- Summarizes incident context
- Highlights relevant evidence
- Suggests investigation steps
- Recommends response actions
- Supports educational incident triage

The assistant runs locally using deterministic JavaScript rules. It is not a large language model, does not call external APIs, and does not execute security actions.

## Dataset

The project uses an internally consistent simulated dataset containing:

- 8 incidents
- 14 security alerts
- 84 security logs
- Fictional users and devices
- Private or documentation-only IP addresses
- Related entities and investigation timelines
- MITRE ATT&CK mappings
- Simulated analyst recommendations

Relationships between incidents, alerts, events, devices, users, and IP addresses are validated through automated tests.

No personal information, credentials, active malware, or production indicators are included.

## Architecture

```text
┌─────────────────────────────┐
│ Simulated Security Dataset  │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Analysis and Correlation    │
│ Local deterministic rules   │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Alerts and Incidents        │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Mini SOC Dashboard          │
│ Incidents, KQL, Playbooks   │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ SOC Analyst Investigation   │
└─────────────────────────────┘
```

The simulated data layer is separated from the interface so that it can later be replaced with APIs, SIEM queries, log ingestion pipelines, or real security telemetry.

## Technologies

- HTML5
- CSS3
- JavaScript
- JSON
- Kusto Query Language
- MITRE ATT&CK
- GitHub Pages
- Node.js for validation tests
- Browser `localStorage`

The project has no external runtime dependencies and makes no network requests.

## Running the Project Locally

### Option 1: Open directly

Clone or download the repository and open:

```text
index.html
```

### Option 2: Run a local server

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

### Option 3: Clone with Git

```bash
git clone YOUR-REPOSITORY-LINK
cd mini-soc-educativo-ia
python -m http.server 8080
```

## Run the Validation Tests

Make sure Node.js is installed, then execute:

```bash
npm test
```

The tests validate:

- Unique identifiers
- Data relationships
- Incident-to-alert correlation
- Alert-to-log correlation
- Entity references
- Severity consistency
- Dataset integrity

## Repository Structure

```text
mini-soc-educativo-ia/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
├── data/
├── docs/
│   ├── assets/
│   ├── architecture.md
│   ├── data-model.md
│   ├── scenarios.md
│   └── user-guide.md
├── scripts/
├── tests/
├── index.html
├── styles.css
├── app.js
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── LICENSE
└── package.json
```

## Security and Transparency

This application is intentionally designed as a safe educational simulation.

The project uses:

- Fictional organization data
- Fictional email addresses
- Private or reserved IP ranges
- Inert security examples
- Simulated detection logic
- Local browser processing
- No credentials
- No active malicious payloads
- No external API requests
- No connection to real security systems

The application should not be presented as a production SOC, real-time detection platform, or replacement for a SIEM.

## Future Improvements

Planned development opportunities include:

- Microsoft Sentinel integration
- Wazuh or Elastic integration
- Windows Event Log ingestion
- Linux authentication-log ingestion
- Syslog support
- Zeek or Suricata telemetry
- Real KQL query execution
- REST API data ingestion
- User authentication
- Case-management persistence
- Additional MITRE ATT&CK mappings
- Automated reporting
- More incident-response scenarios

A recommended next step is connecting one controlled virtual machine, validating its event ingestion, and implementing one reproducible detection before expanding the environment.

## Skills Demonstrated

This project demonstrates practical experience with:

- SOC operations
- Incident response
- Alert investigation
- Security monitoring
- Detection engineering
- Threat hunting
- KQL
- MITRE ATT&CK
- Security data modeling
- Dashboard development
- Technical documentation
- Cybersecurity automation
- Responsible AI design

## Disclaimer

This project was created exclusively for educational, portfolio, and demonstration purposes.

All data, identities, devices, alerts, incidents, and security events are fictional. The project does not monitor, secure, or interact with a real environment.

## Author

**Eros Marin Morales**

Cybersecurity and SOC Analyst response.

- YOUR-PORTFOLIO-LINK
- [LinkedIn](https://www.linkedin.com/in/eros-marin-0b7ba52b3/)

## License

This project is licensed under the MIT License. See the `LICENSE` file for additional information.
