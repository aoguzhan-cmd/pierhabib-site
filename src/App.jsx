import React, { useState, useRef, useEffect } from 'react'

const LACIVERT = '#1e3a5f'
const ALTIN = '#c9a96e'
const KREM = '#faf9f7'
const KREM2 = '#f5f0e8'

const DILLER = {
  tr: {
    kod: 'tr', ad: 'Türkçe', bayrak: 'TR', yon: 'ltr',
    nav: { marka: 'Pier Habib', alt: 'Süt Baklava — İstanbul', online: 'Online Siparişler', basvuru: 'Bayilik Başvurusu' },
    hero: { ust: 'Süt Baklava', alt: 'İstanbul', slogan: "Türkiye'nin en özel\nsüt baklavasında\nbayilik fırsatı", btn: 'Hemen Başvur' },
    neden: { baslik: 'Neden Pier Habib?', alt: 'Güçlü bir marka, güçlü bir ortaklık' },
    ozellikler: [
      { icon: '🏆', baslik: 'Özgün Lezzet', aciklama: "Pier Habib'in özgün reçetesi ve eşsiz kalite standartları ile fark yaratın." },
      { icon: '🤝', baslik: 'Tam Destek', aciklama: 'Bayilerimize sağladığımız eğitim, operasyonel ve pazarlama desteği.' },
      { icon: '📈', baslik: 'Büyüyen Marka', aciklama: "İstanbul'dan dünyaya uzanan büyüme hikayesinde yerinizi alın." },
    ],
    hikaye: { etiket: 'Hikayemiz', baslik: "İstanbul'dan\nDünyaya", metin: "Pier Habib, İstanbul'un kalbinden doğan özgün bir lezzet markasıdır. Geleneksel tarifleri modern anlayışla buluşturarak Türkiye ve dünya genelinde büyümeyi hedefliyoruz." },
    yorumlar: { baslik: 'Müşteri Yorumları', altyazi: '4.5 yıldız · 421 yorum · Google' },
    subeler: { baslik: 'Şubelerimiz', alt: 'Türkiye ve dünyada Pier Habib' },
    iletisim: { baslik: 'Bize Ulaşın', adres: 'Adres', mail: 'E-posta', tel: 'Telefon', sosyal: 'Sosyal Medya' },
    form: { baslik: 'Bayilik Başvurusu', alt: 'Formu doldurun, en kısa sürede sizinle iletişime geçelim', ad: 'Ad', soyad: 'Soyad', telefon: 'Telefon', eposta: 'E-posta', sehir: 'Bayilik Düşündüğünüz Şehir / Bölge', deneyim: 'Mevcut İş Deneyiminiz', mesaj: 'Mesajınız', gonder: 'Başvuru Gönder', yukleniyor: 'Gönderiliyor...', zorunlu: 'Lütfen zorunlu alanları doldurun.', hata: 'Bir hata oluştu, lütfen tekrar deneyin.' },
    basari: { baslik: 'Başvurunuz Alındı', metin: 'En kısa sürede sizinle iletişime geçeceğiz.', imza: '— Pier Habib Ekibi' },
    footer: { slogan: 'İstanbul\'dan dünyaya süt baklava', haklar: '© 2026 Pier Habib. Tüm hakları saklıdır.' },
  },
  en: {
    kod: 'en', ad: 'English', bayrak: 'EN', yon: 'ltr',
    nav: { marka: 'Pier Habib', alt: 'Milk Baklava — Istanbul', online: 'Order Online', basvuru: 'Franchise Apply' },
    hero: { ust: 'Milk Baklava', alt: 'Istanbul', slogan: "Turkey's most unique\nmilk baklava\nfranchise opportunity", btn: 'Apply Now' },
    neden: { baslik: 'Why Pier Habib?', alt: 'A strong brand, a strong partnership' },
    ozellikler: [
      { icon: '🏆', baslik: 'Unique Taste', aciklama: "Stand out with Pier Habib's original recipes and unmatched quality standards." },
      { icon: '🤝', baslik: 'Full Support', aciklama: 'Training, operational and marketing support for all our franchisees.' },
      { icon: '📈', baslik: 'Growing Brand', aciklama: 'Join our growing story expanding from Istanbul to the world.' },
    ],
    hikaye: { etiket: 'Our Story', baslik: "From Istanbul\nto the World", metin: 'Pier Habib is a unique flavor brand born in the heart of Istanbul. We bring traditional recipes with a modern touch across Turkey and beyond.' },
    yorumlar: { baslik: 'Customer Reviews', altyazi: '4.5 stars · 421 reviews · Google' },
    subeler: { baslik: 'Our Locations', alt: 'Pier Habib in Turkey and worldwide' },
    iletisim: { baslik: 'Contact Us', adres: 'Address', mail: 'Email', tel: 'Phone', sosyal: 'Social Media' },
    form: { baslik: 'Franchise Application', alt: 'Fill out the form and we will contact you shortly', ad: 'First Name', soyad: 'Last Name', telefon: 'Phone', eposta: 'Email', sehir: 'City / Region for Franchise', deneyim: 'Business Experience', mesaj: 'Your Message', gonder: 'Submit Application', yukleniyor: 'Sending...', zorunlu: 'Please fill in the required fields.', hata: 'An error occurred, please try again.' },
    basari: { baslik: 'Application Received', metin: 'We will contact you as soon as possible.', imza: '— Pier Habib Team' },
    footer: { slogan: 'Milk baklava from Istanbul to the world', haklar: '© 2026 Pier Habib. All rights reserved.' },
  },
  ar: {
    kod: 'ar', ad: 'العربية', bayrak: 'AR', yon: 'rtl',
    nav: { marka: 'Pier Habib', alt: 'بقلاوة بالحليب — إسطنبول', online: 'اطلب أونلاين', basvuru: 'طلب الامتياز' },
    hero: { ust: 'بقلاوة بالحليب', alt: 'إسطنبول', slogan: "فرصة امتياز\nأرقى بقلاوة بالحليب\nفي تركيا", btn: 'تقدم الآن' },
    neden: { baslik: 'لماذا Pier Habib؟', alt: 'علامة تجارية قوية، شراكة قوية' },
    ozellikler: [
      { icon: '🏆', baslik: 'طعم فريد', aciklama: 'تميّز مع وصفات Pier Habib الأصيلة ومعايير الجودة التي لا مثيل لها.' },
      { icon: '🤝', baslik: 'دعم كامل', aciklama: 'تدريب ودعم تشغيلي وتسويقي لجميع أصحاب الامتياز.' },
      { icon: '📈', baslik: 'علامة في نمو', aciklama: 'انضم إلى قصة نجاحنا الممتدة من إسطنبول إلى العالم.' },
    ],
    hikaye: { etiket: 'قصتنا', baslik: "من إسطنبول\nإلى العالم", metin: 'Pier Habib علامة تجارية فريدة ولدت في قلب إسطنبول. نهدف إلى الجمع بين الوصفات التقليدية والأسلوب العصري للوصول إلى كل ركن من أركان العالم.' },
    yorumlar: { baslik: 'آراء العملاء', altyazi: '4.5 نجوم · 421 تقييم · Google' },
    subeler: { baslik: 'فروعنا', alt: 'Pier Habib في تركيا والعالم' },
    iletisim: { baslik: 'تواصل معنا', adres: 'العنوان', mail: 'البريد الإلكتروني', tel: 'الهاتف', sosyal: 'وسائل التواصل' },
    form: { baslik: 'طلب الامتياز', alt: 'أكمل النموذج وسنتواصل معك في أقرب وقت', ad: 'الاسم الأول', soyad: 'اسم العائلة', telefon: 'الهاتف', eposta: 'البريد الإلكتروني', sehir: 'المدينة / المنطقة المرغوبة', deneyim: 'الخبرة التجارية', mesaj: 'رسالتك', gonder: 'إرسال الطلب', yukleniyor: 'جارٍ الإرسال...', zorunlu: 'يرجى ملء الحقول المطلوبة.', hata: 'حدث خطأ، يرجى المحاولة مرة أخرى.' },
    basari: { baslik: 'تم استلام طلبك', metin: 'سنتواصل معك في أقرب وقت ممكن.', imza: '— فريق Pier Habib' },
    footer: { slogan: 'بقلاوة بالحليب من إسطنبول إلى العالم', haklar: '© 2026 Pier Habib. جميع الحقوق محفوظة.' },
  },
}

