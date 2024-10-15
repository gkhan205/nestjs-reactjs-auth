export const setToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string) => {
  const data: string | null = localStorage.getItem(key);

  if (data) return JSON.parse(data);
  return null;
};

export const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};
