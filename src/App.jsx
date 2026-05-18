import React, { useState, useRef } from 'react'

const LACIVERT = '#1e3a5f'
const ALTIN = '#c9a96e'
const KREM = '#faf9f7'
const KREM2 = '#f5f0e8'

const stil = {
  nav: {
    background: '#fff',
    borderBottom: '1px solid #e8e4dc',
    padding: '16px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  navLogo: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 4,
    color: LACIVERT,
    textTransform: 'uppercase',
  },
  navSub: {
    fontSize: 10,
    letterSpacing: 3,
    color: '#94a3b8',
    display: 'block',
    marginTop: 2,
    fontFamily: 'Arial, sans-serif',
  },
  navBtn: {
    background: LACIVERT,
    color: '#fff',
    border: 'none',
    padding: '10px 24px',
    borderRadius: 4,
    fontSize: 12,
    letterSpacing: 2,
    cursor: 'pointer',
    fontFamily: 'Georgia, serif',
    textTransform: 'uppercase',
  },
}

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
      <nav style={stil.nav}>
        <div>
          <span style={stil.navLogo}>Pier Habib</span>
          <span style={stil.navSub}>Süt Baklava — İstanbul</span>
        </div>
        <button style={stil.navBtn} onClick={scrollToForm}>Bayilik Başvurusu</button>
      </nav>

      {/* HERO */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '85vh' }}>
        {/* Sol */}
        <div style={{ background: LACIVERT, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: 6, color: '#a8c4e0', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'Arial, sans-serif' }}>Süt Baklava</div>
            <div style={{ fontSize: 11, color: ALTIN, margin: '8px 0' }}>◆</div>
            <div style={{ fontSize: 56, letterSpacing: 10, color: '#fff', fontWeight: 400, margin: '8px 0', lineHeight: 1.1 }}>PIER</div>
            <div style={{ fontSize: 56, letterSpacing: 10, color: '#fff', fontWeight: 400, lineHeight: 1.1 }}>HABİB</div>
            <div style={{ fontSize: 11, color: ALTIN, margin: '8px 0' }}>◆</div>
            <div style={{ fontSize: 11, letterSpacing: 6, color: '#a8c4e0', textTransform: 'uppercase', marginTop: 12, fontFamily: 'Arial, sans-serif' }}>İstanbul</div>
          </div>
          <p style={{ fontSize: 14, color: '#a8c4e0', letterSpacing: 2, textAlign: 'center', marginBottom: 40, lineHeight: 2, fontFamily: 'Arial, sans-serif', textTransform: 'uppercase' }}>
            Türkiye'nin en özel<br />süt baklavasında<br />bayilik fırsatı
          </p>
          <button onClick={scrollToForm} style={{ background: ALTIN, color: LACIVERT, border: 'none', padding: '14px 40px', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Georgia, serif', fontWeight: 700, borderRadius: 2 }}>
            Hemen Başvur
          </button>
        </div>

        {/* Sağ — dükkan fotoğrafı yerine renk bloğu (fotoğrafı kendin ekleyeceksin) */}
        <div style={{ background: '#d4c5a9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ textAlign: 'center', color: '#fff', padding: 40 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏪</div>
            <p style={{ fontSize: 13, letterSpacing: 2, opacity: 0.8, fontFamily: 'Arial, sans-serif' }}>
              Buraya dükkan fotoğrafını<br />ekleyeceksiniz
            </p>
            <p style={{ fontSize: 11, marginTop: 8, opacity: 0.6, fontFamily: 'Arial, sans-serif' }}>
              public/dukkan.jpg
            </p>
          </div>
        </div>
      </section>

      {/* ÖZELLİKLER */}
      <section style={{ padding: '80px 40px', background: '#fff' }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, color: LACIVERT, letterSpacing: 2, marginBottom: 8, fontWeight: 400 }}>Neden Pier Habib?</h2>
        <p style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8', letterSpacing: 1, marginBottom: 60, fontFamily: 'Arial, sans-serif' }}>
          Güçlü bir marka, güçlü bir ortaklık
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, maxWidth: 900, margin: '0 auto' }}>
          {[
            { icon: '🏆', baslik: 'Özgün Lezzet', aciklama: 'Buraya bir açıklama yazılacak. Pier Habib\'in özgün reçetesi ve kalite standartları.' },
            { icon: '🤝', baslik: 'Tam Destek', aciklama: 'Buraya bir açıklama yazılacak. Bayilerimize sağladığımız eğitim ve operasyonel destek.' },
            { icon: '📈', baslik: 'Büyüyen Marka', aciklama: 'Buraya bir açıklama yazılacak. Pier Habib\'in büyüme hikayesi ve bayilik avantajları.' },
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
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 400 }}>
        <div style={{ background: '#c8b89a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: '#fff', padding: 40 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📸</div>
            <p style={{ fontSize: 12, letterSpacing: 1, opacity: 0.8, fontFamily: 'Arial, sans-serif' }}>public/hikaye.jpg</p>
          </div>
        </div>
        <div style={{ background: KREM2, padding: '80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 11, letterSpacing: 4, color: ALTIN, textTransform: 'uppercase', marginBottom: 20, fontFamily: 'Arial, sans-serif' }}>Hikayemiz</p>
          <h2 style={{ fontSize: 32, color: LACIVERT, marginBottom: 24, fontWeight: 400, lineHeight: 1.4 }}>İstanbul'dan<br />Türkiye'ye</h2>
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.9, fontFamily: 'Arial, sans-serif' }}>
            Buraya bir açıklama yazılacak. Pier Habib'in kuruluş hikayesi, vizyonu ve Türkiye genelinde büyüme hedefleri hakkında kısa bir metin buraya gelecek.
          </p>
        </div>
      </section>

      {/* BAŞVURU FORMU */}
      <section ref={basvuruRef} style={{ padding: '80px 40px', background: KREM, maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, color: LACIVERT, letterSpacing: 2, marginBottom: 8, fontWeight: 400 }}>Bayilik Başvurusu</h2>
        <div style={{ width: 60, height: 1, background: ALTIN, margin: '16px auto 16px' }} />
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
            {/* Ad Soyad */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, letterSpacing: 2, color: LACIVERT, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Arial, sans-serif' }}>Ad *</label>
                <input value={form.ad} onChange={e => setForm({ ...form, ad: e.target.value })}
                  placeholder="Adınız" style={inputStil} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, letterSpacing: 2, color: LACIVERT, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Arial, sans-serif' }}>Soyad *</label>
                <input value={form.soyad} onChange={e => setForm({ ...form, soyad: e.target.value })}
                  placeholder="Soyadınız" style={inputStil} />
              </div>
            </div>

            {/* Telefon E-posta */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, letterSpacing: 2, color: LACIVERT, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Arial, sans-serif' }}>Telefon *</label>
                <input value={form.telefon} onChange={e => setForm({ ...form, telefon: e.target.value })}
                  placeholder="05XX XXX XX XX" style={inputStil} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, letterSpacing: 2, color: LACIVERT, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Arial, sans-serif' }}>E-posta</label>
                <input value={form.eposta} onChange={e => setForm({ ...form, eposta: e.target.value })}
                  placeholder="ornek@mail.com" type="email" style={inputStil} />
              </div>
            </div>

            {/* Şehir */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, letterSpacing: 2, color: LACIVERT, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Arial, sans-serif' }}>Bayilik Düşündüğünüz Şehir / Bölge *</label>
              <input value={form.sehir} onChange={e => setForm({ ...form, sehir: e.target.value })}
                placeholder="Örn: Ankara, Çankaya" style={inputStil} />
            </div>

            {/* Deneyim */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, letterSpacing: 2, color: LACIVERT, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Arial, sans-serif' }}>Mevcut İş Deneyiminiz</label>
              <input value={form.deneyim} onChange={e => setForm({ ...form, deneyim: e.target.value })}
                placeholder="Varsa belirtin" style={inputStil} />
            </div>

            {/* Mesaj */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 11, letterSpacing: 2, color: LACIVERT, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Arial, sans-serif' }}>Mesajınız</label>
              <textarea value={form.mesaj} onChange={e => setForm({ ...form, mesaj: e.target.value })}
                placeholder="Bayilik beklentileriniz, sorularınız..."
                style={{ ...inputStil, minHeight: 120, resize: 'vertical' }} />
            </div>

            {hata && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 16, fontFamily: 'Arial, sans-serif' }}>{hata}</p>}

            <button type="submit" disabled={yukleniyor} style={{
              width: '100%', background: yukleniyor ? '#94a3b8' : LACIVERT, color: '#fff',
              border: 'none', padding: 16, fontSize: 12, letterSpacing: 3,
              textTransform: 'uppercase', cursor: yukleniyor ? 'not-allowed' : 'pointer',
              fontFamily: 'Georgia, serif', borderRadius: 2, transition: 'background 0.2s'
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
  width: '100%',
  padding: '14px 16px',
  border: '1px solid #ddd8cc',
  borderRadius: 2,
  fontSize: 14,
  fontFamily: 'Arial, sans-serif',
  background: '#fff',
  color: '#1a1a2e',
  outline: 'none',
}
