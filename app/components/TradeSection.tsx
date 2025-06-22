'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Asset {
  id: string
  symbol: string
  name: string
  imageUrl: string
  currentPrice: number
  volatility: number
}

const assets: Asset[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    imageUrl: 'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png',
    currentPrice: 95847.32,
    volatility: 0.65
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    imageUrl: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png',
    currentPrice: 3421.67,
    volatility: 0.75
  },
  {
    id: '3',
    symbol: 'CHEF',
    name: 'Chef Coin',
    imageUrl: 'https://assets.coingecko.com/coins/images/11222/standard/0x_icon.png',
    currentPrice: 2.89,
    volatility: 1.2
  },
  {
    id: '4',
    symbol: 'XML',
    name: 'XML Chain',
    imageUrl: 'https://assets.coingecko.com/coins/images/100/standard/fmpFRHHQ_400x400.jpg',
    currentPrice: 0.847,
    volatility: 0.95
  }
]

export default function TradeSection() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [optionType, setOptionType] = useState<'call' | 'put'>('call')
  const [strikePrice, setStrikePrice] = useState<string>('')
  const [expirationDate, setExpirationDate] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('1')
  const [premium, setPremium] = useState<number>(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const calculatePremium = (asset: Asset | null, strike: string, expDate: string, type: 'call' | 'put'): number => {
    if (!asset || !strike || !expDate) return 0

    const S = asset.currentPrice
    const K = parseFloat(strike)
    const r = 0.05
    const sigma = asset.volatility

    const today = new Date()
    const expiration = new Date(expDate)
    const T = Math.max((expiration.getTime() - today.getTime()) / (365.25 * 24 * 60 * 60 * 1000), 0.01)

    const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T))
    const d2 = d1 - sigma * Math.sqrt(T)

    const normCDF = (x: number): number => {
      return 0.5 * (1 + Math.sign(x) * Math.sqrt(1 - Math.exp(-2 * x * x / Math.PI)))
    }

    let optionPrice: number
    if (type === 'call') {
      optionPrice = S * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2)
    } else {
      optionPrice = K * Math.exp(-r * T) * normCDF(-d2) - S * normCDF(-d1)
    }

    const minPremium = S * 0.005
    return Math.max(optionPrice * 1.1, minPremium)
  }

  useEffect(() => {
    const newPremium = calculatePremium(selectedAsset, strikePrice, expirationDate, optionType)
    setPremium(newPremium)
  }, [selectedAsset, strikePrice, expirationDate, optionType])

  const handleAssetSelect = (asset: Asset) => {
    setSelectedAsset(asset)
    setStrikePrice(asset.currentPrice.toString())
    setIsDropdownOpen(false)
  }

  const getExpirationDates = () => {
    const dates = []
    const today = new Date()

    for (let i = 1; i <= 8; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + (i * 7))
      dates.push(date.toISOString().split('T')[0])
    }

    for (let i = 1; i <= 6; i++) {
      const date = new Date(today)
      date.setMonth(today.getMonth() + i)
      date.setDate(1)
      date.setDate(date.getDate() + (5 - date.getDay() + 7) % 7)
      dates.push(date.toISOString().split('T')[0])
    }

    return dates.sort()
  }

  const getDaysToExpiration = (): number => {
    if (!expirationDate) return 0
    const today = new Date()
    const expiration = new Date(expirationDate)
    return Math.ceil((expiration.getTime() - today.getTime()) / (24 * 60 * 60 * 1000))
  }

  const getMoneyness = (): { type: string; percentage: number } => {
    if (!selectedAsset || !strikePrice) return { type: 'ATM', percentage: 0 }

    const spot = selectedAsset.currentPrice
    const strike = parseFloat(strikePrice)
    const diff = ((strike - spot) / spot) * 100

    if (Math.abs(diff) < 2) return { type: 'ATM', percentage: diff }
    if (optionType === 'call') {
      return diff > 0 ? { type: 'OTM', percentage: diff } : { type: 'ITM', percentage: Math.abs(diff) }
    } else {
      return diff < 0 ? { type: 'OTM', percentage: Math.abs(diff) } : { type: 'ITM', percentage: diff }
    }
  }

  const subtotal = premium * parseFloat(quantity || '0')
  const feeAmount = subtotal * 0.03
  const totalCost = subtotal + feeAmount

  const handlePlaceOrder = () => {
    if (!selectedAsset || !strikePrice || !expirationDate || !quantity || premium <= 0) {
      alert('Please fill all required fields')
      return
    }

    const order = {
      asset: selectedAsset.symbol,
      type: optionType,
      strike: parseFloat(strikePrice),
      expiration: expirationDate,
      quantity: parseFloat(quantity),
      premium: premium,
      subtotal: subtotal,
      fee: feeAmount,
      totalCost: totalCost,
      timestamp: '2025-06-21 15:18:51',
      user: 'Roman-24'
    }

    console.log('Order placed:', order)
    alert(`Order placed successfully!\n${optionType.toUpperCase()} ${selectedAsset.symbol} option\nStrike: $${strikePrice}\nQuantity: ${quantity}\nSubtotal: $${subtotal.toFixed(2)}\nFee (3%): $${feeAmount.toFixed(2)}\nTotal Cost: $${totalCost.toFixed(2)}`)
  }

  const moneyness = getMoneyness()

  return (
    <div className="bg-white rounded-xl border border-gray-300 p-6 h-full shadow-sm">
      <div className="flex flex-col h-full">
        {/* HeaderApp */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Trade Options</h3>
          <p className="text-sm font-medium text-gray-700">Select an asset and configure your options trade</p>
        </div>

        {/* Asset Selection */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-800 mb-2">
            Select Asset
          </label>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 text-left bg-gray-50 border border-gray-400 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              {selectedAsset ? (
                <div className="flex items-center space-x-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedAsset.imageUrl}
                    alt={selectedAsset.symbol}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="font-bold text-gray-900">{selectedAsset.symbol}</span>
                  <span className="font-semibold text-gray-700">${selectedAsset.currentPrice.toLocaleString()}</span>
                </div>
              ) : (
                <span className="text-gray-600 font-medium">Choose an asset...</span>
              )}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-400 rounded-lg shadow-lg max-h-60 overflow-auto">
                {assets.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => handleAssetSelect(asset)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors border-b border-gray-200 last:border-b-0"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset.imageUrl}
                      alt={asset.symbol}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">{asset.symbol}</div>
                      <div className="text-sm font-medium text-gray-600">{asset.name}</div>
                    </div>
                    <div className="text-sm font-bold text-gray-900">${asset.currentPrice.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Option Type */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-800 mb-2">
            Option Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setOptionType('call')}
              className={`px-4 py-3 rounded-lg border-2 font-bold transition-all ${
                optionType === 'call'
                  ? 'border-green-600 bg-green-50 text-green-800'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              CALL
            </button>
            <button
              onClick={() => setOptionType('put')}
              className={`px-4 py-3 rounded-lg border-2 font-bold transition-all ${
                optionType === 'put'
                  ? 'border-red-600 bg-red-50 text-red-800'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              PUT
            </button>
          </div>
        </div>

        {/* Strike Price */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-800 mb-2">
            Strike Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 font-bold">$</span>
            <input
              type="number"
              value={strikePrice}
              onChange={(e) => setStrikePrice(e.target.value)}
              placeholder="Enter strike price"
              className="w-full pl-8 pr-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-gray-900"
            />
          </div>
          {selectedAsset && (
            <div className="mt-1 flex justify-between text-sm">
              <span className="font-medium text-gray-700">Current: ${selectedAsset.currentPrice.toLocaleString()}</span>
              <span className={`font-bold ${
                moneyness.type === 'ITM' ? 'text-green-700' :
                  moneyness.type === 'OTM' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {moneyness.type} {moneyness.percentage !== 0 && `(${moneyness.percentage > 0 ? '+' : ''}${moneyness.percentage.toFixed(1)}%)`}
              </span>
            </div>
          )}
        </div>

        {/* Expiration Date */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-800 mb-2">
            Expiration Date
          </label>
          <select
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-gray-900"
          >
            <option value="">Select expiration date</option>
            {getExpirationDates().map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </option>
            ))}
          </select>
          {expirationDate && (
            <div className="mt-1 text-sm font-medium text-gray-700">
              {getDaysToExpiration()} days to expiration
            </div>
          )}
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-800 mb-2">
            Quantity (Contracts)
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            placeholder="Enter quantity"
            className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-gray-900"
          />
        </div>

        {/* Premium Calculation Display */}
        {selectedAsset && strikePrice && expirationDate && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-bold text-blue-900 mb-2">Premium Calculation</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-blue-700">Asset Volatility:</span>
                <span className="font-bold text-blue-900">{(selectedAsset.volatility * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-blue-700">Time to Expiration:</span>
                <span className="font-bold text-blue-900">{getDaysToExpiration()} days</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-blue-700">Moneyness:</span>
                <span className="font-bold text-blue-900">{moneyness.type}</span>
              </div>
              <div className="border-t border-blue-300 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-bold text-blue-900">Calculated Premium:</span>
                  <span className="font-bold text-blue-900">${premium.toFixed(4)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Summary */}
        {selectedAsset && strikePrice && premium > 0 && (
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4">
            <h4 className="font-bold text-gray-900 mb-3">Order Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Premium per contract:</span>
                <span className="font-bold text-gray-900">${premium.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Quantity:</span>
                <span className="font-bold text-gray-900">{quantity} contracts</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Subtotal:</span>
                <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Platform Fee (3%):</span>
                <span className="font-bold text-orange-700">${feeAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-400 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Total Cost:</span>
                  <span className="font-bold text-blue-700 text-lg">${totalCost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Place Order Button */}
        <div className="mt-auto">
          <button
            onClick={handlePlaceOrder}
            disabled={!selectedAsset || !strikePrice || !expirationDate || !quantity || premium <= 0}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}