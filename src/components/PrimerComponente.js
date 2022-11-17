import React, {useState} from 'react'

export const PrimerComponente = () => {
    // let nombre = "Johan"
    let web = "johan.tanta.web.es"
    let cursos = [
        "Master en Javascript",
        "Master en HTML",
        "Master en PHP",
        "Master en CSS",
        "Master en React"
    ]

    const [nombre, setNombre] = useState("Victor") 
    const cambiarNombre = (nuevoNombre) => {
        setNombre(nuevoNombre)
    }
  return (
    <div>
        <h1>Mi primer componente</h1>
        <p>Este es un texto en mi componente</p>
        <p>Mi nombre es : <strong className={nombre.length >= 4 ? "verde" : "rojo"}>{nombre}</strong></p>
        <p>Mi web es : {web}</p>
        <input type="text" onChange={(e) => cambiarNombre(e.target.value)} placeholder="cambia tu nombre"></input>
        <button onClick={ () => setNombre("Pelicano") }>Cambiar</button>
        
        <h2>Cursos:</h2>
        <ul>
            {
                cursos.map((curso, indice) => {
                    return (<li key={indice}>
                        {curso}
                    </li>)
                })
            }
        </ul> 
    </div>
  )
}
