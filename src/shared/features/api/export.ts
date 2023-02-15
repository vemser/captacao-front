import axios from "axios";
import { getToken } from "shared/utils/getToken";

const token = getToken()

export const getResultadosExcel = async () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/vemser/captacao-back/candidato/export-xlsx`, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        responseType: 'blob'
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'candidatos-aprovados.xlsx');
        document.body.appendChild(link);
        link.click();
    })
};
export const getEntrevistasExcel = async () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/vemser/captacao-back/entrevista/export-xlsx`, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        responseType: 'blob'
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'entrevistas-agendadas.xlsx');
        document.body.appendChild(link);
        link.click();
    })
}

