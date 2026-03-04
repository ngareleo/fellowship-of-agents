#!/usr/bin/env bash
# Configure MCP servers for fellowship-of-agents in ~/.claude.json.
# Run once after cloning. No extra yarn/npm steps required.
#
# Servers configured:
#   obsidian    — local stdio server backed by vault/ in this repo
#   figma       — remote HTTP server at https://mcp.figma.com/mcp
#   playwright  — local stdio server for browser automation
#
# Usage:
#   bash scripts/setup-mcp.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TOOLS_DIR="$REPO_ROOT/.claude/tools"

echo "Configuring MCP servers for fellowship-of-agents..."
echo ""

# ── Find node ─────────────────────────────────────────────────────────────────

NODE_BIN="$(command -v node 2>/dev/null || true)"
if [ -z "$NODE_BIN" ]; then
  NODE_BIN="$(ls -t "${NVM_DIR:-$HOME/.nvm}/versions/node"/*/bin/node 2>/dev/null | head -1 || true)"
fi

if [ -z "$NODE_BIN" ]; then
  echo "Error: node not found. Install Node.js (or NVM) then re-run this script." >&2
  exit 1
fi

NPM_BIN="$(dirname "$NODE_BIN")/npm"

# ── Install packages into .claude/tools/ ─────────────────────────────────────

mkdir -p "$TOOLS_DIR"

SERVER_JS="$TOOLS_DIR/node_modules/@mauricio.wolff/mcp-obsidian/dist/server.js"

if [ ! -f "$SERVER_JS" ]; then
  echo "Installing @mauricio.wolff/mcp-obsidian into .claude/tools/..."
  PATH="$(dirname "$NODE_BIN"):$PATH" \
    "$NPM_BIN" install --prefix "$TOOLS_DIR" --save-exact \
    @mauricio.wolff/mcp-obsidian@0.8.1 2>/dev/null
fi

PLAYWRIGHT_JS="$TOOLS_DIR/node_modules/@playwright/mcp/cli.js"

if [ ! -f "$PLAYWRIGHT_JS" ]; then
  echo "Installing @playwright/mcp into .claude/tools/..."
  PATH="$(dirname "$NODE_BIN"):$PATH" \
    "$NPM_BIN" install --prefix "$TOOLS_DIR" --save-exact \
    @playwright/mcp 2>/dev/null
fi

VAULT_PATH="$REPO_ROOT/vault"

# ── Write to ~/.claude.json ───────────────────────────────────────────────────

python3 - "$NODE_BIN" "$SERVER_JS" "$VAULT_PATH" "$PLAYWRIGHT_JS" <<'EOF'
import json, os, sys

node_bin, server_js, vault_path, playwright_js = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]

config_path = os.path.expanduser("~/.claude.json")
try:
    with open(config_path) as f:
        config = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    config = {}

config.setdefault("mcpServers", {})

config["mcpServers"]["obsidian"] = {
    "type": "stdio",
    "command": node_bin,
    "args": [server_js, vault_path],
}

config["mcpServers"]["figma"] = {
    "type": "http",
    "url": "https://mcp.figma.com/mcp",
}

config["mcpServers"]["playwright"] = {
    "type": "stdio",
    "command": node_bin,
    "args": [playwright_js],
}

with open(config_path, "w") as f:
    json.dump(config, f, indent=2)
    f.write("\n")
EOF

echo "  ✓ obsidian    stdio  $VAULT_PATH"
echo "  ✓ figma       http   https://mcp.figma.com/mcp"
echo "  ✓ playwright  stdio  $PLAYWRIGHT_JS"
echo ""
echo "Next steps:"
echo "  • Figma: authenticate by running 'claude mcp auth figma'"
echo "  • Restart Claude Code for changes to take effect"
