'use client'

import { useState } from 'react'
import Image from 'next/image'

interface OptionPosition {
  id: string
  asset: string
  imageUrl: string
  type: 'call' | 'put'
  strikePrice: number
  currentPrice: number
  expirationDate: string
  quantity: number
  premium: number
  intrinsicValue: number
  timeValue: number
  pnl: number
  canExercise: boolean
  daysToExpiry: number
}

// Mock user's option positions
const mockPositions: OptionPosition[] = [
  {
    id: '1',
    asset: 'BTC',
    imageUrl: 'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png',
    type: 'call',
    strikePrice: 92000,
    currentPrice: 95847.32,
    expirationDate: '2025-06-28',
    quantity: 2,
    premium: 1250.50,
    intrinsicValue: 3847.32,
    timeValue: 423.18,
    pnl: 6194.64,
    canExercise: true,
    daysToExpiry: 7
  },
  {
    id: '2',
    asset: 'ETH',
    imageUrl: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png',
    type: 'put',
    strikePrice: 3500,
    currentPrice: 3421.67,
    expirationDate: '2025-06-30',
    quantity: 5,
    premium: 89.25,
    intrinsicValue: 78.33,
    timeValue: 12.45,
    pnl: 391.65,
    canExercise: true,
    daysToExpiry: 9
  },
  {
    id: '3',
    asset: 'CHEF',
    imageUrl: 'https://assets.coingecko.com/coins/images/11222/standard/0x_icon.png',
    type: 'call',
    strikePrice: 3.50,
    currentPrice: 2.89,
    expirationDate: '2025-07-15',
    quantity: 1000,
    premium: 0.15,
    intrinsicValue: 0,
    timeValue: 0.08,
    pnl: -70.00,
    canExercise: false,
    daysToExpiry: 24
  },
  {
    id: '4',
    asset: 'XML',
    imageUrl: 'https://assets.coingecko.com/coins/images/100/standard/fmpFRHHQ_400x400.jpg',
    type: 'put',
    strikePrice: 0.90,
    currentPrice: 0.847,
    expirationDate: '2025-06-25',
    quantity: 10000,
    premium: 0.023,
    intrinsicValue: 0.053,
    timeValue: 0.011,
    pnl: 530.00,
    canExercise: true,
    daysToExpiry: 4
  }
]

