export default function Header() {
  return (
    <header className="header">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center relative">
            <div className="w-6 h-6 logo-icon"></div>
          </div>
          <span className="text-2xl font-bold text-gray-800">STEPTIONS</span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <button className="btn-secondary px-8 py-3">
            LOGIN
          </button>
          <button className="btn-primary px-8 py-3">
            REGISTER
          </button>
        </div>
      </div>
    </header>
  )
}