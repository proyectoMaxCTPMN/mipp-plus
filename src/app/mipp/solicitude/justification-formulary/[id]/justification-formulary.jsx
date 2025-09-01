'use client'


import FormTemplate from '@/app/mipp/components/forms/FormTemplate'
import style from './justification-formulary.module.css'
import BasicJustiForm from '@/app/mipp/components/forms/justification/basic/BasicJustiForm'

export default function Justification_Formulary_Page({userId_parameter, request_id_parameter, fullName_parameter, title_parameter, position_parameter, absenceData_parameter}){

    return(

    <div className={style.body}>
        <FormTemplate fullName_parameter={fullName_parameter.full_name}>
            <BasicJustiForm 
                fullName_parameter={fullName_parameter} 
                title_parameter={title_parameter} 
                position_parameter={position_parameter} 
                userId_parameter={userId_parameter}
                request_id_parameter={request_id_parameter}
                absenceData_parameter={absenceData_parameter}
                isEditable={true}
            />
        </FormTemplate>
    </div>
)}