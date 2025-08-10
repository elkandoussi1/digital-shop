# متجر المنتجات الرقمية - Digital Shop (Next.js + Stripe)

هذه نسخة مبدئية جاهزة للنشر على GitHub وVercel. المشروع يستخدم Next.js (TypeScript) وStripe Checkout لتجربة دفع آمنة.

## ملاحظة سريعة
- **لا** تضمّن مفاتيح Stripe الحقيقية داخل المستودع. استخدم `.env.local` مع القيم الخاصة بك.
- هذا مثال ابتدائي — أنصح بتمكين حماية الملفات الرقمية عبر روابط مؤقتة أو S3 في الإنتاج.

## إعداد محلي
1. انسخ المشروع واعمل:
   ```bash
   npm install
   npm run dev
   ```
2. أنشئ ملف `.env.local` مع المتغيرات التالية (قيم اختبار Stripe):
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```
3. توجه إلى http://localhost:3000

## رفع على GitHub/Vercel
- أنشئ ريبو جديد في GitHub، ثم:
  ```bash
  git init
  git add .
  git commit -m "Initial commit - digital shop"
  git branch -M main
  git remote add origin https://github.com/<YOUR_USERNAME>/<REPO>.git
  git push -u origin main
  ```
- اربط المستودع مع Vercel لنشر تلقائي.

## كيف يعمل الدفع (مبسّط)
- عند النقر "شراء" يتم استدعاء API route يطلب إنشاء Checkout Session لStripe.
- بعد الدفع، يمكنك استخدام Webhook لتسليم رابط التحميل للمشتري.

