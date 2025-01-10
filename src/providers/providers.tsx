import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchProvider } from '../contexts/SearchContext';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        {children}
      </SearchProvider>
    </QueryClientProvider>
  );
}