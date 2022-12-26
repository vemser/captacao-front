import * as React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  Button,
  Toolbar,
  Typography,
  Avatar,
  Badge,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import {
  Edit,
  ArrowBackIosSharp,
  ExitToApp,
  DisplaySettings
} from '@mui/icons-material'
import { menuItems } from 'shared/utils/menuItems'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoBlue from '../../assets/logo-blue.webp'
import { useChangeImageMutation, useGetLoggedUserQuery } from 'shared/features/api/usuario/authSlice'

const drawerWidth = 240

interface Props {
  window?: () => Window
  children: React.ReactNode
}

export const DrawerContainer = (props: Props) => {
  const { data } = useGetLoggedUserQuery()
  const [changeImage] = useChangeImageMutation()

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const drawer = (
    <div>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2,
          py: 2
        }}
      >
        <Box
          component="img"
          src={logoBlue}
          alt="logo"
          sx={{
            width: 120
          }}
        />
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ cursor: 'pointer' }}
          badgeContent={
            <Box
              sx={{
                backgroundColor: 'background.paper',
                color: 'primary.main',
                p: '4px',
                boxShadow: 1,
                borderRadius: '50%'
              }}
            >
              <Edit
                sx={{
                  fontSize: 28,
                  color: 'primary.main'
                }}
              />
            </Box>
          }
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              border: '2px solid',
              borderColor: 'primary.main'
            }}
            alt="Daniel Jacon"
            src="https://media.licdn.com/dms/image/C4D03AQEAtQvGjyaAOA/profile-displayphoto-shrink_800_800/0/1656523477737?e=1677110400&v=beta&t=hJaTnPa4ibssJChzQ2ZJdUxRcaeszavxTtaw4sCxCq0"
          />
        </Badge>
        <Typography variant="body1" component="p" sx={{ fontWeight: 600 }}>
          <Box
            component="span"
            sx={{ color: 'primary.main', display: 'inline', mr: '2px' }}
          >
            Olá,
          </Box>
          Daniel
        </Typography>
      </Toolbar>
      <Divider />
      <List
        sx={{
          marginTop: -1
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 'calc(100vh - 255px)'
          }}
        >
          <List>
            {menuItems.map(item => (
              <ListItem key={item.text} disablePadding>
                <Button
                  component={Link}
                  startIcon={item.icon}
                  size="large"
                  id={`menu-${item.text}`}
                  color={pathname.includes(item.path) ? 'primary' : 'inherit'}
                  to={item.path}
                  sx={{
                    width: '100%',
                    px: 4,
                    justifyContent: 'start',
                    gap: {
                      xs: 0,
                      lg: 2
                    }
                  }}
                >
                  {item.text}
                </Button>
              </ListItem>
            ))}
          </List>
          <Button
            startIcon={<ExitToApp />}
            size="large"
            id="menu-sair"
            sx={{
              px: 4,
              justifyContent: 'start',
              gap: {
                xs: 0,
                lg: 2
              }
            }}
            onClick={() => {
              localStorage.removeItem('token')
              navigate('/')
            }}
          >
            Sair
          </Button>
        </Box>
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {pathname !== '/candidatos' && (
            <IconButton aria-label="voltar" onClick={() => navigate(-1)}>
              <ArrowBackIosSharp sx={{ color: 'primary.light' }} />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            {menuItems.find(item => item.path === pathname)?.text}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <div>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DisplaySettings />}
              sx={{
                color: 'primary.light',
                borderColor: 'primary.light',
                '&:hover': {
                  color: 'secondary.main'
                }
              }}
              onClick={handleClickOpen}
            >
              Configurações
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Configurações</DialogTitle>
              <DialogContent>
                <DialogContentText
                  sx={{
                    mb: 1
                  }}
                >
                  Altere a edição da inscrição dos candidatos.
                </DialogContentText>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={1}
                    // onChange={handleChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
                <DialogContentText
                  sx={{
                    my: 1
                  }}
                >
                  Altere os textos dos campos de formulário da inscrição.
                </DialogContentText>
                <Button
                  variant="contained"
                  component="a"
                  href="https://dashboard.datocms.com/"
                  target="_blank"
                  onClick={handleClose}
                  fullWidth
                >
                  Alterar textos
                </Button>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleClose}>Alterar edição</Button>
              </DialogActions>
            </Dialog>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  )
}
