// ─── Vendor ───────────────────────────────────────────────────────────────
export interface Vendor {
  id: string
  name: string
  category: VendorCategory
  cost: number
  value: number        // quality/priority score 0–100
  rating: number       // 1–5
  distance: number     // km
  available: boolean
  image: string        // emoji or icon key
  description: string
  confidence: number   // AI confidence 0–100
  tags: string[]
}

export type VendorCategory =
  | 'Catering'
  | 'Photography'
  | 'Decoration'
  | 'Entertainment'
  | 'Technology'
  | 'Logistics'
  | 'Hospitality'

export type EventType =
  | 'Wedding'
  | 'Corporate'
  | 'Birthday'
  | 'Conference'
  | 'Festival'
  | 'Graduation'

export type OptimizationMode = 'knapsack' | 'greedy' | 'hybrid'

export type Priority = 'balanced' | 'value' | 'cost'

// ─── Event Config ─────────────────────────────────────────────────────────
export interface EventConfig {
  eventName: string
  eventType: EventType
  budget: number
  guests: number
  venue: string
  date: string
  priority: Priority
  optimizationMode: OptimizationMode
}

// ─── Algorithm Result ─────────────────────────────────────────────────────
export interface OptimizationResult {
  selectedVendors: Vendor[]
  rejectedVendors: Vendor[]
  totalCost: number
  totalValue: number
  remainingBudget: number
  optimizationScore: number    // 0–100
  savingsPercent: number
  executionTimeMs: number
  algorithm: OptimizationMode
  efficiency: number           // value / budget ratio
  recommendations: Recommendation[]
}

export interface Recommendation {
  id: string
  type: 'upgrade' | 'downgrade' | 'swap' | 'add' | 'remove'
  message: string
  impact: 'high' | 'medium' | 'low'
  savings?: number
}

// ─── Chart Data ───────────────────────────────────────────────────────────
export interface ChartDataPoint {
  name: string
  value: number
  cost?: number
  color?: string
}

export interface TimelineEvent {
  id: string
  title: string
  time: string
  status: 'completed' | 'pending' | 'active'
  cost?: number
}

// ─── App State ────────────────────────────────────────────────────────────
export interface AppState {
  config: EventConfig | null
  result: OptimizationResult | null
  isLoading: boolean
  currentStep: 'landing' | 'planner' | 'results'
}
