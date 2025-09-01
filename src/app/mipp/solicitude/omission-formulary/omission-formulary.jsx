'use client'

import FormTemplate from '../../components/forms/FormTemplate'
import style from './omission-formulary.module.css'
import OmissionForm from '../../components/forms/omission/OmissionForm'

export default function Omission_Formulary_Page({fullName_parameter, userId_parameter}) {


    return(
    <div className={style.body}>
        <FormTemplate fullName_parameter={fullName_parameter.full_name}>
            <OmissionForm 
                userId_parameter={userId_parameter}
            />
        </FormTemplate>
    </div>
)}