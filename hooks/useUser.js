import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

function useUser() {
  const { data: user, mutate } = useSWR('/api/users/me', fetcher);

  const loading = !user;
  return [
    user,
    {
      mutate,
      loading,
    },
  ];
}

export default useUser;
