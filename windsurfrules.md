# Windsurf Rules for Cosmis Project

## Primary Workflow
1. **Always read cosmis_archdoc.md first** - This contains the complete project architecture and context
2. **Update cosmis_archdoc.md after significant changes** - Increment version number and update changelog
3. **Notify user when cosmis_archdoc.md is updated** - Tell them what changed and why
4. **Use checkboxes [ ] for all task tracking** - Visual progress indicators

## Code Standards for Cosmis
- **Language**: JavaScript (not TypeScript - user is learning)
- **Comments**: Extensive commenting to explain Discord.js concepts for beginner
- **Error Handling**: Always use try/catch blocks for Discord API and database operations
- **Variables**: Clear, descriptive names (no abbreviations unless obvious)
- **Functions**: Modular, single-purpose functions with clear names
- **File Structure**: Follow the folder structure defined in cosmis_archdoc.md

## Discord Bot Specific Rules
- **Use Discord.js latest version**
- **Slash commands only** (no prefix commands)
- **Always defer replies** for operations that take time
- **Validate user inputs** especially for game economy features
- **Include permission checks** for admin-only commands

## Database Guidelines
- **Start with SQLite** for development (single file, easy setup)
- **Plan for cloud migration** (design queries to be database-agnostic)
- **Use prepared statements** to prevent SQL injection
- **Index frequently queried columns** (player IDs, game state lookups)

## Architecture Decisions
- **Multi-bot system** - Admin Bot + Game Bot (possibly separate Communication Bot)
- **Shared database** between bots
- **Regional Discord channels** for game areas
- **Honor system** for player behavior (can't technically enforce)

## User Learning Approach
- **Explain concepts as you code** - User is new to Discord bots and modern JS
- **Show why, not just what** - Explain architectural decisions
- **Progressive complexity** - Start simple, add features incrementally
- **Vibecoding friendly** - Don't over-engineer, focus on working solutions

## Documentation Requirements
- **Player-facing docs** alongside code development
- **Onboarding guides** are critical for game success
- **Rules explanations** especially honor system and regional restrictions
- **Command references** for players during gameplay

## Session Management
- **Start each session** by reviewing current ARCHDOC version
- **End each session** by updating ARCHDOC with progress made
- **Use checkboxes** to track immediate next steps
- **Document decisions** in ARCHDOC changelog with rationale
- **Focus on one task at a time** - Complete each task fully before moving to the next
- **Maintain tight communication loops** - Get feedback on each step before proceeding
- **Sequential task progression** - Can accomplish multiple tasks in a session by completing them one by one

## Implementation Guidelines
- **Distinguish SIMSOC vs Cosmis terminology** - It's fine to reference "cards" and "tickets" when discussing the original SIMSOC rules in simrules.md, but avoid these terms when describing the Cosmis implementation
- **Use Discord-native concepts** - Reactions, slash commands, ephemeral messages instead of physical game elements in the Cosmis implementation
- **Prefer ephemeral messages** over DMs for routine private feedback to players
- **Reserve DMs for critical game events** only (game start/end notifications, important updates)

## What NOT to do
- Don't use TypeScript (user preference for learning)
- Don't skip error handling (Discord bots need robustness)  
- Don't over-complicate initial implementation
- Don't forget to update ARCHDOC when making architectural changes
- Don't assume user knows Discord.js concepts
- Don't reference physical game elements like "cards" or "forms" in Cosmis implementation docs (but it's fine when discussing original SIMSOC rules)

## Emergency Context Recovery
If you need to understand the project quickly:
1. Read cosmis_archdoc.md completely
2. Check the changelog for recent changes
3. Review "Current Status" and "Next Session Goals"
4. Ask user for clarification if anything is unclear

## Success Metrics
- Code is well-commented and educational
- ARCHDOC stays current with actual implementation
- User can hand off project to any AI agent seamlessly
- Progress is visible through completed checkboxes
