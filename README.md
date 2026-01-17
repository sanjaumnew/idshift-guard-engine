# idshift-guard-engine
Continuous detection of identity drift and anomalous access behavior

# IDShift Guard Engine
---
## Overview
The Guard Engine unifies SCAN and Reduce into a compliance-ready orchestration layer.  
It validates identity risk data against `guardSchema.json` and produces executive-ready reports in Markdown, HTML, LaTeX, and PDF formats.

---

## 📂 Project Structure
idshift-guard-engine/
├── schema/
│   ├── guardSchema.json              # Source of truth data
│   ├── guardSchemaDefinition.json    # JSON Schema for validation
├── templates/
│   ├── guardComplianceReport.md      # Markdown template
│   ├── guardComplianceReport.html    # HTML template
│   ├── guardComplianceReport.tex     # LaTeX template
├── pipeline/
│   ├── render_reports.py             # Rendering + chart generation script
│   ├── guardComplianceReport.md      # Rendered Markdown
│   ├── guardComplianceReport.html    # Rendered HTML
│   ├── guardComplianceReport.pdf     # Final executive PDF
│   ├── guardComplianceReport.tex     # Rendered LaTeX
│   ├── severity_chart.png            # Pie chart (severity breakdown)
│   ├── risk_distribution.png         # Bar chart (risk distribution)

 
---

##  How to Run
1. Install dependencies:
   ```bash
   pip install jinja2 pdfkit matplotlib
   sudo apt-get install wkhtmltopdf
2. Run the pipeline:

   python pipeline/render_reports.py
3. Outputs will appear in /pipeline/:
. guardComplianceReport.pdf (executive-ready report with charts)
. guardComplianceReport.html (web view)
. guardComplianceReport.md (developer-friendly view)
. severity_chart.png, risk_distribution.png (visuals)

Visuals- Severity Breakdown → Pie chart showing distribution of low/medium/high/critical risks.
- Risk Distribution → Bar chart showing identity types (human, agenticAI, bot, synthetic, compromised, unknown).

Contributor Notes- Edit templates to change layout.
- Update schema to change data.
- Run pipeline to regenerate reports.
- Keep schema immutable for validation.
- Charts are regenerated every run to reflect latest data.

 Next Steps- Add CLI options to render_reports.py (e.g., --pdf, --html).
- Add trend charts for multiple sessions.
- Integrate with CI/CD to auto-generate compliance reports.
---
