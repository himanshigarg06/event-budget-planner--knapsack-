import type { Vendor } from '../types'
import { VENDOR_DATA } from '../data/vendors'

const STORAGE_KEY = 'bw_vendor_catalog'

/**
 * Loads vendor list from localStorage or falls back to default VENDOR_DATA catalog
 */
export function getStoredVendors(): Vendor[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (err) {
    console.error('Failed to load vendors from localStorage:', err)
  }
  return VENDOR_DATA
}

/**
 * Saves current vendor list to localStorage
 */
export function saveVendors(vendors: Vendor[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vendors))
  } catch (err) {
    console.error('Failed to save vendors to localStorage:', err)
  }
}

/**
 * Adds a new vendor to the catalog
 */
export function addVendor(vendors: Vendor[], newVendor: Omit<Vendor, 'id'>): Vendor[] {
  const id = `v_${Date.now()}`
  const vendor: Vendor = { ...newVendor, id }
  const updated = [vendor, ...vendors]
  saveVendors(updated)
  return updated
}

/**
 * Updates an existing vendor
 */
export function updateVendor(vendors: Vendor[], id: string, updates: Partial<Vendor>): Vendor[] {
  const updated = vendors.map(v => (v.id === id ? { ...v, ...updates } : v))
  saveVendors(updated)
  return updated
}

/**
 * Toggles vendor availability (Select / Unselect for optimization)
 */
export function toggleVendorAvailability(vendors: Vendor[], id: string): Vendor[] {
  const updated = vendors.map(v => (v.id === id ? { ...v, available: !v.available } : v))
  saveVendors(updated)
  return updated
}

/**
 * Deletes a vendor by ID
 */
export function deleteVendor(vendors: Vendor[], id: string): Vendor[] {
  const updated = vendors.filter(v => v.id !== id)
  saveVendors(updated)
  return updated
}

/**
 * Resets vendor catalog to initial defaults
 */
export function resetVendorsToDefault(): Vendor[] {
  saveVendors(VENDOR_DATA)
  return VENDOR_DATA
}
