export const processCategories = (caption) => {
  const categoryArr: string[] = caption.match(/#[\w-]+/g) || [];
  return categoryArr.map((category) => ({
    where: {
      name: category,
    },
    create: {
      name: category,
    },
  }));
};
