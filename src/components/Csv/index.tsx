import React from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import DownloadIcon from "@mui/icons-material/Download";
import { useGetExportCsvEntrevistaMutation } from "shared/features/api/entrevista/entrevistaSlice";
import { useGetExportCsvCandidatosMutation } from "shared/features/api/candidato/candidatoSlice";
import { useLocation } from "react-router-dom";

export const Export = () => {
	const { pathname } = useLocation();
	const [getExportCsvEntrevista] = useGetExportCsvEntrevistaMutation();
	const [getExportCsvCandidatos] = useGetExportCsvCandidatosMutation();
	
	return (
		<>
			{pathname == "/agenda" && (
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
						onClick={() =>
							getExportCsvEntrevista()
								.unwrap()
								.then((response) => {
									const url = window.URL.createObjectURL(new Blob([response.data]));
									const link = document.createElement("a");
									link.href = url;
									link.setAttribute("download", `${Date.now()}.xlsx`);
									document.body.appendChild(link);
									link.click();
								})
						}
					>
						Exportar lista
					</Button>
				</Box>
			)}
			{pathname == "/resultado" && (
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
						onClick={() =>
							getExportCsvCandidatos()
								.unwrap()
								.then((response) => {
									const url = window.URL.createObjectURL(new Blob([response.data]));
									const link = document.createElement("a");
									link.href = url;
									link.setAttribute("download", `${Date.now()}.xlsx`);
									document.body.appendChild(link);
									link.click();
								})
						}
					>
						Exportar lista
					</Button>
				</Box>
			)}
		</>
	);
};
