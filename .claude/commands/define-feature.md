Define a new feature story. If no feature description was provided, ask the user to describe the feature.

1. Derive a kebab-case slug from the feature description and run this bash command from the repo root:

   ```bash
   bash .claude/scripts/new-story.sh <slug>
   ```

   The script prints the relative path of the new story folder (e.g. `docs/stories/05-whatever-page`). Write the absolute path of that folder to `.claude/current-story` (Write tool, single line, no trailing newline). The `.claude/` directory already exists — do not run mkdir.

2. Call the `create-story` skill.

3. Call the `create-ac` skill.

When both skills complete, let the user know the story is defined and they can open a new context window and run `/implement-feature` to continue with technical implementation.
