import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/system"

export const PageError = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", backgroundColor: "#1e62fe" }}>
      <Typography sx={{ userSelect: "none", color: "white", fontSize: "3rem", fontWeight: 600 }}>
        404
      </Typography>
      <Typography sx={{ userSelect: "none", color: "white", fontSize: "1.5rem", fontWeight: 500 }}>
        Ops! Parece que essa página não existe.
      </Typography>
      <Button variant="outlined" onClick={() => { navigate(-1) }} sx={{ fontWeight: 600, marginTop: "50px", color: "white", borderColor: "white", transition: "0.6s", '&:hover': { borderColor: "#040C2C", color: "#040C2C", transition: "0.6s" } }}>
        Retornar
      </Button>
    </Box>
  )
}
