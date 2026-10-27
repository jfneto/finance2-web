const person = {
  person: {
    model: 'Pessoa',
    fields: {
      id: 'id',
      name: 'nome',
      personType: 'Tipo de Pessoa',
      createdAt: 'criado em',
      updatedAt: 'atualizado em',
    },
    personType: {
      F: 'Pessoal Física',
      J: 'Pessoa Jurídica',
    },
    layout: {
      index: {
        title: 'Pessoas',
        name: 'lista de pessoas',
        content: 'contem uma lista com todas as pessoas cadastradas e que podem participar de um movimento',
      },
      form: {
        IsPF: 'é pessoa física',
      },
    },
  },
}

export { person }
