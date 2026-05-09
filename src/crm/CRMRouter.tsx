import { useState } from 'react';
import CRMLayout from './CRMLayout';
import CRMTop from './CRMTop';
import CRMLineUnverified from './CRMLineUnverified';

type CRMPage = 'top' | 'line-unverified';

export default function CRMRouter() {
  const [page, setPage] = useState<CRMPage>('top');

  return (
    <CRMLayout page={page} onNavigate={setPage}>
      {page === 'top' && <CRMTop onNavigate={setPage} />}
      {page === 'line-unverified' && <CRMLineUnverified onNavigate={setPage} />}
    </CRMLayout>
  );
}
