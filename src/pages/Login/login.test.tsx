import '@testing-library/jest-dom'
import { Button } from '@mui/material';
import { render, screen } from '@testing-library/react'

describe('Login', () => {
    test('Verificar se existe um botão', () => {
        render(<Button />)
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument()
    });
})