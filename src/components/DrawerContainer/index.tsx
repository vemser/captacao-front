import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
	AppBar,
	Box,
	CssBaseline,
	Drawer,
	IconButton,
	List,
	ListItem,
	Button,
	Toolbar,
	Typography,
	Avatar,
	Badge,
	Divider,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import {
	Edit,
	ArrowBackIosSharp,
	ExitToApp,
	DisplaySettings,
} from "@mui/icons-material";
import { menuItems } from "shared/utils/menuItems";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoBlue from "../../assets/logo-blue.webp";
import {
	useChangeImageMutation,
	useGetLoggedUserQuery,
} from "shared/features/api/usuario/authSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { toast } from "react-toastify";
import { Configurations } from "components/Configurations";
import { Export } from "components/ExportarExcel";

const drawerWidth = 240;

interface Props {
	window?: () => Window;
	children: React.ReactNode;
}

export const DrawerContainer = (props: Props) => {
	const { data } = useGetLoggedUserQuery();

	const [changeImage] = useChangeImageMutation();
	const [selectedImage, setSelectedImage] = React.useState<any>(null);
	const [imagemBase, setImagemBase] = React.useState<any>(data?.imagem);

	const { pathname } = useLocation();
	const navigate = useNavigate();

	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const changeAvatar = async () => {
		const formData = new FormData();

		if (selectedImage) {
			formData.append("imagem", selectedImage);

			await toast.promise(
				changeImage(formData)
					.unwrap()
					.then(() => {
						setImagemBase(selectedImage);
						setSelectedImage(null);
					}),
				{
					pending: "Carregando...",
					success: "Foto modificada com sucesso!",
					error: "Houve um erro ao modificar a foto",
				}
			);
		}
	};

	const drawer = (
		<div>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					gap: 2,
					py: 2,
				}}
			>
				<Box
					component="img"
					src={logoBlue}
					alt="logo"
					sx={{
						width: 120,
					}}
				/>
				<Badge
					overlap="circular"
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
					sx={{ cursor: "pointer" }}
					badgeContent={
						<Box
							sx={{
								backgroundColor: "background.paper",
								color: "primary.main",
								p: "4px",
								boxShadow: 1,
								borderRadius: "50%",
							}}
						>
							<Box>
								<label htmlFor="input-file">
									<Edit
										sx={{
											fontSize: 28,
											color: "primary.main",
											cursor: "pointer",
										}}
									/>
									<input
										style={{ display: "none" }}
										id="input-file"
										type="file"
										onChange={(e: any) => {
											if (e.target.files && e.target.files.length > 0) {
												setSelectedImage(e.target.files[0]);
											}
										}}
									/>
								</label>
							</Box>
						</Box>
					}
				>
					{imagemBase === null && selectedImage === null ? (
						<svg data-testid="AccountCircleSharpIcon">
							<AccountCircleIcon color={"disabled"} />
						</svg>
					) : imagemBase === null && selectedImage !== null ? (
						<Avatar
							alt="Avatar"
							style={{
								width: 120,
								height: 120,
								border: "2px solid",
								borderColor: "primary.main",
							}}
							src={URL.createObjectURL(selectedImage)}
						/>
					) : imagemBase !== null && selectedImage !== null ? (
						<Avatar
							style={{
								width: 120,
								height: 120,
								border: "2px solid",
								borderColor: "primary.main",
							}}
							src={URL.createObjectURL(selectedImage)}
						/>
					) : (
						<Avatar
							sx={{
								width: 120,
								height: 120,
								border: "2px solid",
								borderColor: "primary.main",
							}}
							alt="Avatar"
							src={
								imagemBase != undefined
									? URL.createObjectURL(imagemBase)
									: `data:image/png;base64, ${data?.imagem}`
							}
						/>
					)}
				</Badge>
				{selectedImage !== null && (
					<Button onClick={() => changeAvatar()}>Alterar Foto</Button>
				)}
				<Typography
					variant="body1"
					component="p"
					sx={{ fontWeight: 600, textTransform: "capitalize" }}
				>
					<Box
						component="span"
						sx={{ color: "primary.main", display: "inline", mr: "2px" }}
					>
						Olá,
					</Box>

					{" " + data?.login.split(".").join(" ")}
				</Typography>
			</Toolbar>
			<Divider />
			<List
				sx={{
					marginTop: -1,
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						minHeight: "calc(100vh - 310px)",
					}}
				>
					<List>
						{menuItems.map((item) => (
							<ListItem key={item.text} disablePadding>
								<Button
									component={Link}
									startIcon={item.icon}
									size="large"
									id={`menu-${item.text}`}
									color={pathname.includes(item.path) ? "primary" : "inherit"}
									to={item.path}
									sx={{
										width: "100%",
										px: 4,
										justifyContent: "start",
										gap: {
											xs: 0,
											lg: 2,
										},
									}}
								>
									{item.text}
								</Button>
							</ListItem>
						))}
					</List>
					<Button
						startIcon={<ExitToApp />}
						size="large"
						id="menu-sair"
						sx={{
							px: 4,
							justifyContent: "start",
							gap: {
								xs: 0,
								lg: 2,
							},
						}}
						onClick={() => {
							localStorage.removeItem("token");
							navigate("/");
						}}
					>
						Sair
					</Button>
				</Box>
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 2,
					}}
				>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					{pathname !== "/candidatos" && (
						<IconButton aria-label="voltar" onClick={() => navigate(-1)}>
							<ArrowBackIosSharp sx={{ color: "primary.light" }} />
						</IconButton>
					)}
					<Typography variant="h6" noWrap component="div">
						{menuItems.find((item) => item.path === pathname)?.text}
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					{(pathname === "/agenda" || pathname === "/resultado") && <Export />}

					<Configurations />
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				{props.children}
			</Box>
		</Box>
	);
};
