Create a new story folder as described in CLAUDE.md based on the incoming message. If no message was passed, ask the user to describe the feature.

Before calling any other skills, derive a kebab-case slug from the feature description (e.g. "whatever-page") and run this bash command from the repo root to create the story folder and `state.json`:

```bash
bash .claude/scripts/new-story.sh <slug>
```

The script prints the relative path of the new story folder (e.g. `docs/stories/04-whatever-page`). After running it, write the absolute path of that folder to `.claude/current-story` (a single line, no trailing newline). Use the Write tool for this — the `.claude/` directory already exists, so do not run mkdir. This pointer is used by hooks to enforce step ordering.

Follow the steps in that specific order.