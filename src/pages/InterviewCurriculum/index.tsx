import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { objeto } from "shared/utils/states";
import { CurriculoContainer } from "../../components/CurriculoContainer";
import React from "react";

export const InterviewCurriculum = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={12} item>
        <Button
          variant="contained"
          id="interview-curriculum-agendar"
          onClick={handleClickOpen}
        >
          Agendar entrevista
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle color="primary">Agendar entrevista</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              autoFocus
              sx={{
                mt: 1,
              }}
              id="name"
              label="Email do candidato"
              fullWidth
            />
            <TextField
              margin="dense"
              autoFocus
              id="name"
              label="Responsável pela entrevista"
              fullWidth
            />
            <TextField
              margin="dense"
              autoFocus
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              id="name"
              label="Data da entrevista"
              fullWidth
            />
            <TextField
              margin="dense"
              autoFocus
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              id="name"
              label="Horario da entrevista"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleClose}>Agendar</Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <CurriculoContainer/>
      </Grid>
    </Grid>
  );
};
