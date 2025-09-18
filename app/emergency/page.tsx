export default function EmergencyPage() {
  const emergencyContacts = [
    {
      category: 'Trek Organizer',
      name: 'India Hikes',
      location: 'Basecamp: Pokhara, Nepal',
      phone: '+91-XXXX-XXXX-XXX',
      email: 'emergency@indiahikes.com'
    },
    {
      category: 'Indian Embassy',
      name: 'Embassy of India, Kathmandu',
      location: 'Lainchaur, Kathmandu, Nepal',
      phone: '+977-1-4410900',
      email: 'ambkathmandu@mea.gov.in'
    },
    {
      category: 'Medical Emergency',
      name: 'Pokhara Hospital',
      location: 'Pokhara, Nepal',
      phone: '+977-61-462469',
      note: '8-9 hours from trek route'
    },
    {
      category: 'Helicopter Rescue',
      name: 'Simrik Air',
      location: 'Kathmandu, Nepal',
      phone: '+977-1-4465188',
      note: 'Weather dependent service'
    }
  ]

  const emergencyProcedures = [
    {
      scenario: 'Medical Emergency',
      steps: [
        'Assess severity and provide immediate first aid',
        'Contact trek leader and guide immediately',
        'Call India Hikes emergency number',
        'Prepare for evacuation if serious',
        'Document incident with photos/notes'
      ]
    },
    {
      scenario: 'Lost or Separated',
      steps: [
        'Stay calm and remain in current location',
        'Use emergency whistle (3 sharp blasts)',
        'Try mobile phone if signal available',
        'Use GPS coordinates if available',
        'Wait for search team - do not wander'
      ]
    },
    {
      scenario: 'Severe Weather',
      steps: [
        'Seek immediate shelter',
        'Stay together as a group',
        'Conserve body heat and energy',
        'Monitor for hypothermia signs',
        'Wait for conditions to improve'
      ]
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-2">🚨 Emergency Information</h1>
        <p className="text-gray-600">Critical contacts and procedures for trek safety</p>
      </div>

      {/* Emergency Contacts */}
      <div className="card bg-red-50 border-red-200">
        <h2 className="text-xl font-semibold text-red-800 mb-4">Emergency Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-red-200">
              <div className="font-semibold text-red-800">{contact.category}</div>
              <div className="font-medium text-gray-900">{contact.name}</div>
              <div className="text-sm text-gray-600">{contact.location}</div>
              <div className="text-sm font-mono text-blue-600 mt-2">
                📞 {contact.phone}
              </div>
              {contact.email && (
                <div className="text-sm font-mono text-blue-600">
                  ✉️ {contact.email}
                </div>
              )}
              {contact.note && (
                <div className="text-xs text-red-600 mt-1">⚠️ {contact.note}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Your Emergency Info */}
      <div className="card bg-blue-50 border-blue-200">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">Your Emergency Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-blue-800 mb-2">Personal Details</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Name:</span> Boni Gopalan</div>
              <div><span className="font-medium">Blood Type:</span> [Update this]</div>
              <div><span className="font-medium">Medical Conditions:</span> [Update this]</div>
              <div><span className="font-medium">Medications:</span> [Update this]</div>
              <div><span className="font-medium">Insurance Policy:</span> [Update this]</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-blue-800 mb-2">Family Contacts</h3>
            <div className="space-y-2 text-sm">
              <div>
                <div className="font-medium">Primary Contact:</div>
                <div>[Name] - [Phone]</div>
              </div>
              <div>
                <div className="font-medium">Secondary Contact:</div>
                <div>[Name] - [Phone]</div>
              </div>
              <div>
                <div className="font-medium">Travel Insurance:</div>
                <div>[Company] - [Policy Number]</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Procedures */}
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-4">Emergency Procedures</h2>
        <div className="space-y-6">
          {emergencyProcedures.map((procedure, index) => (
            <div key={index} className="border-l-4 border-red-400 pl-4">
              <h3 className="font-semibold text-red-800 mb-2">{procedure.scenario}</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                {procedure.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      {/* GPS Coordinates */}
      <div className="card bg-yellow-50 border-yellow-200">
        <h2 className="text-xl font-semibold text-yellow-800 mb-4">Key GPS Coordinates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="font-medium text-yellow-800">Pokhara (Basecamp)</div>
            <div className="font-mono text-sm">28.2096° N, 83.9856° E</div>
          </div>
          <div>
            <div className="font-medium text-yellow-800">Khopra Ridge</div>
            <div className="font-mono text-sm">28.3833° N, 83.6167° E</div>
          </div>
          <div>
            <div className="font-medium text-yellow-800">Hotel Top&Top</div>
            <div className="font-mono text-sm">[Coordinates needed]</div>
          </div>
          <div>
            <div className="font-medium text-yellow-800">Nearest Hospital</div>
            <div className="font-mono text-sm">28.2096° N, 83.9856° E</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="card bg-red-100 border-red-300 hover:bg-red-200 transition-colors text-center">
          <div className="text-2xl mb-2">📞</div>
          <div className="font-medium text-red-800">Call Embassy</div>
        </button>
        <button className="card bg-orange-100 border-orange-300 hover:bg-orange-200 transition-colors text-center">
          <div className="text-2xl mb-2">🚁</div>
          <div className="font-medium text-orange-800">Request Rescue</div>
        </button>
        <button className="card bg-blue-100 border-blue-300 hover:bg-blue-200 transition-colors text-center">
          <div className="text-2xl mb-2">📍</div>
          <div className="font-medium text-blue-800">Share Location</div>
        </button>
      </div>
    </div>
  )
}