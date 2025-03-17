module.exports = {
  src: "./",
  language: "typescript",
  schema: "./graphql/schema.graphql",
  exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
  artifactDirectory: "./graphql/__generated__",
  featureFlags: {
    enable_relay_resolver_mutations: true,
    enable_resolver_normalization_ast: true
  },
  eagerEsModules: true,
}
