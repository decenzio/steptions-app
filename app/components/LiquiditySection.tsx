'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Asset {
  id: string
  symbol: string
  name: string
  imageUrl: string
  currentPrice: number
  apy: number
  totalLiquidity: number
  yourLiquidity: number
}

interface LiquidityPool {
  id: string
  asset: Asset
  minDeposit: number
  maxDeposit: number
  lockupPeriod: number // in days
  riskLevel: 'Low' | 'Medium' | 'High'
  utilizationRate: number // percentage
}

const assets: Asset[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    imageUrl: 'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png',
    currentPrice: 95847.32,
    apy: 8.5,
    totalLiquidity: 12400000,
    yourLiquidity: 0
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    imageUrl: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png',
    currentPrice: 3421.67,
    apy: 12.3,
    totalLiquidity: 8900000,
    yourLiquidity: 0
  },
  {
    id: '3',
    symbol: 'CHEF',
    name: 'Chef Coin',
    imageUrl: 'https://assets.coingecko.com/coins/images/11222/standard/0x_icon.png',
    currentPrice: 2.89,
    apy: 24.7,
    totalLiquidity: 890000,
    yourLiquidity: 0
  },
  {
    id: '4',
    symbol: 'XML',
    name: 'XML Chain',
    imageUrl: 'https://assets.coingecko.com/coins/images/8043/standard/xmlchain.png',
    currentPrice: 0.847,
    apy: 18.9,
    totalLiquidity: 2100000,
    yourLiquidity: 0
  }
]

const liquidityPools: LiquidityPool[] = [
  {
    id: '1',
    asset: assets[0], // BTC
    minDeposit: 0.01,
    maxDeposit: 10,
    lockupPeriod: 30,
    riskLevel: 'Low',
    utilizationRate: 78.5
  },
  {
    id: '2',
    asset: assets[1], // ETH
    minDeposit: 0.1,
    maxDeposit: 100,
    lockupPeriod: 30,
    riskLevel: 'Low',
    utilizationRate: 85.2
  },
  {
    id: '3',
    asset: assets[2], // CHEF
    minDeposit: 100,
    maxDeposit: 50000,
    lockupPeriod: 60,
    riskLevel: 'High',
    utilizationRate: 92.1
  },
  {
    id: '4',
    asset: assets[3], // XML
    minDeposit: 1000,
    maxDeposit: 100000,
    lockupPeriod: 45,
    riskLevel: 'Medium',
    utilizationRate: 68.7
  }
]

