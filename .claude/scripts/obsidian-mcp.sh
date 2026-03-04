#!/usr/bin/env bash
# Launches mcp-obsidian pointed at the vault/ directory inside this repo.
# Works on any machine — node is found via NVM; vault path is repo-relative.

# Bootstrap node via NVM if it isn't already in PATH
if ! command -v node &>/dev/null; then
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  # shellcheck source=/dev/null
  [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$SCRIPT_DIR/../.."
VAULT_PATH="$REPO_ROOT/vault"

# Run through yarn so PnP resolves @mauricio.wolff/mcp-obsidian correctly
exec yarn --cwd "$REPO_ROOT" exec mcp-obsidian "$VAULT_PATH"
