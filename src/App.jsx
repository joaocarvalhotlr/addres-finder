import {useState} from 'react';
import {FiSearch} from 'react-icons/fi';
import './styles.css';
import api from './services/api'


function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    //01001000/json/
    if(input === '') {
      alert("Preencha o campo de cep")
      return;
    }

    try {
      const response = await api.get(`${input}/json/`);
      console.log(response.data);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Insira um CEP válido");
      setInput("");
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu cep..." value={input} onChange={(e) => setInput(e.target.value)}/>
        <button className="buttonSearch" onClick={handleSearch}><FiSearch size={21} color="#fff"/></button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
         <h2>CEP: {cep.cep}</h2>
         <span><strong>Logradouro:</strong> {cep.logradouro}</span>
         <span><strong>Bairro:</strong> {cep.bairro}</span>
         <span><strong>Cidade:</strong> {cep.localidade}</span>
         <span><strong>Estado:</strong> {cep.uf}</span>
       </main>
      )};    
    </div>
  );
}

export default App;
