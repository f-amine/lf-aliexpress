'use client';
import { getRelayEnvironment } from '@/lib/relay';
import { RelayEnvironmentProvider } from 'react-relay';
import { useState, useEffect } from 'react';

export default function RelayProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const environment = getRelayEnvironment();
  
  if (!mounted) {
    return null; 
  }

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
