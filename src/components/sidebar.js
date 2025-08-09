import React from 'react';
import { FiMenu } from 'react-icons/fi'
import './Sidebar.css'; // Estilo para a sidebar

function Sidebar({ isOpen }) {
  // URLs dos sites
  const githubUrl = 'https://github.com/DhenzelNexxus';
  const linkedinUrl = 'https://www.linkedin.com/in/dhenzel-lima-00aa39251/';
  const instagramUrl = 'https://www.instagram.com/dhenzel_nexxus/';

  // Função para abrir um link em uma nova janela ou guia do navegador
  const openExternalLink = (url) => {
    window.open(url, '_blank');
  };

  

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'close'}`}>
    
      <div className='itens-sidebar'>

        <h2>MENU</h2>
        
        {/* Botões com eventos de clique para abrir os links externos */}
        <button className='GitHub' onClick={() => openExternalLink(githubUrl)}>
          GitHub
        </button>
        <button className='Linkedin' onClick={() => openExternalLink(linkedinUrl)}>
          Linkedin
        </button>
        <button className='Instagram' onClick={() => openExternalLink(instagramUrl)}>
          Instagram
        </button>
        
        <footer>CepLocator</footer>
      </div>
    </div>
  );
}

export default Sidebar;
