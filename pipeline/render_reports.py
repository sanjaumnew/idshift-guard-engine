import json
from jinja2 import Environment, FileSystemLoader
import pdfkit  # for HTML → PDF conversion
import matplotlib.pyplot as plt
import os

# Paths
SCHEMA_PATH = "schema/guardSchema.json"
TEMPLATE_PATH = "templates"
EXPORT_PATH = "pipeline"   # or "exports" if you keep that folder

# Load Guard schema data
with open(SCHEMA_PATH) as f:
    data = json.load(f)

# --- Generate Charts ---
# Severity Pie Chart
severity = data["summary"]["severityBreakdown"]
labels = list(severity.keys())
sizes = list(severity.values())

plt.figure(figsize=(6,6))
plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140)
plt.title("Severity Breakdown")
plt.savefig(os.path.join(EXPORT_PATH, "severity_chart.png"))
plt.close()

# Risk Distribution Bar Chart
risk = data["summary"]["riskDistribution"]
labels = list(risk.keys())
values = list(risk.values())

plt.figure(figsize=(8,6))
plt.bar(labels, values, color="steelblue")
plt.title("Risk Distribution Across Identity Types")
plt.xlabel("Identity Types")
plt.ylabel("Count")
plt.savefig(os.path.join(EXPORT_PATH, "risk_distribution.png"))
plt.close()

# --- Setup Jinja2 environment ---
env = Environment(loader=FileSystemLoader(TEMPLATE_PATH))

# Render Markdown
md_template = env.get_template("guardComplianceReport.md")
md_output = md_template.render(data)
with open(os.path.join(EXPORT_PATH, "guardComplianceReport.md"), "w") as f:
    f.write(md_output)

# Render HTML
html_template = env.get_template("guardComplianceReport.html")
html_output = html_template.render(data)
with open(os.path.join(EXPORT_PATH, "guardComplianceReport.html"), "w") as f:
    f.write(html_output)

# Convert HTML to PDF
pdfkit.from_string(html_output, os.path.join(EXPORT_PATH, "guardComplianceReport.pdf"))

# Render LaTeX
latex_template = env.get_template("guardComplianceReport.tex")
latex_output = latex_template.render(data)
with open(os.path.join(EXPORT_PATH, "guardComplianceReport.tex"), "w") as f:
    f.write(latex_output)
# Compile LaTeX externally: run `pdflatex pipeline/guardComplianceReport.tex`