interface PersonSimple {
  id: number | undefined
  name: string
}

interface Person {
  id: number | undefined
  name: string
  person_type: string

  created_at?: string
  updated_at?: string
}

export type { Person, PersonSimple }
