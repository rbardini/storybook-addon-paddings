import React, { FC } from 'react';
import { Svg, Path } from './Svg';

const PaddingIcon: FC = () => (
  <Svg viewBox="0 0 1024 1024">
    <Path d="M880 144H144v736h736V144zm40-80c22.092 0 40 17.908 40 40v816c0 22.092-17.908 40-40 40H104c-22.092 0-40-17.908-40-40V104c0-22.092 17.908-40 40-40h816zM224 224v576h576V224H224zm80 80h416v416H304V304z" />
  </Svg>
);

export default PaddingIcon;
