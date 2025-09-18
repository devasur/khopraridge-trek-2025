interface StatusCardProps {
  title: string
  value: string
  subtitle: string
  icon: string
  color: 'blue' | 'green' | 'yellow' | 'red'
}

const colorClasses = {
  blue: 'bg-blue-50 border-blue-200',
  green: 'bg-green-50 border-green-200',
  yellow: 'bg-yellow-50 border-yellow-200',
  red: 'bg-red-50 border-red-200'
}

export default function StatusCard({ title, value, subtitle, icon, color }: StatusCardProps) {
  return (
    <div className={`card ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  )
}