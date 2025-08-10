import type { NextApiRequest, NextApiResponse } from 'next'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '')
import path from 'path'
import fs from 'fs'
export default async function handler(req:NextApiRequest,res:NextApiResponse){
  if(req.method !== 'POST') return res.status(405).end()
  const { productId } = req.body
  const file = path.join(process.cwd(),'data','products.json')
  const products = JSON.parse(fs.readFileSync(file,'utf8'))
  const product = products.find((p:any)=>p.id===productId)
  if(!product) return res.status(400).json({error:'Product not found'})
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: product.name },
        unit_amount: product.price_cents,
      },
      quantity: 1
    }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/product/${product.id}`,
    metadata: { product_id: product.id }
  })
  res.status(200).json({url: session.url})
}
