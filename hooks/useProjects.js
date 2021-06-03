import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

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
