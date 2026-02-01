import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchMetrics = async (project?: string | null) => {
  const url = new URL('https://sturdy-spork-w49vrwrx64xc99qj-3001.app.github.dev/api/work-items');
  if (project) url.searchParams.append('project', project);

  const response = await fetch(url.toString(), {
    headers: { 'bypass-tunnel-reminder': 'true' }
  });
  
  if (!response.ok) throw new Error('Erro na API');
  return response.json();
};

export const useMetrics = () => {
  const [project, setProject] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['metrics', project],
    queryFn: () => fetchMetrics(project),
    retry: 1,
    refetchInterval: 5000
  });

  return { metrics: data, isLoading, error, updateProject: setProject };
};