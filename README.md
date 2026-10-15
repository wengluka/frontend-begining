# Ugobest Music Label

A static website for Ugobest Music Label. Visitors can learn about the label and its artists, browse an artist gallery, and view an artist registration form.

## Pages

- **Home** (`index.html`) — introduces the label, highlights its founders and artists, and shows label statistics and sponsors.
- **Artists** (`our artists.html`) — displays the artist gallery. Select an image to open it in the lightbox.
- **Register** (`register.html`) — presents the artist application form.

`first.html` redirects visitors to the home page.

## Run locally

No build step or package installation is required. Open `index.html` in a browser, or serve the project directory with a local development server. For example, in Visual Studio Code, open the folder and use the Live Server extension.

Keep the HTML, CSS, JavaScript, and image files together in the project directory so the pages can load their relative asset paths.

## Features

- Responsive layouts for desktop and mobile screens.
- Light and dark theme toggle on the home page; the selected theme is saved in browser storage.
- Rotating featured images and animated home page statistics.
- Artist gallery with an image lightbox.
- Required-field, email, and URL validation on the artist application form.

## Registration form note

The registration form is currently a front-end demonstration. Its JavaScript displays a success message and resets the form; it does not send or save applications to a server. Connect the form to a backend before using it to collect real applications.

## Project files

- `index.html`, `our artists.html`, `register.html` — page markup.
- `index.css`, `Artists.css`, `register.css` — page styles.
- `script.js` — shared interactions and client-side form behavior.
- Image files in the project directory — page, artist, sponsor, and background assets.