import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useConfirmaEntrevistaMutation } from "shared/features/api/entrevista/entrevistaSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const ConfirmaEntrevista: React.FC = () => {
	let [searchParams] = useSearchParams();

	let token = searchParams.get("tokenEntrevista");
	const [confirmaEntrevista] = useConfirmaEntrevistaMutation();

	useEffect(() => {
		confirmaEntrevista(`${token}`);
	}, [token]);

	return (
		<Box
			display="flex"
			alignItems="center"
			flexDirection="column"
			justifyContent="center"
			width="100vw"
			height="100vh"
			bgcolor="#1e62fe"
			gap={4}
		>
			{/* eslint-disable-next-line jsx-a11y/alt-text */}

			<img
				src={require("../../assets/logo-white.webp")}
				style={{ width: "10%" }}
			/>
			<Typography display= "flex" gap={2}
    alignItems="center" fontSize="1.5rem" variant="h3" color="#ffff">
				Entrevista confirmada com sucesso{" "}
				<CheckCircleIcon
					sx={{
            alignItems:"center",
						color: "#90EE90",
					}}
				/>
			</Typography>
		</Box>
	);
};
