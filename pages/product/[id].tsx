import path from 'path'
import fs from 'fs'
import {useRouter} from 'next/router'
export default function Product({product}:{product:any}){
  const router = useRouter()
  if(router.isFallback) return <div>Loading...</div>
  async function buy(){
    const res = await fetch('/api/create-checkout-session',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({productId:product.id})
    })
    const j = await res.json()
    if(j.url) window.location = j.url
    else alert('خطأ في إنشاء جلسة الدفع')
  }
  return (
    <main style={{padding:20}}>
      <h1>{product.name}</h1>
      <img src={product.image} style={{width:320,height:200,objectFit:'cover'}}/>
      <p>{product.description}</p>
      <p><strong>{(product.price_cents/100).toFixed(2)} {product.currency}</strong></p>
      <button onClick={buy}>شراء الآن</button>
    </main>
  )
}
export async function getStaticPaths(){
  const file = path.join(process.cwd(),'data','products.json')
  const products = JSON.parse(fs.readFileSync(file,'utf8'))
  return {paths:products.map((p:any)=>({params:{id:p.id}})),fallback:false}
}
export async function getStaticProps({params}:{params:any}){
  const file = path.join(process.cwd(),'data','products.json')
  const products = JSON.parse(fs.readFileSync(file,'utf8'))
  const product = products.find((x:any)=>x.id===params.id)
  return {props:{product}}
}
