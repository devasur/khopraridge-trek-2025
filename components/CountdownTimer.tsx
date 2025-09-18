'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: string
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex justify-center space-x-4 mt-4">
      <div className="text-center">
        <div className="bg-nepal-blue text-white rounded-lg p-3 min-w-[60px]">
          <div className="text-2xl font-bold">{timeLeft.days}</div>
        </div>
        <div className="text-sm text-gray-600 mt-1">Days</div>
      </div>
      <div className="text-center">
        <div className="bg-nepal-blue text-white rounded-lg p-3 min-w-[60px]">
          <div className="text-2xl font-bold">{timeLeft.hours}</div>
        </div>
        <div className="text-sm text-gray-600 mt-1">Hours</div>
      </div>
      <div className="text-center">
        <div className="bg-nepal-blue text-white rounded-lg p-3 min-w-[60px]">
          <div className="text-2xl font-bold">{timeLeft.minutes}</div>
        </div>
        <div className="text-sm text-gray-600 mt-1">Min</div>
      </div>
      <div className="text-center">
        <div className="bg-nepal-blue text-white rounded-lg p-3 min-w-[60px]">
          <div className="text-2xl font-bold">{timeLeft.seconds}</div>
        </div>
        <div className="text-sm text-gray-600 mt-1">Sec</div>
      </div>
    </div>
  )
}