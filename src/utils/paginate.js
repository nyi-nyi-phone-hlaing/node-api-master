/**
 * Formats pagination data
 */
const paginate = (totalItems, currentPage = 1, limit = 10) => {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    totalItems,
    totalPages,
    currentPage: Number(currentPage),
    limit: Number(limit),
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

export default paginate;
