import Logo from './Logo'

export default function Header() {
  return (
    <header className="header border-b border-gray-300 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <Logo />
          <span className="text-2xl font-bold text-white">STEPTIONS</span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <button className="btn-secondary px-8 py-3 font-bold">
            LOGIN
          </button>
          <button className="btn-primary px-8 py-3 font-bold">
            REGISTER
          </button>
        </div>
      </div>
    </header>
  )
}