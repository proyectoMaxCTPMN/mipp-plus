'use client'

import style from './infra-formulary.module.css'
import FormTemplate from '../../components/forms/FormTemplate';
import ReportForm from '../../components/forms/report/ReportForm';



export default function Infra_Formulary_Page({fullName_parameter, userId_parameter}) {

    return(
        <div className={style.body}>
            <FormTemplate fullName_parameter={fullName_parameter.full_name} >
                <ReportForm userId_parameter={userId_parameter}/>
            </FormTemplate>
        </div>
    )
}