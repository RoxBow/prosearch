import useSWR from 'swr';
import fetcher from '../utils/fetcher';

function useProjects() {
  const { data, mutate } = useSWR('/api/projects', fetcher);

  const loading = !data;
  const projects = data && data.success ? data.projects : null;

  return [
    projects,
    {
      mutate,
      loading,
    },
  ];
}

export default useProjects;
