import DataUsageIcon from '@mui/icons-material/DataUsage';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Tab,
    Typography,
    useMediaQuery,
} from "@mui/material";
import React from "react";
import {theme} from "shared/theme/index";
import {
    useRecuperarQuantidadeDePessoasInscritasPorEdicaoMutation,
    useRecuperarQuantidadeDePessoasInscritasPorEstadoMutation,
    useRecuperarQuantidadeDePessoasInscritasPorGeneroMutation,
    useRecuperarQuantidadeDePessoasInscritasPorNeurodiversidadeMutation,
    useRecuperarQuantidadeDePessoasInscritasPorPCDMutation
} from "shared/features/api/relatorios/relatoriosSlice";
import {TabContext, TabList, TabPanel} from "@mui/lab";

import {Pie, PieChart, Tooltip} from "recharts";


interface DadosGrafico {
    name: string;
    value: number;
}

export const Dashboard = () => {
    const [relatorioPCD, setRelatorioPCD] = React.useState<DadosGrafico[]>();
    const [relatorioEstados, setRelatorioEstados] = React.useState<DadosGrafico[]>();
    const [relatorioGeneros, setRelatorioGeneros] = React.useState<DadosGrafico[]>();
    const [relatorioNeurodiversidade, seRelatorioNeurodiversidade] = React.useState<DadosGrafico[]>();
    const [quantidadeInscritos, setQuantidadeInscritos] = React.useState<number>();

    const [recuperarQuantidadeDePessoasInscritasPorPCD] = useRecuperarQuantidadeDePessoasInscritasPorPCDMutation();
    const [recuperarQuantidadeDePessoasInscritasPorEdicao] = useRecuperarQuantidadeDePessoasInscritasPorEdicaoMutation();
    const [recuperarQuantidadeDePessoasInscritasPorEstado] = useRecuperarQuantidadeDePessoasInscritasPorEstadoMutation();
    const [recuperarQuantidadeDePessoasInscritasPorGenero] = useRecuperarQuantidadeDePessoasInscritasPorGeneroMutation();
    const [recuperarQuantidadeDePessoasInscritasPorNeurodiversidade] = useRecuperarQuantidadeDePessoasInscritasPorNeurodiversidadeMutation();
    const mdDown = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {

    }, []);


    const handleClickOpen = () => {
        recuperarQuantidadeDePessoasInscritasPorPCD()
            .unwrap()
            .then((edicao) => {
                setRelatorioPCD(edicao.map(pcdData => {
                        return {name: pcdData.pcd, value: pcdData.quantidade} as DadosGrafico
                    })
                );
            });

        recuperarQuantidadeDePessoasInscritasPorEdicao()
            .unwrap()
            .then((edicoes) => {
                setQuantidadeInscritos(edicoes.filter(ed => ed.edicao === 'VEMSER_12')[0].quantidade);
            });

        recuperarQuantidadeDePessoasInscritasPorEstado()
            .unwrap()
            .then((estados) => {
                setRelatorioEstados(estados.map(estadosData => {
                        return {name: estadosData.estado, value: estadosData.quantidade} as DadosGrafico
                    })
                );
            });

        recuperarQuantidadeDePessoasInscritasPorGenero()
            .unwrap()
            .then((generos) => {
                setRelatorioGeneros(generos.map(generoData => {
                        return {name: generoData.genero, value: generoData.quantidade} as DadosGrafico
                    })
                );
            });

        recuperarQuantidadeDePessoasInscritasPorNeurodiversidade()
            .unwrap()
            .then((neuros) => {
                seRelatorioNeurodiversidade(neuros.map(neuroData => {
                        return {name: neuroData.neurodiversidade, value: neuroData.quantidade} as DadosGrafico
                    })
                );
            });


        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const center = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <>
            {mdDown ? (
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
                    onClick={handleClickOpen}
                >
                    {<DataUsageIcon/>}
                </Button>
            ) : (
                <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DataUsageIcon/>}
                    sx={{
                        color: "primary.light",
                        borderColor: "primary.light",
                        "&:hover": {
                            color: "secondary.main",
                        },
                    }}
                    onClick={handleClickOpen}
                >
                    Dados da Edição
                </Button>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Dados da Edição</DialogTitle>
                <DialogContent>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <Typography variant="subtitle2" gutterBottom>
                            Total Inscritos: {quantidadeInscritos}
                        </Typography>
                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Por Estado" value="1"/>
                                    <Tab label="Por Genero" value="2"/>
                                    <Tab label="Por PCD" value="3"/>
                                    <Tab label="Por Neurodiversidade" value="4"/>
                                </TabList>
                            </Box>
                            <TabPanel value="1" style={center}>
                                <PieChart width={300} height={300}>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={true}
                                        data={relatorioEstados}
                                        outerRadius={100}
                                        fill="orangered"
                                        label
                                    />
                                    <Tooltip/>
                                </PieChart>
                            </TabPanel>


                            <TabPanel value="2" style={center}>
                                <PieChart width={300} height={300}>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={true}
                                        data={relatorioGeneros}
                                        outerRadius={100}
                                        fill="orangered"
                                        label
                                    />
                                    <Tooltip/>
                                </PieChart>

                            </TabPanel>

                            <TabPanel value="3" style={center}>
                                <PieChart width={300} height={300}>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={true}
                                        data={relatorioPCD}
                                        outerRadius={100}
                                        fill="orangered"
                                        label
                                    />
                                    <Tooltip/>
                                </PieChart>
                            </TabPanel>

                            <TabPanel value="4" style={center}>
                                <PieChart width={300} height={300}>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={true}
                                        data={relatorioNeurodiversidade}
                                        outerRadius={100}
                                        fill="orangered"
                                        label
                                    />
                                    <Tooltip/>
                                </PieChart>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
