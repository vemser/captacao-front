import React from 'react'
import logoDbc from 'assets/logo-white.webp'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

export const Login = () => {
  return (
    <>
      <Box sx={{ height: '100vh', width: '100%', backgroundColor: '#1E62FE' }}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            height: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box sx={{ mb: 3 }}>
              <img src={logoDbc} alt="" width="250px" />
            </Box>
            <Box
              boxShadow={3}
              borderRadius={'8px'}
              sx={{
                p: 3,
                width: '100%',
                height: '400px',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{ textAlign: 'center' }}
              >
                Login
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  // register={'...email'}
                  // error={!!errors.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Senha"
                  type="password"
                  autoComplete="current-password"
                  // register={'...password'}
                  // error={!!errors.password}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Esqueceu sua senha?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {'Não tem uma conta? Clique aqui'}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}
