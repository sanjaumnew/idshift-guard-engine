import os
import json
import sys

SCHEMA_DIR = "schema"

def validate_schema(file_path):
    try:
        with open(file_path, "r") as f:
            data = json.load(f)
        assert "version" in data, "Missing 'version'"
        assert "metadata" in data, "Missing 'metadata'"
        assert "identityCluster" in data, "Missing 'identityCluster'"
        print(f"✅ {file_path} passed validation.")
    except Exception as e:
        print(f"❌ {file_path} failed: {e}")
        return False
    return True

def main():
    all_passed = True
    for filename in os.listdir(SCHEMA_DIR):
        if filename.endswith(".json"):
            full_path = os.path.join(SCHEMA_DIR, filename)
            if not validate_schema(full_path):
                all_passed = False
    if not all_passed:
        sys.exit("Schema validation failed.")
    print("🎯 All schemas validated successfully.")

if __name__ == "__main__":
    main()