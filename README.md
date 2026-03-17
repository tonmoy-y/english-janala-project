# English Janala

An interactive English vocabulary learning web app built with HTML, Tailwind CSS, DaisyUI, and vanilla JavaScript.

## Live Features Implemented

- Dynamic lesson buttons loaded from API on page load
- Vocabulary cards by selected lesson
- Active lesson button state handling
- Empty-state UI when a lesson has no vocabulary
- Loading spinner while fetching lesson data
- Word details modal with:
  - Word and pronunciation
  - Meaning
  - Example sentence
  - Synonyms list
- Search functionality across all words
- Responsive layout (mobile and desktop)

## Tech Stack

- HTML5
- Tailwind CSS (CDN)
- DaisyUI
- Font Awesome
- Vanilla JavaScript (ES6)

## Project Structure

```text
english-janala/
|- index.html
|- style.css
|- README.md
|- assets/
`- script/
   `- index.js
```

## API Endpoints Used

1. All levels

```bash
https://openapi.programming-hero.com/api/levels/all
```

2. Words by level

```bash
https://openapi.programming-hero.com/api/level/1
```

3. Word details

```bash
https://openapi.programming-hero.com/api/word/3
```

4. All words (for search)

```bash
https://openapi.programming-hero.com/api/words/all
```

## How to Run Locally

1. Clone or download this repository.
2. Open the project folder in VS Code.
3. Open `index.html` in a browser.

No build setup is required.

## Notes

- The email/password fields in the hero section are currently UI-only.
- The volume icon button is present in cards, but voice playback is not wired yet.
