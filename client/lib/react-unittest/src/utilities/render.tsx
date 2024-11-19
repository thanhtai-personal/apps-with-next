import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest';
import { ReactNode } from "react"

export const TestRender = (title: string, label: string, renderComponent: ReactNode) => {
  describe(title, () => {
    it(label, () => {
      render(renderComponent)
      screen.debug();
    })
  })
}

