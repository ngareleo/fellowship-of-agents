#!/usr/bin/env bash
# Launches the mcp-obsidian server using the project-local package.
# Finds node via NVM without sourcing nvm.sh (avoids stdout pollution).
# Works on any machine after `yarn install`.

# Locate the repo root via git — works regardless of CWD
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)"
if [ -z "$REPO_ROOT" ]; then
  echo "Could not locate repo root via git" >&2
  exit 1
fi

VAULT_PATH="$REPO_ROOT/vault"
SERVER_JS="$REPO_ROOT/node_modules/@mauricio.wolff/mcp-obsidian/dist/server.js"

# Find node: prefer PATH, otherwise scan NVM installations (newest first)
NODE_BIN="$(command -v node 2>/dev/null)"
if [ -z "$NODE_BIN" ]; then
  NODE_BIN="$(ls -t "${NVM_DIR:-$HOME/.nvm}/versions/node"/*/bin/node 2>/dev/null | head -1)"
fi

if [ -z "$NODE_BIN" ]; then
  echo "node not found — install Node.js or NVM" >&2
  exit 1
fi

exec "$NODE_BIN" "$SERVER_JS" "$VAULT_PATH"