const KANALLAR = [
  { ad: 'Yemek Sepeti', link: 'https://www.yemeksepeti.com/restaurant/jbbf/pier-habib-sut-baklava-jbbf', renk: '#e60026' },
  { ad: 'Getir', link: 'https://getir.com/yemek/restoran/pier-habib-sut-baklava-sinanpasa-mah-besiktas-istanbul/', renk: '#5c3ebc' },
  { ad: 'FineDine', link: 'https://qr.finedinemenu.com/pier-habib/menu/6076a008884d1e00146856ad', renk: '#1a1a2e' },
]

const YORUMLAR = [
  { isim: 'T. R.', sure: '3 ay önce', yorum: "Found this place walking around the area. They are one of the best baklavas I've had. Incredible fresh, flaky and crunchy with a nice pistachio flavor. Definitely recommend." },
  { isim: 'T. F.', sure: '4 ay önce', yorum: 'This is one of my favourite spots, the staff are very friendly and helpful. The cold milky baklava is also amazing! I highly recommend this place.' },
  { isim: 'Z. Ö.', sure: '5 ay önce', yorum: 'Benim hayatımda yediğim EN İYİ SOĞUK BAKLAVA. Tartışmaya da kapalı. Keşke Ankaraya da şube açsalar. Bu kadar başarılı bir ürünü herkesin tatması lazım.' },
  { isim: 'N. T.', sure: '3 ay önce', yorum: 'Lezzetler harika, özellikle fıstıklı sahlep ve fıstıklı ruloyu denemek için gittik ve bayıldık. Çalışanlar da çok ilgili ve kibardılar. Her şeyiyle 10/10.' },
  { isim: 'd.', sure: '2 ay önce', yorum: 'tiktoktan görüp denedik inanılmaz iyiydi özellikle tahinliye bayıldık, fıstıklı sahlep de asla ağır gelmedi. Şiddetle tavsiye ediyoruz 🙌' },
  { isim: 'B. E.', sure: '2 ay önce', yorum: 'Yeni ürünleri olan fıstıklı ruloyu çok sevdim, ince ve çıtır. Fındıklı & tahinli baklavayı da sevdik. Fıstıklı sahlep kış favorisi olur ✨' },
  { isim: 'G. K.', sure: '4 ay önce', yorum: 'Çalışanlar çok yardımsever, ürünlerin hepsini tanıttılar. Bundan sonra canım ne çekerse buradan alacağım, kesinlikle tavsiye ederim 🫶🏻' },
]

