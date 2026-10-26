const paymentForm = {
  paymentForm: {
    model: 'Forma de Pagamento',
    fields: {
      id: 'id',
      description: 'Descrição',
      account: {
        name: 'Descrição da Conta',
      },
      active: 'Ativo',
      isCC: 'É CC',
      dayDue: 'Dia de Vencto',
      isDefaultPaymentCc: 'É Pagto CC',
      categoryDesc: 'Descrição da Categoria',

      createdAt: 'criado em',
      updatedAt: 'atualizado em',
    },
    layout: {
      index: {
        title: 'Formas de Pagamento',
        name: 'formas de pagamento',
        content: 'pagina que lista todas as formas de pagamento disponíveis',
      },
    },
  },
}

export { paymentForm }
