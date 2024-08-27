module.exports = {
  plugins: [
    "./index.js",
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    [
      "@semantic-release/gitlab",
      {
        "assets": [
          "CHANGELOG.md"
        ]
      }
    ],
  ],
};
