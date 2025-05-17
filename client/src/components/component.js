import React from "react";

export const Component = () => {
  return (
    <div id="webcrumbs">
      <div className="w-[1440px] p-8 bg-gradient-to-br from-gray-950 to-indigo-950 font-sans text-white">
        <div className="max-w-7xl mx-auto">
          <div>
            <nav className="flex justify-between items-center py-6 mb-12">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl text-primary-500">
                  auto_stories
                </span>
                <span className="text-xl font-bold">TurnThePage</span>
              </div>
              <div className="hidden md:flex items-center gap-8">
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  About
                </a>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Testimonials
                </a>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Contact
                </a>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 rounded-full border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white transition-colors">
                  Sign In
                </button>
                <button className="px-4 py-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors">
                  Sign Up
                </button>
                <button className="md:hidden">
                  <span className="material-symbols-outlined">menu</span>
                </button>
              </div>
            </nav>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/2 space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Turn The Page & Begin Your New Journey
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Ready to leave the past behind and embrace a fresh start?
                Whether it's a new job, project, community, or relationship -
                it's time to write your next chapter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="px-8 py-4 bg-primary-600 text-white rounded-full font-semibold shadow-lg hover:shadow-primary-300/50 hover:bg-primary-700 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">
                    rocket_launch
                  </span>
                  Start Fresh Now
                </button>
                <button className="px-8 py-4 border-2 border-primary-600 text-primary-400 rounded-full font-semibold hover:bg-primary-800 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">info</span>
                  Learn More
                </button>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <p className="text-gray-300 font-medium">Join our community:</p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fa-brands fa-discord text-indigo-600 text-xl"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fa-brands fa-telegram text-blue-500 text-xl"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fa-brands fa-facebook text-blue-600 text-xl"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fa-brands fa-instagram text-pink-600 text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="relative z-10 bg-gray-900 p-6 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500 hover:shadow-indigo-200/30">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                  alt="People starting a new journey together"
                  className="w-full h-auto rounded-xl object-cover"
                  keywords="new beginning, fresh start, team collaboration, community"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary-600 text-white p-4 rounded-xl shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300">
                  <p className="text-lg font-bold">Join 5,000+ others</p>
                  <p className="text-sm">who have turned the page</p>
                </div>
              </div>
              <div className="absolute -z-10 top-8 left-8 w-full h-full bg-indigo-900 rounded-2xl"></div>
              <div className="absolute top-6 right-6 bg-gray-800 p-3 rounded-full shadow-lg animate-bounce">
                <span className="material-symbols-outlined text-primary-600">
                  north_east
                </span>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-primary-500">
              <span className="material-symbols-outlined text-4xl text-primary-500">
                work
              </span>
              <h3 className="text-xl font-bold mt-4 mb-2">New Career</h3>
              <p className="text-gray-300">
                Start fresh in a new job or industry with renewed energy and
                purpose.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-purple-500">
              <span className="material-symbols-outlined text-4xl text-purple-500">
                landscape
              </span>
              <h3 className="text-xl font-bold mt-4 mb-2">New Project</h3>
              <p className="text-gray-300">
                Launch that passion project you've been thinking about for
                months.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-indigo-500">
              <span className="material-symbols-outlined text-4xl text-indigo-500">
                forum
              </span>
              <h3 className="text-xl font-bold mt-4 mb-2">New Community</h3>
              <p className="text-gray-300">
                Find your tribe in Discord channels, messenger groups, or local
                meetups.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-pink-500">
              <span className="material-symbols-outlined text-4xl text-pink-500">
                favorite
              </span>
              <h3 className="text-xl font-bold mt-4 mb-2">New Relationships</h3>
              <p className="text-gray-300">
                Open your heart to new connections and meaningful relationships.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button className="group px-10 py-4 bg-gradient-to-r from-primary-600 to-indigo-600 text-white rounded-full font-semibold shadow-lg hover:shadow-primary-300/50 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mx-auto">
              <span>Turn The Page Today</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform duration-300">
                arrow_forward
              </span>
            </button>
            <p className="mt-4 text-sm text-gray-400">
              No commitment. Start your journey whenever you're ready.
            </p>
          </div>
          <div>
            <div className="w-full h-24 relative mt-16 overflow-hidden">
              <div
                className="absolute w-16 h-16 bg-gray-800 rounded-full opacity-60 left-1/4 animate-pulse"
                style={{ animationDuration: "3s" }}
              ></div>
              <div
                className="absolute w-12 h-12 bg-gray-800 rounded-full opacity-50 left-1/2 animate-pulse"
                style={{ animationDuration: "4s" }}
              ></div>
              <div
                className="absolute w-20 h-20 bg-gray-800 rounded-full opacity-70 left-3/4 animate-pulse"
                style={{ animationDuration: "5s" }}
              ></div>
              <div className="absolute w-40 h-8 left-0 right-0 mx-auto bottom-0 bg-gradient-to-t from-indigo-950 to-transparent"></div>
              <div className="absolute flex justify-center items-center w-full bottom-4">
                <span className="animate-bounce text-gray-400 flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined">expand_more</span>
                  <span className="text-xs">Scroll down</span>
                </span>
              </div>
            </div>
          </div>

          {/* Next: "Add testimonials from people who successfully turned the page" */}
          {/* Next: "Add FAQ section with common questions about starting fresh" */}
          {/* Next: "Add a newsletter signup form to stay updated on opportunities" */}
        </div>
      </div>
    </div>
  );
};
