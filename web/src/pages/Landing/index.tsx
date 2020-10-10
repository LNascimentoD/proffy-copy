import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import api from '../../services/api'

import logo from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClasses from '../../assets/images/icons/give-classes.svg'
import purpleHeart from '../../assets/images/icons/purple-heart.svg'

import './styles.css'

export default function Landing(){
    const [ totalConnections, setTotalConnections ] = useState(0)

    useEffect(
        () => {
            api.get('connections').then(response => {
                const { total } = response.data;
                setTotalConnections(total)
            })
        },[]
    )

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img alt="Proffy" src={logo}/> 
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img src={landingImg} className="hero-imagem" alt="Hero"/>

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img alt="Estudante" src={studyIcon}/> 
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img alt="Professor" src={giveClasses}/> 
                        Dar aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de { totalConnections } conexões já realizadas.
                    <img alt="Coração roxo" src={purpleHeart}/> 
                </span>
            </div>
        </div>
    )
}