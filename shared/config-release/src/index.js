module.exports = {
  branches: [
    "main",
    {
      name: "beta",
      prerelease: true,
    },
    {
      name: "test",
      prerelease: true,
    },
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        writerOpts: {
          commitsSort: ["subject", "scope"],
        },
      },
    ],
  ],
};
