# AppSenacCampinas

Aplicativo Ideia Viva, tem como objetivo a interação da comunidade escolar Senac Campinas com os projetos integradores dos cursos.
Nele é possível conhecer o que os alunos estão desenvolvendo, podendo colaborar oferecendo ajuda e/ou interagir pedindo auxílio.
Como repositório, poderá servir de estímulo e incentivo na elaboração de novos projetos.

# Desenvolvido em:
Plataforma Mobile> Ionic versão 3.20
Banco de Dados> Firebase Real Time Database da Google

Plataforma Web> Angular versão 5.1.0
Banco de Dados> o mesmo Firebase do App Mobile

# Para rodar:
Efetuar o comando git clone para clonar o repositório e depois executar o comando npm install para criar as dependencias (pasta node_modules).
É necessário tbém criar um projeto gratuito com um login gmail no Firebase Console:
(https://console.firebase.google.com)

# Arquivo necessário para rodar
Dentro da pasta src do projeto colocar o arquivo firebase-config.ts com a configuração do seu projeto no Firebase.
export const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
}

# Projeto Web Admin
Plataforma Web> Angular versão 5.1.0
Banco de Dados> o mesmo Firebase do App Mobile
Nome do Repositório aqui no Github - AppSenac

# Executar
Execute o projeto Mobile com o comando ionic serve
Execute o projeto Web com o comando ng serve

