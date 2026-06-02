"use client"

import React from 'react'

export default function AnalyticsPage(){
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Portfolio Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 rounded">Portfolio value chart placeholder</div>
        <div className="bg-white/5 p-4 rounded">Returns & risk metrics placeholder</div>
        <div className="bg-white/5 p-4 rounded">Performance attribution placeholder</div>
        <div className="bg-white/5 p-4 rounded">Correlation & heatmap placeholder</div>
      </div>
    </div>
  )
}
