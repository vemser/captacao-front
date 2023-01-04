import { Button, Chip, Grid, Menu, MenuItem } from "@mui/material";
import { CurriculoContainer } from "../../components/CurriculoContainer";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetInscricaoByIdMutation } from "shared/features/api/inscricao/inscricaoSlice";
import { objeto } from "shared/utils/states";
import { IElementos, IInscricao } from "shared/features/api/inscricao/types";
import { el } from "@fullcalendar/core/internal-common";

export const CandidatesCurriculum = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container spacing={2}>
      <Grid
        xs={12}
        item
        sx={{
          mb: 2,
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
          id="candidatos-avaliar-options"
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
      <CurriculoContainer />
    </Grid>
  );
};
