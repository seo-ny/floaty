import { useNuxtApp } from "#app";

export const useFloaty = () => {
  const { $floaty } = useNuxtApp();
  return $floaty;
};
