#!/usr/bin/env bash
# Configure MCP servers for fellowship-of-agents in ~/.claude.json.
# Run once after cloning. Requires Node.js (npx) to be installed.
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
VAULT_PATH="$REPO_ROOT/vault"

echo "Configuring MCP servers for fellowship-of-agents..."
echo ""

# ── Verify npx is available ────────────────────────────────────────────────────

if ! command -v npx &>/dev/null; then
  echo "Error: npx not found. Install Node.js then re-run this script." >&2
  exit 1
fi

# ── Install Playwright system dependencies ────────────────────────────────────

if command -v apt-get &>/dev/null; then
  if ! dpkg -s libavif16 &>/dev/null 2>&1; then
    echo "Installing Playwright system dependency: libavif16..."
    sudo apt-get install -y libavif16
  fi
fi

# ── Install Playwright browsers ───────────────────────────────────────────────

echo "Installing Playwright browsers..."
npx playwright install 2>/dev/null || true

# ── Write to ~/.claude.json ───────────────────────────────────────────────────

python3 - "$VAULT_PATH" <<'EOF'
import json, os, sys

vault_path = sys.argv[1]

config_path = os.path.expanduser("~/.claude.json")
try:
    with open(config_path) as f:
        config = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    config = {}

config.setdefault("mcpServers", {})

config["mcpServers"]["obsidian"] = {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@mauricio.wolff/mcp-obsidian@0.8.1", vault_path],
}

config["mcpServers"]["figma"] = {
    "type": "http",
    "url": "https://mcp.figma.com/mcp",
}

config["mcpServers"]["playwright"] = {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@playwright/mcp", "--headless"],
}

with open(config_path, "w") as f:
    json.dump(config, f, indent=2)
    f.write("\n")
EOF

echo "  ✓ obsidian    stdio  npx @mauricio.wolff/mcp-obsidian@0.8.1"
echo "  ✓ figma       http   https://mcp.figma.com/mcp"
echo "  ✓ playwright  stdio  npx @playwright/mcp --headless"
echo ""
echo "Next steps:"
echo "  • Figma: authenticate by running 'claude mcp auth figma'"
echo "  • Restart Claude Code for changes to take effect"
