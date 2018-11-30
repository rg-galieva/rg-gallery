function buildConfig(env) {
  return require(`./tools/webpack/${env}.js`)({ env });
}

module.exports = buildConfig;
