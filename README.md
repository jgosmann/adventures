# My "adventures" blog

## Held-back dependency updates

- `eslint < 9` because Gatsby is not compatible yet
- `React < 19` because Gatsby and Nivo are not compatible yet
  - https://github.com/gatsbyjs/gatsby/issues/39180
  - https://github.com/plouc/nivo
- `flexsearch < 0.7` due to broken import/export up to at least 0.7.2.

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
