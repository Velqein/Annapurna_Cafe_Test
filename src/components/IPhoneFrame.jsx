/* Reusable iPhone 17 Pro mockup frame.
   children renders inside the screen area. */
export default function IPhoneFrame({ children, screenBg = '#F7F5F0' }) {
  return (
    <div style={{ position: 'relative', width: 393, height: 852, flexShrink: 0 }}>

      {/* ── outer shell (pointer-events:none so clicks pass through) ── */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: 54,
        background: '#111',
        boxShadow: '0 0 0 1.5px #555, 0 0 0 3px #2a2a2a, 0 30px 80px rgba(0,0,0,0.55), inset 0 0 0 1px #444',
        pointerEvents: 'none',
        zIndex: 20,
      }} />

      {/* dynamic island */}
      <div style={{
        position: 'absolute', top: 14, left: '50%',
        transform: 'translateX(-50%)',
        width: 120, height: 34,
        background: '#000', borderRadius: 20,
        zIndex: 30, pointerEvents: 'none',
      }} />

      {/* left buttons */}
      {[{ top: 150, h: 36 }, { top: 200, h: 64 }, { top: 278, h: 64 }].map((b, i) => (
        <div key={i} style={{
          position: 'absolute', left: -3, top: b.top,
          width: 3, height: b.h,
          background: '#333', borderRadius: '2px 0 0 2px',
        }} />
      ))}

      {/* right button */}
      <div style={{
        position: 'absolute', right: -3, top: 180,
        width: 3, height: 90,
        background: '#333', borderRadius: '0 2px 2px 0',
      }} />

      {/* ── screen ── */}
      <div style={{
        position: 'absolute', inset: 6,
        borderRadius: 48,
        background: screenBg,
        overflow: 'hidden',
      }}>
        {children}
      </div>
    </div>
  )
}
