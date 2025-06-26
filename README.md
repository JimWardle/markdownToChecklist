# Markdown Checklist

A simple web app that converts markdown lists into interactive checklists. Built because I needed a way to turn messy operational reports into something I could actually work through systematically.

## What it does

Takes any markdown content and transforms list items into checkboxes you can tick off as you complete tasks. The problem was simple: you'd get a long list of tasks and then... what? No way to tick things off, no progress tracking, no ability to focus on specific sections.

Particularly useful for:

- Certificate renewal lists from monitoring systems
- Operational task reports  
- Project checklists and runbooks
- Meeting action items
- System maintenance procedures
- Any markdown list that needs systematic progress tracking

## Features

- **Interactive checklists** - Any markdown list item becomes a tickable checkbox
- **Save Progress** - Export your current state as markdown with completed items marked as `[x]` to resume later. When you paste the saved markdown back in, the tool automatically detects and restores your progress
- **Sticky controls** - Essential buttons (Save Progress, Clear All, etc.) are always accessible at the bottom of the screen
- **Collapsible sections** - Click headers to collapse/expand sections for better focus on what matters right now
- **Progress tracking** - Shows completion stats and progress bar so you know exactly where you stand
- **Minimizable input** - Hide the markdown panel once you've pasted your content and focus on the actual work
- **Dual view modes** - Switch between interactive checklist and standard markdown preview
- **Session persistence** - Your progress survives page refreshes until you close the browser
- **Mobile friendly** - Works on phones and tablets for operational tasks on the go

## How to use

1. Paste your markdown content in the left panel
2. Click "Checklist" mode to see interactive checkboxes
3. Minimize the input panel to focus entirely on your tasks
4. Tick off items as you complete them
5. Use collapsible headers to hide sections you're not working on
6. Click "Save Progress" to export your current state as markdown for resuming later

The app handles standard markdown formatting whilst converting any list items (starting with `-`, `*`, or `+`) into interactive checkboxes. The Save Progress feature converts completed items to `[x]` format, and when you paste this saved markdown back in, the tool automatically detects and restores your exact progress state.

## File Structure

```
/
├── index.html          # Main application with sticky controls
├── about.html          # About page with Buy Me a Coffee support option
├── examples.html       # Real-world usage examples
├── css/
│   └── styles.css      # All styling including responsive footer
├── js/
│   └── app.js          # Application logic with progress parsing
└── README.md           # This file
```

## Technical details

Built as a collection of static files using:
- Vanilla JavaScript for functionality
- [marked.js](https://marked.js.org/) for markdown parsing
- CSS for styling and animations
- No build process or frameworks required

All state is kept in memory during the session. No data is transmitted anywhere - everything runs locally in your browser for complete privacy.

## Privacy and Security

**Your data stays local:** All markdown content and task progress remains in your browser. Nothing is sent to external servers for processing. The app works entirely client-side using JavaScript, so any content you paste (including sensitive information) never leaves your device.

**No tracking or analytics:** The application doesn't collect usage data, track user behavior, or communicate with external services beyond loading the initial page and the markdown parsing library.

## Development context

This started as a quick solution to make Teams bot certificate expiry reports more manageable. The problem was having long markdown dumps that were impossible to work through systematically in text editors.

The collapsible headers and minimize functionality came from real usage - when you're working through operational checklists, you need to focus on specific priority levels without distraction from lower-priority items.

Most existing solutions were either too complex (full project management tools) or missed the point entirely (visual checklist designers for creating new content rather than working with existing operational data).

## Setup

Just open `index.html` in any modern web browser. No installation or server required.

For GitHub Pages hosting:
1. Upload all files to your repository
2. Enable GitHub Pages in repository settings
3. Optionally configure a custom domain

## Browser compatibility

Works in any modern browser that supports:
- ES6 JavaScript features
- CSS Grid and Flexbox
- Local JavaScript execution

Tested on Chrome, Firefox, Safari, and Edge.

## Contributing

The code is straightforward and contributions are welcome. Found a bug? Have an idea for improvement? Feel free to open an issue or submit a pull request.

If this tool has saved you time on operational tasks, consider [supporting the project](https://www.buymeacoffee.com/jameswardle) to help keep it free and ad-free.

Built by [James Wardle](https://jameswardle.me) - a DevOps engineer who got tired of working through certificate renewal lists in text editors and decided to fix the problem properly.