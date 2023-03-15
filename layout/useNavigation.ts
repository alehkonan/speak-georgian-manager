import { useMemo } from 'react';

type NavItem = {
  id: number;
  link: `/${string}`;
  label: string;
};

export const useNavigation = () => {
  const navItems = useMemo<NavItem[]>(
    () => [
      { id: 1, link: '/words', label: 'Words' },
      { id: 2, link: '/verbs', label: 'Verbs' },
      { id: 3, link: '/phrases', label: 'Phrases' },
    ],
    []
  );

  return {
    navItems,
  };
};
