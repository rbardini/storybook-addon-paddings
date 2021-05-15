function config(entry = []) {
  return [
    ...entry,
    require.resolve('./dist/esm/preset/addDecorator'),
    require.resolve('./dist/esm/preset/addParameter'),
  ];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve('./dist/esm/register')];
}

module.exports = {
  config,
  managerEntries,
};
