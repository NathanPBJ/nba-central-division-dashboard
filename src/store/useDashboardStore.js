import { create } from 'zustand'

export const useDashboardStore = create((set) => ({
  // Theme State
  theme: localStorage.getItem('pacers-theme') || 'modern-navy',
  setTheme: (theme) => {
    localStorage.setItem('pacers-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
    set({ theme })
  },

  // Roster Tab State
  rosterQuery: '',
  setRosterQuery: (query) => set({ rosterQuery: query }),
  
  rosterPosition: 'All',
  setRosterPosition: (position) => set({ rosterPosition: position }),
  
  rosterSortKey: 'name',
  setRosterSortKey: (key) => set({ rosterSortKey: key }),

  // Leaders Tab State
  leadersStatSort: 'pts',
  setLeadersStatSort: (stat) => set({ leadersStatSort: stat }),
  
  leadersSelectedPlayers: ['haliburton', 'siakam', 'turner', 'nesmith'],
  toggleLeadersPlayer: (id) =>
    set((state) => {
      const current = state.leadersSelectedPlayers
      if (current.includes(id)) {
        return {
          leadersSelectedPlayers: current.length === 1 ? current : current.filter((p) => p !== id),
        }
      }
      return {
        leadersSelectedPlayers: [...current, id].slice(-5),
      }
    }),
}))
