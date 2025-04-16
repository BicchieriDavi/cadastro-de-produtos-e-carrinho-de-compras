(function () {
  let produtos = [];

  const cadastroProduto = function cadastroProduto(
    descricao,
    valorPF,
    valorPJ,
    qtdeMinima
  ) {
    produtos.push({
      codigo: String(Math.random().toFixed(3)),
      descricao: descricao,
      valorPF: valorPF,
      valorPJ: valorPJ,
      qtdeMinima: qtdeMinima,
    });
    return console.log(
      `Produto: ${descricao} cadastrado com sucesso! Agora temos ${
        produtos.length
      } ${
        produtos.length === 1 ? `produto cadastrado!` : `produtos cadastrados!`
      }`
    );
  };

  function Cliente(tipo) {
    const catalogo = [];
    this.tipo = tipo;
    this.carrinho = [];
    this.catalogoProdutos = function catalogoProdutos() {
      produtos.forEach((element, index) => {
        if (this.tipo === "PJ") {
          catalogo.push({
            codigo: element.codigo,
            descricao: element.descricao,
            preco: element.valorPJ,
          });
        } else {
          catalogo.push({
            codigo: element.codigo,
            descricao: element.descricao,
            preco: element.valorPF,
          });
        }
      });
      return console.table(catalogo);
    };
    this.modificarCarrinho = function modificarCarrinho(
      numCodigo,
      quantidade = false
    ) {
      if (!produtos[numCodigo]) {
        console.log(`Produto com índice ${numCodigo} não encontrado.`);
        return;
      }
      const produtoNumcodigo = produtos[numCodigo];

      const produtoNoCarrinho = this.carrinho.find(
        (item) => item.codigo === produtoNumcodigo.codigo
      );

      if (quantidade === false) {
        if (produtoNoCarrinho) {
          produtoNoCarrinho.qtde += 1;
        } else {
          const novoItem = {
            codigo: produtoNumcodigo.codigo,
            descricao: produtoNumcodigo.descricao,
            preco:
              this.tipo === "PJ"
                ? produtoNumcodigo.valorPJ
                : produtoNumcodigo.valorPF,
            qtde: produtoNumcodigo.qtdeMinima,
          };
          this.carrinho.push(novoItem);
        }
      }

      if (quantidade <= 0 && produtoNoCarrinho) {
        this.removerDoCarrinho(numCodigo);
      } else if (quantidade >= produtoNumcodigo.qtdeMinima) {
        if (produtoNoCarrinho) {
          produtoNoCarrinho.qtde = quantidade;
        } else {
          const novoItem = {
            codigo: produtoNumcodigo.codigo,
            descricao: produtoNumcodigo.descricao,
            preco:
              this.tipo === "PJ"
                ? produtoNumcodigo.valorPJ
                : produtoNumcodigo.valorPF,
            qtde: quantidade,
          };
          this.carrinho.push(novoItem);
        }
      } else if (quantidade < produtoNumcodigo.qtdeMinima) {
        console.log(
          "Quantidade informada é menor que a quantidade mínima permitida"
        );
      }
    };

    this.removerDoCarrinho = function removerDoCarrinho(cod) {
      if (!produtos[cod]) {
        console.log(`Produto com índice ${numCodigo} não encontrado.`);
        return;
      }
      const codigoCarrinho = this.carrinho.findIndex((item) => {
        return item.codigo === produtos[cod].codigo;
      });
      if (codigoCarrinho !== -1) {
        this.carrinho.splice(codigoCarrinho, 1);
      }
    };
    this.fecharCarrinho = function fecharCarrinho() {
      const newArr = [];
      let valorTotal = 0;
      if (this.carrinho.length !== 0) {
        this.carrinho.forEach((element) => {
          newArr.push({
            Descrição: element.descricao,
            Quantidade: element.qtde,
            "Valor Unitário": element.preco,
            "Valor Total": element.qtde * element.preco,
          });
        });
        console.table(newArr);
        newArr.forEach((element, index) => {
          valorTotal += newArr[index]["Valor Total"];
        });
        this.aplicarDesconto(valorTotal);
      } else {
        console.log(`Carrinho do Cliente ${this.tipo} está vazio.`);
      }
    };
    this.aplicarDesconto = function aplicarDesconto(valorTotal) {
      if (this.tipo === "PJ" && valorTotal > 500) {
        console.log(
          `Total do carrinho com desconto: R$${(
            valorTotal -
            valorTotal * 0.1
          ).toFixed(2)}`
        );
      } else {
        console.log(`Total do carrinho: R$${valorTotal.toFixed(2)}`);
      }
    };
  }
  cadastroProduto("Produto A", 50, 40, 2);
  cadastroProduto("Produto B", 30, 25, 1);
  cadastroProduto("Produto C", 100, 90, 5);

  // Cliente PJ
  const clientePJ = new Cliente("PJ");
  clientePJ.catalogoProdutos();
  clientePJ.modificarCarrinho(0, 3); // código ficticio para o produto
  clientePJ.modificarCarrinho(1, 0); // código ficticio para o produto
  clientePJ.modificarCarrinho(2, -1); // código ficticio para o produto
  clientePJ.modificarCarrinho(99); // código ficticio para o produto

  clientePJ.fecharCarrinho();

  // Cliente PF
  const clientePF = new Cliente("PF");
  clientePF.catalogoProdutos();
  clientePF.modificarCarrinho(0, 2); // código ficticio para o produto
  clientePF.modificarCarrinho(0, 0); // código ficticio para o produto
  clientePF.removerDoCarrinho(1); // código ficticio para o produto
  clientePF.removerDoCarrinho(2, 1); // código ficticio para o produto
  clientePF.fecharCarrinho();
})();
