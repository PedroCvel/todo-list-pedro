# 📝 Todo List – Projeto Colaborativo

Este repositório contém o projeto **Todo List**, que será usado como base para nossa prática de **Git em comunidade**.  
O objetivo é que você aprenda a contribuir para projetos reais, sabendo como utilizar e o que são **fork**, **pull requests**, **issues** e **workflows** do GitHub.

---

## 📂 Estrutura Inicial do Projeto

```
todo-list/
├── src/ # Código-fonte da aplicação
├── test/ # Arquivos de teste
└── README.md # Instruções do projeto
```

---

## Issues e Project Boards

Issues no GitHub servem para registrar bugs, ideias, tarefas e funcionalidades, facilitando a comunicação quando bem descritas e organizadas com títulos claros, descrições detalhadas e metadados como responsáveis, rótulos e marcos.

Projects integram issues e PRs em quadros personalizáveis (como Kanban), permitindo planejar e rastrear o trabalho de forma visual. Alterações no quadro atualizam as issues e vice-versa.

Vincular issues a PRs cria um fluxo completo: quando o PR é mesclado, a issue é fechada automaticamente, unindo planejamento e execução no mesmo ambiente.

---

## ⤴️ Fork e Pull Request

Fork e clone criam cópias de um repositório, mas com propósitos diferentes.

* Clone: comando Git que cria uma cópia completa local do repositório, usado quando há permissão de escrita no repositório original.
* Fork: recurso do GitHub que cria uma cópia do repositório na conta do usuário, útil para contribuir sem permissão de escrita, funcionando como um ambiente seguro.

Geralmente, faz-se o fork no GitHub e depois o clone desse fork para a máquina local.

Pull Request (PR) é uma proposta formal para mesclar alterações de um branch de um fork para o branch principal do repositório original. Além de solicitar a merge, serve como espaço para revisão de código, discussão e sugestões, garantindo colaboração e qualidade no projeto.

### Prática:
1. Realizar o fork do repositório presente em `https://github.com/Joao-Biederman/todo_git`
2. Realizar o clone do fork com `git clone git@github.com/SEU-USERNAME/NOME-DO-REPOSITORIO.git`
3. Configurar a upstream do repositório local com `git remote add upstream git@github.com:Joao-Biederman/todo_git.git`
4. Criar uma branch para subir as atualizações `git checkout -b feature/meu-primeiro-pr`
5. Realizar o commit e o push para seu repositório na núvem
6. Abrir o repositório original e solicitar um pull request

---

## GitHub Actions

**GitHub Actions** é a plataforma de automação do GitHub, onde **workflows** (definidos em arquivos YAML dentro de `.github/workflows`) são executados em resposta a **eventos** como push, PR ou criação de issues.
Cada workflow contém **jobs**, compostos por **steps** que podem ser comandos ou **actions** reutilizáveis do Marketplace.
Com configuração simples e ampla biblioteca de ações, o GitHub Actions transforma o GitHub em um ambiente de desenvolvimento automatizado e integrado.

### Prática:

1. Criar as pastas `.github/workflows`
2. Criar o arquivo `hello-world.yml`
```hello-world.yml
name: Hello World Workflow
on: push
jobs:
  saudar-job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do código
        uses: actions/checkout@v3
      - name: Executar script de saudação
        run: echo "Olá, mundo! O meu primeiro GitHub Action está funcionando."
```
3. Fazer commit do arquivo
4. Observar a aba actions no github imediatamente após o **push**

### Extra
Um script simples para testes de funcionalidades

Devido a estrutura do código não é possível realizar os testes no arquivo script.js pois ele está retornando por completo os conteúdos do html da página.
Portanto iremos criar um arquivo separado contendo as funções e exportando para serem utilizadas pelo arquivo de testes.

Para isso faremos uso dos arquivos na branch tests, dando merge nos mesmos para a main. Um arquivo de workflow sera criado para rodar automaticamente os testes em um ambiente node retornando o sucesso, ou falha dos testes realizados/

```main-tests.yml
name: Testar Funções Todo List

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout do código
      uses: actions/checkout@v4

    - name: Configurar Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'

    - name: Executar testes das funções
      run: node test-todo-functions.js
```