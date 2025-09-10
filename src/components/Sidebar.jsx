function Sidebar({ setActivePage }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-black p-6 flex-col flex-shrink-0">
        <h1 className="text-2xl font-bold mb-8">VibeVault</h1>
        <nav className="space-y-4">
          <button
            onClick={() => setActivePage("home")}
            className="block w-full text-left text-lg font-semibold hover:text-white text-gray-400 transition"
          >
            Home
          </button>
          <button
            onClick={() => setActivePage("search")}
            className="block w-full text-left text-lg font-semibold hover:text-white text-gray-400 transition"
          >
            Search
          </button>
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex md:hidden">
        <button
          onClick={() => setActivePage("home")}
          className="flex-1 py-3 text-center text-sm font-semibold text-gray-400 hover:text-white transition"
        >
          Home
        </button>
        <button
          onClick={() => setActivePage("search")}
          className="flex-1 py-3 text-center text-sm font-semibold text-gray-400 hover:text-white transition"
        >
          Search
        </button>
      </nav>
    </>
  );
}

export default Sidebar;
