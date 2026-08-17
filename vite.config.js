import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import JavaScriptObfuscator from 'javascript-obfuscator'

// ─────────────────────────────────────────────────────────────
// pierhabib.com.tr (Web Sitesi) — KOD GİZLEME (obfuscation)
// Build sonrası JS dosyalarını okunamaz hale getirir.
// Sadece "npm run build" (production) sırasında çalışır;
// "npm run dev" etkilenmez, geliştirirken kod normal görünür.
//
// Performansı yavaşlatan iki ayar (controlFlowFlattening,
// deadCodeInjection) bilinçli olarak KAPALI bırakıldı.
// ─────────────────────────────────────────────────────────────
function kodGizle() {
  return {
    name: 'kod-gizle',
    apply: 'build',
    generateBundle(_options, bundle) {
      for (const dosyaAdi of Object.keys(bundle)) {
        const parca = bundle[dosyaAdi]
        if (parca.type === 'chunk' && dosyaAdi.endsWith('.js')) {
          parca.code = JavaScriptObfuscator.obfuscate(parca.code, {
            compact: true,
            controlFlowFlattening: false,
            deadCodeInjection: false,
            stringArray: true,
            stringArrayEncoding: ['base64'],
            stringArrayThreshold: 1,
            identifierNamesGenerator: 'hexadecimal',
            splitStrings: true,
            splitStringsChunkLength: 8,
            renameGlobals: false,
            transformObjectKeys: false,
            selfDefending: false,
            debugProtection: false,
          }).getObfuscatedCode()
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), kodGizle()],
})