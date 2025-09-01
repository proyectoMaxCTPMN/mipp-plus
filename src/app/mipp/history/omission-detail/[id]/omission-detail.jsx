'use client'
import style from './omission-detail.module.css'
import Image from 'next/image'
import { useState } from 'react';
import {formatDateandHour } from '@/app/utils/formatDate'
import FormTemplate from '@/app/mipp/components/forms/FormTemplate';
import OmissionFormDetail from '@/app/mipp/components/forms/omission/detail/OmissionFormDetail';

export default function Omission_Formulary_Detail_Page({omissionf_parameter, fullName_parameter, position_parameter, title_parameter}) {
    console.log(omissionf_parameter)
    
    return(
        <div className={style.body}>
            <FormTemplate fullName_parameter={fullName_parameter.full_name}>

                <OmissionFormDetail
                    omissionf={omissionf_parameter}
                    PPfullName_parameter={fullName_parameter}
                    PPposition_parameter={position_parameter}
                    PPtitle_parameter={title_parameter}
                />
                <p className='mt-3'>Presento la solicitud a las <span>{formatDateandHour(omissionf_parameter.created_at).time}</span> del día <span>{formatDateandHour(omissionf_parameter.created_at).day}</span> del mes <span>{formatDateandHour(omissionf_parameter.created_at).month}</span> del año <span>{formatDateandHour(omissionf_parameter.created_at).year}</span></p>
            </FormTemplate>
        </div>
        
    )
} 
