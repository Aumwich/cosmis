# ARCHDOC - Cosmis Project
**Version 1.4 - May 30, 2025**

This is the **archdoc** (architecture document) for the Cosmis project - the primary reference file containing the complete project architecture, status, and development context. This document is designed to quickly bring any AI agent up to speed on the project.

**Cosmis** is the name of our Discord-based social simulation game, adapted from William A. Gamson's SIMSOC (Simulated Society).

**For AI Agents**: Read `windsurfrules.txt` first for specific instructions on how to work with this project.

## Version Control
- **Current Version**: 1.4
- **Last Updated**: May 30, 2025
- **AI Agents**: Update version number and changelog when making significant modifications
- **Developer**: Always use the most recent version when starting new AI sessions

### Changelog
- **v1.4** (May 30, 2025): Clarified distinction between SIMSOC (original game) and Cosmis (our Discord adaptation)
- **v1.3** (May 30, 2025): Completed comprehensive SIMSOC rules documentation, added educational goals and historical context, updated Discord adaptation plan
- **v1.2** (May 29, 2025): Integrated SIMSOC rules and Discord adaptation plan
- **v1.1** (May 28, 2025): Added reference to .windsurfrules file
- **v1.0** (May 28, 2025): Initial architecture document created

---

## Project Overview
Cosmis is a Discord-based social simulation game adapted from William A. Gamson's SIMSOC (Simulated Society). Our project involves building a Discord bot system to run this adaptation, designed for 10-90 players who take on roles exploring society, economy, and social justice through structured gameplay.

While SIMSOC was designed for in-person, classroom-based interactions, Cosmis leverages Discord's digital platform to create an accessible, modern version of the simulation that maintains the educational core of the original while adding new possibilities for engagement and analysis.

### Educational Goals
The Cosmis project aims to create a free, accessible educational tool that facilitates understanding of:

- **Social Dynamics**: How groups form, interact, and evolve within societal structures
- **Power Relationships**: The acquisition, use, and distribution of power in communities
- **Economic Systems**: Resource allocation, scarcity, and wealth distribution
- **Individual vs. Collective Goals**: Balancing personal advancement with societal welfare
- **Negotiation and Bargaining**: Developing skills for conflict resolution and cooperation
- **Social Justice**: Exploring equity, fairness, and systemic structures
- **Decision-Making**: Understanding the impact of individual and group choices on society

### Historical Context
SIMSOC rules were developed over many decades, refined through the experiences of professors, students, business leaders, and executives. The simulation has been used in educational settings since the 1960s, providing valuable insights into human behavior and societal structures.

While respecting the valuable core mechanics and proven educational design of the original SIMSOC, our adaptation recognizes opportunities to emphasize different aspects of society relevant to contemporary discourse and to leverage the unique affordances of digital platforms like Discord.

## Current Status
- **Phase**: SIMSOC rules documentation complete, ready for Cosmis implementation
- **Completed**: 
  - Project structure initialized
  - Bot applications created
  - Test server configured
  - Comprehensive SIMSOC rules documented (simrules.md)
  - Initial Cosmis adaptation plan outlined (disrules_draft.md)
  - Added sections on Simforce, Riots, Guard Posts, and Government
  - Created Forms Reference and Session Structure documentation
- **Next Phase**: Detailed Cosmis implementation specifications and bot development

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
- Comprehensive documentation of the original SIMSOC simulation mechanics
- Represents the core rules and systems that define William A. Gamson's simulation
- Serves as the authoritative reference for our Cosmis adaptation
- Includes detailed sections on all game elements: basic groups, national indicators, Simforce, riots, etc.
- Maintains the educational integrity of the original simulation

### 2. Cosmis Implementation Rules (disrules_draft.md)
- Technical specification for adapting SIMSOC to Cosmis on Discord
- Maps physical SIMSOC concepts to Discord features (regions → channels, etc.)
- Defines bot behaviors, commands, and automation requirements
- Addresses Discord-specific challenges and opportunities
- Specifies how to handle mechanics that require physical presence in the original game
- Includes comprehensive adaptation philosophy and conversion strategies

### 3. Cosmis Player Guide (playerrules.md)
- How to play Cosmis on Discord
- Command references and guides for interacting with the bots
- Game concepts explained in player-friendly language
- Onboarding instructions for new participants

### Relationship Between Documents
The simrules document captures the mechanical rules of the original SIMSOC game as faithfully as possible, serving as our foundation. The disrules document then transforms these mechanics into Cosmis, our Discord-compatible adaptation, addressing the challenges of adapting a physical game to a digital platform while preserving the core educational experience. The playerrules document will translate both into accessible instructions for Cosmis participants.

## Future Session Goals

### Completed
- [x] Set up Discord application and get bot tokens
- [x] Create project folder structure
- [x] Initialize basic package.json and dependencies
- [x] Design initial database schema (including regional structure)
- [x] Create Admin bot skeleton with Discord permissions
- [x] Set up Discord server for bot testing
- [x] Review SIMSOC rules documentation
- [x] Complete comprehensive SIMSOC rules (simrules.md)
  - [x] Document all basic groups and their mechanics
  - [x] Detail National Indicators and their effects
  - [x] Add comprehensive Simforce mechanics
  - [x] Document Riots and Guard Posts systems
  - [x] Add Government and Special Events sections
  - [x] Create Forms Reference and Session Structure documentation
- [x] Draft Cosmis implementation rules (disrules_draft.md)
  - [x] Add comprehensive adaptation philosophy
  - [x] Detail key conversion strategies (forms to slash commands, etc.)
  - [x] Outline Discord-specific implementation approaches
- [x] Define five-region system (Red, Blue, Yellow, Green, Gray)
- [x] Design spectator system and permissions

### Immediate Next Steps
- [ ] Finalize Cosmis implementation rules (disrules_draft.md)
  - [ ] Complete bot commands for all SIMSOC forms and actions
  - [ ] Detail Discord channel permissions for simulating travel
  - [ ] Specify Simforce implementation with Discord roles
  - [ ] Design UI mockups for National Indicators dashboard
  - [ ] Document riot and guard post mechanics in Discord
- [ ] Create The Coordinator bot skeleton
  - [ ] Set up basic command structure
  - [ ] Implement economy tracking system
  - [ ] Create player registration system
- [ ] Implement Admin bot setup commands
  - [ ] Automated channel/category creation
  - [ ] Role creation and permission setting
  - [ ] Initial server configuration
- [ ] Develop database schema
  - [ ] Player data tables
  - [ ] Transaction history
  - [ ] Group membership tracking
  - [ ] National Indicators history
- [ ] Create initial Cosmis player guide (playerrules.md)
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