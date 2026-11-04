import type { Moviment } from '@features/moviments/moviment'
import type { Transaction } from '@lib/ofx'

const convertTransactionToMoviment = (transaction: Transaction): Moviment => {
  const credit = transaction.credit as boolean

  const tmpParcels = transaction.memo?.match('PARC \\d\\d/\\d\\d ') || undefined
  let parcels = ['1', '1']
  if (tmpParcels !== null && tmpParcels !== undefined && transaction !== undefined) {
    parcels = tmpParcels
      .toString()
      .substring(5, tmpParcels.toString().length - 1)
      .split('/')
  }

  return {
    // eslint-disable-next-line camelcase
    cred_deb_type: credit ? 0 : 1,
    details: {
      description: transaction.memo || '',
      // eslint-disable-next-line camelcase
      fit_id: transaction.fitId || '',
      // eslint-disable-next-line camelcase
      num_docto: '',
      // eslint-disable-next-line camelcase
      number_parcels: Number(parcels[1]),
      parcel: Number(parcels[0]),
      value: String(transaction.amount),
      // eslint-disable-next-line camelcase
      payd_value: '0',
    },
    // eslint-disable-next-line camelcase
    payment_form: undefined,
    // eslint-disable-next-line camelcase
    dt_emission: transaction.dtPosted || '',
    // eslint-disable-next-line camelcase
    dt_due: transaction.dtPosted || '',
  }
}

export { convertTransactionToMoviment }
