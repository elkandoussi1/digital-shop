// بسيط: يتحقق من الدفع. في الإنتاج قم بالتحقق من signature header.
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from 'fs'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '')
export const config = { api: { bodyParser: true } }
export default async function handler(req:NextApiRequest,res:NextApiResponse){
  const event = req.body
  if(event.type === 'checkout.session.completed'){
    const session = event.data.object
    // هنا يمكنك إرسال بريد للمشتري أو إنشاء رابط تحميل مؤقت
    console.log('Checkout completed for', session.id, 'metadata', session.metadata)
  }
  res.json({received:true})
}
