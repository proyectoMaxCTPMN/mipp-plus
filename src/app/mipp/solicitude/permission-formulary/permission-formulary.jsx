'use client'

import style from './permission-formulary.module.css'
import FormTemplate from '../../components/forms/FormTemplate'
import BasicAbsenceForm from '../../components/forms/absence/basic/BasicAbsenceForm'



export default function Permission_Formulary_Page({userId_parameter, fullName_parameter, title_parameter, position_parameter}){


    return(
        <div className={style.body}>
            <FormTemplate fullName_parameter={fullName_parameter.full_name}>
                < BasicAbsenceForm
                    title_parameter={title_parameter} 
                    position_parameter={position_parameter} 
                    userId_parameter={userId_parameter}
                    isEditable={true}
                />
            </FormTemplate>
        </div>
    )
}