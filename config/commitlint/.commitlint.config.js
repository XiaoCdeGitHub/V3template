module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['git-commit-emoji', 'cz'],
};
