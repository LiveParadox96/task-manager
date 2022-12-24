export const sortByDate = (array: any[]) => {
  if (!array.length) return [];
  return array?.sort(
    (a: { date: Date }, b: { date: Date }) =>
      b.date.getTime() - a.date.getTime()
  );
};