const SUBELER = [
  { sehir: 'İstanbul', ulke: 'Türkiye', bayrak: '🇹🇷', adres: 'Sinanpaşa, Şair Nedim Cd. No: 42/A, Beşiktaş', maps: 'https://maps.google.com/?q=Pier+Habib+Besiktas+Istanbul', aktif: true },
  { sehir: 'Bursa', ulke: 'Türkiye', bayrak: '🇹🇷', adres: 'Bursa', maps: 'https://maps.google.com/?q=Pier+Habib+Bursa', aktif: true },
  { sehir: 'Kuwait', ulke: 'Kuveyt', bayrak: '🇰🇼', adres: 'Kuwait City', maps: 'https://maps.google.com/?q=Kuwait+City', aktif: true },
  { sehir: 'Riyadh', ulke: 'Suudi Arabistan', bayrak: '🇸🇦', adres: 'Riyadh', maps: 'https://maps.google.com/?q=Riyadh+Saudi+Arabia', aktif: true },
]

const sliderStyle = `
  @keyframes scrollLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .yorum-track {
    display: flex;
    animation: scrollLeft 30s linear infinite;
    width: max-content;
  }
  .yorum-track:hover { animation-play-state: paused; }
`

function YorumSlider({ t }) {
  const tekrar = [...YORUMLAR, ...YORUMLAR]
  return (
    <section style={{ padding: '80px 0', background: LACIVERT, overflow: 'hidden' }}>
      <style>{sliderStyle}</style>
      <h2 style={{ textAlign: 'center', fontSize: 28, color: '#fff', letterSpacing: 2, marginBottom: 8, fontWeight: 400, fontFamily: 'Georgia, serif' }}>{t.yorumlar.baslik}</h2>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span style={{ color: ALTIN, fontSize: 18 }}>★★★★★</span>
        <span style={{ color: '#a8c4e0', fontSize: 13, marginLeft: 10 }}>{t.yorumlar.altyazi}</span>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div className="yorum-track">
          {tekrar.map((y, i) => (
            <div key={i} style={{ width: 300, flexShrink: 0, margin: '0 12px', background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '24px', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ color: ALTIN, fontSize: 13, marginBottom: 12 }}>★★★★★</div>
              <p style={{ fontSize: 13, color: '#e2e8f0', lineHeight: 1.7, marginBottom: 16, minHeight: 80 }}>"{y.yorum}"</p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{y.isim}</span>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>{y.sure}</span>
              </div>
              <div style={{ marginTop: 6, fontSize: 11, color: '#64748b' }}>Google</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [dil, setDil] = useState('tr')
  const [dilMenuAcik, setDilMenuAcik] = useState(false)
  const [kanalMenuAcik, setKanalMenuAcik] = useState(false)
  const [form, setForm] = useState({ ad: '', soyad: '', telefon: '', eposta: '', sehir: '', deneyim: '', mesaj: '' })
  const [gonderildi, setGonderildi] = useState(false)
  const [yukleniyor, setYukleniyor] = useState(false)
  const [hata, setHata] = useState('')
  const basvuruRef = useRef(null)
  const t = DILLER[dil]
  const rtl = t.yon === 'rtl'

  useEffect(() => {
    document.documentElement.dir = t.yon
    document.documentElement.lang = t.kod
  }, [dil, t.yon, t.kod])

  function scrollToForm() { basvuruRef.current?.scrollIntoView({ behavior: 'smooth' }) }

  async function gonder(e) {
    e.preventDefault()
    if (!form.ad || !form.soyad || !form.telefon || !form.sehir) { setHata(t.form.zorunlu); return }
    setYukleniyor(true); setHata('')
    try {
      const res = await fetch('/api/basvuru', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, dil: t.ad }) })
      if (res.ok) { setGonderildi(true) } else { setHata(t.form.hata) }
    } catch { setHata(t.form.hata) }
    setYukleniyor(false)
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>

      {/* NAV */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e8e4dc', padding: '14px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: 4, color: LACIVERT, textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>{t.nav.marka}</span>
          <span style={{ fontSize: 10, letterSpacing: 2, color: '#94a3b8', display: 'block', marginTop: 2 }}>{t.nav.alt}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setKanalMenuAcik(!kanalMenuAcik); setDilMenuAcik(false) }}
              style={{ background: 'transparent', color: LACIVERT, border: `1px solid ${LACIVERT}`, padding: '8px 14px', borderRadius: 4, fontSize: 11, letterSpacing: 1, cursor: 'pointer', textTransform: 'uppercase' }}>
              {t.nav.online} ▾
            </button>
            {kanalMenuAcik && (
              <div style={{ position: 'absolute', top: '110%', right: 0, background: '#fff', border: '1px solid #e8e4dc', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: 180, zIndex: 200 }}>
                {KANALLAR.map((k, i) => (
                  <a key={k.ad} href={k.link} target="_blank" rel="noreferrer" onClick={() => setKanalMenuAcik(false)}
                    style={{ display: 'block', padding: '12px 18px', fontSize: 13, color: k.renk, textDecoration: 'none', fontWeight: 700, borderBottom: i < KANALLAR.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    {k.ad}
                  </a>
                ))}
              </div>
            )}
          </div>
          <button onClick={scrollToForm} style={{ background: LACIVERT, color: '#fff', border: 'none', padding: '8px 18px', borderRadius: 4, fontSize: 11, letterSpacing: 1, cursor: 'pointer', textTransform: 'uppercase' }}>
            {t.nav.basvuru}
          </button>
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setDilMenuAcik(!dilMenuAcik); setKanalMenuAcik(false) }}
              style={{ background: '#f8fafc', color: LACIVERT, border: '1px solid #e2e8f0', padding: '8px 12px', borderRadius: 4, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              {t.bayrak} {t.ad} ▾
            </button>
            {dilMenuAcik && (
              <div style={{ position: 'absolute', top: '110%', right: 0, background: '#fff', border: '1px solid #e8e4dc', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: 150, zIndex: 200 }}>
                {Object.values(DILLER).map((d, i) => (
                  <button key={d.kod} onClick={() => { setDil(d.kod); setDilMenuAcik(false) }}
                    style={{ display: 'block', width: '100%', padding: '10px 16px', fontSize: 13, color: dil === d.kod ? LACIVERT : '#374151', background: dil === d.kod ? '#f0f4ff' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: dil === d.kod ? 700 : 400, borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none' }}>
                    {d.bayrak} {d.ad}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '85vh' }}>
        <div style={{ background: LACIVERT, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px', textAlign: 'center' }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 11, letterSpacing: 6, color: '#a8c4e0', textTransform: 'uppercase', marginBottom: 12 }}>{t.hero.ust}</div>
            <div style={{ fontSize: 11, color: ALTIN, margin: '8px 0' }}>◆</div>
            <div style={{ fontSize: 52, letterSpacing: 10, color: '#fff', fontWeight: 400, margin: '8px 0', lineHeight: 1.1, fontFamily: 'Georgia, serif' }}>PIER</div>
            <div style={{ fontSize: 52, letterSpacing: 10, color: '#fff', fontWeight: 400, lineHeight: 1.1, fontFamily: 'Georgia, serif' }}>HABİB</div>
            <div style={{ fontSize: 11, color: ALTIN, margin: '8px 0' }}>◆</div>
            <div style={{ fontSize: 11, letterSpacing: 6, color: '#a8c4e0', textTransform: 'uppercase', marginTop: 12 }}>{t.hero.alt}</div>
          </div>
          <p style={{ fontSize: 13, color: '#a8c4e0', letterSpacing: 2, marginBottom: 36, lineHeight: 2, textTransform: 'uppercase', whiteSpace: 'pre-line' }}>{t.hero.slogan}</p>
          <button onClick={scrollToForm} style={{ background: ALTIN, color: LACIVERT, border: 'none', padding: '14px 40px', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', cursor: 'pointer', fontWeight: 700, borderRadius: 2 }}>
            {t.hero.btn}
          </button>
        </div>
        <div style={{ overflow: 'hidden', height: '85vh' }}>
          <img src="/dukkan.jpg" alt="Pier Habib" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      </section>

      {/* ÖZELLİKLER */}
      <section style={{ padding: '80px 40px', background: '#fff' }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, color: LACIVERT, letterSpacing: 2, marginBottom: 8, fontWeight: 400, fontFamily: 'Georgia, serif' }}>{t.neden.baslik}</h2>
        <p style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8', marginBottom: 60 }}>{t.neden.alt}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, maxWidth: 900, margin: '0 auto' }}>
          {t.ozellikler.map((f, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '40px 24px', border: '1px solid #e8e4dc', borderRadius: 4 }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
              <div style={{ fontSize: 15, color: LACIVERT, marginBottom: 12, fontWeight: 700 }}>{f.baslik}</div>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.8 }}>{f.aciklama}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KAYAN YORUMLAR */}
      <YorumSlider t={t} />

      {/* ÜRÜNLER */}
      <section style={{ padding: '80px 40px', background: KREM }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, color: LACIVERT, letterSpacing: 2, marginBottom: 8, fontWeight: 400, fontFamily: 'Georgia, serif' }}>
          {dil === 'ar' ? 'منتجاتنا' : dil === 'en' ? 'Our Products' : 'Ürünlerimiz'}
        </h2>
        <p style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8', marginBottom: 60 }}>
          {dil === 'ar' ? 'أشهى أنواع البقلاوة بالحليب' : dil === 'en' ? 'The finest milk baklava varieties' : 'En özel süt baklava çeşitlerimiz'}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 32, maxWidth: 1100, margin: '0 auto' }}>
          {[
            { id: 'DNVWkwUsQ9j', baslik: 'Sütlü Fıstıklı', aciklama: "Pier Habib'in imza lezzeti. Soğuk sütün içinde yüzen çıtır çıtır fıstıklı baklava." },
            { id: 'DYO9ehVIok6', baslik: 'Sütlü Fındıklı', aciklama: 'Fındığın sıcak aroması, sütün ferahlatıcı soğukluğuyla mükemmel denge.' },
            { id: 'DHdbcUPsEzB', baslik: 'Sade Şerbetli', aciklama: "Klasiğin en saf hali — geleneksel tarif, Pier Habib kalitesiyle." },
            { id: 'DTztug9iKIZ', baslik: 'Rulo Baklava', aciklama: 'İnce yufkalar, bol fıstık — her lokma başlı başına bir lezzet deneyimi.' },
            { id: 'DUkllDxCKgM', baslik: 'Sütlü Kadayıf', aciklama: 'İnce tel kadayıfın çıtırlığı, sütün yumuşaklığıyla buluştuğunda ortaya çıkan sihir.' },
            { id: 'DWggBfMCBMr', baslik: 'Fındık Tahin', aciklama: "Fındığın yoğun aroması ile tahin'in eşsiz uyumu — bir kez tadınca vazgeçemezsiniz." },
          ].map((u, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #e8e4dc' }}>
              <div style={{ position: 'relative', paddingBottom: '100%', overflow: 'hidden', background: '#000' }}>
                <iframe
                  src={`https://www.instagram.com/reel/${u.id}/embed`}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allowFullScreen scrolling="no"
                />
              </div>
              <div style={{ padding: '20px 24px' }}>
                <div style={{ fontSize: 11, letterSpacing: 3, color: ALTIN, textTransform: 'uppercase', marginBottom: 6 }}>Pier Habib</div>
                <h3 style={{ fontSize: 20, color: LACIVERT, fontWeight: 700, marginBottom: 8, fontFamily: 'Georgia, serif' }}>{u.baslik}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7 }}>{u.aciklama}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HİKAYE */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: 480, direction: t.yon }}>
        {!rtl && <div style={{ overflow: 'hidden', height: 480 }}><img src="/hikaye.jpg" alt="Pier Habib" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} /></div>}
        <div style={{ background: KREM2, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: rtl ? 'right' : 'left' }}>
          <p style={{ fontSize: 11, letterSpacing: 4, color: ALTIN, textTransform: 'uppercase', marginBottom: 20 }}>{t.hikaye.etiket}</p>
          <h2 style={{ fontSize: 32, color: LACIVERT, marginBottom: 24, fontWeight: 400, lineHeight: 1.4, whiteSpace: 'pre-line', fontFamily: 'Georgia, serif' }}>{t.hikaye.baslik}</h2>
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.9 }}>{t.hikaye.metin}</p>
        </div>
        {rtl && <div style={{ overflow: 'hidden', height: 480 }}><img src="/hikaye.jpg" alt="Pier Habib" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} /></div>}
      </section>

      {/* ŞUBELER */}
      <section style={{ padding: '80px 40px', background: LACIVERT, position: 'relative', overflow: 'hidden' }}>
        <style>{`
          @keyframes pulse1 { 0%,100%{r:6;opacity:0.9} 50%{r:14;opacity:0} }
          @keyframes pulse2 { 0%,100%{r:6;opacity:0.9} 50%{r:14;opacity:0} }
          @keyframes dash { to { stroke-dashoffset: -20; } }
          .pulse-ring { animation: pulse1 2.5s ease-out infinite; }
          .pulse-ring2 { animation: pulse1 2.5s ease-out infinite 0.8s; }
          .pulse-ring3 { animation: pulse1 2.5s ease-out infinite 1.6s; }
          .conn-line { animation: dash 1.5s linear infinite; }
        `}</style>

        {/* Arka plan SVG — grid + noktalar + bağlantı çizgileri */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#c9a96e" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* Grid çizgileri */}
          {[80,160,240,320,400,480,560].map(y => (
            <line key={`h${y}`} x1="0" y1={y} x2="1200" y2={y} stroke="#a8c4e0" strokeWidth="0.3" opacity="0.15"/>
          ))}
          {[100,200,300,400,500,600,700,800,900,1000,1100].map(x => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="600" stroke="#a8c4e0" strokeWidth="0.3" opacity="0.15"/>
          ))}

          {/* Enlem eğrileri (hafif yay) */}
          <ellipse cx="600" cy="300" rx="580" ry="120" fill="none" stroke="#a8c4e0" strokeWidth="0.3" opacity="0.12"/>
          <ellipse cx="600" cy="300" rx="580" ry="240" fill="none" stroke="#a8c4e0" strokeWidth="0.3" opacity="0.10"/>

          {/* Bağlantı çizgileri — eğri */}
          {/* İstanbul → Bursa */}
          <path d="M 548 195 Q 560 180 572 195" fill="none" stroke="#c9a96e" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" className="conn-line"/>
          {/* İstanbul → Kuwait */}
          <path d="M 548 195 Q 620 160 680 218" fill="none" stroke="#c9a96e" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" className="conn-line"/>
          {/* İstanbul → Riyadh */}
          <path d="M 548 195 Q 630 155 700 245" fill="none" stroke="#c9a96e" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" className="conn-line"/>
          {/* Kuwait → Riyadh */}
          <path d="M 680 218 Q 692 235 700 245" fill="none" stroke="#c9a96e" strokeWidth="0.8" strokeDasharray="3,4" opacity="0.4" className="conn-line"/>

          {/* Nokta glowları */}
          <circle cx="548" cy="195" r="40" fill="url(#glow)"/>
          <circle cx="680" cy="218" r="35" fill="url(#glow)"/>
          <circle cx="700" cy="245" r="35" fill="url(#glow)"/>

          {/* İstanbul */}
          <circle cx="548" cy="195" r="6" fill="#c9a96e" opacity="0.95"/>
          <circle cx="548" cy="195" r="6" fill="none" stroke="#c9a96e" strokeWidth="1.5" opacity="0" className="pulse-ring"/>
          <circle cx="548" cy="195" r="6" fill="none" stroke="#c9a96e" strokeWidth="1" opacity="0" className="pulse-ring2"/>

          {/* Bursa */}
          <circle cx="572" cy="195" r="5" fill="#c9a96e" opacity="0.85"/>
          <circle cx="572" cy="195" r="5" fill="none" stroke="#c9a96e" strokeWidth="1.5" opacity="0" className="pulse-ring3"/>

          {/* Kuwait */}
          <circle cx="680" cy="218" r="6" fill="#c9a96e" opacity="0.95"/>
          <circle cx="680" cy="218" r="6" fill="none" stroke="#c9a96e" strokeWidth="1.5" opacity="0" className="pulse-ring2"/>

          {/* Riyadh */}
          <circle cx="700" cy="245" r="6" fill="#c9a96e" opacity="0.95"/>
          <circle cx="700" cy="245" r="6" fill="none" stroke="#c9a96e" strokeWidth="1.5" opacity="0" className="pulse-ring"/>

          {/* Köşe dekoratif noktalar */}
          {[[50,50],[1150,50],[50,550],[1150,550],[200,100],[1000,100],[200,500],[1000,500]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="2" fill="#a8c4e0" opacity="0.2"/>
          ))}
        </svg>

        {/* İçerik */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, color: '#fff', letterSpacing: 2, marginBottom: 8, fontWeight: 400, fontFamily: 'Georgia, serif' }}>{t.subeler.baslik}</h2>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#a8c4e0', marginBottom: 60 }}>{t.subeler.alt}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, maxWidth: 1000, margin: '0 auto' }}>
            {SUBELER.map((s, i) => (
              <a key={i} href={s.maps} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <div
                  style={{ border: '1px solid rgba(201,169,110,0.3)', borderRadius: 12, padding: '32px 24px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.25s', background: 'rgba(255,255,255,0.04)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,110,0.1)'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.8)'; e.currentTarget.style.transform = 'translateY(-6px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{s.bayrak}</div>
                  <div style={{ fontSize: 10, color: '#64748b', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4 }}>{s.ulke}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: 'Georgia, serif' }}>{s.sehir}</div>
                  <div style={{ fontSize: 12, color: '#a8c4e0', marginBottom: 16 }}>{s.adres}</div>
                  <div style={{ fontSize: 11, color: ALTIN, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700 }}>📍 Haritada Gör</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ADRES + HARİTA + İLETİŞİM */}
      <section style={{ background: KREM2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {/* Sol — Google Maps */}
          <div style={{ height: 420 }}>
            <iframe
              title="Pier Habib Konum"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.4!2d29.0!3d41.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a0a3f7e2b7%3A0x1c0a3d3c3b3a3b3a!2sPier%20Habib%20S%C3%BCt%20Baklava!5e0!3m2!1str!2str!4v1716000000000!5m2!1str!2str"
              width="100%" height="420" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy"
            />
          </div>
          {/* Sağ — İletişim */}
          <div style={{ padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: 28, color: LACIVERT, letterSpacing: 2, marginBottom: 32, fontWeight: 400, fontFamily: 'Georgia, serif' }}>{t.iletisim.baslik}</h2>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: ALTIN, textTransform: 'uppercase', marginBottom: 8 }}>{t.iletisim.adres}</div>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>Sinanpaşa, Şair Nedim Cd. No: 42/A<br />34353 Beşiktaş / İstanbul</p>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: ALTIN, textTransform: 'uppercase', marginBottom: 8 }}>{t.iletisim.mail}</div>
              <a href="mailto:- " style={{ fontSize: 14, color: LACIVERT, textDecoration: 'none', fontWeight: 600 }}>mail@pierhabib.com.tr</a>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: ALTIN, textTransform: 'uppercase', marginBottom: 8 }}>{t.iletisim.tel}</div>
              <a href="tel:+90XXXXXXXXXX" style={{ fontSize: 14, color: LACIVERT, textDecoration: 'none', fontWeight: 600 }}>+90 XXX XXX XX XX</a>
            </div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 2, color: ALTIN, textTransform: 'uppercase', marginBottom: 12 }}>{t.iletisim.sosyal}</div>
              <div style={{ display: 'flex', gap: 12 }}>
                <a href="https://instagram.com/pierhabib" target="_blank" rel="noreferrer"
                  style={{ padding: '8px 16px', background: LACIVERT, color: '#fff', borderRadius: 4, fontSize: 12, fontWeight: 700, textDecoration: 'none', letterSpacing: 1 }}>
                  Instagram
                </a>
                <a href="https://tiktok.com/@pierhabib" target="_blank" rel="noreferrer"
                  style={{ padding: '8px 16px', background: '#000', color: '#fff', borderRadius: 4, fontSize: 12, fontWeight: 700, textDecoration: 'none', letterSpacing: 1 }}>
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BAŞVURU FORMU */}
      <section ref={basvuruRef} style={{ padding: '80px 40px', background: KREM, maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, color: LACIVERT, letterSpacing: 2, marginBottom: 8, fontWeight: 400, fontFamily: 'Georgia, serif' }}>{t.form.baslik}</h2>
        <div style={{ width: 60, height: 1, background: ALTIN, margin: '16px auto 24px' }} />
        <p style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8', marginBottom: 48 }}>{t.form.alt}</p>
        {gonderildi ? (
          <div style={{ textAlign: 'center', padding: 60, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, color: '#166534' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
            <div style={{ fontSize: 18, marginBottom: 8 }}>{t.basari.baslik}</div>
            <p style={{ fontSize: 13, opacity: 0.8 }}>{t.basari.metin}</p>
            <p style={{ fontSize: 12, marginTop: 16, opacity: 0.6 }}>{t.basari.imza}</p>
          </div>
        ) : (
          <form onSubmit={gonder} dir={t.yon}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div><label style={labelStil}>{t.form.ad} *</label><input value={form.ad} onChange={e => setForm({ ...form, ad: e.target.value })} style={inputStil} /></div>
              <div><label style={labelStil}>{t.form.soyad} *</label><input value={form.soyad} onChange={e => setForm({ ...form, soyad: e.target.value })} style={inputStil} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div><label style={labelStil}>{t.form.telefon} *</label><input value={form.telefon} onChange={e => setForm({ ...form, telefon: e.target.value })} style={inputStil} /></div>
              <div><label style={labelStil}>{t.form.eposta}</label><input value={form.eposta} onChange={e => setForm({ ...form, eposta: e.target.value })} type="email" style={inputStil} /></div>
            </div>
            <div style={{ marginBottom: 16 }}><label style={labelStil}>{t.form.sehir} *</label><input value={form.sehir} onChange={e => setForm({ ...form, sehir: e.target.value })} style={inputStil} /></div>
            <div style={{ marginBottom: 16 }}><label style={labelStil}>{t.form.deneyim}</label><input value={form.deneyim} onChange={e => setForm({ ...form, deneyim: e.target.value })} style={inputStil} /></div>
            <div style={{ marginBottom: 24 }}><label style={labelStil}>{t.form.mesaj}</label><textarea value={form.mesaj} onChange={e => setForm({ ...form, mesaj: e.target.value })} style={{ ...inputStil, minHeight: 120, resize: 'vertical' }} /></div>
            {hata && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 16 }}>{hata}</p>}
            <button type="submit" disabled={yukleniyor} style={{ width: '100%', background: yukleniyor ? '#94a3b8' : LACIVERT, color: '#fff', border: 'none', padding: 16, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', cursor: yukleniyor ? 'not-allowed' : 'pointer', borderRadius: 2 }}>
              {yukleniyor ? t.form.yukleniyor : t.form.gonder}
            </button>
          </form>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ background: LACIVERT }}>
        {/* Üst kısım */}
        <div style={{ padding: '60px 80px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {/* Marka */}
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 6, color: '#fff', fontFamily: 'Georgia, serif', marginBottom: 4 }}>PIER HABİB</div>
            <div style={{ fontSize: 11, color: ALTIN, letterSpacing: 3, marginBottom: 16 }}>SÜT BAKLAVA — İSTANBUL</div>
            <p style={{ fontSize: 13, color: '#a8c4e0', lineHeight: 1.8, marginBottom: 20 }}>{t.footer.slogan}</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="https://instagram.com/pierhabib" target="_blank" rel="noreferrer"
                style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 4, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                Instagram
              </a>
              <a href="https://tiktok.com/@pierhabib" target="_blank" rel="noreferrer"
                style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 4, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                TikTok
              </a>
            </div>
          </div>
          {/* Şubeler */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: ALTIN, textTransform: 'uppercase', marginBottom: 20 }}>{t.subeler.baslik}</div>
            {SUBELER.map((s, i) => (
              <a key={i} href={s.maps} target="_blank" rel="noreferrer"
                style={{ display: 'block', fontSize: 13, color: '#a8c4e0', textDecoration: 'none', marginBottom: 10 }}>
                {s.bayrak} {s.sehir}
              </a>
            ))}
          </div>
          {/* Online Siparişler */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: ALTIN, textTransform: 'uppercase', marginBottom: 20 }}>{t.nav.online}</div>
            {KANALLAR.map((k, i) => (
              <a key={i} href={k.link} target="_blank" rel="noreferrer"
                style={{ display: 'block', fontSize: 13, color: '#a8c4e0', textDecoration: 'none', marginBottom: 10 }}>
                {k.ad}
              </a>
            ))}
          </div>
          {/* İletişim */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: ALTIN, textTransform: 'uppercase', marginBottom: 20 }}>{t.iletisim.baslik}</div>
            <p style={{ fontSize: 13, color: '#a8c4e0', lineHeight: 1.7, marginBottom: 10 }}>Şair Nedim Cd. No:42/A<br />Beşiktaş, İstanbul</p>
            <a href="mailto:mail@pierhabib.com.tr" style={{ display: 'block', fontSize: 13, color: '#a8c4e0', textDecoration: 'none', marginBottom: 6 }}>mail@pierhabib.com.tr</a>
            <a href="tel:+90XXXXXXXXXX" style={{ display: 'block', fontSize: 13, color: '#a8c4e0', textDecoration: 'none' }}>+90 XXX XXX XX XX</a>
          </div>
        </div>
        {/* Alt kısım */}
        <div style={{ padding: '20px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#64748b' }}>{t.footer.haklar}</span>
          <span style={{ fontSize: 12, color: '#64748b' }}>pierhabib.com.tr</span>
        </div>
      </footer>

      {(dilMenuAcik || kanalMenuAcik) && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => { setDilMenuAcik(false); setKanalMenuAcik(false) }} />
      )}
    </div>
  )
}

const inputStil = {
  width: '100%', padding: '14px 16px', border: '1px solid #ddd8cc',
  borderRadius: 2, fontSize: 14, background: '#fff', color: '#1a1a2e',
  outline: 'none', display: 'block', fontFamily: 'Arial, sans-serif',
}
const labelStil = {
  display: 'block', fontSize: 11, letterSpacing: 2, color: '#1e3a5f',
  textTransform: 'uppercase', marginBottom: 8,
}
