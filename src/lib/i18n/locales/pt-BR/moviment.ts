const moviment = {
  moviment: {
    model: 'Movimentos',
    fields: {
      id: 'id',
      credDebType: 'tipo',
      description: 'Descrição',
      value: 'Valor',
      dtDue: 'Vencimento',
      dtEmission: 'Emissão',
      categoryId: 'Categoria',
      fitId: 'FIT ID - Banco',
      obs: 'Observação',
      numberParcels: 'Número de Parcelas',
      parcel: 'Parcela',
      paymentFormId: 'Forma de Pagamento',
      payd: 'Pago',
      personId: 'Pessoa',
      createdAt: 'criado em',
      updatedAt: 'atualizado em',
    },
    layout: {
      index: {
        title: 'Movimentos',
      },
    },
    messages: {
      cannotEditPaydMoviment: 'Não é possível editar um movimento que já foi pago.',
    },
  },
}

export { moviment }
