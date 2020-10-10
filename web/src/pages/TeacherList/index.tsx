import React, { useState, FormEvent } from 'react'

import api from '../../services/api'

import PageHeader from '../../components/PageHeader'
import {TeacherItem, Teacher} from '../../components/TeacherItem'

import Input from '../../components/Input'
import Select from '../../components/Select'

import './styles.css'

export default function TeacherList(){
    const [ subject, setSubject ] = useState('')
    const [ week_day, setWeek_day ] = useState('')
    const [ time, setTime ] = useState('')

    const [ teachers, setTeachers ] = useState([]);

    async function searchTeachers(e: FormEvent){
        e.preventDefault()

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }

        })

        setTeachers(response.data)
    }

    return (
        <div id="page-teacher-list">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        name="subject" 
                        label="Matéria: "
                        value={subject}
                        onChange={
                            (e) => {
                                setSubject(e.target.value)
                            }
                        }
                        options={
                            [
                                {value: 'Matemática', label: 'Matemática'},
                                {value: 'Português', label: 'Português'},
                                {value: 'Biologia', label: 'Biologia'},
                                {value: 'Quimíca', label: 'Quimíca'},
                                {value: 'Física', label: 'Física'},
                                {value: 'História', label: 'História'},
                                {value: 'Geografia', label: 'Geografia'},
                                {value: 'Sociologia', label: 'Sociologia'},
                                {value: 'Filosofia', label: 'Filosofia'},
                                {value: 'Educação Física', label: 'Educação Física'},
                                {value: 'Artes', label: 'Artes'},

                            ]
                        }                    
                    />
                    <Select 
                        name="week_day" 
                        label="Dia da semana: "
                        value={week_day}
                        onChange={
                            (e) => {
                                setWeek_day(e.target.value)
                            }
                        }
                        options={
                            [
                                {value: '0', label: 'Domingo'},
                                {value: '1', label: 'Segunda'},
                                {value: '2', label: 'Terça'},
                                {value: '3', label: 'Quarta'},
                                {value: '4', label: 'Quinta'},
                                {value: '5', label: 'Sexta'},
                                {value: '6', label: 'Sabádo'},
                            ]
                        }                    
                    />
                    <Input 
                        name="time" 
                        label="Hora" 
                        type="time"
                        value={time}
                        onChange={
                            (e) => {
                                setTime(e.target.value)
                            }
                        }
                    />

                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {
                    teachers.map((teacher: Teacher)=>{
                        return <TeacherItem key={teacher.id} teacher={teacher}/>
                    })
                }
            </main>
        </div>
    )
}