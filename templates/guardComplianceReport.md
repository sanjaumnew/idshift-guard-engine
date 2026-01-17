# IDShift Guard Compliance Report

**Version:** Guard v1.0  
**Generated On:** {{timestamp}}  
**Scan Session ID:** {{scanSessionId}}

---

## Executive Summary
- **Total Identities Scanned:** {{summary.totalIdentitiesScanned}}
- **Risk Distribution:**
  - Human: {{summary.riskDistribution.human}}
  - Agentic AI: {{summary.riskDistribution.agenticAI}}
  - Bot: {{summary.riskDistribution.bot}}
  - Synthetic: {{summary.riskDistribution.synthetic}}
  - Compromised: {{summary.riskDistribution.compromised}}
  - Unknown: {{summary.riskDistribution.unknown}}
- **Severity Breakdown:**
  - Low: {{summary.severityBreakdown.low}}
  - Medium: {{summary.severityBreakdown.medium}}
  - High: {{summary.severityBreakdown.high}}
  - Critical: {{summary.severityBreakdown.critical}}
- **Actions Taken:**
  - AutoReduced: {{summary.actionsTaken.autoReduced}}
  - Escalated: {{summary.actionsTaken.escalated}}
  - Blocked: {{summary.actionsTaken.blocked}}
  - ReportOnly: {{summary.actionsTaken.reportOnly}}

---

## Identity Risk Details
{{#each identities}}
### Identity: {{identityId}}
- **Type:** {{identityType}}
- **Platform:** {{attributes.platform}}
- **Risk Score:** {{attributes.riskScore}}
- **Risk Category:** {{attributes.riskCategory}}
- **Evidence:** {{attributes.evidence}}
- **Severity:** {{severity}}
- **Status:** {{status}}
{{/each}}

---

## Policies Applied
{{#each policiesApplied}}
- **Policy Name:** {{name}}  
- **Description:** {{description}}  
- **Applied To:** {{appliedTo}}  
- **Action:** {{action}}  
- **Tier:** {{tier}}
{{/each}}

---

## Remediation Actions
{{#each reduceActions}}
- **Action ID:** {{actionId}}  
- **Identity ID:** {{identityId}}  
- **Action Type:** {{actionType}}  
- **Result:** {{result}}  
- **Timestamp:** {{timestamp}}  
- **Details:** {{details}}
{{/each}}

---

## Audit Log
{{#each auditLog}}
- **Log ID:** {{logId}}  
- **Event:** {{event}}  
- **Identity ID:** {{identityId}}  
- **Actor:** {{actor}}  
- **Timestamp:** {{timestamp}}  
- **Notes:** {{notes}}
{{/each}}