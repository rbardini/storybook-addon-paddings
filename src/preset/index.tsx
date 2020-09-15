type PaddingsOptions = {
  addDecorator?: boolean;
};

export function managerEntries(entry: unknown[] = []) {
  return [...entry, require.resolve('../register')];
}

export function config(
  entry: unknown[] = [],
  { addDecorator = true }: PaddingsOptions = {},
) {
  const paddingsConfig = [require.resolve('./defaultParameters')];

  if (addDecorator) {
    paddingsConfig.push(require.resolve('./addDecorator'));
  }

  return [...entry, ...paddingsConfig];
}
