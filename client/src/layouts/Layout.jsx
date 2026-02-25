import React from 'react';

const Layout = ({ children, Left = null, Right = null }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-xl font-semibold">Brand</div>
            <div className="hidden md:block w-96">
              <input
                aria-label="Search"
                placeholder="Search"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
              />
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <button className="hidden sm:inline-flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 transition">Home</button>
            <button className="hidden sm:inline-flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 transition">My Network</button>
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        <aside className="hidden md:block md:col-span-3">
          <div className="space-y-4">{Left}</div>
        </aside>

        <section className="md:col-span-6">
          <div className="space-y-6">{children}</div>
        </section>

        <aside className="hidden lg:block lg:col-span-3">
          <div className="space-y-4">{Right}</div>
        </aside>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around lg:hidden">
        <button className="text-sm">Home</button>
        <button className="text-sm">Search</button>
        <button className="text-sm">Post</button>
        <button className="text-sm">Notifications</button>
        <button className="text-sm">Me</button>
      </nav>
    </div>
  );
};

export default Layout;
