# Notes on Promptfoo

## Setup

You will need API keys to run this.

```bash
export OPENAI_API_KEY=sk-proj-...
export ANTHROPIC_API_KEY=sk-ant-...
```

## Running the Samples

You can run these examples with:

```bash
npx promptfoo@latest eval -c promptfoo/boring-prompt.yaml
npx promptfoo@latest eval -c promptfoo/find-last-md-read.yaml
npx promptfoo@latest eval -c promptfoo/code-review-memory-store.yaml
```

The first is the equivalent of "Hello World"
The second is a test of an actual skill in this repo.
The third uses model-graded (`llm-rubric`) assertions to judge whether Claude's code review of `server/db/memoryStore.ts` is substantive rather than just a code summary.

## Viewing the Output

When running the commands, you'll see output in the terminal. You can also see it in a browser.

```bash
npx promptfoo@latest view
```