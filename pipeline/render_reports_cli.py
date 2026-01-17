import argparse
import json
import os
import matplotlib.pyplot as plt
from jinja2 import Environment, FileSystemLoader
import pdfkit

# CLI setup
parser = argparse.ArgumentParser(description="Render Guard Compliance Reports")
parser.add_argument("--pdf", action="store_true", help="Generate PDF report")
parser.add_argument("--html", action="store_true", help="Generate HTML report")
parser.add_argument("--md", action="store_true", help="Generate Markdown report")
parser.add_argument("--charts", action="store_true", help="Generate charts only")
parser.add_argument("--source", default="schema/guardSchema.json", help="Path to schema JSON")
args = parser.parse_args()

# Load data
with open(args.source) as f:
    data = json.load(f)

# Paths
TEMPLATE_PATH = "templates"
EXPORT_PATH = "pipeline"
env = Environment(loader=FileSystemLoader(TEMPLATE_PATH))

# Charts
if args.charts or args.pdf or args.html:
    severity = data["summary"]["severityBreakdown"]
    plt.figure(figsize=(6,6))
    plt.pie(list(severity.values()), labels=list(severity.keys()), autopct='%1.1f%%', startangle=140)
    plt.title("Severity Breakdown")
    plt.savefig(os.path.join(EXPORT_PATH, "severity_chart.png"))
    plt.close()

    risk = data["summary"]["riskDistribution"]
    plt.figure(figsize=(8,6))
    plt.bar(list(risk.keys()), list(risk.values()), color="steelblue")
    plt.title("Risk Distribution")
    plt.xlabel("Identity Types")
    plt.ylabel("Count")
    plt.savefig(os.path.join(EXPORT_PATH, "risk_distribution.png"))
    plt.close()

# Markdown
if args.md:
    md_template = env.get_template("guardComplianceReport.md")
    md_output = md_template.render(data)
    with open(os.path.join(EXPORT_PATH, "guardComplianceReport.md"), "w") as f:
        f.write(md_output)

# HTML
if args.html or args.pdf:
    html_template = env.get_template("guardComplianceReport.html")
    html_output = html_template.render(data)
    with open(os.path.join(EXPORT_PATH, "guardComplianceReport.html"), "w") as f:
        f.write(html_output)

# PDF
if args.pdf:
    pdfkit.from_string(html_output, os.path.join(EXPORT_PATH, "guardComplianceReport.pdf"))