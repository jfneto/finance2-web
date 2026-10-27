interface ConfirmOptions {
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
}

interface ConfirmState extends ConfirmOptions {
  open: boolean
}

const initialState: ConfirmState = {
  open: false,
  title: '',
  description: '',
  confirmLabel: 'Confirmar',
  cancelLabel: 'Cancelar',
  destructive: true,
}

let state = $state<ConfirmState>({ ...initialState })
let resolver: ((confirmed: boolean) => void) | undefined

const confirmDialog = (options: ConfirmOptions): Promise<boolean> => {
  if (resolver) {
    return Promise.resolve(false)
  }

  return new Promise((resolve) => {
    resolver = resolve
    Object.assign(state, initialState, options, { open: true })
  })
}

const resolveConfirm = (confirmed: boolean) => {
  const resolve = resolver
  resolver = undefined
  Object.assign(state, initialState)
  resolve?.(confirmed)
}

export type { ConfirmOptions }
export { confirmDialog, resolveConfirm, state as confirmState }
