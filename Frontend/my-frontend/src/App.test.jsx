import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders media player heading', () => {
    render(<App />)
    expect(screen.getByText('Media Player')).toBeInTheDocument()
  })

  it('renders upload button', () => {
    render(<App />)
    expect(screen.getByText('Upload Audio File')).toBeInTheDocument()
  })
})