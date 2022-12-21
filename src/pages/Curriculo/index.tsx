import { Button, ButtonGroup, Chip, Grid, Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { objeto } from "shared/utils/states";
import { CurriculoContainer } from "../../components/CurriculoContainer";

export const Curriculo = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        pb: 2,
      }}
    >
      <Grid
        xs={12}
        sx={{
          px: 2,
          mt: "6px",
        }}
      >
        <Button
          id="candidatos-avaliar"
          variant="contained"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Avaliar
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Apto</MenuItem>
          <MenuItem onClick={handleClose}>Não apto</MenuItem>
        </Menu>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        sx={{ height: "calc(100vh - 150px)", width: "100%" }}
      >
        <CurriculoContainer resposta={objeto} />
      </Grid>
    </Grid>
  );
};
