# LLM Development Guide

This document provides context for AI assistants working on this project, including development approach, constraints, and coding patterns.

## Project Context

This is a single-file HTML application designed to convert markdown into interactive checklists. The primary use case is operational task management - turning messy reports (like certificate expiry lists) into actionable checklists.

**Key constraints:**
- Must work in Claude.ai artifacts environment
- Single HTML file with embedded CSS and JavaScript
- No external dependencies except marked.js from CDN
- No server-side components required
- Must be GitHub Pages compatible

## Development Philosophy

**Practical over fancy:** The app solves a real problem (managing operational checklists) without unnecessary complexity. Features were added based on actual usage needs, not theoretical requirements.

**Progressive enhancement:** Started as basic markdown-to-HTML conversion, then added interactivity, progress tracking, and UX improvements based on real usage patterns. Most recently added custom nested list syntax after discovering standard markdown nesting was unreliable for interactive conversion.

**Deployment simplicity:** Everything in one file that can be dropped anywhere and just work. No build process, no framework dependencies, no configuration.

## Technical Decisions

### Why single HTML file?
- Eliminates deployment complexity
- Works in any hosting environment
- Easy to backup/share/modify
- No build pipeline required

### Why vanilla JavaScript?
- Keeps the file size reasonable
- No framework learning curve for modifications
- Direct control over all functionality
- Better performance for this use case

### Why custom nested list syntax?
- Standard markdown nested lists create complex HTML structures that are difficult to convert reliably to interactive elements
- DOM manipulation of deeply nested lists caused state management issues
- Custom syntax (-, --, ---) provides predictable parsing whilst maintaining visual hierarchy
- Simpler to implement and more robust than recursive DOM processing

### Why in-memory storage only?
- Claude.ai artifacts don't support localStorage
- Simplifies the code significantly
- Session-based usage is the primary pattern anyway
- Avoids privacy concerns with persistent storage
- Ensures all user data stays local to their browser

## Privacy and Security Considerations

### Data Handling
**All processing is client-side:** The application performs markdown parsing and checklist management entirely within the user's browser. No content is transmitted to external servers for processing.

**Network requests are limited to:**
- Initial page load (HTML, CSS, JavaScript)
- Loading marked.js library from CDN
- Standard browser DNS resolution

**No data transmission:** User content, including sensitive information that might accidentally be pasted, never leaves the user's device. This is by design to ensure privacy and security.

### Security Benefits
- No server-side attack surface
- No data storage that could be compromised
- No third-party data processing
- No user tracking or analytics
- Complete user control over their data

## Code Architecture

### HTML Structure
```
container
├── header (title/description)
├── main-content
│   ├── input-panel (markdown textarea + controls + syntax help)
│   └── output-panel (rendered checklist)
└── controls (buttons for actions)
```

### Key JavaScript Functions
- `updateOutput()` - Core function that processes markdown and renders output
- `convertToInteractiveChecklist()` - Transforms markdown lists into interactive elements
- `processCustomListSyntax()` - Handles custom nested syntax (-, --, ---)
- `parseCheckboxStates()` - Extracts checkbox state from saved markdown
- `cleanCheckboxSyntax()` - Removes checkbox markers before processing
- `toggleSection()` - Handles collapsible headers
- `toggleInputPanel()` - Minimizes/expands input area
- `updateStats()` - Calculates and displays progress information

### CSS Approach
- Mobile-first responsive design
- CSS Grid for main layout, Flexbox for components
- Subtle animations using CSS transitions
- Clean, minimal styling that doesn't interfere with functionality
- Distinct styling for each nesting level (level-1, level-2, level-3)

## Feature Implementation Patterns

### Custom Nested Lists
The application uses a custom syntax for nested lists due to limitations in converting standard markdown nested structures to interactive elements:

**Syntax:**
- `- item` for level 1 (standard styling)
- `-- item` for level 2 (indented, blue border)
- `--- item` for level 3 (further indented, purple border)

**Implementation:**
- Line-by-line parsing using regex `/^(\s*)(-{1,3})\s+(.+)$/`
- Level detection based on dash count
- CSS classes applied for visual hierarchy
- Each level maintains full interactivity

### Collapsible Sections
Headers (h2, h3, h4) are made clickable with smooth expand/collapse animations. Implementation wraps content in containers with CSS max-height transitions.

