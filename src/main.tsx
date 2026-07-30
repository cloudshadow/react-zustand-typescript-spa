import { createRoot } from 'react-dom/client';
import { App } from './App';
import { applyDocumentLocale, resolveLocale } from '@/utils';

/**
 * Bootstrap.
 *
 * Locale is resolved before the first render so <html lang/dir> is correct
 * immediately -- no flash of the wrong text direction.
 */
const locale = resolveLocale();
applyDocumentLocale(locale);

const container = document.getElementById('app');
if (!container) throw new Error('#app container not found');

createRoot(container).render(<App locale={locale} />);
