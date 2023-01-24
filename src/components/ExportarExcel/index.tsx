import React from "react";
import { Button, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import DownloadIcon from "@mui/icons-material/Download";
import { useLocation } from "react-router-dom";
import {
	getEntrevistasExcel,
	getResultadosExcel,
} from "shared/features/api/export";
import { theme } from "shared/theme/index";

export const Export = () => {
	const { pathname } = useLocation();
	const mdDown = useMediaQuery(theme.breakpoints.down("md"));

	const checarPagina = () => {
		if (pathname === "/agenda") {
			getEntrevistasExcel();
		} else if (pathname === "/resultado") {
			getResultadosExcel();
		}
	};

	return (
		<>
			{mdDown ? (
				<Box display="flex" justifyContent="flex-end">
					<Button
						variant="outlined"
						color="secondary"
						sx={{
							color: "primary.light",
							borderColor: "primary.light",
							"&:hover": {
								color: "secondary.main",
							},
						}}
						onClick={() => checarPagina()}
					>
						{<DownloadIcon />}
					</Button>
				</Box>
			) : (
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
						onClick={() => checarPagina()}
					>
						Exportar lista
					</Button>
				</Box>
			)}
		</>
	);
};
