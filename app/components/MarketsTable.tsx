'use client'

import { useState } from 'react'
import Image from 'next/image'

interface MarketData {
  id: string
  asset: string
  imageUrl: string
  price: string
  change24h: number
  volume24h: string
  tvl: string
  steptionsTvl: string
  depositReturns: number
}

const mockMarketData: MarketData[] = [
  {
    id: '1',
    asset: 'BTC',
    imageUrl: 'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png',
    price: '$95,847.32',
    change24h: 2.4,
    volume24h: '$28.3B',
    tvl: '$845.2M',
    steptionsTvl: '$12.4M',
    depositReturns: 8.15
  },
  {
    id: '2',
    asset: 'ETH',
    imageUrl: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png',
    price: '$3,421.67',
    change24h: 1.8,
    volume24h: '$15.7B',
    tvl: '$624.8M',
    steptionsTvl: '$8.9M',
    depositReturns: 6.42
  },
  {
    id: '3',
    asset: 'CHEF',
    imageUrl: 'https://assets.coingecko.com/coins/images/11222/standard/0x_icon.png',
    price: '$2.89',
    change24h: -3.2,
    volume24h: '$1.2M',
    tvl: '$45.6M',
    steptionsTvl: '$890K',
    depositReturns: 12.75
  },
  {
    id: '4',
    asset: 'XML',
    imageUrl: 'https://assets.coingecko.com/coins/images/100/standard/fmpFRHHQ_400x400.jpg',
    price: '$0.847',
    change24h: 5.6,
    volume24h: '$3.8M',
    tvl: '$78.3M',
    steptionsTvl: '$2.1M',
    depositReturns: 9.33
  }
]

export default function MarketsTable() {
  const [sortField, setSortField] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const getAssetIcon = (asset: string, imageUrl: string) => {
    return (
      <div className="relative">
        <div className="w-10 h-10 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center shadow-sm overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={`${asset} icon`}
            width={32}
            height={32}
            className="rounded-full object-cover"
            onError={(e) => {
              // Fallback to gradient background if image fails to load
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.className = `w-10 h-10 rounded-full bg-gradient-to-br ${getFallbackColor(asset)} border-2 border-gray-200 flex items-center justify-center text-white text-sm font-bold shadow-sm`
                parent.textContent = asset
              }
            }}
          />
        </div>
      </div>
    )
  }

  const getFallbackColor = (asset: string) => {
    const colors = {
      BTC: 'from-orange-500 to-orange-600',
      ETH: 'from-blue-500 to-blue-600',
      CHEF: 'from-green-500 to-green-600',
      XML: 'from-purple-500 to-purple-600'
    }
    return colors[asset as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  const formatChange = (change: number) => {
    const isPositive = change > 0
    return (
      <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
        {isPositive ? '+' : ''}{change.toFixed(1)}%
      </span>
    )
  }

  const formatReturns = (returns: number) => {
    return (
      <span className="text-green-600 font-medium">
        {returns.toFixed(2)}%
      </span>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Markets</h3>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-orange-500"></div>
              <span className="text-sm font-medium text-blue-600">STEPTIONS STATS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Asset
            </th>
            <th
              className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
              onClick={() => handleSort('price')}
            >
              Price ↓
            </th>
            <th
              className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
              onClick={() => handleSort('change24h')}
            >
              24H % ↓
            </th>
            <th
              className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
              onClick={() => handleSort('volume24h')}
            >
              24H Volume ↓
            </th>
            <th
              className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
              onClick={() => handleSort('tvl')}
            >
              TVL ↓
            </th>
            <th
              className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
              onClick={() => handleSort('steptionsTvl')}
            >
              Steptions TVL ↓
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deposit Returns
            </th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {mockMarketData.map((market) => (
            <tr key={market.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-3">
                  {getAssetIcon(market.asset, market.imageUrl)}
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {market.asset}
                    </div>
                    <div className="text-xs text-gray-500">
                      Cryptocurrency
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                {market.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {formatChange(market.change24h)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {market.volume24h}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {market.tvl}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                {market.steptionsTvl}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center justify-between">
                  {formatReturns(market.depositReturns)}
                  <button className="ml-4 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors">
                    Deposit
                  </button>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}