export default function LiquiditySection() {
  const [selectedPool, setSelectedPool] = useState<LiquidityPool | null>(null)
  const [depositAmount, setDepositAmount] = useState<string>('')
  const [isUsdMode, setIsUsdMode] = useState(false)
  const [projectedEarnings, setProjectedEarnings] = useState<number>(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Calculate projected earnings
  useEffect(() => {
    if (selectedPool && depositAmount) {
      const amount = parseFloat(depositAmount)
      if (!isNaN(amount)) {
        const yearlyEarnings = (amount * selectedPool.asset.apy) / 100
        const lockupEarnings = (yearlyEarnings * selectedPool.lockupPeriod) / 365
        setProjectedEarnings(lockupEarnings)
      } else {
        setProjectedEarnings(0)
      }
    } else {
      setProjectedEarnings(0)
    }
  }, [selectedPool, depositAmount])

  const handlePoolSelect = (pool: LiquidityPool) => {
    setSelectedPool(pool)
    setDepositAmount('')
    setIsDropdownOpen(false)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-50 border-green-200'
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'High': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getUtilizationColor = (rate: number) => {
    if (rate >= 90) return 'bg-red-500'
    if (rate >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const convertAmount = (amount: string, toUsd: boolean): string => {
    if (!selectedPool || !amount) return ''
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount)) return ''

    if (toUsd) {
      return (numAmount * selectedPool.asset.currentPrice).toFixed(2)
    } else {
      return (numAmount / selectedPool.asset.currentPrice).toFixed(8)
    }
  }

  const getDepositLimits = () => {
    if (!selectedPool) return { min: 0, max: 0 }

    if (isUsdMode) {
      return {
        min: selectedPool.minDeposit * selectedPool.asset.currentPrice,
        max: selectedPool.maxDeposit * selectedPool.asset.currentPrice
      }
    }
    return {
      min: selectedPool.minDeposit,
      max: selectedPool.maxDeposit
    }
  }

  const isValidAmount = (): boolean => {
    if (!selectedPool || !depositAmount) return false
    const amount = parseFloat(depositAmount)
    const limits = getDepositLimits()
    return amount >= limits.min && amount <= limits.max
  }

  const handleProvideClick = () => {
    if (!selectedPool || !isValidAmount()) {
      alert('Please enter a valid deposit amount within the specified limits')
      return
    }

    const depositData = {
      pool: selectedPool.asset.symbol,
      amount: parseFloat(depositAmount),
      currency: isUsdMode ? 'USD' : selectedPool.asset.symbol,
      apy: selectedPool.asset.apy,
      lockupPeriod: selectedPool.lockupPeriod,
      projectedEarnings: projectedEarnings,
      riskLevel: selectedPool.riskLevel,
      timestamp: '2025-06-21 14:30:01',
      user: 'Roman-24'
    }

    console.log('Liquidity provided:', depositData)
    alert(`Liquidity provided successfully!\nPool: ${selectedPool.asset.symbol}\nAmount: ${depositAmount} ${isUsdMode ? 'USD' : selectedPool.asset.symbol}\nLockup: ${selectedPool.lockupPeriod} days\nProjected Earnings: ${projectedEarnings.toFixed(4)} ${isUsdMode ? 'USD' : selectedPool.asset.symbol}`)
  }

  const limits = getDepositLimits()

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Provide Liquidity</h3>
          <p className="text-sm text-gray-600">Earn rewards by providing liquidity to options markets</p>
        </div>

        {/* Pool Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Liquidity Pool
          </label>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 text-left bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              {selectedPool ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedPool.asset.imageUrl}
                      alt={selectedPool.asset.symbol}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <div>
                      <span className="font-medium">{selectedPool.asset.symbol}</span>
                      <div className="text-xs text-gray-500">
                        {selectedPool.asset.apy}% APY • {selectedPool.lockupPeriod} days lockup
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium border ${getRiskColor(selectedPool.riskLevel)}`}>
                    {selectedPool.riskLevel}
                  </div>
                </div>
              ) : (
                <span className="text-gray-500">Choose a liquidity pool...</span>
              )}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-auto">
                {liquidityPools.map((pool) => (
                  <button
                    key={pool.id}
                    onClick={() => handlePoolSelect(pool)}
                    className="w-full px-4 py-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={pool.asset.imageUrl}
                          alt={pool.asset.symbol}
                          width={28}
                          height={28}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-medium">{pool.asset.symbol}</div>
                          <div className="text-sm text-gray-500">{pool.asset.name}</div>
                          <div className="text-xs text-green-600 font-medium">{pool.asset.apy}% APY</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded text-xs font-medium border ${getRiskColor(pool.riskLevel)} mb-1`}>
                          {pool.riskLevel}
                        </div>
                        <div className="text-xs text-gray-500">{pool.lockupPeriod} days</div>
                      </div>
                    </div>

                    {/* Utilization Bar */}
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Utilization</span>
                        <span>{pool.utilizationRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getUtilizationColor(pool.utilizationRate)}`}
                          style={{ width: `${pool.utilizationRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pool Details */}
        {selectedPool && (
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-blue-800 mb-3">Pool Details</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-blue-600">Total Liquidity:</span>
                <div className="font-medium">${selectedPool.asset.totalLiquidity.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-blue-600">Your Liquidity:</span>
                <div className="font-medium">${selectedPool.asset.yourLiquidity.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-blue-600">Minimum Deposit:</span>
                <div className="font-medium">{selectedPool.minDeposit} {selectedPool.asset.symbol}</div>
              </div>
              <div>
                <span className="text-blue-600">Maximum Deposit:</span>
                <div className="font-medium">{selectedPool.maxDeposit} {selectedPool.asset.symbol}</div>
              </div>
            </div>
          </div>
        )}

        {/* Currency Toggle */}
        {selectedPool && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Deposit Amount
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsUsdMode(false)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    !isUsdMode ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {selectedPool.asset.symbol}
                </button>
                <button
                  onClick={() => setIsUsdMode(true)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    isUsdMode ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  USD
                </button>
              </div>
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                {isUsdMode ? '$' : selectedPool.asset.symbol}
              </span>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder={`Enter amount (${limits.min} - ${limits.max})`}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  depositAmount && !isValidAmount() ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
            </div>

            <div className="mt-2 flex justify-between text-xs">
              <span className="text-gray-500">
                Min: {limits.min.toLocaleString()} {isUsdMode ? 'USD' : selectedPool.asset.symbol}
              </span>
              <span className="text-gray-500">
                Max: {limits.max.toLocaleString()} {isUsdMode ? 'USD' : selectedPool.asset.symbol}
              </span>
            </div>

            {depositAmount && (
              <div className="mt-2 text-xs text-gray-600">
                ≈ {convertAmount(depositAmount, !isUsdMode)} {isUsdMode ? selectedPool.asset.symbol : 'USD'}
              </div>
            )}
          </div>
        )}

        {/* Projected Earnings */}
        {selectedPool && depositAmount && isValidAmount() && (
          <div className="bg-green-50 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-green-800 mb-3">Projected Earnings</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-600">APY:</span>
                <span className="font-medium">{selectedPool.asset.apy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Lockup Period:</span>
                <span className="font-medium">{selectedPool.lockupPeriod} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Deposit Amount:</span>
                <span className="font-medium">{depositAmount} {isUsdMode ? 'USD' : selectedPool.asset.symbol}</span>
              </div>
              <div className="border-t border-green-200 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-medium text-green-800">Projected Earnings:</span>
                  <span className="font-bold text-green-800">
                    +{projectedEarnings.toFixed(4)} {isUsdMode ? 'USD' : selectedPool.asset.symbol}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="font-medium text-green-800">Total After Lockup:</span>
                  <span className="font-bold text-green-800">
                    {(parseFloat(depositAmount) + projectedEarnings).toFixed(4)} {isUsdMode ? 'USD' : selectedPool.asset.symbol}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risk Warning */}
        {selectedPool && selectedPool.riskLevel !== 'Low' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-yellow-800 font-medium text-sm">
                  {selectedPool.riskLevel} Risk Pool
                </p>
                <p className="text-yellow-700 text-xs mt-1">
                  This pool involves {selectedPool.riskLevel.toLowerCase()} risk. Higher returns come with increased potential for losses. Please invest responsibly.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Provide Liquidity Button */}
        <div className="mt-auto">
          <button
            onClick={handleProvideClick}
            disabled={!selectedPool || !isValidAmount()}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
          >
            Provide Liquidity
          </button>
        </div>
      </div>
    </div>
  )
}