### Progress Tracking
Dynamically counts total vs completed checkboxes, calculates percentages, and updates UI elements. Only shows when there are actual tasks present.

### State Management
Uses simple JavaScript objects to track checkbox states by ID. No complex state management needed for this use case. The custom list syntax simplifies state tracking compared to nested DOM structures.

### Responsive Behavior
Input panel switches from horizontal split to vertical stack on mobile. Collapsible headers adjust their rotation behavior based on screen size.

## Development Constraints

### Claude.ai Specific
- **No localStorage/sessionStorage** - These APIs are not available in artifacts
- **Limited external resources** - Only CDN resources from approved sources
- **Single artifact rule** - Everything must fit in one artifact update cycle

### Browser Compatibility
- Targets modern browsers (last 2 versions of major browsers)
- Uses ES6 features but avoids cutting-edge APIs
- Graceful fallbacks for older environments

### Performance Considerations
- Minimal DOM manipulation during updates
- CSS transitions instead of JavaScript animations
- Efficient markdown parsing with marked.js
- Custom list processing avoids expensive recursive DOM operations
- No unnecessary re-renders

## Styling Guidelines

### Design Principles
- Clean and uncluttered interface
- Subtle visual feedback for interactions
- Clear hierarchy with appropriate typography
- Accessible color contrasts
- Smooth but not distracting animations
- Distinct visual treatment for each nesting level

### Color Palette
- Primary blue (#3498db) for interactive elements and level-2 items
- Success green (#27ae60) for completed items
- Purple (#9b59b6) for level-3 items
- Subtle grays for backgrounds and borders
- High contrast for text readability

### Typography
- System font stack for consistency
- Clear hierarchy with appropriate sizing
- Sufficient line height for readability
- Consistent spacing throughout

## Extension Patterns

### Adding New Features
1. Consider if it fits the single-file constraint
2. Ensure it works without external dependencies
3. Test in both desktop and mobile layouts
4. Maintain backward compatibility with existing markdown
5. Consider impact on custom list syntax processing

### Code Style
- Use meaningful variable names
- Comment complex logic but avoid obvious comments
- Prefer functional approaches where appropriate
- Keep functions focused and single-purpose
- Document regex patterns for list processing

### Testing Approach
- Manual testing across different markdown structures
- Verify responsive behavior at different screen sizes
- Test interaction patterns (clicking, collapsing, etc.)
- Validate with real-world content (operational reports)
- Test custom nested syntax at all levels
- Verify save/restore functionality with nested items

## Known Limitations

### By Design
- No persistent storage (session-based usage)
- No real-time collaboration features
- No advanced markdown features (tables, code highlighting)
- Limited to three levels of nesting (-, --, ---)
- Custom syntax instead of standard markdown nesting

### Technical Constraints
- Limited to marked.js markdown parsing capabilities
- CSS-only animations (no complex JavaScript animations)
- Single-file deployment model limits scalability
- Custom list processing may not handle edge cases in mixed syntax

### Current Issues
- Custom nested syntax parsing may occasionally miss edge cases with mixed formatting
- Visual hierarchy could be improved with better spacing
- No syntax validation for malformed nested structures

## Future Considerations

### Potential Enhancements
- Import/export of progress data
- Custom styling themes
- Advanced filtering/sorting of tasks
- Integration with external task management systems
- Extended nesting levels if needed
- Better syntax validation and error handling

### Architectural Decisions
Any major changes should consider:
- Maintaining single-file deployment
- Preserving simplicity of use
- Keeping browser compatibility
- Avoiding external dependencies
- Compatibility with existing custom syntax

## Maintenance Guidelines

### Regular Updates
- Keep marked.js CDN link current
- Test with new browser versions
- Validate HTML/CSS standards compliance
- Review accessibility features
- Test custom syntax with various inputs

### Bug Fixes
- Prioritize issues that break core functionality
- Test fixes across different markdown formats including custom syntax
- Ensure mobile compatibility is maintained
- Verify performance impact of changes
- Test save/restore functionality thoroughly

### Custom Syntax Considerations
- Any changes to list processing should maintain backward compatibility
- Test with mixed standard/custom syntax
- Ensure visual hierarchy remains clear
- Validate state management with nested items

This application represents a practical solution to a real problem, built with constraints that ensure it remains simple, deployable, and maintainable. The custom nested syntax was a pragmatic solution to technical limitations whilst maintaining user-friendly functionality.