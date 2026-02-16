import { createContext, useContext } from 'react'
import { defaultLabels, type EReditorLabels } from './labels'

export const LabelsContext = createContext<EReditorLabels>(defaultLabels)

export function useLabels(): EReditorLabels {
  return useContext(LabelsContext)
}