export default function OptionsExercisingSection() {
  const [selectedPosition, setSelectedPosition] = useState<OptionPosition | null>(null)
  const [exerciseQuantity, setExerciseQuantity] = useState<string>('')
  const [exerciseType, setExerciseType] = useState<'early' | 'expiry'>('early')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const getMoneyness = (position: OptionPosition): { status: string; color: string } => {
    const { type, strikePrice, currentPrice } = position

    if (type === 'call') {
      if (currentPrice > strikePrice) return { status: 'ITM', color: 'text-green-700' }
      if (Math.abs(currentPrice - strikePrice) / strikePrice < 0.02) return { status: 'ATM', color: 'text-yellow-700' }
      return { status: 'OTM', color: 'text-red-700' }
    } else {
      if (currentPrice < strikePrice) return { status: 'ITM', color: 'text-green-700' }
      if (Math.abs(currentPrice - strikePrice) / strikePrice < 0.02) return { status: 'ATM', color: 'text-yellow-700' }
      return { status: 'OTM', color: 'text-red-700' }
    }
  }

  const calculateExerciseValue = (position: OptionPosition, quantity: number): number => {
    if (!position.canExercise) return 0
    return position.intrinsicValue * quantity
  }

  const calculateTotalCost = (position: OptionPosition, quantity: number): number => {
    if (position.type === 'call') {
      return position.strikePrice * quantity
    } else {
      return 0
    }
  }

  const calculateNetProceeds = (position: OptionPosition, quantity: number): number => {
    if (position.type === 'call') {
      return (position.currentPrice - position.strikePrice) * quantity
    } else {
      return (position.strikePrice - position.currentPrice) * quantity
    }
  }

  const handlePositionSelect = (position: OptionPosition) => {
    setSelectedPosition(position)
    setExerciseQuantity('')
    setIsDropdownOpen(false)
  }

  const handleExercise = () => {
    if (!selectedPosition || !exerciseQuantity) {
      alert('Please select a position and enter quantity')
      return
    }

    const quantity = parseInt(exerciseQuantity)
    if (quantity > selectedPosition.quantity || quantity <= 0) {
      alert('Invalid quantity')
      return
    }

    const exerciseValue = calculateExerciseValue(selectedPosition, quantity)
    const totalCost = calculateTotalCost(selectedPosition, quantity)
    const netProceeds = calculateNetProceeds(selectedPosition, quantity)

    const exerciseData = {
      positionId: selectedPosition.id,
      asset: selectedPosition.asset,
      type: selectedPosition.type,
      strikePrice: selectedPosition.strikePrice,
      currentPrice: selectedPosition.currentPrice,
      quantity: quantity,
      exerciseType: exerciseType,
      exerciseValue: exerciseValue,
      totalCost: totalCost,
      netProceeds: netProceeds,
      timestamp: '2025-06-21 15:24:36',
      user: 'Roman-24'
    }

    console.log('Option exercised:', exerciseData)
    alert(`Option exercised successfully!\n${selectedPosition.type.toUpperCase()} ${selectedPosition.asset}\nQuantity: ${quantity}\nNet Proceeds: $${netProceeds.toFixed(2)}`)
  }

  const isValidQuantity = (): boolean => {
    if (!selectedPosition || !exerciseQuantity) return false
    const quantity = parseInt(exerciseQuantity)
    return quantity > 0 && quantity <= selectedPosition.quantity
  }

  const getExpiryStatusColor = (days: number): string => {
    if (days <= 3) return 'text-red-700 bg-red-100 border-red-200'
    if (days <= 7) return 'text-orange-700 bg-orange-100 border-orange-200'
    return 'text-green-700 bg-green-100 border-green-200'
  }

  return (
    <div className="bg-white rounded-xl border border-gray-300 p-6 h-full shadow-sm">
      <div className="flex flex-col h-full">
        {/* HeaderApp */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Exercise Options</h3>
          <p className="text-sm font-medium text-gray-700">Manage and exercise your option positions</p>
        </div>

        {/* Position Selection Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-800 mb-2">
            Select Option Position
          </label>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 text-left bg-gray-50 border border-gray-400 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              {selectedPosition ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedPosition.imageUrl}
                      alt={selectedPosition.asset}
                      width={28}
                      height={28}
                      className="rounded-full border border-gray-300"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-900">{selectedPosition.asset}</span>
                        <span className={`px-2 py-1 text-xs font-bold rounded border ${
                          selectedPosition.type === 'call'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-red-100 text-red-800 border-red-200'
                        }`}>
                          {selectedPosition.type.toUpperCase()}
                        </span>
                        <span className={`text-xs font-bold ${getMoneyness(selectedPosition).color}`}>
                          {getMoneyness(selectedPosition).status}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        Strike: ${selectedPosition.strikePrice.toLocaleString()} • Qty: {selectedPosition.quantity} • P&L: {selectedPosition.pnl >= 0 ? '+' : ''}${selectedPosition.pnl.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className={`text-xs font-medium px-2 py-1 rounded border ${getExpiryStatusColor(selectedPosition.daysToExpiry)}`}>
                    {selectedPosition.daysToExpiry}d
                  </div>
                </div>
              ) : (
                <span className="text-gray-600 font-medium">Choose an option position...</span>
              )}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-400 rounded-lg shadow-lg max-h-80 overflow-auto">
                {mockPositions.map((position) => {
                  const moneyness = getMoneyness(position)

                  return (
                    <button
                      key={position.id}
                      onClick={() => handlePositionSelect(position)}
                      className="w-full px-4 py-4 text-left hover:bg-gray-50 border-b border-gray-200 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={position.imageUrl}
                            alt={position.asset}
                            width={32}
                            height={32}
                            className="rounded-full border border-gray-300"
                          />
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-bold text-gray-900">{position.asset}</span>
                              <span className={`px-2 py-1 text-xs font-bold rounded border ${
                                position.type === 'call'
                                  ? 'bg-green-100 text-green-800 border-green-200'
                                  : 'bg-red-100 text-red-800 border-red-200'
                              }`}>
                                {position.type.toUpperCase()}
                              </span>
                              <span className={`text-xs font-bold ${moneyness.color}`}>
                                {moneyness.status}
                              </span>
                            </div>
                            <div className="text-sm font-medium text-gray-700">
                              Strike: ${position.strikePrice.toLocaleString()} • Exp: {position.expirationDate}
                            </div>
                            <div className="text-sm font-medium text-gray-700">
                              Qty: {position.quantity} • Premium: ${position.premium.toFixed(4)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-base font-bold ${position.pnl >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                            {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                          </div>
                          <div className={`text-xs font-medium px-2 py-1 rounded border ${getExpiryStatusColor(position.daysToExpiry)}`}>
                            {position.daysToExpiry}d to expiry
                          </div>
                          <div className={`text-xs font-medium mt-1 ${position.canExercise ? 'text-green-700' : 'text-red-700'}`}>
                            {position.canExercise ? 'Exercisable' : 'Cannot Exercise'}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Selected Position Details */}
        {selectedPosition && (
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
            <h4 className="font-bold text-gray-900 mb-3">Position Details</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Current Price:</span>
                <div className="font-bold text-gray-900">${selectedPosition.currentPrice.toLocaleString()}</div>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Strike Price:</span>
                <div className="font-bold text-gray-900">${selectedPosition.strikePrice.toLocaleString()}</div>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Intrinsic Value:</span>
                <div className="font-bold text-gray-900">${selectedPosition.intrinsicValue.toFixed(4)}</div>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Time Value:</span>
                <div className="font-bold text-gray-900">${selectedPosition.timeValue.toFixed(4)}</div>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Days to Expiry:</span>
                <div className="font-bold text-gray-900">{selectedPosition.daysToExpiry} days</div>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Can Exercise:</span>
                <div className={`font-bold ${selectedPosition.canExercise ? 'text-green-700' : 'text-red-700'}`}>
                  {selectedPosition.canExercise ? 'Yes' : 'No'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Exercise Type Selection */}
        {selectedPosition && selectedPosition.canExercise && (
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Exercise Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setExerciseType('early')}
                className={`px-4 py-3 rounded-lg border-2 font-bold transition-all ${
                  exerciseType === 'early'
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                Early Exercise
                <div className="text-xs mt-1 font-medium">Exercise now</div>
              </button>
              <button
                onClick={() => setExerciseType('expiry')}
                className={`px-4 py-3 rounded-lg border-2 font-bold transition-all ${
                  exerciseType === 'expiry'
                    ? 'border-orange-600 bg-orange-50 text-orange-800'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                At Expiry
                <div className="text-xs mt-1 font-medium">Wait for expiration</div>
              </button>
            </div>
          </div>
        )}

        {/* Exercise Quantity */}
        {selectedPosition && selectedPosition.canExercise && exerciseType === 'early' && (
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Exercise Quantity
            </label>
            <input
              type="number"
              value={exerciseQuantity}
              onChange={(e) => setExerciseQuantity(e.target.value)}
              min="1"
              max={selectedPosition.quantity}
              placeholder={`Enter quantity (1 - ${selectedPosition.quantity})`}
              className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-gray-900"
            />
            <div className="mt-1 text-sm font-medium text-gray-700">
              Available: {selectedPosition.quantity} contracts
            </div>
          </div>
        )}

        {/* Exercise Calculation */}
        {selectedPosition && selectedPosition.canExercise && exerciseQuantity && isValidQuantity() && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <h4 className="font-bold text-green-900 mb-3">Exercise Calculation</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-green-700">Exercise Quantity:</span>
                <span className="font-bold text-green-900">{exerciseQuantity} contracts</span>
              </div>
              {selectedPosition.type === 'call' && (
                <div className="flex justify-between">
                  <span className="font-semibold text-green-700">Total Cost:</span>
                  <span className="font-bold text-green-900">${calculateTotalCost(selectedPosition, parseInt(exerciseQuantity)).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-semibold text-green-700">Intrinsic Value:</span>
                <span className="font-bold text-green-900">${calculateExerciseValue(selectedPosition, parseInt(exerciseQuantity)).toFixed(2)}</span>
              </div>
              <div className="border-t border-green-300 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-bold text-green-900">Net Proceeds:</span>
                  <span className="font-bold text-green-900 text-lg">
                    ${calculateNetProceeds(selectedPosition, parseInt(exerciseQuantity)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Exercise Button */}
        <div className="mt-auto">
          <button
            onClick={handleExercise}
            disabled={!selectedPosition || !selectedPosition.canExercise || (exerciseType === 'early' && !isValidQuantity())}
            className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold text-lg rounded-lg hover:from-orange-700 hover:to-orange-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
          >
            {exerciseType === 'early' ? 'Exercise Now' : 'Set Auto-Exercise'}
          </button>
        </div>
      </div>
    </div>
  )
}