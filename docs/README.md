# IDShift Guard™

**Continuous detection of identity drift and anomalous access behavior.**

Guard™ is the orchestration layer within IDShift that unifies detection, remediation, and policy enforcement across OT and non‑OT environments. It integrates SCADA, Active Directory Domain Services (AD DS), OT SQL, and compliance reporting into a modular, demo‑ready framework.

## 🚀 Capabilities
- **Identity Drift Detection** → Continuous monitoring of workforce roles and entitlements.
- **Anomalous Access Behavior** → Automated detection of deviations from baseline patterns.
- **Unified Schemas** → Canonical JSON definitions for identity and risk.
- **Contributor Templates** → Demo‑ready assets for onboarding and validation.
- **Automation Pipelines** → Makefile and CI/CD workflows for reproducibility and auditability.
- **Compliance Reporting** → Automated outputs for regulatory and executive readiness.
- **Cluster Mapping** → Workforce roles aligned to technical frameworks with gap analysis.

## 📂 Repository Structure
. ├── schemas/        # Validated JSON schemas (tracked) ├── templates/      # Contributor templates (tracked) ├── reports/        # Generated compliance reports (ignored by Git) ├── outputs/        # Pipeline artifacts (ignored by Git) ├── docs/           # Contributor guides, demos, compliance, architecture ├── Makefile        # Automation entry point └── .gitignore      # Guard-specific ignore rules

## 👥 Contributor Onboarding
1. Clone the repository.
2. Review `.gitignore` rules to understand tracked vs ignored files.
3. Explore `schemas/` and `templates/` for canonical artifacts.
4. Run:
   ```bash
   make validate

to confirm schema compliance. 5. See docs/onboarding/CONTRIBUTOR_GUIDE.md for detailed steps.
🎬 Executive Demo
Executives can follow docs/demos/EXECUTIVE_DEMO.md for a narrative walkthrough:
- Identity drift detection in action.
- Anomalous access behavior flagged and remediated.
- Compliance report generation.
- Cluster mapping presentation.
📊 Compliance & Audit
- Reports generated via:
make report
- Outputs are reproducible but excluded from Git.
- See docs/compliance/REPORTING_GUIDE.md for details.
🏗️ Architecture
- Overview: docs/architecture/GUARD_OVERVIEW.md
- Cluster mapping: docs/architecture/CLUSTER_MAPPING.md
- Roadmap: docs/architecture/FUTURE_ROADMAP.md

---

