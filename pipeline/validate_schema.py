import json
import sys
import jsonschema
from jsonschema import validate

SCHEMA_DEF_FILE = "schema/guardSchemaDefinition.json"
INSTANCE_FILE = "schema/guardSchema.json"  # or schema/guardSchema.test.json

def load_json(path):
    with open(path) as f:
        return json.load(f)

def validate_schema(instance, schema_def):
    try:
        validate(instance=instance, schema=schema_def)
        print("✅ Structural schema validation passed.")
        return True
    except jsonschema.exceptions.ValidationError as e:
        print("❌ Schema validation failed:")
        print(e.message)
        return False

def extra_checks(instance):
    errors = []

    identities = {i["identityId"] for i in instance.get("identities", [])}

    # --- Summary consistency ---
    if "summary" in instance:
        total = instance["summary"].get("totalIdentitiesScanned")
        if total is not None and total != len(instance.get("identities", [])):
            errors.append(
                f"Summary totalIdentitiesScanned={total} does not match identities count={len(instance.get('identities', []))}"
            )

    # --- Policies reference check ---
    for pol in instance.get("policiesApplied", []):
        for target in pol.get("appliedTo", []):
            if target not in identities:
                errors.append(f"Policy {pol.get('policyId')} appliedTo invalid identityId={target}")

    # --- ReduceActions reference check ---
    for act in instance.get("reduceActions", []):
        if act.get("identityId") not in identities:
            errors.append(f"ReduceAction {act.get('actionId')} references invalid identityId={act.get('identityId')}")

    # --- AuditLog reference check ---
    for log in instance.get("auditLog", []):
        if "identityId" in log and log["identityId"] not in identities:
            errors.append(f"AuditLog {log.get('logId')} references invalid identityId={log.get('identityId')}")

    if errors:
        print("❌ Logical consistency checks failed:")
        for e in errors:
            print(" -", e)
        return False
    else:
        print("✅ Logical consistency checks passed.")
        return True

def main():
    schema_def = load_json(SCHEMA_DEF_FILE)
    instance = load_json(INSTANCE_FILE)

    ok_schema = validate_schema(instance, schema_def)
    ok_logic = extra_checks(instance)

    if ok_schema and ok_logic:
        print("🎉 All validations passed.")
        sys.exit(0)
    else:
        print("⚠️ Validation failed.")
        sys.exit(1)

if __name__ == "__main__":
    main()