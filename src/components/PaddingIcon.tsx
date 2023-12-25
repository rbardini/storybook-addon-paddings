import { styled } from '@storybook/theming'
import React, { memo } from 'react'

const Svg = styled.svg<{ inline?: boolean }>(
  {
    // Fix rendering bugs in Chrome for hdpi
    shapeRendering: 'inherit',
    transform: 'translate3d(0,0,0)',
  },
  ({ inline }) => ({
    display: inline ? 'inline-block' : 'block',
  }),
)

const Path = styled.path({
  fill: 'currentColor',
})

export const PaddingIcon = memo(() => (
  <Svg viewBox="0 0 1024 1024">
    <Path d="M880 144H144v736h736V144zm40-80c22.092 0 40 17.908 40 40v816c0 22.092-17.908 40-40 40H104c-22.092 0-40-17.908-40-40V104c0-22.092 17.908-40 40-40h816zM224 224v576h576V224H224zm80 80h416v416H304V304z" />
  </Svg>
))
