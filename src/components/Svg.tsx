import { styled } from '@storybook/theming';

type SvgProps = {
  inline?: boolean;
}

export const Svg = styled.svg<SvgProps>(
  {
    // Fix rendering bugs in Chrome for hdpi
    shapeRendering: 'inherit',
    transform: 'translate3d(0,0,0)',
  },
  ({ inline }) => ({
    display: inline ? 'inline-block' : 'block',
  }),
);

export const Path = styled.path({
  fill: 'currentColor',
});
