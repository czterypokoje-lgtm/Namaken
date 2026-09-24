import { ImageResponse } from 'next/og';
import { business } from '@/lib/business';

export const alt = `${business.name} — 24/7 mobile car key service`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0c1422',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: '#ff6a2b',
            }}
          />
          <div style={{ fontSize: 32, color: '#a3adbd', fontWeight: 700 }}>
            24/7 · Nationwide NL
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 84,
            fontWeight: 900,
            color: '#eef0f3',
            lineHeight: 0.95,
            textTransform: 'uppercase',
          }}
        >
          <span>Lost your car key?</span>
          <span style={{ color: '#ff6a2b' }}>We&apos;re there in 35 min.</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ fontSize: 40, fontWeight: 900, color: '#ff6a2b' }}>
            {business.phone}
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#eef0f3' }}>
            {business.name}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
