'use client'

import { useState, useEffect } from 'react'
import { packingListData, categoryNames, categoryIcons, weightOptimizationTips, targetWeights, PackingItem } from '@/data/packingListData'

export default function PackingListManager() {
  const [checkedItems, setCheckedItems] = useState<{[key: string]: {[key: number]: boolean}}>({})
  const [customItems, setCustomItems] = useState<PackingItem[]>([])
  const [customItem, setCustomItem] = useState({ name: '', weight: 0, count: 1 })
  const [backpackWeight, setBackpackWeight] = useState(targetWeights.backpack)

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem('trekPackingProgress')
    if (saved) {
      const data = JSON.parse(saved)
      setCheckedItems(data.checkedItems || {})
      setCustomItems(data.customItems || [])
      setBackpackWeight(data.backpackWeight || targetWeights.backpack)
    }
  }, [])

  // Save progress
  const saveProgress = () => {
    const data = {
      checkedItems,
      customItems,
      backpackWeight,
      lastSaved: new Date().toISOString()
    }
    localStorage.setItem('trekPackingProgress', JSON.stringify(data))
  }

  // Handle item check/uncheck
  const handleItemCheck = (category: string, index: number, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [index]: checked
      }
    }))
  }

  // Add custom item
  const addCustomItem = () => {
    if (customItem.name && customItem.weight > 0) {
      setCustomItems(prev => [...prev, { ...customItem, essential: false, isCustom: true }])
      setCustomItem({ name: '', weight: 0, count: 1 })
    }
  }

  // Remove custom item
  const removeCustomItem = (index: number) => {
    setCustomItems(prev => prev.filter((_, i) => i !== index))
  }

  // Calculate weights
  const calculateWeights = () => {
    const categoryWeights: {[key: string]: number} = {}
    let totalWeight = 0

    Object.entries(packingListData).forEach(([category, items]) => {
      let categoryWeight = 0
      items.forEach((item, index) => {
        if (checkedItems[category]?.[index]) {
          categoryWeight += item.weight * item.count
        }
      })
      categoryWeights[category] = categoryWeight
      totalWeight += categoryWeight
    })

    // Add custom items
    let customWeight = 0
    customItems.forEach((item, index) => {
      if (checkedItems['custom']?.[index]) {
        customWeight += item.weight * item.count
      }
    })
    categoryWeights['custom'] = customWeight
    totalWeight += customWeight

    return {
      categoryWeights,
      totalWeight: totalWeight / 1000, // Convert to kg
      totalWithBackpack: (totalWeight / 1000) + backpackWeight
    }
  }

  const weights = calculateWeights()
  const isOverTarget = weights.totalWeight > targetWeights.total

  // Export function
  const exportList = () => {
    let exportText = 'KHOPRA RIDGE TREK - PACKING LIST\n'
    exportText += '================================\n\n'

    Object.entries(packingListData).forEach(([category, items]) => {
      const categoryName = categoryNames[category as keyof typeof categoryNames]
      exportText += `${categoryName.toUpperCase()}:\n`

      items.forEach((item, index) => {
        if (checkedItems[category]?.[index]) {
          exportText += `✓ ${item.name} (${item.weight}g × ${item.count})\n`
        }
      })
      exportText += '\n'
    })

    if (customItems.length > 0) {
      exportText += 'CUSTOM ITEMS:\n'
      customItems.forEach((item, index) => {
        if (checkedItems['custom']?.[index]) {
          exportText += `✓ ${item.name} (${item.weight}g × ${item.count})\n`
        }
      })
      exportText += '\n'
    }

    exportText += `TOTAL WEIGHT: ${weights.totalWeight.toFixed(1)} kg\n`
    exportText += `WITH BACKPACK: ${weights.totalWithBackpack.toFixed(1)} kg\n`
    exportText += `TARGET: ${targetWeights.total} kg (${isOverTarget ? 'OVER' : 'UNDER'} target)\n`

    const blob = new Blob([exportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'khopra-ridge-packing-list.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      {/* Header with Weight Summary */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-nepal-blue mb-2">🎒 Packing List Manager</h1>
        <p className="text-gray-600">Track your gear and manage pack weight for the trek</p>
      </div>

      {/* Weight Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-blue-50 border-blue-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{targetWeights.total} kg</div>
            <div className="text-sm text-gray-600">Target Weight</div>
          </div>
        </div>
        <div className={`card ${isOverTarget ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <div className="text-center">
            <div className={`text-3xl font-bold ${isOverTarget ? 'text-red-600' : 'text-green-600'}`}>
              {weights.totalWeight.toFixed(1)} kg
            </div>
            <div className="text-sm text-gray-600">Current Weight</div>
          </div>
        </div>
        <div className="card bg-purple-50 border-purple-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{weights.totalWithBackpack.toFixed(1)} kg</div>
            <div className="text-sm text-gray-600">With Backpack</div>
          </div>
        </div>
        <div className={`card ${isOverTarget ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className="text-center">
            <div className={`text-3xl font-bold ${isOverTarget ? 'text-orange-600' : 'text-gray-600'}`}>
              {Math.abs(targetWeights.total - weights.totalWeight).toFixed(1)} kg
            </div>
            <div className="text-sm text-gray-600">{isOverTarget ? 'Over Target' : 'Under Target'}</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Weight Progress</span>
          <span className="text-sm text-gray-600">{((weights.totalWeight / targetWeights.total) * 100).toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all duration-300 ${
              isOverTarget ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500' :
              'bg-gradient-to-r from-green-400 to-blue-500'
            }`}
            style={{ width: `${Math.min((weights.totalWeight / targetWeights.total) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Packing Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(packingListData).map(([category, items]) => (
          <div key={category} className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-nepal-blue flex items-center">
                <span className="mr-2 text-xl">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                {categoryNames[category as keyof typeof categoryNames]}
              </h2>
              <div className="text-sm text-gray-600">
                {(weights.categoryWeights[category] / 1000).toFixed(1)} kg
              </div>
            </div>

            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                  <div className="flex items-center space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={checkedItems[category]?.[index] || false}
                      onChange={(e) => handleItemCheck(category, index, e.target.checked)}
                      className="rounded"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {item.name} {item.essential && <span className="text-yellow-500">⭐</span>}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.weight}g {item.count > 1 && `× ${item.count}`}
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    item.weight > 400 ? 'bg-red-100 text-red-800' :
                    item.weight < 200 ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.weight > 400 ? 'Heavy' : item.weight < 200 ? 'Light' : 'Medium'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Custom Items */}
        <div className="card lg:col-span-2">
          <h2 className="text-lg font-semibold text-nepal-blue mb-4 flex items-center">
            <span className="mr-2 text-xl">➕</span>
            Custom Items
          </h2>

          {/* Add Custom Item Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4 p-3 bg-gray-50 rounded">
            <input
              type="text"
              placeholder="Item name"
              value={customItem.name}
              onChange={(e) => setCustomItem(prev => ({ ...prev, name: e.target.value }))}
              className="border rounded px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="Weight (grams)"
              value={customItem.weight || ''}
              onChange={(e) => setCustomItem(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
              className="border rounded px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="Count"
              value={customItem.count}
              onChange={(e) => setCustomItem(prev => ({ ...prev, count: parseInt(e.target.value) || 1 }))}
              className="border rounded px-3 py-2 text-sm"
              min="1"
            />
            <button
              onClick={addCustomItem}
              className="bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700"
            >
              Add Item
            </button>
          </div>

          {/* Custom Items List */}
          <div className="space-y-2">
            {customItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                <div className="flex items-center space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={checkedItems['custom']?.[index] || false}
                    onChange={(e) => handleItemCheck('custom', index, e.target.checked)}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">
                      {item.weight}g {item.count > 1 && `× ${item.count}`}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeCustomItem(index)}
                  className="text-red-600 hover:bg-red-100 rounded px-2 py-1 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weight Optimization Tips */}
      <div className="card bg-yellow-50 border-yellow-200">
        <h2 className="text-lg font-semibold text-yellow-800 mb-3">💡 Weight Optimization Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {weightOptimizationTips.slice(0, 6).map((tip, index) => (
            <div key={index} className="text-sm text-yellow-700 flex items-start">
              <span className="mr-2">•</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={saveProgress}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          💾 Save Progress
        </button>
        <button
          onClick={exportList}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          📄 Export List
        </button>
        <button
          onClick={() => {
            if (confirm('Reset all selections?')) {
              setCheckedItems({})
              setCustomItems([])
              localStorage.removeItem('trekPackingProgress')
            }
          }}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          🔄 Reset All
        </button>
      </div>
    </div>
  )
}