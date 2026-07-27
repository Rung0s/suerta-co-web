import React from 'react';
import BlogSection from './BlogSection';

export default function BlogPage() {
  return (
    <div style={{ paddingTop: 'calc(60px + 2rem)', minHeight: '100vh', background: 'var(--color-bg)' }}>
      <BlogSection />
    </div>
  );
}
