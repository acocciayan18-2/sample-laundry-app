// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";
// import { auth } from "../services/firebase"; // make sure you have firebase.js file setup
// import "../style/dashboard.css";

// function Dashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const closeSidebar = () => {
//     setSidebarOpen(false);
//   };

//   const handleLogout = async () => {
//     const confirmLogout = window.confirm("Are you sure you want to log out?");
//     if (!confirmLogout) return;

//     try {
//       await signOut(auth); // 🔹 Firebase clears session automatically
//       navigate("/login"); // redirect to login
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
//         <div>
//           <div className="logo">
//             <img src="/images/laundrylogo.jpg" alt="LaundryPro Logo" />
//             <h5>Fe's Laundry</h5>
//             <small>Laundry Shop Manager</small>
//           </div>

//           <nav>
//             <h6>Main Menu</h6>
//             <ul>
//               <li>
//                 <a href="#" className="active">
//                   <i className="fas fa-home"></i> Dashboard
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <i className="fas fa-plus"></i> New Order
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <i className="fas fa-clipboard-list"></i> Orders
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <i className="fas fa-users"></i> Customers
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <i className="fas fa-cog"></i> Services
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <i className="fas fa-chart-bar"></i> Reports
//                 </a>
//               </li>
//               <li>
//                 {/* 🔹 Logout Button */}
//                 <button
//                   className="btn btn-danger w-100 mt-3"
//                   onClick={handleLogout}
//                 >
//                   <i className="fas fa-sign-out-alt"></i> Logout
//                 </button>
//               </li>
//             </ul>
//           </nav>

//           <div className="quick-info">
//             <div className="info green">
//               <i className="fas fa-clipboard-list"></i> Today's Orders{" "}
//               <strong>0</strong>
//             </div>
//             <div className="info orange">
//               <i className="fas fa-check-circle"></i> Ready for Pickup{" "}
//               <strong>0</strong>
//             </div>
//           </div>
//         </div>
//         <footer>
//           <strong>LS</strong> Laundry Shop <br /> Manage daily operations
//         </footer>
//       </aside>

//       {/* Overlay (click to close) */}
//       {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

//       {/* Main Content */}
//       <main className="main-content">
//         {/* Burger Button (only visible on mobile via CSS) */}
//         <button className="menu-toggle" onClick={toggleSidebar}>
//           <i className="fas fa-bars"></i>
//         </button>

//         <header>
//           <h2>Good Evening!</h2>
//           <p>Welcome back to your laundry shop dashboard</p>
//           <small>Sunday, September 14th, 2025</small>

//           <div className="header-buttons">
//             <button className="btn-primary">
//               <i className="fas fa-plus"></i> New Order
//             </button>
//             <button className="btn-outline">
//               <i className="fas fa-users"></i> Customers
//             </button>
//           </div>
//         </header>

//         <section className="stats-cards">
//           <div className="card">
//             <div className="icon green">
//               <i className="fas fa-chart-line"></i>
//             </div>
//             <div>
//               <h4>₱0.00</h4>
//               <small>Today's Revenue</small>
//             </div>
//           </div>

//           <div className="card">
//             <div className="icon orange">
//               <i className="fas fa-clock"></i>
//             </div>
//             <div>
//               <h4>1</h4>
//               <small>Pending</small>
//             </div>
//           </div>

//           <div className="card">
//             <div className="icon blue">
//               <i className="fas fa-check-circle"></i>
//             </div>
//             <div>
//               <h4>2</h4>
//               <small>Ready</small>
//             </div>
//           </div>

//           <div className="card">
//             <div className="icon purple">
//               <i className="fas fa-box"></i>
//             </div>
//             <div>
//               <h4>0</h4>
//               <small>In Progress</small>
//             </div>
//           </div>
//         </section>

