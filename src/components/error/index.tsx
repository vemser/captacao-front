import { Typography } from "@mui/material";
import React from "react";

interface IProps {
  id: string;
  children: React.ReactNode;
  width: string;
  marginLeft?: string;
}

export const Error: React.FC<IProps> = ({
  id,
  children,
  width,
}) => {
  return (
    <Typography
      id={id}
      sx={{ width: width }}
      variant="subtitle1"
      color="error"
      marginLeft="3px"
      fontSize="12px"
    >
      {children}
    </Typography>
  );
};
