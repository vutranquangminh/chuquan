import { useEffect, useState } from 'react';

/**
 * Hook convention: camelCase filename with a `use` prefix.
 * Returns true once the component has mounted on the client.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
