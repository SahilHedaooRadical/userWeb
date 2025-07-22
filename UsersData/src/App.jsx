// import { useState } from 'react'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
        
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
        
//       </div>
      
//     </>
//   )
// }

// export default App
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CollectionsPage from './pages/CollectionsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/collections/:access_token" element={<CollectionsPage />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
