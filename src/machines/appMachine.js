import { setup, createMachine } from 'xstate'

export const appMachine = setup({
  types: {
    events: {}, // We'll rely on string types for simplicity: { type: 'FETCH' } | { type: 'SUCCESS' } | { type: 'ERROR' } | { type: 'RETRY' }
  },
}).createMachine({
  id: 'app',
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH: 'loading',
      },
    },
    loading: {
      on: {
        SUCCESS: 'success',
        ERROR: 'error',
      },
    },
    success: {
      on: {
        FETCH: 'loading',
      },
    },
    error: {
      on: {
        RETRY: 'loading',
      },
    },
  },
})
