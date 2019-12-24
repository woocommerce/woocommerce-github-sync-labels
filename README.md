# woocommerce-github-sync-labels

Sync labels between repositories on GitHub

## Requeriments

- [Node.js and npm](https://nodejs.org/en/download/).

## Install

```bash
git clone https://github.com/woocommerce/woocommerce-github-sync-labels.git
```

## Setup

Create a `config.json` file in this project's root directory based on [`config-sample.json`](https://github.com/woocommerce/woocommerce-github-sync-labels/blob/master/config-sample.json), and fill `githubAccessToken`.

```bash
cd woocommerce-github-sync-labels
npm install
cp config-sample.json config.json
```

For more details about GitHub acess tokens, check ["Creating a personal access token for the command line"](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line).

## Options

| Options             | Description                                                |
|---------------------|------------------------------------------------------------|
| `--dry-run`         | Test mode, no changes will happens in any repository       |
| `--preserve-labels` | New labels introduced directly in GitHub will be preserved |

## Examples

**Update labels:**

```bash
npm start
```

**Test mode (already runs with `--dry-run`)**

```bash
npm test
```

## Changelog

[See changelog for details](https://github.com/woocommerce/woocommerce-github-sync-labels/blob/master/CHANGELOG.md)