//         <section className="orders">
//           <h5>
//             <i className="fas fa-clipboard-list"></i> Today's Orders (0)
//           </h5>
//           <div className="empty">
//             <i className="fas fa-tshirt fa-3x"></i>
//             <p>No orders created today yet</p>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase"; // make sure you have firebase.js file setup
import "../style/dashboard.css";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };




  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div>
          <div className="flex items-center gap-2.5 pl-5 pt-4 pb-4 logo-con">
            {/* Logo Box */}
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
              <img
                src="/images/lolafeslaundry-logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-start">
              <h2 className="font-bold text-gray-900 text-lg  leading-none">
                Lola Fe's Laundry
              </h2>
              <p className="text-xxs text-blue-600 font-medium ">
                Laundry Shop Manager
              </p>
            </div>
          </div>

          <div className="p-3">
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-2">
                <p className=" text-xs text-[#6b7280]">Main Menu</p>
              </div>
              <div>
                <div>
                  <nav>
                    <ul>
                      <li>
                        <a href="#" className="active">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1rem"
                            height="1rem"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-layout-dashboard"
                            data-source-location="layout:108:26"
                            data-dynamic-content="false"
                          >
                            <rect
                              width="7"
                              height="9"
                              x="3"
                              y="3"
                              rx="1"
                            ></rect>
                            <rect
                              width="7"
                              height="5"
                              x="14"
                              y="3"
                              rx="1"
                            ></rect>
                            <rect
                              width="7"
                              height="9"
                              x="14"
                              y="12"
                              rx="1"
                            ></rect>
                            <rect
                              width="7"
                              height="5"
                              x="3"
                              y="16"
                              rx="1"
                            ></rect>
                          </svg>{" "}
                          <p className="text-sm ">Dashboard</p>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1rem"
                            height="1rem"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-plus "
                            data-source-location="layout:108:26"
                            data-dynamic-content="false"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>{" "}
                          <p className="text-sm ">New Order</p>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1rem"
                            height="1rem"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-shirt "
                            data-source-location="layout:108:26"
                            data-dynamic-content="false"
                          >
                            <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
                          </svg>{" "}
                          <p className="text-sm ">Orders</p>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1rem"
                            height="1rem"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-users "
                            data-source-location="layout:108:26"
                            data-dynamic-content="false"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>{" "}
                          <p className="text-sm ">Customers</p>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1rem"
                            height="1rem"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-settings "
                            data-source-location="layout:108:26"
                            data-dynamic-content="false"
                          >
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>{" "}
                          <p className="text-sm ">Services</p>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1rem"
                            height="1rem"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-chart-column "
                            data-source-location="layout:108:26"
                            data-dynamic-content="false"
                          >
                            <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                            <path d="M18 17V9"></path>
                            <path d="M13 17V5"></path>
                            <path d="M8 17v-3"></path>
                          </svg>{" "}
                          <p className="text-sm ">Reports</p>
                        </a>
                      </li>
                      {/* <li>
      <button
        className="btn btn-danger w-100 mt-3"
        onClick={handleLogout}
      >
        <i className="fas fa-sign-out-alt"></i> Logout
      </button>
    </li> */}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-3 pt-1 text-[#6b7280]">
                Quick Info
              </div>
              <div>
                <div className="px-3 py-1 space-y-3  items-center justify-center ">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-green-700 font-medium text-sm">
                        Today's Orders
                      </span>
                      <span className="font-bold text-xs text-green-800">
                        0
                      </span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-2 rounded-xl border border-orange-200">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-orange-700 font-medium text-sm">
                        Ready for Pickup
                      </span>
                      <span className="font-bold text-orange-800 text-xs">
                        0
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-200 p-3 footer-con relative">
          {/* Logout Button */}
          <div className="w-full logout-con absolute -top-12 left-0">
            <div className="rounded-xl p-2 border cursor-pointer hover:bg-red-50 transition-colors w-24 ml-4" onClick={() => setShowConfirm(true)}>
              <div className="flex items-center gap-2 pl-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="text-white"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                  />
                </svg>

                <div className="flex-1 min-w-0">
                  <p className="text-xs truncate font-medium text-gray-900">
                    Log out
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Content */}
          <div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-2 border border-blue-200 cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LS</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">
                    Lola Fe's Laundry Shop
                  </p>
                  <p className="text-xs text-blue-600 truncate">Taguig City</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-99">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80">
            <h3 className="text-xl font-semibold mb-4">Confirm Logout</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center item-center gap-3 ">
              <button
                className="px-2 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 w-full"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-2 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 w-full"
               onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

        </div>
      </aside>
    </div>
  );
}

export default Dashboard;
