const category = {
  category: {
    model: 'Categoria',
    fields: {
      id: 'id',
      description: 'Descrição',
      categoryId: 'Categoria Pai',
      active: 'Ativo',
      categoryType: 'Tipo de Categoria',
      createdAt: 'criado em',
      updatedAt: 'atualizado em',
      showInDashboardActive: 'Contabilizar',
      showInLineGraphActive: 'Exibir no gráfico de linha',
    },
    layout: {
      index: {
        title: 'Categorias',
        showInDashboardActive: 'Contabilizar',
        showInLineGraph: {
          active: 'Exibir no gráfico de linha',
        },
      },
    },
  },
}

export { category }
