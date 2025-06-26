# Markdown Checklist

A simple web app that converts markdown lists into interactive checklists. Built because I needed a way to turn messy operational reports into something I could actually work through systematically.

## What it does

Takes any markdown content and transforms list items into checkboxes you can tick off as you complete tasks. Particularly useful for:

- Certificate renewal lists
- Operational task reports  
- Project checklists
- Meeting action items
- Any markdown list that needs tracking

## Features

- **Interactive checklists** - Any markdown list item becomes a tickable checkbox
- **Collapsible sections** - Click headers to collapse/expand sections for better focus
- **Progress tracking** - Shows completion stats and progress bar
- **Minimizable input** - Hide the markdown panel once you've pasted your content
- **Dual view modes** - Switch between interactive checklist and standard markdown preview
- **Session persistence** - Your progress is saved while you work
- **Mobile friendly** - Works on phones and tablets

## How to use

1. Paste your markdown content in the left panel
2. Click "Checklist" mode to see interactive checkboxes
3. Minimize the input panel to focus on your tasks
4. Tick off items as you complete them
5. Use collapsible headers to hide sections you're not working on

The app handles standard markdown formatting whilst converting any list items (starting with `-`, `*`, or `+`) into interactive checkboxes.

## Technical details

Single-file HTML application using:
- Vanilla JavaScript for functionality
- [marked.js](https://marked.js.org/) for markdown parsing
- CSS for styling and animations
- No build process required

All state is kept in memory during the session. No data is transmitted anywhere - everything runs locally in your browser.

## Development context

This started as a quick solution to make Teams bot certificate expiry reports more manageable. The problem was having long markdown dumps that were impossible to work through systematically in text editors.

The collapsible headers and minimize functionality came from real usage - when you're working through operational checklists, you need to focus on specific priority levels without distraction.

## Setup

Just open `index.html` in any modern web browser. No installation or server required.

For GitHub Pages hosting:
1. Upload `index.html` to your repository
2. Enable GitHub Pages in repository settings
3. Optionally configure a custom domain

## Browser compatibility

Works in any modern browser that supports:
- ES6 JavaScript features
- CSS Grid and Flexbox
- Local JavaScript execution

Tested on Chrome, Firefox, Safari, and Edge.
