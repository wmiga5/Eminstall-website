import { renderToString } from 'react-dom/server';
import App from './App';
import { getRouteSeo } from './routes';

export function render(url: string) {
  const html = renderToString(<App initialUrl={url} />);
  const seo = getRouteSeo(url);
  return { html, seo };
}
