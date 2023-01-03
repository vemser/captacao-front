import { Grid } from '@mui/material'
import { CurriculoContainer } from '../../components/CurriculoContainer'

export const Curriculo = () => {
  const objeto = {
    nome: 'João da Silva',
    email: 'joao@email.com',
    rg: '123456789',
    cpf: '123.456.789-00',
    telefone: '11 99999-9999',
    estado: 'SP',
    cidade: 'São Paulo',
    dataNascimento: '01/01/2000',
    neurodiversidade: 'Não informado',
    matriculado: true,
    turno: 'MANHA',
    instituicao: 'Universidade XYZ',
    curso: 'Ciência da Computação',
    ingles: 'Intermediário',
    espanhol: 'Básico',
    orientacao: 'Desenvolvimento de software',
    genero: 'Masculino',
    trilhas: ['Front-end', 'Back-end', 'Mobile'],
    desafiosBoolean: true,
    problemasBoolean: false,
    reconhecimentoBoolean: true,
    altruismoBoolean: true,
    provaBoolean: false,
    efetivacaoBoolean: true,
    disponibilidadeBoolean: true,
    github: 'joaosilva',
    linkedin: 'joaosilva',
    curriculo: null,
    lgpdBoolean: true,
    resposta: 'string',
    deficiencia: false,
    configuracoes: 'string',
    motivo: 'string',
    algoimportante: 'string',
    linguagens: ""
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        pb: 2
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{ height: 'calc(100vh - 68px)', width: '100%' }}
      >
        <CurriculoContainer />
      </Grid>
    </Grid>
  )
}
