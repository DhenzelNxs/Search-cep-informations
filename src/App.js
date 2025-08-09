import React, { useState } from 'react';
import { FiSearch, FiMenu } from 'react-icons/fi'; // Importe o ícone do menu
import './style.css';
import Sidebar from './components/sidebar'; // Importe o componente da sidebar
import api from './services/api';
import maskCep from './utils/mask';

function App() {

  const [input, setInput] = useState("")
  const [infoCep, setInfoCep] = useState("")
  const [localidade, setLocalidade] = useState("")
  const [uf, setUf] = useState("")
  const [ddd, setDDD] = useState("")
  const [focus, setFocus] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)



  async function handleSearch(){
    if (input === '' || input == '00000-000'){
      alert("Informe algum CEP")
      return;
    }


    try{
      const response = await api.get(`${input}/json`)
      if (!response.data['localidade']){
        alert("CEP inexistente")
        setInput("")
        
      }else { 
      console.log(response.data)
      setInfoCep(input)
      setInput("")
      setLocalidade(response.data['localidade'])
      setUf(response.data['uf'])
      setDDD(response.data['ddd'])
      }
    }catch{
      alert("Ops!! Erro ao requisitar a API")
      setInput("")
    }
  }

  function toggleSidebar() {
    // Função para alternar a abertura/fechamento da sidebar
    setIsSidebarOpen(!isSidebarOpen);
  }

  function toggleCloseSidebar(){
    if (isSidebarOpen === true){
      setIsSidebarOpen(false)
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className="container" onClick={toggleCloseSidebar}>
      )
      {/* Ícone do menu à esquerda */}
      <div className="menu-icon-left" onClick={toggleSidebar}>
        <FiMenu size={25} color={isSidebarOpen === false ? "#fff" : "#000"} />
      </div>

      {/* Renderize a sidebar à esquerda se isSidebarOpen for verdadeiro */}
      {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}

      <h1 className="title">CEPLOCATOR</h1>

      <div className={focus === false ? 'containerInput' : 'containerInputFocus'}>
        <input 
        type="text"
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(cep) => setInput(maskCep(cep.target.value)) }
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        maxLength={9}
        inputMode='numeric'
        onKeyDown={handleKeyPress} 
      
        >
        </input>


        <button className='buttonSearch'
          onClick={handleSearch}
        
        >
          
            <FiSearch size={25} color="#000"/>
          
        </button>
      </div>

      <main className='main'>
        <h2>CEP: {infoCep}</h2>

        <span>Localidade: {localidade}</span>
        <span>UF: {uf}</span>
        <span>DDD: {ddd}</span>
      </main>
      
    </div>
  );
}

export default App;
