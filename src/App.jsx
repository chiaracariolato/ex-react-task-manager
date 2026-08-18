import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList";
import NotFound from './pages/NotFound';
import TaskDetail from './pages/TaskDetail'

import DefaultLayout from "./layouts/DefaultLayout";
import { GlobalContext, GlobalContextProvider } from "./contexts/GlobalContext";

function App() {

  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <div className="container" style={{ minHeight: '100vh', border: '2px solid red' }}>
          <div className="container mt-4">
            <Routes>
              <Route element={<DefaultLayout />}>
                <Route path="/task">
                  <Route index element={<TaskList />} />
                  <Route path=":id" element={<TaskDetail />} />
                </Route>
                <Route path="/addtask" element={<AddTask />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </div >
      </BrowserRouter>
    </GlobalContextProvider>
  )
}

export default App
