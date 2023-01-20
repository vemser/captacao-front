import React from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import DownloadIcon from "@mui/icons-material/Download";
import { useLocation } from "react-router-dom";
import {
	getEntrevistasExcel,
	getResultadosExcel,
} from "shared/features/api/export";

export const Export = () => {
	const { pathname } = useLocation();

	return (
		<>
			{(pathname == "/agenda" || pathname == "/resultado") && (
				<Box display="flex" justifyContent="flex-end">
					<Button

						variant="outlined"
						color="secondary"
						startIcon={<DownloadIcon />}
						sx={{
						
							color: "primary.light",
							borderColor: "primary.light",
							"&:hover": {
								color: "secondary.main",
							},

						}}
						onClick={() => getEntrevistasExcel()}
					>
						Exportar lista
					</Button>
				</Box>
			)}
			{/* {pathname == "/resultado" && (
				<Box width="80%" display="flex" justifyContent="flex-end">
					<Button
						variant="outlined"
						color="secondary"
						startIcon={<DownloadIcon />}
						sx={{
							color: "primary.light",
							borderColor: "primary.light",
							"&:hover": {
								color: "secondary.main",
							},
						}}
						onClick={() => getResultadosExcel()}
					>
						Exportar lista
					</Button>
				</Box>
			)} */}
		</>
	);
};
