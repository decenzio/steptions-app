'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PortfolioAsset {
  id: string
  symbol: string
  name: string
  imageUrl: string
  quantity: number
  averagePrice: number
  currentPrice: number
  totalValue: number
  pnl: number
  pnlPercentage: number
  allocation: number
}

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
  currentValue: number
  pnl: number
  daysToExpiry: number
}

interface LiquidityPosition {
  id: string
  asset: string
  imageUrl: string
  poolAmount: number
  apy: number
  earnedRewards: number
  lockupEnd: string
  daysRemaining: number
}

interface PortfolioStats {
  totalBalance: number
  totalPnl: number
  totalPnlPercentage: number
  availableCash: number
  optionsValue: number
  liquidityValue: number
  assetsValue: number
}

// Mock portfolio data for Roman-24
const portfolioStats: PortfolioStats = {
  totalBalance: 127453.82,
  totalPnl: 12847.33,
  totalPnlPercentage: 11.23,
  availableCash: 25890.45,
  optionsValue: 18650.75,
  liquidityValue: 35420.15,
  assetsValue: 47492.47
}

const portfolioAssets: PortfolioAsset[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    imageUrl: 'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png',
    quantity: 0.4952,
    averagePrice: 89450.23,
    currentPrice: 95847.32,
    totalValue: 47492.47,
    pnl: 3169.84,
    pnlPercentage: 7.15,
    allocation: 37.3
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    imageUrl: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png',
    quantity: 8.235,
    averagePrice: 3180.45,
    currentPrice: 3421.67,
    totalValue: 28186.65,
    pnl: 1985.33,
    pnlPercentage: 7.58,
    allocation: 22.1
  }
]

const optionPositions: OptionPosition[] = [
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
    currentValue: 8945.75,
    pnl: 6194.64,
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
    currentValue: 837.50,
    pnl: 391.65,
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
    currentValue: 80.00,
    pnl: -70.00,
    daysToExpiry: 24
  }
]

const liquidityPositions: LiquidityPosition[] = [
  {
    id: '1',
    asset: 'BTC',
    imageUrl: 'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png',
    poolAmount: 15000.00,
    apy: 8.5,
    earnedRewards: 425.80,
    lockupEnd: '2025-07-21',
    daysRemaining: 30
  },
  {
    id: '2',
    asset: 'ETH',
    imageUrl: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png',
    poolAmount: 20000.00,
    apy: 12.3,
    earnedRewards: 894.35,
    lockupEnd: '2025-08-15',
    daysRemaining: 55
  }
]

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<'overview' | 'assets' | 'options' | 'liquidity'>('overview')

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatPercentage = (percentage: number): string => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`
  }

  const getExpiryColor = (days: number): string => {
    if (days <= 3) return 'text-red-600 bg-red-50'
    if (days <= 7) return 'text-yellow-600 bg-yellow-50'
    return 'text-green-600 bg-green-50'
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Your Portfolio</h3>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
          </div>
        </div>

        {/* Portfolio Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="text-sm text-blue-600 font-medium">Total Balance</div>
            <div className="text-2xl font-bold text-blue-800">{formatCurrency(portfolioStats.totalBalance)}</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <div className="text-sm text-green-600 font-medium">Total P&L</div>
            <div className="text-2xl font-bold text-green-800">
              {formatCurrency(portfolioStats.totalPnl)}
            </div>
            <div className="text-sm text-green-600">{formatPercentage(portfolioStats.totalPnlPercentage)}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <div className="text-sm text-purple-600 font-medium">Available Cash</div>
            <div className="text-2xl font-bold text-purple-800">{formatCurrency(portfolioStats.availableCash)}</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
            <div className="text-sm text-orange-600 font-medium">Assets Value</div>
            <div className="text-2xl font-bold text-orange-800">{formatCurrency(portfolioStats.assetsValue)}</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'assets', label: 'Assets' },
          { key: 'options', label: 'Options' },
          { key: 'liquidity', label: 'Liquidity' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-64">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Allocation Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Portfolio Allocation</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Assets</span>
                    <span className="font-medium">{formatCurrency(portfolioStats.assetsValue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '37.3%' }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Liquidity Pools</span>
                    <span className="font-medium">{formatCurrency(portfolioStats.liquidityValue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '27.8%' }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Options</span>
                    <span className="font-medium">{formatCurrency(portfolioStats.optionsValue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '14.6%' }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cash</span>
                    <span className="font-medium">{formatCurrency(portfolioStats.availableCash)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20.3%' }}></div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium">BTC Call Exercised</div>
                      <div className="text-xs text-gray-500">2 hours ago</div>
                    </div>
                    <div className="text-green-600 font-medium">+$3,847.32</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium">ETH Liquidity Added</div>
                      <div className="text-xs text-gray-500">1 day ago</div>
                    </div>
                    <div className="text-blue-600 font-medium">$20,000.00</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium">CHEF Put Purchased</div>
                      <div className="text-xs text-gray-500">3 days ago</div>
                    </div>
                    <div className="text-orange-600 font-medium">-$150.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assets Tab */}
        {activeTab === 'assets' && (
          <div className="space-y-4">
            {portfolioAssets.map((asset) => (
              <div key={asset.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.imageUrl}
                    alt={asset.symbol}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{asset.symbol}</div>
                    <div className="text-sm text-gray-500">{asset.name}</div>
                    <div className="text-xs text-gray-400">{asset.quantity.toFixed(6)} {asset.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(asset.totalValue)}</div>
                  <div className={`text-sm ${asset.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(asset.pnl)} ({formatPercentage(asset.pnlPercentage)})
                  </div>
                  <div className="text-xs text-gray-500">Avg: {formatCurrency(asset.averagePrice)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Options Tab */}
        {activeTab === 'options' && (
          <div className="space-y-4">
            {optionPositions.map((option) => (
              <div key={option.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={option.imageUrl}
                    alt={option.asset}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{option.asset}</span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        option.type === 'call'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {option.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Strike: {formatCurrency(option.strikePrice)} • Qty: {option.quantity}
                    </div>
                    <div className="text-xs text-gray-400">Exp: {option.expirationDate}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(option.currentValue)}</div>
                  <div className={`text-sm ${option.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(option.pnl)}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${getExpiryColor(option.daysToExpiry)}`}>
                    {option.daysToExpiry}d to expiry
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Liquidity Tab */}
        {activeTab === 'liquidity' && (
          <div className="space-y-4">
            {liquidityPositions.map((position) => (
              <div key={position.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={position.imageUrl}
                    alt={position.asset}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{position.asset} Liquidity Pool</div>
                    <div className="text-sm text-gray-500">APY: {position.apy}%</div>
                    <div className="text-xs text-gray-400">Lockup ends: {position.lockupEnd}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(position.poolAmount)}</div>
                  <div className="text-sm text-green-600">
                    Earned: {formatCurrency(position.earnedRewards)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {position.daysRemaining} days remaining
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}