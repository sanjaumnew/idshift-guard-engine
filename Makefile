# IDShift Guard Engine Makefile
# Full pipeline: validate → export → run → build → docs, with install, lint, test, and clean

# === Paths ===
PYTHON        ?= python
NPM           ?= npm

SCHEMA_DIR    := schema
PIPELINE_DIR  := pipeline
FRONTEND_DIR  := frontend
SCRIPTS_DIR   := scripts
DOCS_DIR      := docs
ASSETS_DIR    := $(FRONTEND_DIR)/src/assets

SCHEMA_MAIN   := $(SCHEMA_DIR)/guardSchema.json
SCHEMA_TEST   := $(SCHEMA_DIR)/guardSchema.test.json
SCHEMA_DEF    := $(SCHEMA_DIR)/guardSchemaDefinition.json

EXPORT_SCRIPT := $(PIPELINE_DIR)/export_guard_schema.py
VALIDATE_SCRIPT := $(PIPELINE_DIR)/validate_schema.py
PIPELINE_SCRIPT := $(PIPELINE_DIR)/run_pipeline.py

BACKEND_REQ   := requirement.txt
FRONTEND_PKG  := $(FRONTEND_DIR)/package.json

# === Targets ===
.PHONY: all install validate test export pipeline frontend dev lint format ci clean distclean check docs report demo security onboarding demos

# === Default: full pipeline ===
all: check validate export pipeline frontend docs

# === Sanity checks ===
check:
	@test -f "$(SCHEMA_MAIN)" || (echo "❌ Missing $(SCHEMA_MAIN)"; exit 1)
	@test -f "$(VALIDATE_SCRIPT)" || (echo "❌ Missing $(VALIDATE_SCRIPT)"; exit 1)
	@test -f "$(EXPORT_SCRIPT)" || (echo "❌ Missing $(EXPORT_SCRIPT)"; exit 1)
	@test -f "$(PIPELINE_SCRIPT)" || (echo "❌ Missing $(PIPELINE_SCRIPT)"; exit 1)
	@test -f "$(FRONTEND_PKG)" || (echo "❌ Missing $(FRONTEND_PKG)"; exit 1)
	@mkdir -p "$(ASSETS_DIR)"

# === Install dependencies ===
install:
	@echo "📥 Installing backend dependencies..."
	@test -f "$(BACKEND_REQ)" && $(PYTHON) -m pip install -r "$(BACKEND_REQ)" || echo "⚠️ No backend requirements.txt found"
	@echo "📥 Installing frontend dependencies..."
	cd "$(FRONTEND_DIR)" && $(NPM) install

# === Validate schemas ===
validate: check
	@echo "🔍 Validating schema: $(SCHEMA_MAIN)"
	$(PYTHON) "$(VALIDATE_SCRIPT)" --schema "$(SCHEMA_MAIN)"

test: check
	@echo "🧪 Validating test schema: $(SCHEMA_TEST)"
	@test -f "$(SCHEMA_TEST)" && $(PYTHON) "$(VALIDATE_SCRIPT)" --schema "$(SCHEMA_TEST)" || echo "⚠️ No test schema found"

# === Export schema to frontend ===
export: validate
	@echo "📦 Exporting schema to frontend assets..."
	$(PYTHON) "$(EXPORT_SCRIPT)" --input "$(SCHEMA_MAIN)" --output "$(ASSETS_DIR)/guardSchema.json"

# === Run backend pipeline ===
pipeline: export
	@echo "⚙️ Running Guard Engine pipeline..."
	$(PYTHON) "$(PIPELINE_SCRIPT)" --schema "$(SCHEMA_MAIN)"

# === Build frontend ===
frontend: export
	@echo "🖼️ Building React frontend..."
	cd "$(FRONTEND_DIR)" && $(NPM) run build

# === Dev server ===
dev:
	cd "$(FRONTEND_DIR)" && $(NPM) run dev

# === Lint & format ===
lint:
	@echo "🔎 Linting backend (flake8)..."
	@command -v flake8 >/dev/null && flake8 "$(PIPELINE_DIR)" "$(SCRIPTS_DIR)" || echo "⚠️ flake8 not installed"
	@echo "🔎 Linting frontend (eslint)..."
	cd "$(FRONTEND_DIR)" && (command -v npx >/dev/null && npx eslint src || echo "⚠️ eslint not configured")

format:
	@echo "🎨 Formatting backend (black)..."
	@command -v black >/dev/null && black "$(PIPELINE_DIR)" "$(SCRIPTS_DIR)" "$(SCHEMA_DIR)" || echo "⚠️ black not installed"
	@echo "🎨 Formatting frontend (prettier)..."
	cd "$(FRONTEND_DIR)" && (command -v npx >/dev/null && npx prettier --write "src/**/*.js" "src/**/*.ts" "src/**/*.tsx" || echo "⚠️ prettier not configured")

# === CI target ===
ci: install validate test lint export frontend docs

# === Docs validation ===
docs:
	@echo "📚 Validating documentation templates..."
	$(PYTHON) "$(SCRIPTS_DIR)/validate_templates.py"
	@echo "🔐 Validating cluster definitions..."
	$(PYTHON) "$(SCRIPTS_DIR)/validate_clusters.py"

# === Report generation ===
report:
	@echo "📝 Generating compliance report..."
	$(PYTHON) "$(SCRIPTS_DIR)/generate_report.py"

# === Demo runner ===
demo:
	@echo "🎬 Running demo scaffold..."
	$(PYTHON) "$(SCRIPTS_DIR)/demo_runner.py"

# === Security documentation ===
security:
	@echo "🔒 Displaying security policy..."
	@type "$(DOCS_DIR)/security/SECURITY.md"

# === Executive demos and reporting guides ===
demos:
	@echo "📊 Executive demo guide:"
	@type "$(DOCS_DIR)/demos/EXECUTIVE_DEMO.md"
	@echo "\n📈 Reporting guide:"
	@type "$(DOCS_DIR)/demos/REPORTING_GUIDE.md"

# === Contributor onboarding ===
onboarding: docs security demos
	@echo "👥 Contributor guide:"
	@type "$(DOCS_DIR)/onboarding/CONTRIBUTOR_GUIDE.md"
	@echo "\n📏 Validation rules:"
	@type "$(DOCS_DIR)/onboarding/VALIDATION_RULES.md"

# === Clean ===
clean:
	@echo "🧹 Cleaning frontend build..."
	rm -rf "$(FRONTEND_DIR)/build"
	@echo "🧹 Cleaning backend caches..."
	find "$(PIPELINE_DIR)" -name "__pycache__" -type d -exec rm -rf {} +
	find "$(SCRIPTS_DIR)" -name "__pycache__" -type d -exec rm -rf {} +
	find "." -name ".pytest_cache" -type d -exec rm -rf {} +

distclean: clean
	@echo "🧨 Removing node_modules and virtual env..."
	rm -rf "$(FRONTEND_DIR)/node_modules"
	rm -rf ".venv"