import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

function useUser() {
  const { data, mutate } = useSWR('/api/user', fetcher);

  const loading = !data;
  const user = data?.user;
  return [
    user,
    {
      mutate,
      loading,
    },
  ];
}

export default useUser;
