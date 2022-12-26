import { Button, Grid, Menu, MenuItem } from '@mui/material'
import { objeto } from 'shared/utils/states'
import { CurriculoContainer } from '../../components/CurriculoContainer'
import React from 'react'

export const CandidatesCurriculum = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12} item>
        <Button
          id="candidatos-avaliar"
          variant="contained"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Avaliar
        </Button>
        <Menu
          id="candidatos-avaliar-options"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem onClick={handleClose}>Apto</MenuItem>
          <MenuItem onClick={handleClose}>Não apto</MenuItem>
        </Menu>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ height: 'calc(100vh - 150px)', width: '100%' }}
      >
        <CurriculoContainer resposta={objeto} />
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{ height: 'calc(100vh - 150px)', width: '100%' }}
      ></Grid>
    </Grid>
  )
}
