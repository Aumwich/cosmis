# ARCHDOC - Cosmis Project
**Version 1.2 - May 29, 2025**

This is the **archdoc** (architecture document) for the Cosmis project - the primary reference file containing the complete project architecture, status, and development context. This document is designed to quickly bring any AI agent up to speed on the project.

**For AI Agents**: Read `.windsurfrules` first for specific instructions on how to work with this project.

## Version Control
- **Current Version**: 1.0
- **Last Updated**: May 28, 2025
- **AI Agents**: Update version number and changelog when making significant modifications
- **Developer**: Always use the most recent version when starting new AI sessions

### Changelog
- **v1.2** (May 29, 2025): Integrated SIMSOC rules and Discord adaptation plan
- **v1.1** (May 28, 2025): Added reference to .windsurfrules file
- **v1.0** (May 28, 2025): Initial architecture document created

---

## Project Overview
Building a Discord bot system to run a social simulation game based on William A. Gamson's SIMSOC (Simulated Society). The game is designed for 10-90 players who take on roles exploring society, economy, and social justice through structured gameplay.

## Current Status
- **Phase**: Initial setup complete, ready for core development
- **Completed**: 
  - Project structure initialized
  - Bot applications created
  - Test server configured
  - SIMSOC rules documented
- **Next Phase**: Core game mechanics implementation

## Architecture Plan
**Multi-Bot System:**
- **Admin Bot**: Server management, player signup, out-of-character interactions, server setup automation
- **The Coordinator**: Core SIMSOC mechanics, economy, turn management, in-game actions (previously called Game Bot)
- **Integration**: Communication features will be part of The Coordinator

**Key Discord Adaptations:**
1. **Regions → Channels**: Physical regions become Discord channels/categories
2. **Travel System**: Channel permissions control movement between regions
3. **Subsistence**: Automated tracking with daily checks
4. **National Indicators**: Dashboard channel with live updates
5. **Simforce**: Role-based permissions for enforcement

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

## Database Schema (Planned)

### Players Table
- player_id (PK)
- discord_id
- username
- home_region
- current_region
- simbucks_balance
- subsistence_status
- goals
- last_active
- status (active/arrested/deceased)

### Game State
- current_turn
- fes_level
- sl_level
- sc_level
- pc_level
- last_updated

### Transactions
- transaction_id (PK)
- from_player (FK)
- to_player (FK)
- amount
- type
- timestamp
- description

### Agencies
- agency_id (PK)
- name
- type
- owner_id (FK)
- region
- balance
- status

### Player Positions
- position_id (PK)
- player_id (FK)
- agency_id (FK)
- position_type
- start_date
- end_date

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

## Documentation Structure

### 1. SIMSOC Rules (simrules.md)
- Original board game rules and mechanics
- Foundation for Discord adaptation
- Technical reference for developers

### 2. Discord Implementation Rules (disrules.md)
- Technical specification for bot development
- Maps SIMSOC concepts to Discord features
- Defines system behaviors and automations

### 3. Player Documentation (playerrules.md)
- How to play the Discord version
- Command references and guides
- Game concepts explained for players

## Future Session Goals

### Completed
- [x] Set up Discord application and get bot tokens
- [x] Create project folder structure
- [x] Initialize basic package.json and dependencies
- [x] Design initial database schema (including regional structure)
- [x] Create Admin bot skeleton with Discord permissions
- [x] Set up Discord server for bot testing
- [x] Review SIMSOC rules documentation
- [x] Draft core SIMSOC rules (simrules_draft.md)
- [x] Draft Discord implementation rules (disrules_draft.md)
- [x] Define five-region system (Red, Blue, Yellow, Green, Gray)
- [x] Design spectator system and permissions

### Immediate Next Steps
- [ ] Create The Coordinator bot skeleton with basic functionality
- [ ] Implement Admin bot setup commands for channel/role creation
- [ ] Create database initialization scripts
- [ ] Implement basic movement system between regions
- [ ] Set up automated channel permissions

### Short-term Goals
- [ ] Implement core game loop and turn system
- [ ] Create economic system with Simbucks and transactions
- [ ] Develop verification system for manual tasks
- [ ] Build basic admin dashboard for game management
- [ ] Implement logging and monitoring

### Documentation
- [ ] Draft player onboarding guide template
- [ ] Create admin command reference
- [ ] Document API endpoints and database schema
- [ ] Prepare testing protocols

### Testing
- [ ] Set up automated testing framework
- [ ] Create test scenarios
- [ ] Conduct initial bot testing
- [ ] Perform load testing with multiple users

## Implementation Priorities
1. **Core Database Models**: Implement the schema outlined above
2. **Basic Movement**: Channel-based region system
3. **Subsistence Tracking**: Automated checks and consequences
4. **Economic System**: Basic transactions and agency management
5. **National Indicators**: Dashboard and update system

## Discord-Specific Adaptations Needed

### Channel Structure
1. **Region Channels**:
   - `#red-region`, `#blue-region`, etc. - Text channels for each region
   - `🔊red-voice`, `🔊blue-voice`, etc. - Voice channels for each region
   - `#gray-region` - Neutral meeting area for travelers
   - Players can create their own threads and forums within regions

2. **Core Channels**:
   - `#announcements` - Game-wide announcements (read-only for players)
   - `#rules` - Game rules and guidelines
   - `#help` - Player support and questions

3. **Spectator Areas**:
   - `#kibitz` - For spectators to discuss the game
   - `#debrief` - Post-game discussion and analysis

### Bot Commands to Implement
- **Movement**:
  - `/visit [region]` - Travel to another region
  - `/travel_status` - Check your travel ticket status
  - `/return_home` - End your journey and return home

- **Player Actions**:
  - `/work [agency]` - Perform job actions
  - `/give @user [amount] [reason]` - Transfer Simbucks
  - `/perks` - View available perks
  - `/status` - Check your current status

- **Social**:
  - `/create_agreement @user [terms]` - Propose an agreement
  - `/accept_agreement [id]` - Accept a proposed agreement
  - `/report [issue]` - Report rule violations (to JUDCO)

### Automation Requirements
1. **Turn Management**:
   - Automatic turn advancement with notifications
   - Subsistence verification
   - Resource distribution to agencies
   - National indicator calculations (visible to MASMED head)

2. **Moderation**:
   - Channel access control
   - Rule enforcement
   - Conflict resolution tools

## Open Questions
1. How to handle real-time vs. turn-based actions?
2. Best way to implement the honor system?
3. Scaling for 50+ players?
4. Automated vs. manual moderation balance?