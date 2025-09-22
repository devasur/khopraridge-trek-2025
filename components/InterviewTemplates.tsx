'use client'

import { useState, useRef, useEffect } from 'react'
import { db, id } from '@/lib/instant'

interface InterviewTemplate {
  name: string
  description: string
  questions: string[]
  estimatedDuration: number
  storyArcTags: string[]
  targetRoles: string[]
}

export default function InterviewTemplates() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState<any>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [newTemplate, setNewTemplate] = useState<InterviewTemplate>({
    name: '',
    description: '',
    questions: [''],
    estimatedDuration: 30,
    storyArcTags: [],
    targetRoles: []
  })

  const { data: templatesData } = db.useQuery({ interviewTemplates: {} })
  const templates = templatesData?.interviewTemplates || []

  const storyArcOptions = [
    'Journey Motivation',
    'Personal Challenges',
    'Physical Preparation',
    'Mental Preparation',
    'Group Dynamics',
    'Leadership Moments',
    'Overcoming Obstacles',
    'Natural Beauty',
    'Cultural Insights',
    'Personal Growth',
    'Teamwork',
    'Peak Moments',
    'Reflections',
    'Future Plans',
    'Advice to Others',
    'Local Perspective',
    'Mountain Life',
    'Tourism Impact',
    'Traditional Culture',
    'Economic Impact',
    'Environmental Changes'
  ]

  const roleOptions = [
    'Trek Leader',
    'Experienced Hiker',
    'First-time Trekker',
    'Photography Enthusiast',
    'Fitness Enthusiast',
    'Adventure Seeker',
    'Documentary Team',
    'Local Guide',
    'Support Staff',
    'Teahouse Owner',
    'Village Elder',
    'Porter',
    'Local Resident',
    'Fellow Trekker'
  ]

  const addQuestion = () => {
    setNewTemplate({
      ...newTemplate,
      questions: [...newTemplate.questions, '']
    })
  }

  const updateQuestion = (index: number, value: string) => {
    const updatedQuestions = [...newTemplate.questions]
    updatedQuestions[index] = value
    setNewTemplate({
      ...newTemplate,
      questions: updatedQuestions
    })
  }

  const removeQuestion = (index: number) => {
    const updatedQuestions = newTemplate.questions.filter((_, i) => i !== index)
    setNewTemplate({
      ...newTemplate,
      questions: updatedQuestions
    })
  }

  const handleSaveTemplate = async () => {
    if (!newTemplate.name || newTemplate.questions.filter(q => q.trim()).length === 0) {
      alert('Please fill in template name and at least one question')
      return
    }

    try {
      await db.transact([
        db.tx.interviewTemplates[id()].update({
          name: newTemplate.name,
          description: newTemplate.description,
          questions: JSON.stringify(newTemplate.questions.filter(q => q.trim())),
          estimatedDuration: newTemplate.estimatedDuration,
          storyArcTags: JSON.stringify(newTemplate.storyArcTags),
          targetRoles: JSON.stringify(newTemplate.targetRoles),
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      ])

      // Reset form
      setNewTemplate({
        name: '',
        description: '',
        questions: [''],
        estimatedDuration: 30,
        storyArcTags: [],
        targetRoles: []
      })
      setShowAddForm(false)
      alert('Template saved successfully!')
    } catch (error) {
      alert('Failed to save template')
    }
  }

  const presetTemplates = [
    {
      name: 'Pre-Trek Expectations & Motivations',
      description: 'Comprehensive pre-trek interview covering motivations, preparation, and expectations',
      questions: [
        'What initially drew you to this specific trek?',
        'What are you most excited about?',
        'What are your biggest concerns or fears?',
        'How have you prepared physically and mentally?',
        'What do you hope to learn about yourself?',
        'What would make this trek a success in your mind?',
        'Who did you tell about this trek and what was their reaction?',
        'What story do you hope to tell when you return?',
        'How long have you been planning this adventure?',
        'What gear are you most excited/nervous about?',
        'What previous trekking experience do you have?',
        'How do you think this experience will change you?'
      ],
      estimatedDuration: 30,
      storyArcTags: ['Journey Motivation', 'Personal Challenges', 'Physical Preparation', 'Mental Preparation'],
      targetRoles: ['Trek Leader', 'Experienced Hiker', 'First-time Trekker', 'Adventure Seeker']
    },
    {
      name: 'Mid-Trek Reality Check & Challenges',
      description: 'Mid-trek interview capturing real experiences vs expectations and current challenges',
      questions: [
        'How is this different from what you imagined?',
        'What has surprised you most so far?',
        'Describe the most challenging moment so far',
        'How has your body responded to the altitude?',
        'What thoughts keep you motivated when it gets tough?',
        'How has the group supported each other?',
        'What moment will you remember forever?',
        'Describe the most beautiful thing you\'ve seen',
        'How has the landscape affected your mood?',
        'Which part has been harder/easier than expected?',
        'How are you feeling about the group dynamic?',
        'Tell me about a conversation that stuck with you'
      ],
      estimatedDuration: 25,
      storyArcTags: ['Overcoming Obstacles', 'Natural Beauty', 'Group Dynamics', 'Personal Growth', 'Peak Moments'],
      targetRoles: ['Trek Leader', 'Experienced Hiker', 'First-time Trekker', 'Adventure Seeker']
    },
    {
      name: 'Post-Trek Transformation & Legacy',
      description: 'Comprehensive post-trek reflection on transformation, relationships, and future impact',
      questions: [
        'How do you feel different now than when you started?',
        'What did you discover about yourself?',
        'Which moment tested you the most?',
        'What surprised you about your own capabilities?',
        'How did the group dynamic evolve over the trek?',
        'Who inspired you the most and why?',
        'What will you miss most about this group?',
        'How did strangers become friends?',
        'What advice would you give someone considering this trek?',
        'How will this experience influence your future decisions?',
        'What will you tell people when they ask about this?',
        'Would you do it again? What would you do differently?'
      ],
      estimatedDuration: 35,
      storyArcTags: ['Reflections', 'Personal Growth', 'Teamwork', 'Leadership Moments', 'Advice to Others', 'Future Plans'],
      targetRoles: ['Trek Leader', 'Experienced Hiker', 'First-time Trekker', 'Adventure Seeker']
    },
    {
      name: 'Daily Reflection',
      description: 'Quick daily check-ins during the trek for consistent coverage',
      questions: [
        'How are you feeling today?',
        'What was the highlight of today?',
        'What challenged you today?',
        'How is the group dynamic?',
        'Any insights or realizations?'
      ],
      estimatedDuration: 10,
      storyArcTags: ['Group Dynamics', 'Personal Growth', 'Overcoming Obstacles'],
      targetRoles: ['Trek Leader', 'Experienced Hiker', 'First-time Trekker']
    },
    {
      name: 'Arrival Day Interview',
      description: 'First day arrival energy and initial impressions',
      questions: [
        'How does it feel to finally be here in Nepal?',
        'What are your first impressions of the landscape?',
        'How was your journey to get here?',
        'What excites you most about starting tomorrow?',
        'How does the reality compare to your imagination?',
        'Any last-minute nerves or excitement?'
      ],
      estimatedDuration: 15,
      storyArcTags: ['Journey Motivation', 'Natural Beauty', 'Personal Challenges'],
      targetRoles: ['Trek Leader', 'Experienced Hiker', 'First-time Trekker', 'Adventure Seeker']
    },
    {
      name: 'First Day on Trail',
      description: 'Initial trekking experience and reality check',
      questions: [
        'How do your legs feel after the first day?',
        'What surprised you about the trail today?',
        'How is carrying your pack feeling?',
        'What was the most beautiful moment today?',
        'How is the group working together?',
        'Any gear working better or worse than expected?'
      ],
      estimatedDuration: 12,
      storyArcTags: ['Physical Preparation', 'Group Dynamics', 'Natural Beauty', 'Overcoming Obstacles'],
      targetRoles: ['Trek Leader', 'Experienced Hiker', 'First-time Trekker']
    },
    {
      name: 'Altitude Adjustment Check',
      description: 'Mid-trek altitude and physical challenge assessment',
      questions: [
        'How is your body adjusting to the altitude?',
        'What physical changes are you noticing?',
        'How are you managing your pace and breathing?',
        'What mental tricks help you push through tough moments?',
        'How is the group supporting each other through challenges?',
        'What keeps you motivated when it gets difficult?'
      ],
      estimatedDuration: 15,
      storyArcTags: ['Physical Preparation', 'Overcoming Obstacles', 'Teamwork', 'Mental Preparation'],
      targetRoles: ['Trek Leader', 'Experienced Hiker', 'First-time Trekker']
    },
    {
      name: 'Peak Achievement Moment',
      description: 'Capturing the high point emotional experience',
      questions: [
        'Describe what you\'re feeling right now at this viewpoint',
        'What does this moment mean to you personally?',
        'How does the view compare to your expectations?',
        'What thoughts are going through your mind?',
        'Who would you want to share this moment with back home?',
        'How will you remember this feeling?'
      ],
      estimatedDuration: 8,
      storyArcTags: ['Peak Moments', 'Personal Growth', 'Natural Beauty', 'Reflections'],
      targetRoles: ['Trek Leader', 'Experienced Hiker', 'First-time Trekker', 'Adventure Seeker']
    },
    {
      name: 'Sacred Lake Experience',
      description: 'Spiritual and emotional response to Khayar Lake',
      questions: [
        'How does it feel to reach this sacred lake?',
        'What does this place represent to you?',
        'Describe the spiritual energy you feel here',
        'How has this journey changed your perspective?',
        'What would you tell your past self who was preparing for this?',
        'What lesson will you take from this sacred place?'
      ],
      estimatedDuration: 20,
      storyArcTags: ['Peak Moments', 'Personal Growth', 'Cultural Insights', 'Reflections'],
      targetRoles: ['Trek Leader', 'Experienced Hiker', 'First-time Trekker', 'Adventure Seeker']
    },
    {
      name: 'Final Day Reflections',
      description: 'Last trekking day processing and achievement recognition',
      questions: [
        'How does it feel to complete your final day of trekking?',
        'What are you proud of accomplishing?',
        'Which day was the most challenging and why?',
        'How has your relationship with the group evolved?',
        'What will you miss most about being on the trail?',
        'How do you feel about returning to normal life?'
      ],
      estimatedDuration: 18,
      storyArcTags: ['Reflections', 'Personal Growth', 'Teamwork', 'Future Plans'],
      targetRoles: ['Trek Leader', 'Experienced Hiker', 'First-time Trekker', 'Adventure Seeker']
    },
    {
      name: 'Teahouse Owner Interview (Bilingual)',
      description: 'Local business perspective on trekking tourism - with Hindi/Nepali translations',
      questions: [
        'How long have you been running this teahouse? / आप कितने समय से यह चाय घर चला रहे हैं? / Tapai kati samaya dekhi yo chiya ghar chalai rahanu bhako cha? (तपाईं कति समय देखि यो चिया घर चलाइ रहनु भएको छ?)',
        'How has trekking tourism changed your life? / ट्रेकिंग पर्यटन ने आपके जीवन को कैसे बदला है? / Trekking paryatan le tapai ko jiwan kasari badal yo? (ट्रेकिङ पर्यटनले तपाईंको जीवन कसरी बदल्यो?)',
        'What do you enjoy most about meeting trekkers? / ट्रेकर्स से मिलने में आपको सबसे ज्यादा क्या अच्छा लगता है? / Trekker haru sanga bhetna ma tapai lai sabai bhanda ramro ke lagcha? (ट्रेकर हरूसँग भेट्नमा तपाईंलाई सबैभन्दा राम्रो के लाग्छ?)',
        'How do different seasons affect your business? / अलग-अलग मौसम आपके व्यापार को कैसे प्रभावित करते हैं? / Bibhinna mausam le tapai ko byabasaya lai kasari asar garcha? (विभिन्न मौसमले तपाईंको व्यवसायलाई कसरी असर गर्छ?)',
        'What challenges do you face living at this altitude? / इस ऊंचाई पर रहने में आपको क्या चुनौतियां आती हैं? / Yo uchhai ma basna ma tapai lai ke kastiharoo aauchha? (यो उचाइमा बस्नमा तपाईंलाई के कष्टिहरू आउँछ?)',
        'How has tourism impacted your community? / पर्यटन ने आपके समुदाय पर क्या प्रभाव डाला है? / Paryatan le tapai ko samudaya ma ke asar pareyo? (पर्यटनले तपाईंको समुदायमा के असर परेको छ?)',
        'What would you want trekkers to know about local life? / स्थानीय जीवन के बारे में आप ट्रेकर्स को क्या बताना चाहेंगे? / Sthaniya jiwan ko bare ma tapai trekker haru lai ke bhanna chahanu huncha? (स्थानीय जीवनको बारेमा तपाईं ट्रेकर हरूलाई के भन्न चाहानुहुन्छ?)',
        'How do you balance traditional life with tourism? / आप पारंपरिक जीवन और पर्यटन के बीच संतुलन कैसे बनाते हैं? / Tapai paramparik jiwan ra paryatan bich kasari santulan banau nu huncha? (तपाईं परम्परागत जीवन र पर्यटन बिच कसरी सन्तुलन बनाउनुहुन्छ?)'
      ],
      estimatedDuration: 30,
      storyArcTags: ['Local Perspective', 'Tourism Impact', 'Mountain Life', 'Economic Impact', 'Cultural Insights'],
      targetRoles: ['Teahouse Owner']
    },
    {
      name: 'Village Elder Interview (Bilingual)',
      description: 'Traditional perspective and cultural wisdom - with Hindi/Nepali translations',
      questions: [
        'How has this village changed over your lifetime? / आपके जीवनकाल में यह गांव कैसे बदला है? / Tapai ko jiwan kal ma yo gaun kasari badal yo? (तपाईंको जीवनकालमा यो गाउँ कसरी बदल्यो?)',
        'What are the most important traditions you want to preserve? / कौन सी परंपराएं आप सबसे महत्वपूर्ण मानते हैं जिन्हें बचाना चाहते हैं? / Kun parampara haru tapai lai sabai bhanda mahattvapurna lagcha ra bachauna chahanu huncha? (कुन परम्पराहरू तपाईंलाई सबैभन्दा महत्वपूर्ण लाग्छ र बचाउन चाहानुहुन्छ?)',
        'How do you view the increase in trekkers coming through? / बढ़ते ट्रेकर्स के बारे में आपकी क्या राय है? / Badhdo trekker haru ko bare ma tapai ko ke bichar cha? (बढ्दो ट्रेकर हरूको बारेमा तपाईंको के विचार छ?)',
        'What wisdom would you share with younger generations? / नई पीढ़ी को आप क्या सलाह देना चाहेंगे? / Naya pusta lai tapai ke salaha dina chahanu huncha? (नयाँ पुस्तालाई तपाईं के सल्लाह दिन चाहानुहुन्छ?)',
        'How do you balance modern changes with traditional ways? / आधुनिक बदलाव और पारंपरिक तरीकों के बीच संतुलन कैसे बनाते हैं? / Adhunik badlav ra paramparik tarika bich kasari santulan banau nu huncha? (आधुनिक बदलाव र परम्परागत तरिका बिच कसरी सन्तुलन बनाउनुहुन्छ?)',
        'What does the mountain mean to your people? / पहाड़ का आपके लोगों के लिए क्या मतलब है? / Pahar ko tapai ko manche haru ko lagi ke artha cha? (पहाडको तपाईंको मान्छे हरूको लागि के अर्थ छ?)',
        'How has the relationship with nature changed? / प्रकृति के साथ रिश्ता कैसे बदला है? / Prakriti sanga sambandha kasari badal yo? (प्रकृतिसँग सम्बन्ध कसरी बदल्यो?)',
        'What would you want the outside world to understand about your culture? / बाहरी दुनिया से आप अपनी संस्कृति के बारे में क्या समझाना चाहेंगे? / Bahira duniya lai tapai afno sanskriti ko bare ma ke bujhauna chahanu huncha? (बाहिरी दुनियालाई तपाईं आफ्नो संस्कृतिको बारेमा के बुझाउन चाहानुहुन्छ?)'
      ],
      estimatedDuration: 35,
      storyArcTags: ['Cultural Insights', 'Traditional Culture', 'Local Perspective', 'Environmental Changes', 'Mountain Life'],
      targetRoles: ['Village Elder', 'Local Resident']
    },
    {
      name: 'Porter Interview (Bilingual)',
      description: 'Working perspective on the trekking industry - with Hindi/Nepali translations',
      questions: [
        'How long have you been working as a porter? / आप कितने समय से पोर्टर का काम कर रहे हैं? / Tapai kati samaya dekhi porter ko kam gari rahanu bhako cha? (तपाईं कति समय देखि पोर्टरको काम गरिरहनु भएको छ?)',
        'What do you carry and how much does it weigh? / आप क्या ले जाते हैं और उसका वजन कितना है? / Tapai ke boknu huncha ra tyo kati ko bhar huncha? (तपाईं के बोक्नुहुन्छ र त्यो कतिको भार हुन्छ?)',
        'What\'s the most challenging part of your job? / आपके काम में सबसे कठिन हिस्सा क्या है? / Tapai ko kam ma sabai bhanda gaaro kura ke ho? (तपाईंको काममा सबैभन्दा गाह्रो कुरा के हो?)',
        'How do you stay strong and healthy for this work? / इस काम के लिए आप कैसे मजबूत और स्वस्थ रहते हैं? / Yo kam ko lagi tapai kasari baliyari ra swasthya rahanu huncha? (यो कामको लागि तपाईं कसरी बलियारी र स्वस्थ रहानुहुन्छ?)',
        'What do you think about when you\'re walking? / चलते समय आप क्या सोचते हैं? / Hiddai garda tapai ke sochnu huncha? (हिँड्दै गर्दा तपाईं के सोच्नुहुन्छ?)',
        'How has this work supported your family? / इस काम से आपके परिवार को कैसे सहारा मिला है? / Yo kam le tapai ko pariwar lai kasari sahayog gareko cha? (यो कामले तपाईंको परिवारलाई कसरी सहयोग गरेको छ?)',
        'What do you want trekkers to know about porters? / पोर्टर्स के बारे में आप ट्रेकर्स को क्या बताना चाहते हैं? / Porter haru ko bare ma tapai trekker haru lai ke bhanna chahanu huncha? (पोर्टर हरूको बारेमा तपाईं ट्रेकर हरूलाई के भन्न चाहानुहुन्छ?)',
        'What are your dreams for the future? / भविष्य के लिए आपके क्या सपने हैं? / Bhabishya ko lagi tapai ko ke sapana cha? (भविष्यको लागि तपाईंको के सपना छ?)'
      ],
      estimatedDuration: 25,
      storyArcTags: ['Local Perspective', 'Economic Impact', 'Physical Preparation', 'Mountain Life', 'Tourism Impact'],
      targetRoles: ['Porter', 'Support Staff']
    },
    {
      name: 'Local Guide Interview (Bilingual)',
      description: 'Professional guide perspective on mountain guiding - with Hindi/Nepali translations',
      questions: [
        'How did you become a trekking guide? / आप ट्रेकिंग गाइड कैसे बने? / Tapai kasari trekking guide banu bhayo? (तपाईं कसरी ट्रेकिङ गाइड बनु भयो?)',
        'What do you love most about guiding trekkers? / ट्रेकर्स को गाइड करने में आपको सबसे ज्यादा क्या पसंद है? / Trekker haru lai guide garna ma tapai lai sabai bhanda ke man parcha? (ट्रेकर हरूलाई गाइड गर्नमा तपाईंलाई सबैभन्दा के मन पर्छ?)',
        'How do you ensure trekker safety in the mountains? / पहाड़ों में ट्रेकर्स की सुरक्षा कैसे सुनिश्चित करते हैं? / Pahar ma trekker haru ko suraksha kasari sunischit garnu huncha? (पहाडमा ट्रेकर हरूको सुरक्षा कसरी सुनिश्चित गर्नुहुन्छ?)',
        'What\'s the most rewarding part of your job? / आपके काम में सबसे संतोषजनक बात क्या है? / Tapai ko kam ma sabai bhanda santoshajanak kura ke ho? (तपाईंको काममा सबैभन्दा सन्तोषजनक कुरा के हो?)',
        'How do you handle emergencies or difficult situations? / आपातकाल या कठिन परिस्थितियों को कैसे संभालते हैं? / Apatkal wa gathilo paristhiti lai kasari sambhaalnu huncha? (आपतकाल वा गाह्रो परिस्थितिलाई कसरी सम्हाल्नुहुन्छ?)',
        'What changes have you seen in trekking over the years? / बर्षों में ट्रेकिंग में आपने क्या बदलाव देखे हैं? / Barsa haru ma trekking ma tapai le ke badlav dekhnu bhayo? (वर्षहरूमा ट्रेकिङमा तपाईंले के बदलाव देख्नु भयो?)',
        'How do you share your culture with visitors? / आगंतुकों के साथ अपनी संस्कृति कैसे साझा करते हैं? / Aagantuk haru sanga afno sanskriti kasari sajha garnu huncha? (आगन्तुक हरूसँग आफ्नो संस्कृति कसरी साझा गर्नुहुन्छ?)',
        'What advice do you give to first-time trekkers? / पहली बार ट्रेकिंग करने वालों को क्या सलाह देते हैं? / Pahilo patak trekking garne haru lai ke salaha dinu huncha? (पहिलो पटक ट्रेकिङ गर्ने हरूलाई के सल्लाह दिनुहुन्छ?)'
      ],
      estimatedDuration: 30,
      storyArcTags: ['Local Perspective', 'Leadership Moments', 'Cultural Insights', 'Tourism Impact', 'Mountain Life'],
      targetRoles: ['Local Guide']
    },
    {
      name: 'Fellow Trekker Interview',
      description: 'Peer perspective from other trekking groups',
      questions: [
        'Where are you from and what brought you to Nepal?',
        'How is your trek going so far?',
        'What has surprised you most about this experience?',
        'How does this compare to other treks you\'ve done?',
        'What advice would you give to other trekkers?',
        'What will you remember most about Nepal?'
      ],
      estimatedDuration: 12,
      storyArcTags: ['Journey Motivation', 'Personal Growth', 'Cultural Insights', 'Advice to Others'],
      targetRoles: ['Fellow Trekker', 'Experienced Hiker']
    }
  ]

  const loadPresetTemplate = (preset: any) => {
    setNewTemplate(preset)
    setShowAddForm(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-nepal-blue">📝 Interview Templates</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-nepal-blue text-white rounded-lg hover:bg-nepal-blue/90"
          >
            {showAddForm ? 'Cancel' : '+ Add Template'}
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{templates.length}</div>
            <div className="text-sm text-blue-600">Total Templates</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {templates.reduce((sum: number, t: any) => sum + JSON.parse(t.questions || '[]').length, 0)}
            </div>
            <div className="text-sm text-green-600">Total Questions</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {Math.round(templates.reduce((sum: number, t: any) => sum + t.estimatedDuration, 0) / 60)} hrs
            </div>
            <div className="text-sm text-yellow-600">Total Duration</div>
          </div>
        </div>
      </div>

      {/* Preset Templates */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-nepal-blue">🚀 Preset Templates</h3>
          <span className="text-sm text-gray-500">{presetTemplates.length} templates</span>
        </div>
        <p className="text-gray-600 mb-4 lg:block hidden">Professional interview templates for comprehensive documentary coverage</p>

        {/* Mobile: Horizontal Swipeable Cards */}
        <div className="lg:hidden">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
            onScroll={(e) => {
              const container = e.target as HTMLElement
              const cardWidth = 320 + 16 // 80*4 + gap
              const scrollLeft = container.scrollLeft
              const newIndex = Math.round(scrollLeft / cardWidth)
              setCurrentIndex(newIndex)
            }}
          >
            {presetTemplates.map((preset, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 border rounded-lg p-4 bg-white shadow-sm snap-start"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm leading-tight mb-1 pr-2">{preset.name}</h4>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span>📝 {preset.questions.length}</span>
                      <span>⏱️ {preset.estimatedDuration}m</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setPreviewTemplate(preset)}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-nepal-blue hover:bg-nepal-blue/10 rounded-full transition-colors"
                    title="Preview"
                  >
                    👁️
                  </button>
                </div>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{preset.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {preset.storyArcTags.slice(0, 3).map((tag: string, tagIndex: number) => (
                    <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                  {preset.storyArcTags.length > 3 && (
                    <span className="text-xs text-gray-400">+{preset.storyArcTags.length - 3}</span>
                  )}
                </div>

                <button
                  onClick={() => loadPresetTemplate(preset)}
                  className="w-full px-3 py-2 bg-nepal-blue text-white text-sm rounded-lg hover:bg-nepal-blue/90 active:scale-95 transition-all"
                >
                  Use Template
                </button>
              </div>
            ))}
          </div>

          {/* Enhanced scroll indicator */}
          <div className="flex items-center justify-center mt-3 space-x-3">
            <div className="flex space-x-1">
              {presetTemplates.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-nepal-blue w-6' : 'bg-gray-300'
                  }`}
                  onClick={() => {
                    const cardWidth = 320 + 16
                    scrollRef.current?.scrollTo({
                      left: index * cardWidth,
                      behavior: 'smooth'
                    })
                  }}
                />
              ))}
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <span>{currentIndex + 1}/{presetTemplates.length}</span>
              <span>•</span>
              <span>Swipe to browse</span>
            </div>
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {presetTemplates.map((preset, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2">{preset.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{preset.description}</p>
              <div className="text-sm text-gray-500 mb-3">
                {preset.questions.length} questions • {preset.estimatedDuration} min
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {preset.storyArcTags.slice(0, 2).map((tag: string, tagIndex: number) => (
                  <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
                {preset.storyArcTags.length > 2 && (
                  <span className="text-xs text-gray-500">+{preset.storyArcTags.length - 2} more</span>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPreviewTemplate(preset)}
                  className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  👁️ Preview
                </button>
                <button
                  onClick={() => loadPresetTemplate(preset)}
                  className="flex-1 px-3 py-2 bg-nepal-blue text-white rounded hover:bg-nepal-blue/90"
                >
                  Use
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end lg:items-center justify-center z-50 p-0 lg:p-4">
          <div className="bg-white rounded-t-xl lg:rounded-lg max-w-2xl w-full max-h-[90vh] lg:max-h-[80vh] overflow-y-auto">
            <div className="p-4 lg:p-6">
              {/* Mobile: Drag handle */}
              <div className="lg:hidden flex justify-center mb-3">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>

              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className="text-lg lg:text-xl font-semibold text-nepal-blue line-clamp-2 lg:line-clamp-none">
                    {previewTemplate.name}
                  </h3>
                  <div className="flex items-center space-x-3 text-xs lg:text-sm text-gray-500 mt-1">
                    <span>📝 {previewTemplate.questions.length}</span>
                    <span>⏱️ {previewTemplate.estimatedDuration}m</span>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm lg:text-base text-gray-600 mb-3">{previewTemplate.description}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2 text-sm lg:text-base">Story Arc Tags:</h4>
                <div className="flex flex-wrap gap-1 mb-4">
                  {previewTemplate.storyArcTags.map((tag: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3 text-sm lg:text-base">Interview Questions:</h4>
                <ol className="list-decimal list-inside space-y-2 max-h-60 lg:max-h-none overflow-y-auto">
                  {previewTemplate.questions.map((question: string, index: number) => (
                    <li key={index} className="text-sm lg:text-base text-gray-700 leading-relaxed">
                      {question}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    loadPresetTemplate(previewTemplate)
                    setPreviewTemplate(null)
                  }}
                  className="w-full lg:flex-1 px-4 py-3 lg:py-2 bg-nepal-blue text-white rounded-lg hover:bg-nepal-blue/90 active:scale-95 transition-all font-medium"
                >
                  Use This Template
                </button>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="w-full lg:w-auto px-4 py-3 lg:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:scale-95 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Template Form */}
      {showAddForm && (
        <div className="card">
          <h3 className="text-lg font-semibold text-nepal-blue mb-4">📝 Create Interview Template</h3>

          <div className="space-y-4">
            {/* Template Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Name *
              </label>
              <input
                type="text"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                placeholder="e.g., Pre-Trek Expectations"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nepal-blue"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newTemplate.description}
                onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                placeholder="Brief description of when to use this template"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nepal-blue"
              />
            </div>

            {/* Questions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Questions *
              </label>
              <div className="space-y-2">
                {newTemplate.questions.map((question, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 w-8">{index + 1}.</span>
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => updateQuestion(index, e.target.value)}
                      placeholder="Enter your question"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nepal-blue"
                    />
                    <button
                      onClick={() => removeQuestion(index)}
                      className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={addQuestion}
                  className="px-3 py-2 text-nepal-blue border border-nepal-blue rounded-md hover:bg-nepal-blue hover:text-white"
                >
                  + Add Question
                </button>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Duration (minutes)
              </label>
              <input
                type="number"
                value={newTemplate.estimatedDuration}
                onChange={(e) => setNewTemplate({...newTemplate, estimatedDuration: parseInt(e.target.value)})}
                min="5"
                max="120"
                className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nepal-blue"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSaveTemplate}
                className="px-6 py-2 bg-nepal-blue text-white rounded-lg hover:bg-nepal-blue/90"
              >
                Save Template
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Templates */}
      {templates.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-nepal-blue mb-4">📚 Your Templates</h3>
          <div className="space-y-4">
            {templates.map((template: any) => {
              const questions = JSON.parse(template.questions || '[]')
              const storyTags = JSON.parse(template.storyArcTags || '[]')
              const targetRoles = JSON.parse(template.targetRoles || '[]')

              return (
                <div key={template.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg">{template.name}</h4>
                    <div className="text-sm text-gray-500">
                      {questions.length} questions • {template.estimatedDuration} min
                    </div>
                  </div>

                  {template.description && (
                    <p className="text-gray-600 mb-3">{template.description}</p>
                  )}

                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Questions:</h5>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                      {questions.map((question: string, index: number) => (
                        <li key={index}>{question}</li>
                      ))}
                    </ol>
                  </div>

                  {storyTags.length > 0 && (
                    <div className="mt-3">
                      <span className="text-sm font-medium">Story Arc Tags: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {storyTags.map((tag: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}