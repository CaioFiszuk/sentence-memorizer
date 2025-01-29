# Sentence Memorizer

## https://sentence-memorizer-frontend.vercel.app/

Sentence-Memorizer é um site desenvolvido para ajudar usuários a memorizar frases.

### Funcionalidades principais:
- Adicionar frases personalizadas para memorização.
- Buscar frases motivacionais ou inspiradoras de uma API pública.
- Criar listas de frases para estudos.

---

### Uso da API `Quotable`

Este projeto utiliza a API pública [Quotable](http://api.quotable.io) para buscar frases famosas e inspiradoras. 

#### Endpoints utilizados:
- **`GET /random`**: Retorna uma citação aleatória.

#### Exemplos:
- Obter uma citação aleatória: 
  ```bash
  curl http://api.quotable.io/random

#### Documentação
Para mais detalhes sobre os endpoints disponíveis, consulte a documentação oficial.
https://github.com/lukePeavey/quotable  