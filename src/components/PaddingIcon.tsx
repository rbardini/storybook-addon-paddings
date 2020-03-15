import React, { FC } from 'react';
import { Svg, Path } from './Svg';

const PaddingIcon: FC = () => (
  <Svg viewBox="0 0 24 24">
    <Path d="M3,3H21V21H3V3M5,5V19H19V5H5Z M14,10V14H10V10H14M16,8H8V16H16V8Z" />
  </Svg>
);

export default PaddingIcon;
