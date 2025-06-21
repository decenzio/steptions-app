import DashboardCard from './DashboardCard'
import MarketsTable from './MarketsTable'
import TradeSection from './TradeSection'
import OptionsExercisingSection from './OptionsExercisingSection'
import LiquiditySection from './LiquiditySection'
import PortfolioSection from './PortfolioSection'

export default function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {/* Markets - Full width on top */}
      <div className="md:col-span-2">
        <div className="dashboard-card p-0 h-auto">
          <MarketsTable />
        </div>
      </div>

      {/* Trade and Exercise Options - Side by side */}
      <div className="dashboard-card p-0 h-auto">
        <TradeSection />
      </div>
      <div className="dashboard-card p-0 h-auto">
        <OptionsExercisingSection />
      </div>

      {/* Provide Liquidity - Full width */}
      <div className="md:col-span-2">
        <div className="dashboard-card p-0 h-auto">
          <LiquiditySection />
        </div>
      </div>

      {/* Your Portfolio - Full width on bottom */}
      <div className="md:col-span-2">
        <div className="dashboard-card p-0 h-auto">
          <PortfolioSection />
        </div>
      </div>
    </div>
  )
}