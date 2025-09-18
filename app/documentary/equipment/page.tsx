import { equipmentList } from '@/data/documentaryData'
import EquipmentCard from '@/components/EquipmentCard'

export default function EquipmentPage() {
  const availableEquipment = equipmentList.filter(eq => eq.status === 'available')
  const inUseEquipment = equipmentList.filter(eq => eq.status === 'in-use')
  const chargingEquipment = equipmentList.filter(eq => eq.status === 'charging')

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-nepal-blue mb-2">📷 Equipment Management</h1>
        <p className="text-gray-600">Track and manage all filming equipment and power levels</p>
      </div>

      {/* Equipment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-green-50 border-green-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{availableEquipment.length}</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
        </div>
        <div className="card bg-blue-50 border-blue-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{inUseEquipment.length}</div>
            <div className="text-sm text-gray-600">In Use</div>
          </div>
        </div>
        <div className="card bg-yellow-50 border-yellow-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{chargingEquipment.length}</div>
            <div className="text-sm text-gray-600">Charging</div>
          </div>
        </div>
        <div className="card bg-red-50 border-red-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {equipmentList.filter(eq => eq.status === 'missing').length}
            </div>
            <div className="text-sm text-gray-600">Missing</div>
          </div>
        </div>
      </div>

      {/* Battery Alert */}
      <div className="card bg-red-50 border-red-200">
        <h2 className="text-lg font-semibold text-red-800 mb-3">🔋 Power Management Alert</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-red-800 mb-2">Critical Power Tips:</h3>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              <li>Charge all devices every evening</li>
              <li>Use power banks strategically during day</li>
              <li>Rotate equipment to preserve battery life</li>
              <li>Turn off devices when not actively filming</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-red-800 mb-2">Charging Schedule:</h3>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              <li>Evening: All phones and power banks</li>
              <li>Lunch break: Quick top-up if possible</li>
              <li>Rest days: Full equipment overhaul</li>
              <li>Emergency: Solar chargers if available</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Equipment List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-nepal-blue">Equipment Inventory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equipmentList.map((equipment) => (
            <EquipmentCard key={equipment.id} equipment={equipment} />
          ))}
        </div>
      </div>

      {/* Pre-Trek Equipment Checklist */}
      <div className="card bg-blue-50 border-blue-200">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">📋 Pre-Trek Equipment Checklist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">All smartphones at 100% charge</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Power banks fully charged</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Memory cards formatted and tested</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Camera settings configured</span>
            </label>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Tripods and gimbals tested</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">External microphones working</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Backup cables packed</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Waterproof storage ready</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}