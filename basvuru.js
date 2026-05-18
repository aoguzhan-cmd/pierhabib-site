import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ hata: 'Method not allowed' });

  const { ad, soyad, telefon, eposta, sehir, deneyim, mesaj } = req.body;

  if (!ad || !soyad || !telefon || !sehir) {
    return res.status(400).json({ hata: 'Zorunlu alanlar eksik' });
  }

  try {
    await resend.emails.send({
      from: 'Pier Habib Bayilik onboarding@resend.dev>',
      to: [process.env.BASVURU_MAIL],
      subject: `Yeni Bayilik Başvurusu — ${ad} ${soyad} / ${sehir}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: #1e3a5f; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #fff; font-size: 24px; letter-spacing: 4px; margin: 0; font-family: Georgia, serif;">PIER HABİB</h1>
            <p style="color: #a8c4e0; font-size: 12px; letter-spacing: 2px; margin: 8px 0 0;">Yeni Bayilik Başvurusu</p>
          </div>
          <div style="background: #fff; border: 1px solid #e8e4dc; border-top: none; padding: 30px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; width: 40%;">Ad Soyad</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #1e3a5f;">${ad} ${soyad}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Telefon</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e3a5f;">${telefon}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">E-posta</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e3a5f;">${eposta || '—'}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Şehir / Bölge</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #c9a96e;">${sehir}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">İş Deneyimi</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e3a5f;">${deneyim || '—'}</td></tr>
            </table>
            ${mesaj ? `<div style="margin-top: 20px; padding: 16px; background: #faf9f7; border-radius: 6px; border-left: 3px solid #c9a96e;"><p style="color: #64748b; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;">Mesaj</p><p style="color: #1e3a5f; line-height: 1.7;">${mesaj}</p></div>` : ''}
            <p style="margin-top: 24px; font-size: 11px; color: #94a3b8; text-align: center;">
              ${new Date().toLocaleString('tr-TR')} tarihinde pierhabib.com.tr üzerinden gönderildi.
            </p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ hata: err.message });
  }
}
