# 💻 Desafio - Cadastro de Produtos e Carrinho de Compras (em JS Puro)

## 🧠 Objetivo

Criar um sistema simples para cadastrar produtos e permitir que um cliente (PF ou PJ) interaja com um catálogo de produtos e gerencie um carrinho de compras.

---

## ✅ Regras

### 1. Cadastro de Produtos

- Criar um array chamado `produtos`.
- Cada produto é um objeto com:
  - `codigo` (string, gerado aleatoriamente)
  - `descricao` (string)
  - `valorPF` (number — preço para pessoa física)
  - `valorPJ` (number — preço para pessoa jurídica)
  - `qtdeMinima` (number — quantidade mínima por pedido)

### 2. Função de Cadastro

- Função `cadastrarProduto` recebe os dados e adiciona ao array `produtos`.
- Exibe mensagem de confirmação e contagem de produtos.

### 3. Cliente

- Representado por um objeto:
  - `tipo` (PF ou PJ)
  - `carrinho` (array)

### 4. Catálogo de Produtos

- Função `catalogoProdutos()` mostra todos os produtos.
- Exibe apenas os preços referentes ao tipo de cliente (PF ou PJ).
- Não mostra a quantidade mínima.

### 5. Modificar Carrinho

- Função `modificarCarrinho(codigo, quantidade)`
- Se `quantidade` não informada, adiciona 1 (ou a quantidade mínima).
- Se informada, valida se:
  - é igual a 0 → remove
  - é >= qtdeMinima → adiciona/modifica
  - é < qtdeMinima → rejeita

### 6. Remover do Carrinho

- Função `removerDoCarrinho(codigo)` remove um item do carrinho.

### 7. Fechar Carrinho

- Função `fecharCarrinho()`:
  - Mostra tabela com:
    - Descrição
    - Quantidade
    - Valor Unitário
    - Valor Total
  - Exibe o valor total da compra.

---

## 🏅 Desafio Extra

- Função `aplicarDesconto()`: se cliente for PJ e total > 500, aplicar 10% de desconto.

---

## 🧪 Exemplo de Uso

```js
// Cadastro de produtos
cadastrarProduto("Produto A", 50, 40, 2);
cadastrarProduto("Produto B", 30, 25, 1);
cadastrarProduto("Produto C", 100, 90, 5);

// Cliente PJ
const clientePJ = new Cliente("PJ");
clientePJ.catalogoProdutos();
clientePJ.modificarCarrinho(0, 3);
clientePJ.modificarCarrinho(1, 0);
clientePJ.modificarCarrinho(2, -1);
clientePJ.modificarCarrinho(99); // inválido
clientePJ.fecharCarrinho();

// Cliente PF
const clientePF = new Cliente("PF");
clientePF.catalogoProdutos();
clientePF.modificarCarrinho(0, 2);
clientePF.modificarCarrinho(0, 0);
clientePF.removerDoCarrinho(1);
clientePF.removerDoCarrinho(2);
clientePF.fecharCarrinho();
```
