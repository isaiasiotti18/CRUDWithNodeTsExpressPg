import { Router } from 'express';
import ProdutoRepository from 'produto/produto-repository';

const route = Router();

const produtoRepository = new ProdutoRepository();

route.post('/create', async (request, response) => {
  const { nome, descricao, marca, categoria, preco } = request.body;

  const produto = {
    nome,
    descricao,
    marca,
    categoria,
    preco,
  };

  const criarProduto = await produtoRepository.create(produto);

  return response.json(criarProduto);
});

route.get('/list', async (request, response) => {
  const listaDeProdutos = await produtoRepository.read();

  return response.json(listaDeProdutos);
});

route.put('/update/:codigo', async (request, response) => {
  const { nome, descricao } = request.body;

  const codigo = Number(request.params.codigo);

  const atualizarProduto = await produtoRepository.update(codigo, {
    nome,
    descricao,
  });

  return response.json(atualizarProduto);
});

route.delete('/delete/:codigo', async (request, response) => {
  const codigo = Number(request.params.codigo);

  const deletarProduto = await produtoRepository.delete(codigo);

  return response.json(deletarProduto);
});

export default route;
