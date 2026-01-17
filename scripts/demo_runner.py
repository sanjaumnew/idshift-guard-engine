import os
import json
from datetime import datetime

SCHEMA_DIR = "schema"
TEMPLATE_DIR = "templates"
OUTPUT_DIR = "outputs"

def load_json_files(directory):
    items = []
    for filename in os.listdir(directory):
        if filename.endswith(".json"):
            with open(os.path.join(directory, filename), "r") as f:
                try:
                    items.append(json.load(f))
                except Exception as e:
                    print(f"⚠️ Failed to load {filename}: {e}")
    return items

def run_demo():
    print("🎬 Starting Guard™ demo workflow...")
    
    # Step 1: Load schemas
    schemas = load_json_files(SCHEMA_DIR)
    print(f"🔍 Loaded {len(schemas)} schemas for validation.")
    
    # Step 2: Load templates
    templates = load_json_files(TEMPLATE_DIR)
    print(f"📂 Loaded {len(templates)} templates for demo assets.")
    
    # Step 3: Simulate drift detection
    drift_events = []
    for schema in schemas:
        if "identityCluster" in schema and schema.get("driftDetected", False):
            drift_events.append({
                "cluster": schema["identityCluster"],
                "details": schema.get("driftDetails", "No details provided")
            })
    print(f"⚠️ Detected {len(drift_events)} drift events.")
    
    # Step 4: Simulate anomaly detection
    anomalies = []
    for template in templates:
        if template.get("anomalousAccess", False):
            anomalies.append({
                "templateId": template["templateId"],
                "identityType": template["identityType"],
                "details": template.get("anomalyDetails", "No details provided")
            })
    print(f"🚨 Detected {len(anomalies)} anomalous access behaviors.")
    
    # Step 5: Save demo output
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    demo_output = {
        "demoId": f"guard-demo-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}",
        "timestamp": datetime.utcnow().isoformat(),
        "driftEvents": drift_events,
        "anomalies": anomalies,
        "schemasValidated": len(schemas),
        "templatesValidated": len(templates)
    }
    file_path = os.path.join(OUTPUT_DIR, f"{demo_output['demoId']}.json")
    with open(file_path, "w") as f:
        json.dump(demo_output, f, indent=2)
    print(f"✅ Demo workflow complete. Output saved: {file_path}")

if __name__ == "__main__":
    run_demo()