export interface GETCONTACLIST {
  contact: contact[]
}

export interface contact {
  first_name: string
  id: number
  last_name: string
  phones: phones[]
}

export type phones = {
  number: string
}