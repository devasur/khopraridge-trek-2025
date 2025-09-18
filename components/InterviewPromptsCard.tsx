import { Interview } from '@/data/documentaryData'

interface InterviewPromptsCardProps {
  interview: Interview
}

export default function InterviewPromptsCard({ interview }: InterviewPromptsCardProps) {
  const getExtendedQuestions = (id: string) => {
    switch (id) {
      case 'pre-trek':
        return [
          {
            category: 'Motivation & Expectations',
            questions: [
              'What initially drew you to this specific trek?',
              'What are you most excited about?',
              'What are your biggest concerns or fears?',
              'How long have you been planning this adventure?'
            ]
          },
          {
            category: 'Preparation & Background',
            questions: [
              'How have you prepared physically for this challenge?',
              'What previous trekking experience do you have?',
              'What gear are you most excited/nervous about?',
              'Who did you tell about this trek and what was their reaction?'
            ]
          },
          {
            category: 'Personal Goals',
            questions: [
              'What do you hope to learn about yourself?',
              'How do you think this experience will change you?',
              'What would make this trek a success in your mind?',
              'What story do you hope to tell when you return?'
            ]
          }
        ]
      case 'mid-trek':
        return [
          {
            category: 'Reality vs Expectations',
            questions: [
              'How is this different from what you imagined?',
              'What has surprised you most so far?',
              'Which part has been harder/easier than expected?',
              'How are you feeling about the group dynamic?'
            ]
          },
          {
            category: 'Physical & Mental Challenges',
            questions: [
              'Describe the most challenging moment so far',
              'How has your body responded to the altitude?',
              'What thoughts keep you motivated when it gets tough?',
              'How has the group supported each other?'
            ]
          },
          {
            category: 'Memorable Moments',
            questions: [
              'What moment will you remember forever?',
              'Describe the most beautiful thing you\'ve seen',
              'Tell me about a conversation that stuck with you',
              'How has the landscape affected your mood?'
            ]
          }
        ]
      case 'post-trek':
        return [
          {
            category: 'Transformation & Reflection',
            questions: [
              'How do you feel different now than when you started?',
              'What did you discover about yourself?',
              'Which moment tested you the most?',
              'What surprised you about your own capabilities?'
            ]
          },
          {
            category: 'Group Experience',
            questions: [
              'How did the group dynamic evolve over the trek?',
              'Who inspired you the most and why?',
              'What will you miss most about this group?',
              'How did strangers become friends?'
            ]
          },
          {
            category: 'Legacy & Future',
            questions: [
              'What advice would you give someone considering this trek?',
              'How will this experience influence your future decisions?',
              'What will you tell people when they ask about this?',
              'Would you do it again? What would you do differently?'
            ]
          }
        ]
      default:
        return []
    }
  }

  const extendedQuestions = getExtendedQuestions(interview.id)

  const getCardColor = (id: string) => {
    switch (id) {
      case 'pre-trek': return 'border-blue-300 bg-blue-50'
      case 'mid-trek': return 'border-purple-300 bg-purple-50'
      case 'post-trek': return 'border-green-300 bg-green-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  const getIcon = (id: string) => {
    switch (id) {
      case 'pre-trek': return '🚀'
      case 'mid-trek': return '🏔️'
      case 'post-trek': return '🎯'
      default: return '🎤'
    }
  }

  return (
    <div className={`card ${getCardColor(interview.id)}`}>
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-2xl">{getIcon(interview.id)}</span>
        <div>
          <h3 className="text-lg font-semibold">{interview.subject}</h3>
          <div className="text-sm text-gray-600">{interview.duration} • {interview.location}</div>
        </div>
      </div>

      <div className="space-y-6">
        {extendedQuestions.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
              <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
              {category.category}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className="p-3 bg-white rounded border border-gray-200 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-xs text-gray-400 mt-1 font-mono">
                      Q{categoryIndex + 1}.{questionIndex + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{question}</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <button className="text-xs text-blue-600 hover:underline">
                          Add follow-up
                        </button>
                        <button className="text-xs text-gray-500 hover:underline">
                          Mark used
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Interview Flow Tips */}
      <div className="mt-6 p-4 bg-white rounded border border-gray-200">
        <h4 className="font-medium text-gray-800 mb-2">💡 Interview Flow Tips:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Opening (2 min):</strong>
            <ul className="list-disc list-inside ml-2 mt-1">
              <li>Start with easy, comfortable questions</li>
              <li>Let them get used to the camera</li>
              <li>Build rapport and trust</li>
            </ul>
          </div>
          <div>
            <strong>Closing (1 min):</strong>
            <ul className="list-disc list-inside ml-2 mt-1">
              <li>End with forward-looking questions</li>
              <li>Ask if they want to add anything</li>
              <li>Thank them for sharing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Notes */}
      <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
        <h4 className="font-medium text-yellow-800 mb-2">📋 Technical Checklist:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-xs">Audio levels tested</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-xs">Camera framing set</span>
            </label>
          </div>
          <div className="space-y-1">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-xs">Backup recording started</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-xs">Lighting checked</span>
            </label>
          </div>
          <div className="space-y-1">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-xs">Battery levels confirmed</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-xs">Memory space available</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}