import { Grid } from "@mui/material";
import { objeto } from "shared/utils/states";
import { CurriculoContainer } from "../../components/CurriculoContainer";

export const ResultCurriculum = () => {
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ height: "calc(100vh - 100px)", width: "100%" }}
      >
        <CurriculoContainer resposta={objeto} />
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{ height: "calc(100vh - 100px)", width: "100%" }}
      ></Grid>
    </Grid>
  );
};
