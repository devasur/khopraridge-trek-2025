import { Equipment } from '@/data/documentaryData'

interface EquipmentCardProps {
  equipment: Equipment
}

const statusColors = {
  available: 'bg-green-50 border-green-200',
  'in-use': 'bg-blue-50 border-blue-200',
  charging: 'bg-yellow-50 border-yellow-200',
  missing: 'bg-red-50 border-red-200'
}

const statusIcons = {
  available: '✅',
  'in-use': '📸',
  charging: '🔌',
  missing: '❌'
}

export default function EquipmentCard({ equipment }: EquipmentCardProps) {
  return (
    <div className={`card ${statusColors[equipment.status]}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-xl">{statusIcons[equipment.status]}</span>
          <h3 className="font-medium">{equipment.item}</h3>
        </div>
        <select
          className="text-xs border rounded px-2 py-1"
          defaultValue={equipment.status}
        >
          <option value="available">Available</option>
          <option value="in-use">In Use</option>
          <option value="charging">Charging</option>
          <option value="missing">Missing</option>
        </select>
      </div>

      <div className="space-y-2 text-sm">
        {equipment.assignee && (
          <div>
            <span className="font-medium">Assigned to:</span> {equipment.assignee}
          </div>
        )}

        {equipment.location && (
          <div>
            <span className="font-medium">Location:</span> {equipment.location}
          </div>
        )}

        {equipment.batteryLevel !== undefined && (
          <div>
            <span className="font-medium">Battery:</span>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    equipment.batteryLevel > 50 ? 'bg-green-500' :
                    equipment.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${equipment.batteryLevel}%` }}
                />
              </div>
              <span className="text-xs">{equipment.batteryLevel}%</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          equipment.status === 'available' ? 'bg-green-100 text-green-800' :
          equipment.status === 'in-use' ? 'bg-blue-100 text-blue-800' :
          equipment.status === 'charging' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {equipment.status.replace('-', ' ').toUpperCase()}
        </span>

        <div className="flex space-x-1">
          <button className="text-xs text-blue-600 hover:underline">
            Assign
          </button>
          <button className="text-xs text-gray-600 hover:underline">
            Notes
          </button>
        </div>
      </div>
    </div>
  )
}