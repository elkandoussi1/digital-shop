import fs from 'fs'
import path from 'path'
import Link from 'next/link'
export default function Home({products} : any){
  return (
    <main style={{padding:20,fontFamily:'Arial, sans-serif'}}>
      <h1>متجر المنتجات الرقمية</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:16,marginTop:20}}>
        {products.map((p:any)=>(
          <div key={p.id} style={{border:'1px solid #eee',padding:12,borderRadius:8}}>
            <img src={p.image} alt={p.name} style={{width:'100%',height:140,objectFit:'cover'}}/>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p><strong>{(p.price_cents/100).toFixed(2)} {p.currency}</strong></p>
            <Link href={`/product/${p.id}`}><a>عرض وشراء</a></Link>
          </div>
        ))}
      </div>
    </main>
  )
}
export async function getStaticProps(){
  const file = path.join(process.cwd(),'data','products.json')
  const products = JSON.parse(fs.readFileSync(file,'utf8'))
  return {props:{products}}
}
