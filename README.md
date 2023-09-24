# My "adventures" blog

## Held-back dependency updates

- `flexsearch < 0.7` due to broken import/export up to at least 0.7.2.

## Run E2E tests

Start Gatsby in development mode in separate terminal.

```bash
npx gatsby develop
```

Prepare test environment.

```
curl --fail http://localhost:8000/search.json --output ./search.json
docker compose up -d
```

Run E2E tests.

```bash
yarn e2e-test
```
