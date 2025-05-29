# ARCHDOC - Cosmis Project
**Version 1.1 - May 28, 2025**

This is the **archdoc** (architecture document) for the Cosmis project - the primary reference file containing the complete project architecture, status, and development context. This document is designed to quickly bring any AI agent up to speed on the project.

**For AI Agents**: Read `.windsurfrules` first for specific instructions on how to work with this project.

## Version Control
- **Current Version**: 1.0
- **Last Updated**: May 28, 2025
- **AI Agents**: Update version number and changelog when making significant modifications
- **Developer**: Always use the most recent version when starting new AI sessions

### Changelog
- **v1.1** (May 28, 2025): Added reference to .windsurfrules file
- **v1.0** (May 28, 2025): Initial architecture document created

---

## Project Overview
Building a Discord bot system to run a social simulation game based on William A. Gamson's SIMSOC (Simulated Society). The game will support 20-50+ players in roles exploring society, economy, and social justice through structured gameplay.

## Current Status
- **Phase**: Starting from scratch
- **Setup Needed**: Discord application, bot tokens, project folder structure
- **Target**: Multiple specialized bots working together

## Architecture Plan
**Multi-Bot System (under consideration):**
- **Admin Bot**: Discord server management, player signup, out-of-character interactions, server setup automation with full permissions
- **Game Bot**: In-game economy, turn management, core SIMSOC mechanics
- **Communication Bot**: (maybe) - or integrate into Game Bot

**Admin Bot Requirements:**
- Full Discord server permissions for automated setup
- Private admin commands/channels for bot management
- Player role assignment and region management

**Note**: Economy and GameMaster may be redundant since SIMSOC is primarily economic simulation

**Tech Stack:**
- Discord.js (latest version)
- JavaScript (well-commented for learning)
- SQLite database (single file, no server needed)
- Slash commands for user interaction
- GitHub for version control

## Game Mechanics
- **Turn-based**: 20-30 minute turns with continuous player actions
- **Role-playing**: Players take societal roles, make decisions from character perspective
- **Social simulation**: Economy, politics, social justice scenarios
- **Collaborative**: Heavy player-to-player communication and negotiation
- **Regional structure**: Separate Discord channels/categories for different game regions
- **Honor system**: Players agree not to share information across regions inappropriately
- **Travel**: Near-instant between regions to maintain game pace
- **Spectator mode**: Non-playing observers with separate channels and strict no-cheating rules
- **Kibitz room**: Spectator chat area for discussing observations
- **Debrief component**: Post-game reflection on society, leadership, economics, social justice

## Player Documentation Needs
- **Welcome/Onboarding guide**: Critical first experience for new Discord server members
- **Rules reference**: Pinned messages in channels, especially honor system rules
- **External promotion materials**: For recruiting players interested in social justice and economics
- **Quick command guides**: How to use bot slash commands during gameplay
- **Debrief resources**: Links to social justice essays, reflection materials
- **Spectator guidelines**: Clear rules for observers to prevent cheating

## Folder Structure (Planned)
```
cosmis-game/
├── admin-bot/
├── game-bot/
├── shared/
│   ├── database/
│   └── utils/
├── docs/
│   ├── player-guides/
│   ├── rules/
│   └── promotion/
└── server-setup/
    └── channel-templates/
```

## Development Priorities
1. Set up Discord applications and bot tokens
2. Create basic project structure  
3. Implement shared database schema
4. Build Admin bot (Discord management, player signup)
5. Build Game bot (core SIMSOC mechanics, economy)
6. Integrate or build Communication features

## Future Resources
- SIMSOC reference books to be shared with AI agents for game design context

## Database Considerations
- **Development**: SQLite (single file database) for local testing
- **Production Transition**: Move to cloud database when ready for independent hosting
- **Cloud Options**: PostgreSQL (Railway, Supabase, PlanetScale), MySQL (PlanetScale, Railway)
- **Transition Timeline**: After basic functionality works locally, before inviting large player groups
- **Shared Access**: Database accessible to all bots
- Tables needed: players, game_state, turns, resources, transactions, messages, regions

## AI Agent Instructions
- **Always update this document**: After significant development sessions, update version number and changelog
- **Architecture evolution loop**: 
  1. Review current architecture status
  2. Make development progress
  3. Update this document with changes/learnings
  4. Identify next architectural decisions needed
- **Keep developer informed**: Notify when this archdoc has been updated and what changed
- **Learning Focus**: Add detailed code comments explaining concepts for beginner developer
- **Code Style**: Clear variable names, modular functions, extensive commenting
- **Error Handling**: Always include try/catch for database and Discord operations
- **Testing**: Test with small player groups before scaling
- **Performance**: Consider database indexing for player lookups with 50+ users
- **Security**: Validate all user inputs, especially in economic transactions
- **Documentation**: Generate player-facing docs alongside code development

## Next Session Goals
- [ ] Set up Discord application and get bot tokens
- [ ] Create project folder structure
- [ ] Initialize basic package.json and dependencies
- [ ] Design initial database schema (including regional structure)
- [ ] Create Admin bot skeleton with Discord permissions
- [ ] Draft player onboarding guide template
- [ ] Plan Discord server channel structure for regions
- [ ] **Update this ARCHDOC.md file with progress made**

## Architectural Questions to Revisit
- Exact role definitions for game simulation
- Turn timing and automation requirements
- Inter-bot communication methods
- Hosting strategy for production deployment