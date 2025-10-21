import React, { type ReactNode } from 'react'
import './card.css'

interface CardProps {
  children?: ReactNode
}

export const Card = ({ children }: CardProps) => (
  <div className="card">{children}</div>
)
