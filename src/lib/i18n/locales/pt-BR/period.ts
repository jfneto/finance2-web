const period = {
  period: {
    model: 'Periodo',
    fields: {
      id: 'id',
      closed: 'Fechado',
      month: 'Mês',
      year: 'Ano',

      createdAt: 'criado em',
      updatedAt: 'atualizado em',
    },
    layout: {
      index: {
        title: 'Períodos',
        name: 'listagem dos periodos',
        content: 'pagina que lista todas os periodos',
      },
    },
  },
}

export { period }
