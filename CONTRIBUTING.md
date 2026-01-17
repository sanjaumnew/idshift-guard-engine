# Contributing to IDShift Guard™

Thank you for helping strengthen Guard™ — the identity drift and anomaly detection engine.

## 🛠️ Environment Setup
- Python 3.11
- Install dependencies:
  ```bash
  pip install -r requirements.txt
  sudo apt-get install -y wkhtmltopdf
  🚀 Makefile Targets
- make validate → validate schemas and templates
- make report → generate compliance reports (PDF, HTML, MD, charts)
- make demo → run drift/anomaly demo workflow
- make cluster-map → validate workforce role-to-cluster mappings
- make clean → reset outputs
🔒 Security Checks
Before submitting a PR:
pip install safety bandit jsonschema
safety check --full-report
bandit -r pipeline/ scripts/
for file in schema/*.json; do
  jsonschema -i $file schema/guardSchema.json || exit 1
done
✅ CI/CD Workflows
- ci.yml → runs validation, reporting, demo, cluster-map
- release.yml → publishes compliance artifacts on tagged releases
- security.yml → weekly dependency + schema security scans
📌 Pull Request Guidelines
- Ensure all Makefile targets pass locally
- Fix vulnerabilities flagged by safety or bandit
- Ensure schemas/templates are demo-ready
- CI must pass before merge
---

