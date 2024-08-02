import React, { forwardRef, memo } from 'react'

interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: never
  color?: string
  size?: number
}

export const PaddingIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', size = 14, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      width={size}
      height={size}
      fill="none"
      ref={ref}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M880 144H144v736h736V144zm40-80c22.092 0 40 17.908 40 40v816c0 22.092-17.908 40-40 40H104c-22.092 0-40-17.908-40-40V104c0-22.092 17.908-40 40-40h816zM224 224v576h576V224H224zm80 80h416v416H304V304z"
        fill={color}
      />
    </svg>
  ),
)
