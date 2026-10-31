# Eatryte (React + Tailwind + GSAP + React Router)

## Run it
    npm install
    npm run dev

Open the local URL Vite prints (usually http://localhost:5173).

## Build for production
    npm run build     # output in /dist
    npm run preview

## Pages
| Route          | File                      |
|----------------|---------------------------|
| /              | src/pages/Home.jsx        |
| /our-story     | src/pages/OurStory.jsx    |
| /menu          | src/pages/OurMenu.jsx     |
| /gallery       | src/pages/Gallery.jsx     |
| /blog          | src/pages/Blog.jsx        |
| /blog/:slug    | src/pages/BlogPost.jsx    |
| /contact       | src/pages/Contact.jsx     |

Routes are set up in `src/App.jsx`. Shared pieces (navbar, footer, page transition) live in `src/components`.

## Images
Put your original images in `public/Images` (see the README.txt there).

## Edit content
Menu items, prices, blog posts, nav links and image paths are in `src/data.js`.
Theme colors and fonts are in `src/index.css` under `@theme`.

## Deploying
Because the site uses BrowserRouter, your host must send every path to `index.html`
(Netlify: add `public/_redirects` with `/* /index.html 200`; Vercel: add a rewrite to `/index.html`).
