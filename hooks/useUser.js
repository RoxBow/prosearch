import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

function useUser() {
  const { data, mutate } = useSWR('/api/users/me', fetcher);

  const loading = !data;
  const user = data && data.success ? data.user : null;

  return [
    user,
    {
      mutate,
      loading,
    },
  ];
}

export default useUser;
