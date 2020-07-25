# Storybook Paddings Addon

[![npm package version](https://img.shields.io/npm/v/storybook-addon-paddings)](https://www.npmjs.com/package/storybook-addon-paddings)
[![Build status](https://img.shields.io/github/workflow/status/rbardini/storybook-addon-paddings/Main)](https://github.com/rbardini/storybook-addon-paddings/actions)
[![Dependencies status](https://img.shields.io/david/rbardini/storybook-addon-paddings)](https://david-dm.org/rbardini/storybook-addon-paddings)
[![devDependencies status](https://img.shields.io/david/dev/rbardini/storybook-addon-paddings)](https://david-dm.org/rbardini/storybook-addon-paddings?type=dev)

A [Storybook](https://storybook.js.org) addon to add different paddings to your preview. Useful for checking how components behave when surrounded with white space.

[Live demo](https://storybook-addon-paddings.netlify.com)

![Demo](demo.gif)

## Installation

```sh
npm install --save-dev storybook-addon-paddings
```

within `.storybook/main.js`:

```js
module.exports = {
  addons: ['storybook-addon-paddings']
}
```

within `.storybook/preview.js`:

```js
import { addDecorator } from '@storybook/react';
import { withPaddings } from 'storybook-addon-paddings';

addDecorator(withPaddings);
```

See [`example`](example) for a minimal working setup.

## Configuration

The addon can be configured globally and per story with the `paddings` parameter.

### Global configuration

To add paddings to all stories, call `addParameters` in `.storybook/preview.js`:

```js
import { addParameters } from '@storybook/react';
import { withPaddings } from 'storybook-addon-paddings';

addDecorator(withPaddings);

addParameters({
  paddings: {
    values: [
      { name: 'Small', value: '16px' },
      { name: 'Medium', value: '32px' },
      { name: 'Large', value: '64px' },
    ],
    default: 'Medium'
  }
});
```

### Per-story configuration

To configure/override paddings for a single story or a set of stories, add the `paddings` parameter:

```js
export default {
  title: 'Stories',
  parameters: {
    paddings: {
      values: [
        { name: 'Small', value: '16px' },
        { name: 'Medium', value: '32px', },
        { name: 'Large', value: '64px' },
      ],
      default: 'Medium'
    }
  },
};

export const myStory = () => '<h1>Hello World</h1>';
myStory.story = {
  parameters: {
    paddings: {
      values: [
        { name: 'Small', value: '16px' },
        { name: 'Medium', value: '32px' },
        { name: 'Large', value: '64px' },
      ],
      default: 'Medium'
    }
  },
};
```

### Disabling the addon

To disable paddings for a story, set the `paddings` parameter to `{ disable: true }` to skip the addon:

```js
export default {
  title: 'Stories',
  parameters: {
    paddings: { disable: true },
  },
};

export const myStory = () => '<h1>Hello World</h1>';
myStory.story = {
  parameters: {
    paddings: { disable: true },
  },
};
```
