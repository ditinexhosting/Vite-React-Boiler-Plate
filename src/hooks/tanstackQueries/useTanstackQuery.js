import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

/**
 * Custom hook for tanstack queries.
 * @param {Function} queryFn - The function to fetch data.
 * @param {Object} options - The options for the query.
 * @returns {Object} The query object.
 */
export const useTanstackQuery = (queryFn, options = {}) => {
  return function (...args) {
    return useQuery({
      queryKey: [queryFn.name],
      queryFn: async () => {
        const response = await queryFn(...args);
        if (!response) throw new Error("Something went wrong in API call. Please contact admin.");
        return response;
      },
      ...options
    });
  };
};
