# My "adventures" blog

## Held-back dependency updates

- `eslint < 9` because not all plugins are compatible yet.
- `flexsearch < 0.7` due to broken import/export up to at least 0.7.2.
- `undici < 6.0.0` because later version breaks Jest polyfills for MSW.

## Run E2E tests

Start Gatsby in development mode in separate terminal.

```bash
npx gatsby develop
```

Prepare test environment.

```
docker compose up -d
```

Run E2E tests.

```bash
yarn e2e-test
```
