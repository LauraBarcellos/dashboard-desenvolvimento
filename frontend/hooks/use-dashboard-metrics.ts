'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export function useDashboardMetrics() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3001/dashboard/metrics')
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
