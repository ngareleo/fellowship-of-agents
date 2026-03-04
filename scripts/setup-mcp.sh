#!/usr/bin/env bash
# Configure MCP servers for fellowship-of-agents in ~/.claude.json.
# Run once after cloning (and after `yarn install`).
#
# Servers configured:
#   obsidian  — local stdio server backed by vault/ in this repo
#   figma     — remote HTTP server at https://mcp.figma.com/mcp
#
# Usage:
#   bash scripts/setup-mcp.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Configuring MCP servers for fellowship-of-agents..."
echo ""

# ── Obsidian ──────────────────────────────────────────────────────────────────

# Find node: prefer PATH, fall back to NVM installations (newest first)
NODE_BIN="$(command -v node 2>/dev/null || true)"
if [ -z "$NODE_BIN" ]; then
  # Glob may fail if NVM not installed — || true prevents pipefail exit
  NODE_BIN="$(ls -t "${NVM_DIR:-$HOME/.nvm}/versions/node"/*/bin/node 2>/dev/null | head -1 || true)"
fi

if [ -z "$NODE_BIN" ]; then
  echo "Error: node not found. Install Node.js (or NVM) then re-run this script." >&2
  exit 1
fi

SERVER_JS="$REPO_ROOT/node_modules/@mauricio.wolff/mcp-obsidian/dist/server.js"
if [ ! -f "$SERVER_JS" ]; then
  echo "Error: mcp-obsidian package not found. Run 'yarn install' first." >&2
  exit 1
fi

VAULT_PATH="$REPO_ROOT/vault"

# ── Write to ~/.claude.json ───────────────────────────────────────────────────

python3 - "$NODE_BIN" "$SERVER_JS" "$VAULT_PATH" <<'EOF'
import json, os, sys

node_bin, server_js, vault_path = sys.argv[1], sys.argv[2], sys.argv[3]

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

with open(config_path, "w") as f:
    json.dump(config, f, indent=2)
    f.write("\n")
EOF

echo "  ✓ obsidian  stdio  $VAULT_PATH"
echo "  ✓ figma     http   https://mcp.figma.com/mcp"
echo ""
echo "Next steps:"
echo "  • Figma: authenticate by running 'claude mcp auth figma'"
echo "  • Restart Claude Code for changes to take effect"
