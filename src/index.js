import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Rankings } from './rankings';

const queryClient = new QueryClient();

const container = document.getElementById('rankings');
const root = createRoot(container);
root.render(
  <QueryClientProvider client={queryClient}>
    <Rankings />
  </QueryClientProvider>
);
