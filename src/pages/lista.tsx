import { useState } from "react"


const Lista = () => {
  const lista = [
    {
      nome: 'Jorge',
      idade: 28,
      sexo: 'Masculino',
      isActive: false
    },
    {
      nome: 'João',
      idade: 31,
      sexo: 'Masculino',
      isActive: false
    },
    {
      nome: 'Pedro',
      idade: 26,
      sexo: 'Masculino',
      isActive: false
    },
    {
      nome: 'João Francisco',
      idade: 18,
      sexo: 'Masculino',
      isActive: false
    },
  ]

  const [array, setArray] = useState(lista)

  function trocarClasse(nome) {
    const newArray = array.map(item => {
      return item.nome === nome ? { ...item, isActive: !item.isActive} : item
    })
    setArray(newArray)
  }

  return (
    <div>
      <h1>Lista</h1>
      {array.map(item => (
        <div 
          key={item.nome} 
          className={`${item.isActive ? 'aberto' : 'fechado'}`}
          onClick={() => trocarClasse(item.nome)}
        >
          <div style={{borderBottom: '2px solid #ddd'}}>
            <ul style={{visibility: item.isActive ? 'visible' : 'hidden'}}>
              <li>{item.nome}</li>
              <li>{item.idade}</li>
              <li>{item.sexo}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Lista