# Hiwot Ketema — Portfolio (Vite)

A React portfolio built with Vite, structured to match:

```
src/
  assets/          # images etc. — currently empty, add a profile photo here
  components/      # Header, Main, Footer, and each page section (.jsx)
  css/             # one .css file per component, plus global index.css/App.css
  App.jsx
  main.jsx
index.html
```

`Header` renders the nav, `Main` composes the page sections (Home, About, Skills,
Education, Projects, Contact), and `Footer` renders the footer — `App.jsx` just wires
the three together.

## Run it

```bash
npm install
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with `npm run preview`.

## Notes

- The Home section uses a placeholder "HK" avatar circle. Add a real photo to
  `src/assets/`, then import it in `src/components/Home.jsx` and swap the avatar div
  for an `<img src={photo} alt="Hiwot Ketema" className="avatar" />`.
- The contact form is client-side only — it shows a confirmation message on submit but
  doesn't send anywhere. Wire it up to a service like Formspree or EmailJS when ready.
- Colors and fonts live in `src/css/index.css` under `:root` — change those variables to
  restyle the whole site at once.
