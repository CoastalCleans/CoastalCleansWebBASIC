---
title: QMD — Local Search Engine
type: resource
created: 2026-05-27
updated: 2026-05-27
tags: [resource, qmd, search, tooling]
---

# QMD — Local Search Engine

QMD is an on-device search engine for markdown notes. Installed globally to index this vault and the CoastalCleans project.

---

## Installation

```bash
npm install -g @tobilu/qmd
# Requires Node.js ≥22 (installed: v24.15.0)
```

---

## Collections

| Collection | Path | Status |
|-----------|------|--------|
| `coastalcleans` | `memories/` | ✅ Indexed |

---

## Search Commands

```bash
# Fast keyword search
qmd search "stripe checkout"

# Semantic/vector search
qmd vsearch "how do subscribers sign up"

# Hybrid search with re-ranking (highest quality)
qmd query "email notification setup"

# Limit results
qmd search "sender" -n 10

# Search specific collection
qmd search "tokens" -c coastalcleans

# Show full document content in results
qmd search "dark mode" --full
```

---

## Collection Management

```bash
# Add a collection
qmd collection add /path/to/folder --name myname

# List all collections
qmd collection list

# Update index (after adding new notes)
qmd update

# Check index health
qmd status

# Rebuild embeddings
qmd embed
qmd embed -f   # force re-embed all
```

---

## MCP Server (Claude Code Integration)

QMD can run as an MCP server so Claude Code can search the vault mid-session:

```bash
# Start MCP server (stdio mode — used by Claude Code)
qmd mcp

# HTTP daemon mode
qmd mcp --http --port 8080
```

**Claude Code MCP config** (in `.claude/settings.json`):
```json
{
  "mcpServers": {
    "qmd": {
      "command": "qmd",
      "args": ["mcp"]
    }
  }
}
```

Once configured, Claude can call QMD search tools directly without switching to the terminal.

---

## Output Formats

| Flag | Output |
|------|--------|
| (default) | Colorized CLI with clickable links |
| `--json` | Structured JSON with snippets |
| `--md` | Markdown format |
| `--files` | CSV: docid, score, filepath, context |

---

## Editor Integration

Set `QMD_EDITOR_URI` to open files directly from search results:
```bash
# VS Code
export QMD_EDITOR_URI="vscode://file/{path}:{line}"

# Cursor
export QMD_EDITOR_URI="cursor://file/{path}:{line}"
```

---

## Re-indexing After New Notes

After adding notes to the vault, run:
```bash
qmd update
qmd embed
```

Or just `qmd update` for text-only changes (BM25 index). Run `qmd embed` to update vector embeddings for semantic search.
