import { useEffect, useState } from 'react';
import { useStores } from 'src/dal/use-stores';

export const useIsAuthor = (username: string) => {
  const { dalAuthStore } = useStores();
  const user = dalAuthStore.user;
  const [isAuthor, setIsAuthor] = useState(username === user?.username);

  useEffect(() => {
    if ((username === user?.username) !== isAuthor) {
      setIsAuthor(username === user?.username);
    }
  }, [username, user]);

  return isAuthor;
};
