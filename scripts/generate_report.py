import os
import json
from datetime import datetime

SCHEMA_DIR = "schema"
REPORT_DIR = "reports"

def load_schemas():
    schemas = []
    for filename in os.listdir(SCHEMA_DIR):
        if filename.endswith(".json"):
            with open(os.path.join(SCHEMA_DIR, filename), "r") as f:
                try:
                    data = json.load(f)
                    schemas.append(data)
                except Exception as e:
                    print(f"⚠️ Failed to load {filename}: {e}")
    return schemas

def generate_report(schemas):
    report = {
        "reportId": f"guard-report-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}",
        "timestamp": datetime.utcnow().isoformat(),
        "summary": {
            "totalSchemas": len(schemas),
            "validatedSchemas": sum(1 for s in schemas if "version" in s and "metadata" in s),
            "clustersDetected": list({s.get("identityCluster") for s in schemas if "identityCluster" in s})
        },
        "details": schemas
    }
    return report

def save_report(report):
    os.makedirs(REPORT_DIR, exist_ok=True)
    file_path = os.path.join(REPORT_DIR, f"{report['reportId']}.json")
    with open(file_path, "w") as f:
        json.dump(report, f, indent=2)
    print(f"📊 Compliance report saved: {file_path}")

def main():
    schemas = load_schemas()
    if not schemas:
        print("❌ No schemas found to generate report.")
        return
    report = generate_report(schemas)
    save_report(report)

if __name__ == "__main__":
    main()