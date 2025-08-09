import React, { useState } from "react";
import { FiSearch, FiMenu } from "react-icons/fi";
import "./style.css";
import Sidebar from "./components/sidebar";
import api from "./services/api";
import maskCep from "./utils/mask";
import { FiMapPin, FiHome, FiMap, FiGlobe, FiPhone, FiHash } from "react-icons/fi";

function App() {
  const [input, setInput] = useState("");
  const [cepData, setCepData] = useState(null);
  const [focus, setFocus] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSearch() {
    if (input === "" || input === "00000-000") {
      setErrorMsg("⚠ Informe um CEP válido!");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      const response = await api.get(`${input}/json`);
      if (response.data.erro) {
        setErrorMsg("❌ CEP não encontrado!");
        setCepData(null);
      } else {
        setCepData(response.data);
        setInput("");
      }
    } catch {
      setErrorMsg("🚨 Erro ao requisitar a API");
      setCepData(null);
    } finally {
      setLoading(false);
    }
  }

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function toggleCloseSidebar() {
    if (isSidebarOpen) setIsSidebarOpen(false);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") handleSearch();
  }

  return (
    <div className="container" onClick={toggleCloseSidebar}>
      <div className="menu-icon-left" onClick={toggleSidebar}>
        <FiMenu size={25} color={isSidebarOpen ? "#000" : "#fff"} />
      </div>

      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      <h1 className="title">📍 CEPLOCATOR</h1>
      <p className="subtitle">
        Encontre informações detalhadas de qualquer CEP do Brasil
      </p>

      <div className={focus ? "containerInputFocus" : "containerInput"}>
        <input
          type="text"
          placeholder="Digite o CEP... (ex: 01001-000)"
          value={input}
          onChange={(e) => setInput(maskCep(e.target.value))}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          maxLength={9}
          inputMode="numeric"
          onKeyDown={handleKeyPress}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          {loading ? (
            <span className="loader"></span>
          ) : (
            <FiSearch size={25} color="#000" />
          )}
        </button>
      </div>

      {errorMsg && <p className="error">{errorMsg}</p>}

      {cepData && (
        <main className="cep-info">
          <h2>
            <FiMapPin /> CEP: <span>{cepData.cep}</span>
          </h2>
          <ul className="cep-list">
            <li>
              <FiHome /> <strong>Logradouro:</strong>{" "}
              {cepData.logradouro || "Não informado"}
            </li>
            <li>
              <FiMap /> <strong>Bairro:</strong>{" "}
              {cepData.bairro || "Não informado"}
            </li>
            <li>
              <FiGlobe /> <strong>Cidade:</strong> {cepData.localidade} -{" "}
              {cepData.uf}
            </li>
            <li>
              <FiPhone /> <strong>DDD:</strong> {cepData.ddd}
            </li>
            <li>
              <FiHash /> <strong>Código IBGE:</strong> {cepData.ibge}
            </li>
            <li>
              <FiHash /> <strong>Código SIAFI:</strong> {cepData.siafi}
            </li>
            {cepData.complemento && (
              <li>
                <FiHome /> <strong>Complemento:</strong> {cepData.complemento}
              </li>
            )}
          </ul>
        </main>
      )}
    </div>
  );
}

export default App;
