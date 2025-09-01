import { Link } from 'react-router-dom'
import style from './dashboard.module.css'

import {useAuthValue} from '../../context/AuthContext'  //para pegarmos os dados do usuário
import {useFetchDocument} from '../../hooks/useFetchDocuments' //para pegarmos os itens do usuário
const Dashboard = () => {
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard