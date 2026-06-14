/**
 * Conventional Commits linting.
 * See https://www.conventionalcommits.org and
 * https://github.com/conventional-changelog/commitlint
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type-enum mirrors the prefixes used in opilot-pm history
    // (feat, fix, docs, refactor, chore, ...).
    'type-enum': [
      2,
      'always',
      [
        'infra',
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
  },
};
