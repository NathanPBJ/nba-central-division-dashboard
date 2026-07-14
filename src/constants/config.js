import { Activity, BarChart3, Clock3, Gauge, Trophy, Users } from 'lucide-react'

export const tabs = [
  { id: 'overview', label: 'Overview', icon: Activity, path: '/' },
  { id: 'roster', label: 'Rotation', icon: Users, path: '/rotation' },
  { id: 'player-stats', label: 'Leaders', icon: BarChart3, path: '/leaders' },
  { id: 'team-stats', label: 'Team Profile', icon: Gauge, path: '/profile' },
  { id: 'performance', label: 'Form Guide', icon: Clock3, path: '/form' },
  { id: 'history', label: 'Archive', icon: Trophy, path: '/archive' },
]

export const statOptions = [
  { key: 'pts', label: 'Points' },
  { key: 'reb', label: 'Rebounds' },
  { key: 'ast', label: 'Assists' },
  { key: 'stl', label: 'Steals' },
  { key: 'blk', label: 'Blocks' },
  { key: 'fg', label: 'FG%' },
  { key: 'three', label: '3P%' },
  { key: 'min', label: 'Minutes' },
]

export const positions = ['All', 'PG', 'SG', 'SF', 'PF', 'C', 'G', 'F']
