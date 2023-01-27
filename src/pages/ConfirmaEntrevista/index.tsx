import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useConfirmaEntrevistaMutation } from "shared/features/api/entrevista/entrevistaSlice";

export const ConfirmaEntrevista: React.FC = () => {
  let [searchParams] = useSearchParams()

  let token = searchParams.get('tokenEntrevista');
 const [confirmaEntrevista] = useConfirmaEntrevistaMutation()
 
  

  useEffect(()=>{
    confirmaEntrevista(`${token}`)
  }, [token])

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
      bgcolor="#1e62fe"
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        src={require("../../assets/logo-white.webp")}
        style={{ width: "50%" }}
      />
    </Box>
  );
};
