import React, { useState } from 'react'
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
import { useAuthLoginMutation } from 'shared/features/api/usuario/authSlice'
import { useForm } from 'react-hook-form'
import { IUser } from 'shared/interfaces'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export const Login: React.FC = () => {
  const [authLogin] = useAuthLoginMutation()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUser>({
    // resolver: yupResolver(UserAuthSchema),
  })

  const handleLogin = async (data: IUser) => {
    await toast.promise(
      authLogin(data)
        .unwrap()
        .then(response => {
          localStorage.setItem('token', response)
          navigate('/candidatos')
        }),
      {
        pending: 'Carregando...',
        success: 'Bem Vindo!',
        error: {
          render({ data }: any) {
            return data.status === 400
              ? "Seu login ou senha estão incorretos."
              : "Houve um erro ao tentar fazer login.";
          },
        },
      }
    )
  }

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  return (
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
            <Box
              component="form"
              onSubmit={handleSubmit(handleLogin)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="login-username"
                label="Email"
                autoFocus
                {...register('username')}
              />

              <FormControl
                variant="outlined"
                sx={{ mb: 1, mt: 2, width: '100%' }}
              >
                <InputLabel>Senha</InputLabel>
                <OutlinedInput
                  {...register('password')}
                  required
                  fullWidth
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"
                />
                {/* {errors.password && (
                  <span

                    id="login-error-senha"
                  >
                    {errors.password.message}
                  </span>
                )} */}
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
