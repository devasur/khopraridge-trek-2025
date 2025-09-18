import { TeamRole } from '@/data/documentaryData'

interface RoleAssignmentCardProps {
  role: TeamRole
  onAssign: (roleId: string, assignee: string) => void
}

export default function RoleAssignmentCard({ role, onAssign }: RoleAssignmentCardProps) {
  return (
    <div className={`card ${role.isEssential ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">{role.title}</h3>
        {role.isEssential && (
          <span className="status-missing text-xs">Essential</span>
        )}
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-sm text-gray-700 mb-2">Responsibilities:</h4>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          {role.responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>
      </div>

      <div className="border-t pt-3">
        {role.assignee ? (
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600">✅ Assigned to: {role.assignee}</span>
            <button
              onClick={() => onAssign(role.id, '')}
              className="text-xs text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <select
              className="flex-1 text-sm border rounded px-2 py-1"
              onChange={(e) => onAssign(role.id, e.target.value)}
            >
              <option value="">Select member...</option>
              <option value="Boni">Boni</option>
              <option value="George">George</option>
              <option value="Ann">Ann</option>
              <option value="Roshni">Roshni</option>
              <option value="Tinku">Tinku</option>
              <option value="Deepu">Deepu</option>
              <option value="Simon">Simon</option>
              <option value="Vandana">Vandana</option>
              <option value="Bushra">Bushra</option>
              <option value="Alima">Alima</option>
              <option value="Renjith">Renjith</option>
              <option value="Prakash">Prakash</option>
            </select>
          </div>
        )}
      </div>
    </div>
  )
}