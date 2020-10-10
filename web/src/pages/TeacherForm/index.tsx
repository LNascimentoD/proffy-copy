import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../services/api'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import TextArea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'

export default function TeacherForm(){
    const history = useHistory()

    const [ scheduleItems, setScheduleItems ]= useState([
        {
            week_day: 0,
            from: '',
            to: ''
        }
    ])

    const [ name, setName ] = useState('')
    const [ avatar, setAvatar ] = useState('')
    const [ whats, setWhats ] = useState('')
    const [ bio, setBio ] = useState('')

    const [ subject, setSubject ] = useState('')
    const [ cost, setCost ] = useState('')

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            {
                week_day: 0,
                from: '',
                to: ''
            }
        ])
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault()

        api.post('classes', {
            name,
            avatar,
            whatsapp: whats,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(()=>{
            alert('Cadastro realizado com sucesso!')

            history.push('/')
        }).catch(()=>{
            alert('Erro no cadastro!')
        })
    }

    function setScheduleItemValue(position: number, field: string, value: string){
        const updatedScheduleItems = scheduleItems.map(
            (scheduleItem, index)=>{
                if(index === position){
                    return {...scheduleItem, [field]: value}
                }

                return scheduleItem
            }
        )

        setScheduleItems(updatedScheduleItems)
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição."
            />

            <main>
                <form onSubmit={(handleCreateClass)}>
                    <fieldset>
                        <legend>Seus dados</legend>         
                        <Input 
                            name="name" 
                            label="Nome completo: " 
                            value={name} 
                            onChange={
                                (e) => {
                                    setName(e.target.value)
                                }
                            }
                        />
                        <Input 
                            name="avatar" 
                            label="Avatar: "
                            value={avatar}
                            onChange={
                                (e) => {
                                    setAvatar(e.target.value)
                                }
                            }
                        />
                        <Input 
                            name="whatsapp" 
                            label="Whatsapp: "
                            value={whats}
                            onChange={
                                (e) => {
                                    setWhats(e.target.value)
                                }
                            }
                        />
                        <TextArea 
                            name="bio" 
                            label="Biografria"
                            value={bio}
                            onChange={
                                (e) => {
                                    setBio(e.target.value)
                                }
                            }    
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>         
                        <Select 
                            name="subject" 
                            label="Matéria: "
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
                            value={subject}
                            onChange={
                                (e) => {
                                    setSubject(e.target.value)
                                }
                            }                    
                        />
                        <Input 
                            name="cost" 
                            label="Custo da hora por aula: "
                            value={cost}
                            onChange={
                                (e) => {
                                    setCost(e.target.value)
                                }
                            }
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>

                        {
                            scheduleItems.map(
                                (scheduleItem, index) => {
                                    return(
                                        <div key={scheduleItem.week_day} className="schedule-item">
                                            <Select 
                                                name="week_day" 
                                                label="Dia da semana: "
                                                value={scheduleItem.week_day}
                                                onChange={
                                                    e => {
                                                        setScheduleItemValue(index, 'week_day', e.target.value)
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
                                                name="from" 
                                                label="Das " 
                                                type="time"
                                                value={scheduleItem.from}
                                                onChange={
                                                    e => {
                                                        setScheduleItemValue(index, 'from', e.target.value)
                                                    }
                                                }
                                            ></Input>
                                            <Input 
                                                name="to" 
                                                label="Até " 
                                                type="time"
                                                value={scheduleItem.to}
                                                onChange={
                                                    e => {
                                                        setScheduleItemValue(index, 'to', e.target.value)
                                                    }
                                                }
                                            ></Input>
                                        </div>
                                    )
                                }
                            )
                        }
                    </fieldset>
                
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante!"/>
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}