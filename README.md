<p align="center">
  <img src="src/assets/Search-cep-informations_logo.png" alt="CepLocator" width="400" />
</p>

# CepLocator

Aplicação web onde o usuário informa um CEP e recebe automaticamente as informações relacionadas a ele, como endereço, bairro, cidade e estado, utilizando integração com a API pública [ViaCEP](https://viacep.com.br/).

**Demo online:** [search-cep-informations.vercel.app](https://search-cep-informations.vercel.app/)

## Funcionalidades

- Busca de informações de endereço a partir de um CEP brasileiro.
- Máscara automática de digitação no formato `00000-000`.
- Busca ao clicar no botão de lupa ou ao pressionar Enter.
- Exibição de logradouro, bairro, cidade/UF, DDD, código IBGE, código SIAFI e complemento (quando disponíveis).
- Indicador de carregamento durante a requisição à API.
- Tratamento de erros para CEP inválido, CEP não encontrado e falha na requisição.
- Menu lateral (sidebar) com links para GitHub, LinkedIn e Instagram do autor.

## Tecnologias utilizadas

- [React](https://react.dev/) 18 (bootstrapped com [Create React App](https://github.com/facebook/create-react-app))
- [Axios](https://axios-http.com/) para as chamadas HTTP
- [Styled Components](https://styled-components.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Input Mask](https://github.com/sanniassin/react-input-mask)
- API [ViaCEP](https://viacep.com.br/) para consulta dos dados de CEP

## Como rodar o projeto localmente

Pré-requisitos: [Node.js](https://nodejs.org/) e npm instalados.

```bash
# Clone o repositório
git clone https://github.com/DhenzelNxs/Search-cep-informations.git
cd Search-cep-informations

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

### Outros scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia a aplicação em modo de desenvolvimento. |
| `npm test` | Executa os testes em modo interativo (watch). |
| `npm run build` | Gera a build de produção na pasta `build`. |

## Estrutura do projeto

```text
src/
├── assets/          # Imagens e logo
├── components/      # Componentes reutilizáveis (ex: Sidebar)
├── services/        # Configuração da API (Axios + ViaCEP)
├── utils/           # Funções utilitárias (ex: máscara de CEP)
├── App.js           # Componente principal da aplicação
└── index.js         # Ponto de entrada da aplicação
```
