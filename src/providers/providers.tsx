import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchProvider } from '../contexts/SearchContext';
import { ThemeProvider } from '../contexts/ThemeContext';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SearchProvider>
          {children}
        </SearchProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}