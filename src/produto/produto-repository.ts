import { Produto } from '@prisma/client';
import prisma from '../config/database/prisma';

interface CriarProdutoDto {
  nome: string;
  descricao: string;
  marca: string;
  categoria: string;
  preco: number;
}

interface AtualizarProdutoDto {
  nome: string;
  descricao: string;
}

export default class ProdutoRepository {
  async create(produto: CriarProdutoDto): Promise<Produto> {
    const novoProduto = await prisma.produto.create({
      data: {
        ...produto,
      },
    });

    return novoProduto;
  }

  async read(): Promise<Produto[]> {
    const listaDeProdutos = await prisma.produto.findMany();

    return listaDeProdutos;
  }

  async update(
    codigo: number,
    atualizarProdutoDto: AtualizarProdutoDto,
  ): Promise<Produto> {
    const produto = await prisma.produto.findUnique({
      where: {
        codigo,
      },
    });

    if (!produto) {
      throw new Error('Produto não encontrado...');
    }

    const atualizarProduto = await prisma.produto.update({
      where: {
        codigo,
      },
      data: {
        ...atualizarProdutoDto,
      },
    });

    return atualizarProduto;
  }

  async delete(codigo: number): Promise<void> {
    const produto = await prisma.produto.findUnique({
      where: {
        codigo,
      },
    });

    if (!produto) {
      throw new Error('Produto não encontrado...');
    }

    await prisma.produto.delete({
      where: {
        codigo,
      },
    });
  }
}
