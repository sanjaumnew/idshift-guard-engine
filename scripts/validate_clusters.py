import os
import json
import sys

SCHEMA_DIR = "schema"

# Expected clusters in Guard™ framework
EXPECTED_CLUSTERS = {
    "OT Governance & SCADA Integration",
    "Physical Access Governance",
    "ITSM & Ticketing Integration",
    "Risk & Audit Intelligence",
    "IAM Architecture & Strategy",
    "AI Agent Governance"
}

def validate_cluster_mapping(file_path):
    try:
        with open(file_path, "r") as f:
            data = json.load(f)
        role = data.get("workforceRole", "Unknown")
        cluster = data.get("identityCluster")

        if not cluster:
            print(f"❌ {file_path}: Role '{role}' missing cluster mapping.")
            return False

        if cluster not in EXPECTED_CLUSTERS:
            print(f"⚠️ {file_path}: Role '{role}' mapped to NEW cluster '{cluster}'.")
            return True  # New clusters are allowed but flagged

        print(f"✅ {file_path}: Role '{role}' mapped to '{cluster}'.")
        return True
    except Exception as e:
        print(f"❌ {file_path} failed: {e}")
        return False

def main():
    all_passed = True
    for filename in os.listdir(SCHEMA_DIR):
        if filename.endswith(".json"):
            full_path = os.path.join(SCHEMA_DIR, filename)
            if not validate_cluster_mapping(full_path):
                all_passed = False
    if not all_passed:
        sys.exit("Cluster mapping validation failed.")
    print("🎯 Cluster mapping validation complete.")

if __name__ == "__main__":
    main()