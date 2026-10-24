const accountType = {
  accountType: {
    fields: {
      id: 'id',
      description: 'descrição',
      active: 'ativo',
      createdAt: 'criado em',
      updatedAt: 'atualizado em',
    },
    layout: {
      index: {
        title: 'Tipo de Contas',
        name: 'account-type',
        content: 'tipo de contas bancárias',
      },
    },
  },
}

export { accountType }
