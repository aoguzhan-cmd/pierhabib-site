import React, { useState, useRef } from 'react'

const LACIVERT = '#1e3a5f'
const ALTIN = '#c9a96e'
const KREM = '#faf9f7'
const KREM2 = '#f5f0e8'

export default function App() {
  const [form, setForm] = useState({ ad: '', soyad: '', telefon: '', eposta: '', sehir: '', deneyim: '', mesaj: '' })
  const [gonderildi, setGonderildi] = useState(false)
  const [yukleniyor, setYukleniyor] = useState(false)
  const [hata, setHata] = useState('')
  const basvuruRef = useRef(null)

  function scrollToForm() {
    basvuruRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  async function gonder(e) {
    e.preventDefault()
    if (!form.ad || !form.soyad || !form.telefon || !form.sehir) {
      setHata('Lütfen zorunlu alanları doldurun.')
      return
    }
    setYukleniyor(true)
    setHata('')
    try {
      const res = await fetch('/api/basvuru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setGonderildi(true)
      } else {
        setHata('Bir hata oluştu, lütfen tekrar deneyin.')
      }
    } catch {
      setHata('Bağlantı hatası, lütfen tekrar deneyin.')
    }
    setYukleniyor(false)
  }

  return (
    <div>
      {/* NAV */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e8e4dc', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
  <div>
    <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: 4, color: LACIVERT, textTransform: 'uppercase' }}>Pier Habib</span>
    <span style={{ fontSize: 10, letterSpacing: 3, color: '#94a3b8', display: 'block', marginTop: 2, fontFamily: 'Arial, sans-serif' }}>Süt Baklava — İstanbul</span>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <div style={{ display: 'flex', gap: 8 }}>
      {[
        { ad: 'Yemek Sepeti', link: 'https://www.yemeksepeti.com/restaurant/jbbf/pier-habib-sut-baklava-jbbf?srsltid=AfmBOooub_Jz2wOlQOFYJfs6MvLNZ5qcLP3z9swbTOuhwW5px0gBUEeH', renk: '#e60026' },
        { ad: 'Getir', link: 'https://getir.com/yemek/restoran/pier-habib-sut-baklava-sinanpasa-mah-besiktas-istanbul/', renk: '#5c3ebc' },
        { ad: 'FineDine', link: 'https://qr.finedinemenu.com/pier-habib/menu/6076a008884d1e00146856ad', renk: '#1a1a2e' },
      ].map((k) => (
        <a key={k.ad} href={k.link} target="_blank" rel="noreferrer"
          style={{ fontSize: 11, padding: '6px 12px', borderRadius: 20, border: `1px solid ${k.renk}`, color: k.renk, textDecoration: 'none', fontFamily: 'Arial, sans-serif', fontWeight: 600, letterSpacing: 0.5 }}>
          {k.ad}
        </a>
      ))}
    </div>
    <button onClick={scrollToForm} style={{ background: LACIVERT, color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 4, fontSize: 12, letterSpacing: 2, cursor: 'pointer', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
      Bayilik Başvurusu
    </button>
  </div>
</nav>

      {/* HERO */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '85vh' }}>
        {/* Sol — lacivert */}
        <div style={{ background: LACIVERT, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 60px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 11, letterSpacing: 6, color: '#a8c4e0', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'Arial, sans-serif' }}>Süt Baklava</div>
            <div style={{ fontSize: 11, color: ALTIN, margin: '8px 0' }}>◆</div>
            <div style={{ fontSize: 52, letterSpacing: 10, color: '#fff', fontWeight: 400, margin: '8px 0', lineHeight: 1.1 }}>PIER</div>
            <div style={{ fontSize: 52, letterSpacing: 10, color: '#fff', fontWeight: 400, lineHeight: 1.1 }}>HABİB</div>
            <div style={{ fontSize: 11, color: ALTIN, margin: '8px 0' }}>◆</div>
            <div style={{ fontSize: 11, letterSpacing: 6, color: '#a8c4e0', textTransform: 'uppercase', marginTop: 12, fontFamily: 'Arial, sans-serif' }}>İstanbul</div>
          </div>
          <p style={{ fontSize: 13, color: '#a8c4e0', letterSpacing: 2, textAlign: 'center', marginBottom: 36, lineHeight: 2, fontFamily: 'Arial, sans-serif', textTransform: 'uppercase' }}>
            Türkiye'nin en özel<br />süt baklavasında<br />bayilik fırsatı
          </p>
          <button onClick={scrollToForm} style={{ background: ALTIN, color: LACIVERT, border: 'none', padding: '14px 40px', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Georgia, serif', fontWeight: 700, borderRadius: 2 }}>
            Hemen Başvur
          </button>
        </div>

        {/* Sağ — fotoğraf */}
        <div style={{ overflow: 'hidden', height: '85vh' }}>
          <img src="/dukkan.jpg" alt="Pier Habib Dükkan" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        </div>
      </section>

      {/* ÖZELLİKLER */}
      <section style={{ padding: '80px 40px', background: '#fff' }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, color: LACIVERT, letterSpacing: 2, marginBottom: 8, fontWeight: 400 }}>Neden Pier Habib?</h2>
        <p style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8', letterSpacing: 1, marginBottom: 60, fontFamily: 'Arial, sans-serif' }}>
          Güçlü bir marka...
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, maxWidth: 900, margin: '0 auto' }}>
          {[
            { icon: '🏆', baslik: 'Özgün Lezzet', aciklama: 'Pier Habib\'in özgün reçetesi ve kalite standartları.' },
            { icon: '🤝', baslik: 'Tam Destek', aciklama: 'Bayilerimize sağladığımız eğitim ve operasyonel destek.' },
            { icon: '📈', baslik: 'Büyüyen Marka', aciklama: 'Pier Habib\'in büyüme hikayesi ve bayilik avantajları.' },
          ].map((f, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '40px 24px', border: '1px solid #e8e4dc', borderRadius: 4 }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
              <div style={{ fontSize: 15, color: LACIVERT, marginBottom: 12, letterSpacing: 1, fontWeight: 700 }}>{f.baslik}</div>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.8, fontFamily: 'Arial, sans-serif' }}>{f.aciklama}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HİKAYE */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: 480 }}>
        {/* Sol — fotoğraf */}
        <div style={{ overflow: 'hidden', height: 480 }}>
          <img src="/hikaye.jpg" alt="Pier Habib" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
        </div>
        {/* Sağ — metin */}
        <div style={{ background: KREM2, padding: '60px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 11, letterSpacing: 4, color: ALTIN, textTransform: 'uppercase', marginBottom: 20, fontFamily: 'Arial, sans-serif' }}>Hikayemiz</p>
          <h2 style={{ fontSize: 32, color: LACIVERT, marginBottom: 24, fontWeight: 400, lineHeight: 1.4 }}>İstanbul'dan<br />Türkiye'ye</h2>
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.9, fontFamily: 'Arial, sans-serif' }}>
            Pier Habib, İstanbul'un kalbinde doğdu. Geleneksel süt baklavasını modern bir dokunuşla yorumlayarak, kısa sürede şehrin en özel lezzet noktalarından biri haline geldi. Şimdi ise bu eşsiz deneyimi Türkiye'nin dört bir yanına taşımak istiyoruz. Bayilik fırsatımızla, siz de bu büyüleyici yolculuğun bir parçası olun.
          </p>
        </div>
      </section>

      {/* BAŞVURU FORMU */}
      <section ref={basvuruRef} style={{ padding: '80px 40px', background: KREM, maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, color: LACIVERT, letterSpacing: 2, marginBottom: 8, fontWeight: 400 }}>Bayilik Başvurusu</h2>
        <div style={{ width: 60, height: 1, background: ALTIN, margin: '16px auto 24px' }} />
        <p style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8', letterSpacing: 1, marginBottom: 48, fontFamily: 'Arial, sans-serif' }}>
          Formu doldurun, en kısa sürede sizinle iletişime geçelim
        </p>

        {gonderildi ? (
          <div style={{ textAlign: 'center', padding: 60, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, color: '#166534' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
            <div style={{ fontSize: 18, letterSpacing: 1, marginBottom: 8 }}>Başvurunuz Alındı</div>
            <p style={{ fontSize: 13, opacity: 0.8, fontFamily: 'Arial, sans-serif' }}>En kısa sürede sizinle iletişime geçeceğiz.</p>
            <p style={{ fontSize: 12, marginTop: 16, opacity: 0.6, fontFamily: 'Arial, sans-serif' }}>— Pier Habib Ekibi</p>
          </div>
        ) : (
          <form onSubmit={gonder}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStil}>Ad *</label>
                <input value={form.ad} onChange={e => setForm({ ...form, ad: e.target.value })} placeholder="Adınız" style={inputStil} />
              </div>
              <div>
                <label style={labelStil}>Soyad *</label>
                <input value={form.soyad} onChange={e => setForm({ ...form, soyad: e.target.value })} placeholder="Soyadınız" style={inputStil} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStil}>Telefon *</label>
                <input value={form.telefon} onChange={e => setForm({ ...form, telefon: e.target.value })} placeholder="05XX XXX XX XX" style={inputStil} />
              </div>
              <div>
                <label style={labelStil}>E-posta</label>
                <input value={form.eposta} onChange={e => setForm({ ...form, eposta: e.target.value })} placeholder="ornek@mail.com" type="email" style={inputStil} />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStil}>Bayilik Düşündüğünüz Şehir / Bölge *</label>
              <input value={form.sehir} onChange={e => setForm({ ...form, sehir: e.target.value })} placeholder="Örn: Ankara, Çankaya" style={inputStil} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStil}>Mevcut İş Deneyiminiz</label>
              <input value={form.deneyim} onChange={e => setForm({ ...form, deneyim: e.target.value })} placeholder="Varsa belirtin" style={inputStil} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStil}>Mesajınız</label>
              <textarea value={form.mesaj} onChange={e => setForm({ ...form, mesaj: e.target.value })}
                placeholder="Bayilik beklentileriniz, sorularınız..."
                style={{ ...inputStil, minHeight: 120, resize: 'vertical' }} />
            </div>
            {hata && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 16, fontFamily: 'Arial, sans-serif' }}>{hata}</p>}
            <button type="submit" disabled={yukleniyor} style={{
              width: '100%', background: yukleniyor ? '#94a3b8' : LACIVERT, color: '#fff',
              border: 'none', padding: 16, fontSize: 12, letterSpacing: 3,
              textTransform: 'uppercase', cursor: yukleniyor ? 'not-allowed' : 'pointer',
              fontFamily: 'Georgia, serif', borderRadius: 2,
            }}>
              {yukleniyor ? 'Gönderiliyor...' : 'Başvuru Gönder'}
            </button>
          </form>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ background: LACIVERT, color: '#a8c4e0', textAlign: 'center', padding: 32, fontSize: 12, letterSpacing: 2, fontFamily: 'Arial, sans-serif' }}>
        © 2026 Pier Habib Süt Baklava — İstanbul &nbsp;◆&nbsp; pierhabib.com.tr
      </footer>
    </div>
  )
}

const inputStil = {
  width: '100%', padding: '14px 16px', border: '1px solid #ddd8cc',
  borderRadius: 2, fontSize: 14, fontFamily: 'Arial, sans-serif',
  background: '#fff', color: '#1a1a2e', outline: 'none',
}

const labelStil = {
  display: 'block', fontSize: 11, letterSpacing: 2, color: '#1e3a5f',
  textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Arial, sans-serif',
}
