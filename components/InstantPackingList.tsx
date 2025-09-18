'use client'

import { useState, useEffect } from 'react'
import { db, queries, mutations, id } from '@/lib/instant'

export default function InstantPackingList() {
  const { user } = db.useAuth()
  const { data: packingData, isLoading } = db.useQuery({
    packingItems: {},
    packingProgress: {
      $: {
        where: { userId: user?.id || '' }
      }
    }
  })

  const [customItem, setCustomItem] = useState({ name: '', weight: 0, count: 1, category: 'personal' })

  if (isLoading) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-4">🎒 Packing List Manager</h2>
        <div className="text-center py-8">
          <div className="text-gray-500">Loading packing list...</div>
        </div>
      </div>
    )
  }

  const packingItems = packingData?.packingItems || []
  const userProgress = packingData?.packingProgress || []

  // Group items by category
  const itemsByCategory = packingItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, any[]>)

  // Create progress map for quick lookup
  const progressMap = userProgress.reduce((acc, progress) => {
    acc[progress.packingItem?.id] = progress
    return acc
  }, {} as Record<string, any>)

  // Calculate weights and progress
  const totalItems = packingItems.length
  const checkedItems = userProgress.filter(p => p.checked).length
  const totalWeight = packingItems
    .filter(item => progressMap[item.id]?.checked)
    .reduce((sum, item) => sum + (item.weight * item.count), 0)

  const categoryIcons = {
    clothing: '👕',
    gear: '🎒',
    electronics: '🔌',
    personal: '🧴'
  }

  const categoryNames = {
    clothing: 'Clothing & Footwear',
    gear: 'Trekking Gear',
    electronics: 'Electronics',
    personal: 'Personal Items'
  }

  const handleItemToggle = async (item: any, checked: boolean) => {
    if (!user) return

    try {
      await mutations.updatePackingProgress(user.id, item.id, checked)
    } catch (error) {
      console.error('Failed to update packing progress:', error)
    }
  }

  const addCustomItem = async () => {
    if (!customItem.name.trim() || customItem.weight <= 0) return

    try {
      await db.transact(
        db.tx.packingItems[id()].update({
          name: customItem.name,
          category: customItem.category,
          weight: customItem.weight,
          essential: false,
          count: customItem.count,
          isCustom: true,
          createdAt: new Date(),
        })
      )

      setCustomItem({ name: '', weight: 0, count: 1, category: 'personal' })
    } catch (error) {
      console.error('Failed to add custom item:', error)
    }
  }

  const exportPackingList = () => {
    const checkedItemsList = packingItems
      .filter(item => progressMap[item.id]?.checked)
      .map(item => `${item.name} (${item.weight * item.count}g)`)
      .join('\n')

    const content = `Khopra Trek 2025 - Packing List\n\nChecked Items (${checkedItems}/${totalItems}):\n${checkedItemsList}\n\nTotal Weight: ${(totalWeight / 1000).toFixed(1)}kg`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'khopra-trek-packing-list.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-4">🎒 Packing Progress</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">{checkedItems}/{totalItems}</div>
            <div className="text-sm text-gray-600">Items Packed</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded">
            <div className="text-2xl font-bold text-green-600">{(totalWeight / 1000).toFixed(1)}kg</div>
            <div className="text-sm text-gray-600">Current Weight</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded">
            <div className="text-2xl font-bold text-yellow-600">12kg</div>
            <div className="text-sm text-gray-600">Target Weight</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded">
            <div className="text-2xl font-bold text-purple-600">{Math.round((checkedItems / totalItems) * 100)}%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={exportPackingList}
            className="px-4 py-2 bg-nepal-blue text-white rounded-lg hover:bg-nepal-blue/90"
          >
            Export List
          </button>
        </div>
      </div>

      {/* Add Custom Item */}
      <div className="card">
        <h3 className="text-lg font-semibold text-nepal-blue mb-4">Add Custom Item</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Item name"
            value={customItem.name}
            onChange={(e) => setCustomItem(prev => ({ ...prev, name: e.target.value }))}
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Weight (g)"
            value={customItem.weight || ''}
            onChange={(e) => setCustomItem(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Count"
            value={customItem.count}
            onChange={(e) => setCustomItem(prev => ({ ...prev, count: parseInt(e.target.value) || 1 }))}
            className="px-3 py-2 border rounded-lg"
          />
          <select
            value={customItem.category}
            onChange={(e) => setCustomItem(prev => ({ ...prev, category: e.target.value }))}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="clothing">Clothing</option>
            <option value="gear">Gear</option>
            <option value="electronics">Electronics</option>
            <option value="personal">Personal</option>
          </select>
          <button
            onClick={addCustomItem}
            disabled={!customItem.name.trim() || customItem.weight <= 0}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Packing Lists by Category */}
      {Object.entries(itemsByCategory).map(([category, items]) => (
        <div key={category} className="card">
          <h3 className="text-lg font-semibold text-nepal-blue mb-4">
            {categoryIcons[category]} {categoryNames[category] || category}
          </h3>

          <div className="space-y-2">
            {items.map((item) => {
              const progress = progressMap[item.id]
              const isChecked = progress?.checked || false

              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    isChecked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => handleItemToggle(item, e.target.checked)}
                      className="w-4 h-4 text-green-600 rounded"
                    />
                    <div>
                      <div className={`font-medium ${isChecked ? 'line-through text-gray-500' : ''}`}>
                        {item.name}
                        {item.essential && <span className="ml-2 text-red-500">*</span>}
                        {item.isCustom && <span className="ml-2 text-blue-500">(Custom)</span>}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.weight * item.count}g {item.count > 1 && `(${item.weight}g × ${item.count})`}
                      </div>
                    </div>
                  </div>

                  {progress?.notes && (
                    <div className="text-sm text-gray-600 max-w-xs truncate">
                      Notes: {progress.notes}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {items.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No items in this category yet
            </div>
          )}
        </div>
      ))}
    </div>
  )
}