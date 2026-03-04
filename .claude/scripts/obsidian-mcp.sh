#!/usr/bin/env bash
# Launches mcp-obsidian-wrapper pointed at the vault/ directory inside this repo.
# Works on any machine — path is resolved relative to this script.
export PATH="$HOME/.local/bin:$HOME/bin:$PATH"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VAULT_PATH="$SCRIPT_DIR/../../vault"
exec mcp-obsidian-wrapper "$VAULT_PATH"
