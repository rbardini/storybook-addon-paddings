function previewAnnotations(entry = []) {
  return [...entry, require.resolve('../dist/preview.mjs')]
}

function managerEntries(entry = []) {
  return [...entry, require.resolve('../dist/manager.mjs')]
}

module.exports = {
  managerEntries,
  previewAnnotations,
}
