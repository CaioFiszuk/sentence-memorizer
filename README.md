# Sentence Memorizer

## Índice
- [Descrição](#descrição)
- [Acesso](#acesso)
- [Funcionalidades principais](#funcionalidades-principais)
- [Uso da API](#uso-da-api-quotable)
- [Endpoints](#endpoints-utilizados)
- [Documentação](#documentação)

## Descrição
  **Sentence-Memorizer** é um site desenvolvido para ajudar usuários a memorizar frases.

## Acesso
  ### https://sentence-memorizer-frontend-git-stag-a1ebad-caio-lopes-projects.vercel.app/

### Funcionalidades principais:
- Adicionar frases personalizadas para memorização.
- Buscar frases motivacionais ou inspiradoras de uma API pública.
- Criar listas de frases para estudos.

---

### Uso da API `Quotable`

Este projeto utiliza a API pública [Quotable](http://api.quotable.io) para buscar frases famosas e inspiradoras. 

### Endpoints utilizados

- `GET /sentences` – lista todas as frases salvas
- `POST /sentences` – adiciona uma nova frase
- `PATCH /sentences/:id` – edita uma frase existente
- `DELETE /sentences/:id` – remove uma frase

### Tecnologias Utilizadas

- **CSS3**
- **React Js**
- **Node Js**
- **React-Modal**

#### Documentação
Para mais detalhes sobre os endpoints disponíveis, consulte a documentação oficial.
https://github.com/lukePeavey/quotable  

#### Contribuindo

Contribuições são bem-vindas!  
Sinta-se à vontade para abrir uma *issue* ou enviar um *pull request* com melhorias.

#### Licença

Este projeto está licenciado sob a [MIT License](LICENSE).