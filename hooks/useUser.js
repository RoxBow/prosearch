import useSWR from 'swr';
import fetcher from '../utils/fetcher';

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
