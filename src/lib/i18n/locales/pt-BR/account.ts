const account = {
  account: {
    model: 'conta',
    fields: {
      id: 'id',
      accountTypeId: 'tipo da conta',
      accoutnTypeDesc: 'descrição da conta',
      name: 'nome',
      balance: 'saldo',
      active: 'ativo',
      bankAccountNumber: 'numero da conta',
      branBranchId: 'agencia',
      creditCardNumber: 'numero do cartão de crédito',
      createdAt: 'criado em',
      updatedAt: 'atualizado em',
    },
    layout: {
      index: {
        title: 'Contas',
        name: 'account',
        content: 'contas bancárias',
      },
    },
  },
}

export { account }
