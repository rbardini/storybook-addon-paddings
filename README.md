# Storybook Paddings Addon

[![npm package version](https://img.shields.io/npm/v/storybook-addon-paddings)](https://www.npmjs.com/package/storybook-addon-paddings)
[![Build status](https://img.shields.io/github/actions/workflow/status/rbardini/storybook-addon-paddings/main.yml)](https://github.com/rbardini/storybook-addon-paddings/actions)
[![Dependencies status](https://img.shields.io/librariesio/release/npm/storybook-addon-paddings)](https://libraries.io/npm/storybook-addon-paddings)

🔲 A [Storybook](https://storybook.js.org) addon to add different paddings to your preview. Useful for checking how components behave when surrounded with white space.

![Demo](demo.gif)

[View demo →](https://storybook-addon-paddings.js.org)

## Installation

```sh
npm install --save-dev storybook-addon-paddings
```

```js
// .storybook/main.js
export default {
  addons: ['storybook-addon-paddings'],
}

// .storybook/preview.js
export default {
  parameters: {
    layout: 'fullscreen', // remove default Storybook padding
  },
}
```

## Configuration

The paddings toolbar comes with small, medium and large options by default, but you can configure your own set of paddings via the `paddings` [parameter](https://storybook.js.org/docs/react/writing-stories/parameters).

To configure for all stories, set the `paddings` parameter in [`.storybook/preview.js`](https://storybook.js.org/docs/react/configure/overview#configure-story-rendering):

```js
export const parameters = {
  paddings: {
    values: [
      { name: 'Small', value: '16px' },
      { name: 'Medium', value: '32px' },
      { name: 'Large', value: '64px' },
    ],
    default: 'Medium',
  },
}
```

You can also configure on per-story or per-component basis using [parameter inheritance](https://storybook.js.org/docs/react/writing-stories/parameters#component-parameters):

```js
// Button.stories.js

// Set padding options for all Button stories
export default {
  title: 'Button',
  component: Button,
  parameters: {
    paddings: {
      values: [
        { name: 'Small', value: '16px' },
        { name: 'Medium', value: '32px' },
        { name: 'Large', value: '64px' },
      ],
      default: 'Large',
    },
  },
}

// Disable addon in Button/Large story only
export const Large {
  parameters: {
    paddings: { disable: true },
  },
}
```

See other [story examples](./src/stories/Card.stories.ts).
