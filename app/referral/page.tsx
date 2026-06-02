"use client"

import React, { useState } from 'react'

export default function ReferralPage(){
  const [copied, setCopied] = useState(false)
  const referral = 'https://app.example.com/referral/ABC123'
  const referrals = [
    { id: 'r1', email: 'alice@example.com', status: 'verified', earned: 10 },
    { id: 'r2', email: 'bob@example.com', status: 'pending', earned: 0 },
  ]

  const copy = async ()=>{
    await navigator.clipboard.writeText(referral)
    setCopied(true)
    setTimeout(()=>setCopied(false),2000)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Referral Program</h1>
      <div className="bg-white/5 p-4 rounded mb-4">
        <p className="text-sm text-gray-400 mb-2">Your referral link</p>
        <div className="flex gap-2 items-center">
          <input readOnly value={referral} className="flex-1 bg-black/20 px-3 py-2 rounded" />
          <button onClick={copy} className="px-3 py-2 bg-purple-500 rounded">{copied ? 'Copied' : 'Copy'}</button>
        </div>
        <div className="flex gap-2 mt-3">
          <button className="px-3 py-2 bg-blue-500 rounded">Twitter</button>
          <button className="px-3 py-2 bg-cyan-500 rounded">Telegram</button>
          <button className="px-3 py-2 bg-green-500 rounded">WhatsApp</button>
          <button className="px-3 py-2 bg-gray-500 rounded">Email</button>
        </div>
      </div>

      <div className="bg-white/5 p-4 rounded">
        <h2 className="font-semibold mb-2">Active Referrals</h2>
        <div className="space-y-2">
          {referrals.map(r=> (
            <div key={r.id} className="flex items-center justify-between p-2 bg-black/20 rounded">
              <div>
                <div className="text-sm">{r.email}</div>
                <div className="text-xs text-gray-400">Status: {r.status}</div>
              </div>
              <div className="text-sm">Earned: ${r.earned}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400">By participating you agree to the <a href="#" className="text-purple-400">Referral Terms & Conditions</a>.</div>
    </div>
  )
}
