interface DashboardCardProps {
  title: string
  className?: string
  children?: React.ReactNode
}

export default function DashboardCard({ title, className = '', children }: DashboardCardProps) {
  return (
    <div className={`dashboard-card p-8 ${className}`}>
      <h2 className="card-title text-2xl mb-6">{title}</h2>
      <div className="h-full">
        {children}
      </div>
    </div>
  )
}