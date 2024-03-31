import { ThemeProvider } from '@/components/ui/theme-provider';
import { ModeToggle } from '@/components/ui/mode-toggle';
import Router from './router/router';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <ModeToggle /> */}
      <Router />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
