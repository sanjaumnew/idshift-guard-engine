🛡️ IDShift Guard™ Security Guide
Overview
Guard™ enforces continuous detection of identity drift and anomalous access behavior — and that extends to its own development pipeline. This guide explains how security validation is integrated into the project and how contributors can run checks locally.
🔒 Security Workflow (security.yml)
The GitHub Actions workflow runs automatically on:
- Every push and pull request to main
- Weekly scheduled scans (Sunday 3 AM UTC)
Checks performed
• 	Dependency vulnerability scan
Uses  to detect known issues in Python packages.
• 	Static code analysis
Uses  to scan  and  for insecure coding patterns.
• 	Schema linting
Validates all JSON schemas in  against Guard’s canonical definitions using 
Artifacts
Security reports are uploaded as workflow artifacts:
- bandit.json → static analysis results
- safety.json → dependency vulnerability report
🧑‍💻 Running Security Checks Locally
Contributors can replicate CI checks before committing:
# Install tools
pip install safety bandit jsonschema

# Run dependency vulnerability scan
safety check --full-report

# Run static analysis
bandit -r pipeline/ scripts/

# Lint schemas
for file in schema/*.json; do
  echo "Linting $file"
  jsonschema -i $file schema/guardSchema.json || exit 1
done
✅ Contributor Responsibilities
- Before PRs → run safety, bandit, and schema linting locally.
- Fix vulnerabilities → update dependencies or refactor code flagged by scans.
- Schema compliance → ensure new or modified schemas align with Guard™ definitions
📌 Notes
- Security checks are mandatory for all releases.
- Any failure in security.yml blocks merging until resolved.
- Reports are retained as artifacts for audit and compliance review.
