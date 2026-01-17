# Validation Rules

Guard enforces strict validation to ensure demo readiness and contributor clarity.

## Schema Validation
- JSON schemas must conform to Guard’s modular schema design.
- Each schema must include versioning and metadata headers.
- Validation is performed via `make validate`.

## Pipeline Validation
- CI/CD workflows must run without manual intervention.
- Reports generated are ignored by Git but must be reproducible.