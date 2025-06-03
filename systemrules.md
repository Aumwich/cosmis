# SYSTEMRULES.md - Cosmis Technical Specification
**Platform-Agnostic Implementation of SIMSOC Game Mechanics**
*Version 0.4 - June 2025*

## Overview
This document provides the technical specifications for implementing SIMSOC mechanics in Cosmis on digital platforms. It serves as the primary reference for development, focusing on concrete implementation details rather than design philosophy. While initially developed for Discord, these specifications are designed to be adaptable to other platforms like Matrix.

> **Note**: For adaptation philosophy and design process, see `adaptation_process.md`
>
> **Implementation Principle**: For most game mechanics requiring private feedback, use temporary/ephemeral responses (visible only to the command user) rather than direct/private messages. This keeps routine interactions within the main platform interface.
>
> **Private Messaging Usage**: Reserve direct/private messages for significant game events that warrant special attention:
> - Game start notifications with personalized role information and initial instructions
> - Game end notifications with personal results and debrief information
> - Critical updates that players should not miss even when offline
>
> **Platform-Specific Implementation**:
> - **Discord**: Use ephemeral responses for temporary feedback and DMs for private messages
> - **Matrix**: Use thread responses for temporary feedback and direct rooms for private messages

## Technical Reference Architecture

## Core Platform Architecture

### Space Structure
- **Regions as Groupings**: Each region (Red, Blue, Yellow, Green) will be a logical grouping of spaces
- **Region Spaces**:
  - General discussion space for conversation
  - Voice/audio communication space (if platform supports it)
  - Statistics space (read-only) showing regional stats
  
### Platform-Specific Implementation
- **Discord**:
  - Regions implemented as Categories
  - Spaces implemented as Channels (`#region-name-chat`, `🔊region-name-voice`, `📊region-name-stats`)
- **Matrix**:
  - Regions implemented as Space hierarchies
  - Spaces implemented as Rooms within the Space hierarchy

### Permission System
- **Base Permissions**:
  - Player - Base permission level for all active participants
  - Minority Group - For players designated as minority members (if enabled)

- **Basic Groups**:
  - BASIN - Basic Industry employees
  - BASIN-Head - Head of BASIN
  - RETSIN - Retail Sales Industry employees
  - RETSIN-Head - Head of RETSIN
  - POP - Party of the People members
  - POP-Head - Leader of Party of the People
  - SOP - Society Party members
  - SOP-Head - Leader of Society Party
  - EMPIN - Employee Interests group members
  - EMPIN-Head - Head of Employee Interests
  - HUMSERVE - Human Services organization members
  - HUMSERVE-Head - Head of Human Services
  - MASMED - Mass Media agency staff
  - MASMED-Head - Director of Mass Media
  - JUDCO - Judicial Council members
  - JUDCO-Head - Chief Justice of Judicial Council
  - SIMFORCE - Law enforcement and military personnel
  - SIMFORCE-Commander - Commander of Simforce
  
### Platform-Specific Implementation
- **Discord**:
  - Implemented as Discord Roles (e.g., `@BASIN`, `@BASIN-Head`)
  - Role hierarchy determines permission inheritance
- **Matrix**:
  - Implemented as Power Levels in rooms
  - Group membership tracked in database and reflected in room permissions

### Agencies
- **Agency Types**:
  - Travel Agencies: One per region (Travel-1, Travel-2, etc.)
  - Subsistence Agencies: One per region (Subsist-1, Subsist-2, etc.)
  - Each agency has a single owner with full control

### Special Permission Levels
- **Coordinator** - Game administrators with full system access
- **Spectator** - For eliminated players and external observers; has read-only access to game spaces, but can communicate in designated spectator areas

### Platform-Specific Implementation
- **Discord**:
  - Agencies implemented as roles (e.g., `@Travel-1`, `@Subsist-1`)
  - Special permissions as roles (`@Coordinator`, `@Spectator`)
  - Spectator communication in `#spectator-kibitz` channel
- **Matrix**:
  - Agencies implemented as Power Levels and database entries
  - Special permissions as Power Levels in rooms
  - Spectator communication in dedicated spectator room

### System Architecture
- **The Coordinator**: Main system component handling all game mechanics
- **Admin Component**: Handles platform management and moderation
- **Integration**: All components share a common database

### Platform-Specific Implementation
- **Discord**:
  - Implemented as Discord bots using Discord.js
  - Slash commands for user interaction
  - Role-based permission system
- **Matrix**:
  - Implemented as Matrix bots using matrix-js-sdk
  - Command syntax using ! prefix (e.g., !visit)
  - Power Level-based permission system

## Adapting Core Mechanics

### 1. Travel Between Regions
- **Basic Travel**:
  - Players use a "visit" command to travel to another region using a travel ticket
  - Each ticket allows visiting 1-4 regions (each region can only be visited once per ticket)
  - May return home at any time to end the journey
  - Cannot revisit the same region twice on the same ticket
  - Players can view their travel status to see remaining destination options and ticket status

- **Travel Rules**:
  - Visitors can only access destination region spaces (no home region access)
  - Each region can only be visited once per ticket
  - Visit ends when player returns home or is removed
  - Players can only be in one region at a time

- **Visitor Management**:
  - Residents can initiate a vote to remove a visitor
  - Requires unanimous vote to remove (any resident can block removal)
  - 2-minute voting period once initiated
  - Only one vote attempt allowed per visitor per visit
  - Visitors can see the vote in progress and its results
  - If not removed, visitor cannot be voted out again during current visit

- **Implementation Core**:
  - System manages space access permissions dynamically
  - Visit history is tracked per ticket
  - Automatic notifications for visit start/end and voting
  - Activity logs in a dedicated travel log space
  
- **Platform-Specific Implementation**:
  - **Discord**:
    - Commands: `/visit region:[name]`, `/travel_status`, `/vote_remove @visitor`
    - Permissions managed via Discord role assignments
    - Travel logs in `#travel-log` channel
  - **Matrix**:
    - Commands: `!visit [region]`, `!travel_status`, `!vote_remove [username]`
    - Permissions managed via Matrix room invites/kicks
    - Travel logs in dedicated Matrix room

### 2. Subsistence System
- **Automated Tracking**:
  - Players must meet subsistence requirements each turn
  - Failure to meet requirements leads to elimination
- **Subsistence Options**:
  - Purchase subsistence when available
  - Automatic deduction of Simbucks for Luxury Living
  - Players can check their current subsistence status
  
- **Platform-Specific Implementation**:
  - **Discord**:
    - Commands: `/buy item:subsistence`, `/status`
    - Status updates via ephemeral messages
  - **Matrix**:
    - Commands: `!buy subsistence`, `!status`
    - Status updates via thread responses

### 3. National Indicators

#### Technical Specification

1. **Commands**:
   - MASMED head can view current indicator values
   - MASMED head can view historical indicator trends
   
   **Platform-Specific Implementation**:
   - **Discord**: 
     - `/indicators` - View current values
     - `/indicatorhistory` - View historical trends
   - **Matrix**:
     - `!indicators` - View current values
     - `!indicatorhistory` - View historical trends

2. **Indicator Types**:
   - **Food and Energy Supply (FES)**: Resources available to society
   - **Standard of Living (SL)**: Overall quality of life
   - **Social Cohesion (SC)**: Unity and cooperation within society
   - **Public Commitment (PC)**: Dedication to collective goals

3. **Calculation Formulas**:
   - All indicators start at 100 for first session
   - Natural decline of 10% each session (entropy)
   - **Public Programs Investment Effects**:
     - **Research and Conservation Program**:
       - FES: +0.4 units per Simbuck invested (40% of investment value)
       - SL: +0.1 units per Simbuck invested (10% of investment value)
     - **Welfare Services Program**:
       - SL: +0.1 units per Simbuck invested (10% of investment value)
       - SC: +0.2 units per Simbuck invested (20% of investment value)
       - PC: +0.2 units per Simbuck invested (20% of investment value)
   - **FES Calculation**:
     - -2 units per BASIN passage purchased
     - -1 unit per arrested player
     - +0.4 units per Simbuck invested in Research and Conservation
     - +3 units per completed group project
   - **SL Calculation**:
     - +1 unit per completed BASIN passage
     - +1 unit per RETSIN anagram word found
     - +2 units per Luxury Living purchase
     - +0.1 units per Simbuck invested in Research and Conservation
     - +0.1 units per Simbuck invested in Welfare Services
   - **SC Calculation**:
     - +2 units per subsistence assistance (tracked via transactions)
     - -3 units per player arrest
     - +/- based on support card distribution (balanced = positive)
     - +0.2 units per Simbuck invested in Welfare Services
     - -5 units per guard post established
   - **PC Calculation**:
     - -1 unit per completed RETSIN anagram
     - -3 units per player arrest
     - +0.2 units per Simbuck invested in Welfare Services
     - -2 units per riot participant
     - +1 unit per 4 positive goal declarations
     - -1 unit per negative goal declaration
     - +5 units per public program participation
     - +2 units per group project participation

4. **Impact on Economy**:
   - If indicators decline below certain thresholds, group income decreases
   - If indicators rise above certain thresholds, group income increases
   - Thresholds: <80 = -20% income, <60 = -40% income, <40 = -60% income
   - Thresholds: >120 = +20% income, >140 = +40% income, >160 = +60% income

5. **Visualization Implementation**:
   - MASMED head receives indicator values as a formatted message
   - Includes visual indicators for trends (up/down)
   - Visual highlighting for critical thresholds
   
   **Platform-Specific Implementation**:
   - **Discord**: Emoji indicators (📈/📉) and color-coded text
   - **Matrix**: Formatted text with symbols and markdown formatting

6. **Access Control**:
   - Only MASMED head has direct access to the actual indicator values
   - MASMED head is responsible for communicating indicators to the public
   - Other players must rely on MASMED's reports or make their own assessments

7. **Impact of Player Count**:
   - Each absentee (dropout) negatively affects national indicators (-2 to all)
   - Each new player (dropin) provides a corresponding boost to indicators (+2 to all)
   
   **Platform-Specific Implementation**:
   - **Discord**: `/dropout` and `/dropin` commands
   - **Matrix**: `!dropout` and `!dropin` commands

8. **Player Interaction**:
   - MASMED head uses commands to view current values
   - MASMED manually shares information with other players
   - Historical data provided to MASMED for context
   
   **Platform-Specific Implementation**:
   - **Discord**: MASMED uses `/indicators` command and shares via messages
   - **Matrix**: MASMED uses `!indicators` command and shares via room messages

### 4. Economic System
- **Currency**: Virtual Simbucks tracked in database
- **Transactions**:
  - Players can transfer Simbucks to other players
  - Players can check their current Simbuck balance
  - Players can view their recent transaction history
  - All transactions are logged for administrative purposes
  - Transaction receipts are sent privately to both parties
  - **Note**: Transactions are binding and can be used for trades or agreements
  
- **Platform-Specific Implementation**:
  - **Discord**:
    - Commands: `/give user:@username amount:[number] reason:[text]`, `/balance`, `/transactions`
    - Transaction logs in `#transaction-log` channel (admin only)
    - Receipts sent via ephemeral messages or DMs
  - **Matrix**:
    - Commands: `!give [username] [amount] [reason]`, `!balance`, `!transactions`
    - Transaction logs in dedicated admin room
    - Receipts sent via private messages

### Luxury Living Implementation

#### Technical Specification

1. **Commands**:
   - Players can purchase Luxury Living status
   - Players can check their Luxury Living status
   - Players can cancel Luxury Living status (with confirmation prompt)

2. **Mechanics**:
   - Costs 10 Simbucks per session
   - Automatically provides subsistence (no need to purchase separately)
   - Grants access to exclusive luxury spaces in each inhabited region
   - Provides visual indicator for luxury status
   - Automatic renewal unless cancelled
   - Confirmation prompt when cancelling: "Are you sure? This will remove your luxury living status and it will have to be repurchased to be reacquired."

3. **Platform-Specific Implementation**:
   - **Discord**:
     - Commands: `/buy luxury`, `/luxurystatus`, `/cancel luxury`
     - `@Luxury-Living` role with special color
     - Access to region-specific `#luxury-lounge` channels
     - Custom emoji access and star emoji (🌟) by username
     - Priority in voice channels (speaker priority)
     - Luxury lounges only in inhabited regions (not in Gray region)
   - **Matrix**:
     - Commands: `!buy luxury`, `!luxurystatus`, `!cancel luxury`
     - Special flair in user display name
     - Access to exclusive luxury rooms in each region
     - Special formatting privileges in rooms
     - Higher visibility in room member lists

### Private Transportation Implementation

#### Technical Specification

1. **Commands**:
   - Players can purchase Private Transportation
   - Players can check their Private Transportation status

2. **Mechanics**:
   - One-time purchase of 25 Simbucks
   - Allows unlimited travel between regions without travel tickets
   - No regional visit limitations (can visit same region multiple times)
   - Cannot be transferred to other players
   - Lost if player is arrested

3. **Platform-Specific Implementation**:
   - **Discord**:
     - Commands: `/buy transport`, `/transportstatus`
     - `@Private-Transport` role
     - Bypass of normal travel restrictions in channel permissions
     - Visual indicator in username (🚗)
     - Travel log entries marked with special icon
   - **Matrix**:
     - Commands: `!buy transport`, `!transportstatus`
     - Special power level in travel-related rooms
     - Bypass of normal travel restrictions in room access
     - Special flair in user display name
     - Travel log entries with distinctive formatting

> **Future Expansion Idea:** In a multi-nation implementation, private transport passes would only apply to the nation in which they were purchased. Additional passes would be required for other nations.

- **Perks System**:
  - **Cosmetic Flairs**: Special visual indicators, badges, or titles
  - **Communication Bonuses**:
    - Enhanced communication capabilities
    - Special formatting privileges
    - Priority message visibility
  - **Regional Benefits**:
    - Special privileges in regional spaces
    - Organization privileges
    - Temporary moderation abilities in home region
  - **Purchase**:
    - Players can purchase specific perks
    - Players can view available perks and current status
    
  **Platform-Specific Implementation**:
  - **Discord**:
    - Commands: `/buyperk type:[perk]`, `/perks`
    - Cosmetic flairs: Special role colors, badges, or titles
    - Communication bonuses: Temporary voice channels, custom emoji usage, priority highlighting
    - Regional benefits: Pin messages in channels, channel organization privileges
  - **Matrix**:
    - Commands: `!buyperk [perk]`, `!perks`
    - Cosmetic flairs: Special display name formatting, badges in profile
    - Communication bonuses: Special message formatting, custom reactions
    - Regional benefits: Pin messages in rooms, room organization privileges

### 5. Player Lifecycle
- **Joining a Game**:
  - New players can join if the game allows it
  - Only designated group heads start with resources; regular players begin with none
  - Game indicators receive a boost with each new player

- **Leaving a Game**:
  - Players can leave the game at any time
  - Becomes an absentee, affecting national indicators
  - May rejoin later if the game allows it
  
- **Platform-Specific Implementation**:
  - **Discord**:
    - Commands: `/dropin` to join, `/dropout` to leave
    - Role assignments managed automatically
    - Welcome messages sent via ephemeral responses
  - **Matrix**:
    - Commands: `!dropin` to join, `!dropout` to leave
    - Power level assignments managed automatically
    - Welcome messages sent via private messages

### 6. Dispute Resolution
- **JUDCO's Role**:
  - Handles reports of cheating or rule violations
  - Does not typically intervene in scams or broken agreements between players
  - May investigate patterns of deceptive behavior
- **Player Responsibility**:
  - Players are responsible for their own agreements
  - Use transaction commands carefully as transactions cannot be reversed
  - Consider using escrow for high-value trades
  
- **Platform-Specific Implementation**:
  - **Discord**:
    - Reports via `/report` command or direct message to JUDCO members
    - Escrow facilitated through `/escrow` commands
    - Transaction records viewable with `/transactions` command
  - **Matrix**:
    - Reports via `!report` command or private message to JUDCO members
    - Escrow facilitated through `!escrow` commands
    - Transaction records viewable with `!transactions` command

### 6. Form Replacements
All paper forms from original SIMSOC are replaced with digital commands:

- **Job Applications**: Players can apply for positions with a message
- **Law Proposals**: Players can propose laws with title and description
- **Voting**: Players can vote on proposals (for/against/abstain)
- **Arrest Requests**: Players can request arrests with reason
- **Agency Actions**: Agency heads can perform various agency actions

**Platform-Specific Implementation**:
- **Discord**:
  - Commands use slash command format:
  - `/apply position:[role] message:[text]`
  - `/propose_law title:[text] description:[text]`
  - `/vote proposal:[id] choice:[for/against/abstain]`
  - `/request_arrest user:@username reason:[text]`
  - `/agency action:[type] target:[user/agency] details:[text]`
- **Matrix**:
  - Commands use prefix format:
  - `!apply [role] [message]`
  - `!propose_law [title] [description]`
  - `!vote [id] [for/against/abstain]`
  - `!request_arrest [username] [reason]`
  - `!agency [type] [target] [details]`

### 7. Verification System
To replace physical verification:
- **Puzzle Challenges**: Players can request a random verification task
- **CAPTCHA-style Tasks**: For critical actions
- **Time-based Cooldowns**: To prevent automation
- **Activity Monitoring**: For suspicious patterns

**Platform-Specific Implementation**:
- **Discord**:
  - `/verify_puzzle` command generates verification tasks
  - Ephemeral messages for verification challenges
  - Cooldowns managed through Discord's rate limiting
- **Matrix**:
  - `!verify_puzzle` command generates verification tasks
  - Thread-based verification challenges
  - Cooldowns managed through application-level rate limiting

## Communication System

### Political Party Support System Implementation

#### Technical Specification

1. **Commands**:
   - Players can submit or change their support for a political party
   - Players can check their current support status
   - Party heads can view current support count

2. **Support Mechanics**:
   - Players can support either POP or SOP during a session
   - Players can change their support during a session (last submission counts)
   - Support from arrested or absentee players is automatically invalidated
   - Support status resets at the beginning of each new session

3. **Income Calculation**:
   - Formula: (Support Count / 40% of active players) × 1.25 × Initial Income
   - Automatically calculated at session end
   - Affected by National Indicators
   - Results displayed to party heads

4. **Platform-Specific Implementation**:
   - **Discord**:
     - Commands: `/support [POP|SOP]`, `/supportstatus`, `/supportcount`
     - Private ephemeral response when support is registered or changed
     - Support counts visible only to party heads through ephemeral responses
     - Support history viewable during debrief
     - Visual indicators for successful submission (reaction on command)
   - **Matrix**:
     - Commands: `!support [POP|SOP]`, `!supportstatus`, `!supportcount`
     - Private message response when support is registered or changed
     - Support counts visible only to party heads through private messages
     - Support history viewable during debrief
     - Visual indicators for successful submission (message reactions)

### MASMED (Mass Media) Implementation
- **Regional Announcements**:
  - MASMED leaders can broadcast messages to all regions simultaneously
  - Each region receives the same announcement but can be customized per region
  - Announcements are delivered through dedicated communication channels

- **Audio/Video Communication**:
  - MASMED can create temporary audio/video spaces for public announcements
  - Moderated spaces for town hall meetings or press conferences
  - Region-specific audio/video communications for local news broadcasts

- **Content Control**:
  - MASMED can highlight important announcements in each region
  - Scheduled news cycles can be automated
  - Emergency broadcast capability for critical updates

- **Platform-Specific Implementation**:
  - **Discord**:
    - Uses Discord's announcement channels for regional announcements
    - Voice channels and stage channels for audio communication
    - Message pinning for important content
    - Commands: `/announce`, `/broadcast`, `/news`
  - **Matrix**:
    - Uses dedicated announcement rooms with higher visibility
    - Voice/video rooms for audio/video communication
    - Message highlighting and room notifications
    - Commands: `!announce`, `!broadcast`, `!news`

### EMPIN (Employee Interests) Implementation

#### Technical Specification

1. **Commands**:
   - EMPIN head can view current income

2. **Income Calculation**:
   - Formula: $15 × SL (Size Level) initially
   - Subsequent income based on support received
   - Affected by National Indicators

3. **Core Implementation**:
   - EMPIN members have access to private EMPIN spaces
   - Negotiation with employers (BASIN/RETSIN) happens through natural player interaction
   - No mechanical support system - all player advocacy happens through social interaction

4. **Platform-Specific Implementation**:
   - **Discord**:
     - Command: `/income` for EMPIN head
     - Private EMPIN channels with restricted access
     - Negotiation happens through Discord messages and voice channels
   - **Matrix**:
     - Command: `!income` for EMPIN head
     - Private EMPIN rooms with restricted access
     - Negotiation happens through Matrix messages and voice/video rooms

> **Note:** EMPIN's purpose is to represent employee interests through negotiation and social interaction. There are no mechanical "support" commands - players use natural platform communication to fulfill their role.

### HUMSERVE (Human Services) Implementation

#### Technical Specification

1. **Commands**:
   - HUMSERVE head can view current income

2. **Income Calculation**:
   - Formula: $15 × SL (Size Level) initially
   - Subsequent income based on support received
   - Affected by National Indicators

3. **Core Implementation**:
   - Assistance to players happens entirely through natural social interaction
   - Players use standard transaction commands to provide subsistence or tickets to those in need
   - No special commands for assistance - all help is negotiated between players

4. **Platform-Specific Implementation**:
   - **Discord**:
     - Command: `/income` for HUMSERVE head
     - Players use `/give` command to provide assistance
     - Needs communicated through Discord messages and channels
   - **Matrix**:
     - Command: `!income` for HUMSERVE head
     - Players use `!give` command to provide assistance
     - Needs communicated through Matrix messages and rooms

> **Note:** HUMSERVE's purpose is to provide assistance to players in need through natural social interaction. There are no mechanical "assistance request" commands - players communicate their needs through normal communication channels, and HUMSERVE members respond accordingly.

### JUDCO (Judicial Committee)
> **Note:** The complete JUDCO implementation will be refined after review of the SIMSOC Coordinator's Manual. Current specifications are based on the Participant's Manual only.

- **Rule Enforcement**:
  - Monitors for violations of communication rules
  - Handles reports of cheating or honor system violations
  - Can impose in-game penalties or restrictions

- **Cheating Prevention**:
  - Reviews reports of suspicious activity
  - Investigates reports of out-of-game communication
  - Manages the appeals process for reported violations
  
- **Platform-Specific Implementation**:
  - **Discord**:
    - Reports handled through `/report` command or direct messages
    - Violations tracked in admin-only channels
    - Penalties implemented through role restrictions
  - **Matrix**:
    - Reports handled through `!report` command or private messages
    - Violations tracked in admin-only rooms
    - Penalties implemented through power level adjustments

### Communication Rules
1. **Allowed**:
   - All game-related communication should happen within the game platform
   - Region-specific spaces for local discussions
   - Private messages for non-game topics with people you have existing relationships with

2. **Prohibited**:
   - No discussing game-related topics in private messages with any other players, even those in your region
   - No external communication tools for game-related discussions
   - No sharing of solutions to puzzles or anagrams outside intended channels
   - Even if you have pre-existing relationships with other players, game topics must be discussed only in designated game spaces

3. **Puzzle System**:
   - BASIN and RETSIN puzzles must be solved manually
   - Time-based cooldowns on puzzle attempts
   - Randomized anagrams and puzzles generated per session
   
4. **Platform-Specific Implementation**:
   - **Discord**:
     - Communication restricted to Discord server channels
     - Region-specific channels for local discussions
     - Direct messages (DMs) limited to same-region players
     - Ephemeral messages preferred over DMs for routine feedback
   - **Matrix**:
     - Communication restricted to Matrix spaces/rooms
     - Region-specific rooms for local discussions
     - Private messages limited to same-region players
     - Thread responses preferred over private messages for routine feedback

## Platform-Specific Features

### 1. Work System

#### BASIN Work

**Discord Implementation**:
```
/work basin submit:"[text]"
```

**Matrix Implementation**:
```
!work basin [text]
```
- **Response**: Shows the text and requests vowel counts
- **Format**: `a:[#] e:[#] i:[#] o:[#] u:[#]`
- **Verification**:
  - Compares counts with actual values
  - Returns accuracy percentage
  - 10% reduction per error, 6+ errors = no payment

#### RETSIN Work

**Discord Implementation**:
```
/work retsin letters:"[scrambled letters]"
```

**Matrix Implementation**:
```
!work retsin [scrambled letters]
```

- **Response**: Shows scrambled letters and input fields
- **Task**: Find up to 5 valid 5-letter words
- **Scoring**:
  - 5/5 words = +50%
  - 4/5 words = +20%
  - 3/5 words = -10%
  - 2/5 words = -40%
  - 1/5 words = -70%

#### Ticket Management

**Discord Implementation**:
```
/give tickets:[#] @user type:[travel|subsistence]
```

**Matrix Implementation**:
```
!give tickets [#] [username] [travel|subsistence]
```

- **Requirements**: Must own the tickets being transferred
- **Limits**: Cannot exceed agency's available tickets
- **Confirmation**: Both parties receive confirmation of the transaction
- **Note**: For employee payments, use the standard currency transfer command

### 2. Player Commands

**Core Functions**:
- View current status and location
- Check currency balance
- Travel to another region
- Perform work at specified agency
- Purchase items or services
- Report rule violations to JUDCO (anonymous)
- Send announcements (MASMED only)
- Leave the game (becomes an absentee)
- Join a game in progress (if allowed)
- Transfer group leadership

**Discord Implementation**:
```
/status - View your current status and location
/balance - Check your Simbucks
/move [region] - Travel to another region
/work [agency] - Perform work at specified agency
/buy [item] - Purchase items or services
/report [message] - Report rule violations to JUDCO (anonymous)
/announce [message] - MASMED only: Send announcement to regions
/dropout - Leave the game (becomes an absentee)
/dropin - Join a game in progress (if allowed)
/group promote @user - Transfer group leadership
```

**Matrix Implementation**:
```
!status - View your current status and location
!balance - Check your Simbucks
!move [region] - Travel to another region
!work [agency] - Perform work at specified agency
!buy [item] - Purchase items or services
!report [message] - Report rule violations to JUDCO (anonymous)
!announce [message] - MASMED only: Send announcement to regions
!dropout - Leave the game (becomes an absentee)
!dropin - Join a game in progress (if allowed)
!group promote [username] - Transfer group leadership
```

### 3. Admin Commands

**Core Functions**:
- Begin a new game session
- Advance to next turn
- Modify national indicators
- Place users under arrest
- Manage game state

**Discord Implementation**:
```
/admin start_session - Begin a new game session
/admin end_turn - Advance to next turn
/admin adjust_indicators [indicator] [amount] - Modify national indicators
/admin arrest @user - Place user under arrest
```

**Matrix Implementation**:
```
!admin start_session - Begin a new game session
!admin end_turn - Advance to next turn
!admin adjust_indicators [indicator] [amount] - Modify national indicators
!admin arrest [username] - Place user under arrest
```

### 4. Automated Systems
- **Turn Processing**:
  - Automatic subsistence checks
  - Income distribution
  - Indicator adjustments
  - Event triggers
  
- **Platform-Specific Implementation**:
  - **Discord**:
    - Background processing using Discord.js scheduled tasks
    - Notifications via channel messages and ephemeral responses
    - Status updates in dedicated status channels
  - **Matrix**:
    - Background processing using matrix-js-sdk scheduled tasks
    - Notifications via room messages and private messages
    - Status updates in dedicated status rooms

## Data Management

The system maintains the following game state:

### Player Data
- Current region and status (active/arrested/deceased)
- Simbucks balance and transaction history
- Personal goals and achievements
- Group memberships and roles
- Inventory of tickets and items

### Game State
- Current turn and session information
- National indicators (FES, SL, SC, PC)
- Group resources and ownership
- Work completions and economic activities
- Travel and subsistence status

### Platform-Specific Implementation
- **Discord**:
  - Data stored in SQLite database
  - User identification via Discord IDs
  - Roles used for permissions and status tracking
  - Channel-based region implementation
- **Matrix**:
  - Data stored in SQLite database
  - User identification via Matrix IDs
  - Power levels used for permissions and status tracking
  - Room-based region implementation

All game mechanics are enforced automatically by the system, while players are responsible for managing their agreements and social structures.

## Implementation Roadmap

### Phase 1: Core Systems
1. Player registration and profiles
2. Regional movement
3. Basic economy (Simbucks, transactions)
4. Subsistence tracking

### Individual Goals System

#### Technical Specification

1. **Core Commands**:
   - Set your individual goal for the game
   - Submit a goal declaration each session
   - Check your current goal
   - View all player goals (Spectator only)

2. **Goal Declaration Mechanics**:
   - Players can submit one goal declaration per session
   - Three possible declarations:
     - "Yes, I'm satisfied with how I'm meeting my goals"
     - "No, I'm not satisfied with how I'm meeting my goals"
     - "I've changed my individual goals as follows: [description]"
   - Declarations directly affect Public Commitment National Indicator:
     - Every 4 positive declarations: Public Commitment +1 unit
     - Each negative declaration: Public Commitment -1 unit
     - Goal changes or abstentions: No effect on Public Commitment
   - Invalid declarations (multiple submissions, from arrested/absent players) have no effect
   
3. **Platform-Specific Implementation**:
   - **Discord**:
     - Commands: `/goal set [description]`, `/goaldeclaration [yes|no|change]`, `/goalstatus`, `/listgoals`
     - Feedback provided through ephemeral messages
     - Goals stored in user profile data
   - **Matrix**:
     - Commands: `!goal set [description]`, `!goaldeclaration [yes|no|change]`, `!goalstatus`, `!listgoals`
     - Feedback provided through private messages
     - Goals stored in user profile data

4. **Goal Management**:
   - Players select from predefined goals or create custom ones
   - Suggested goals include: Power, Center of Attention, Style of Life, Security, Popularity, Fun and Adventure
   - Players can change goals during the game by using the "change" option
   - Goals are self-evaluated; no mechanical completion tracking

5. **Platform-Specific Implementation**:
   - **Discord**:
     - Goals are stored privately in the system
     - Goal declarations are submitted via `/goal set [text]` command
     - Players share goals through normal communication channels as desired
     - Spectators can view all goals with `/listgoals` command (for game oversight)
     - Declaration statistics shown to MASMED for National Indicator reporting
   - **Matrix**:
     - Goals are stored privately in the system
     - Goal declarations are submitted via `!goal set [text]` command
     - Players share goals through normal communication channels as desired
     - Spectators can view all goals with `!listgoals` command (for game oversight)
     - Declaration statistics shown to MASMED for National Indicator reporting

### Riot and Guard Post Mechanics

#### Technical Specification

1. **Core Commands**:
   - Participate in a riot (one per player per session)
   - Establish a guard post in a region (costs $20)
   - Renew a guard post for another session (costs $5)

2. **Riot Mechanics**:
   - Riots affect the entire nation, not just specific regions
   - Each player may participate in only one riot per session
   - A riot occurs when enough players join (minimum 3)
   - Riots impact National Indicators:
     - Public Commitment: -2 units per rioter
     - Social Cohesion: Decreases based on percentage of population rioting
       (5%: no effect, 10%: -2, 15%: -6, 20%: -12, 25%: -20, 30%+: -30)
   - Arrested players cannot participate in riots
   - Riot participation is valid only for the session in which it occurs

3. **Guard Post Mechanics**:
   - Guard posts are region-specific (prevent riots in that region only)
   - Cost: $20 to establish, $5 to renew each session
   - Last for one session unless renewed
   - Each guard post reduces Social Cohesion by 5 units
   - Make it impossible for riots to occur in the protected region
   - Players in regions with guard posts cannot participate in riots

4. **Platform-Specific Implementation**:
   - **Discord**:
     - Commands: `/riot`, `/guardpost create [region]`, `/guardpost renew [region]`
     - Guard posts are visually indicated in region channels with a shield emoji
     - Riot events and guard post establishments are announced in #event-log
     - During riots, work-related commands are temporarily disabled
     - Guard posts are visible to all players in the region
   - **Matrix**:
     - Commands: `!riot`, `!guardpost create [region]`, `!guardpost renew [region]`
     - Guard posts are visually indicated in region rooms with a shield emoji
     - Riot events and guard post establishments are announced in event-log room
     - During riots, work-related commands are temporarily disabled
     - Guard posts are visible to all players in the region

### Phase 2: Game Mechanics
1. National indicators
2. Employment and agencies
3. Simforce and law enforcement
4. Public programs

## Simforce Implementation

### Technical Specification

1. **Creation and Management**:
   - Create a new Simforce (costs 25 Simbucks)
   - Increase Simforce size (1:1 ratio)
   - Renew Simforce for next session (10 Simbucks)
   - View current size and protection status

2. **Core Functions**:
   - Arrest a player (costs 10 Simbucks)
   - Extend protection to a player
   - Attack another Simforce
   - Release an arrested player

3. **Core Data**:
   - Simforce name and size
   - Owner and authorized users
   - Protected players list
   - Arrested players list
   - Creation and renewal dates
   - *Note: See database_schema.md for detailed data structure*

4. **Platform-Specific Implementation**:
   - **Discord**:
     - Commands: `/simforce create name:[text] authorization:[text]`, `/simforce invest amount:[number]`, `/simforce renew`, `/simforce status`
     - Arrest command: `/simforce arrest @user`
     - Protection command: `/simforce protect @user`
     - `@Simforce-Commander` role for Simforce heads
     - `@Protected` role for users under Simforce protection
     - `@Arrested` role with restricted channel permissions
     - Automated channel access restrictions for arrested users
     - Visual indicators in username for arrest/protection status
   - **Matrix**:
     - Commands: `!simforce create [name] [authorization]`, `!simforce invest [amount]`, `!simforce renew`, `!simforce status`
     - Arrest command: `!simforce arrest [username]`
     - Protection command: `!simforce protect [username]`
     - Power level adjustments for Simforce commanders
     - Power level restrictions for protected users
     - Room access restrictions for arrested users
     - Visual indicators in display name for arrest/protection status

### Phase 3: Advanced Features
1. Automated turn processing
2. Event system
3. Advanced reporting and dashboards
4. Platform-specific integrations:
   - **Discord**: Integration with Discord features (threads, reactions, etc.)
   - **Matrix**: Integration with Matrix features (threads, reactions, widgets, etc.)

## Implementation Considerations

### Work System Implementation

#### BASIN (Basic Industry) Workflow
1. **Core Activity**:
   - Count vowels (a, e, i, o, u) in provided text passages
   - Each passage is a separate work unit
   - Players submit counts in format: `a:[#] e:[#] i:[#] o:[#] u:[#]`

2. **Economic Model**:
   - 25% profit margin when done correctly
   - Up to 5 passages can be completed per session
   - 10% reduction in payment per counting error
   - 6+ errors = no payment for that passage

3. **National Impact**:
   - **Standard of Living**: +1 unit per completed passage
   - **Food and Energy Supply**: -2 units per passage purchased
   - Banked assets unaffected by national indicators
   
4. **Platform-Specific Implementation**:
   - **Discord**:
     - Work submissions via `/work basin submit:[text]` command
     - Ephemeral responses for work feedback
     - Results and payment notifications in private messages for significant amounts
   - **Matrix**:
     - Work submissions via `!work basin [text]` command
     - Private message responses for work feedback
     - Results and payment notifications in private messages for significant amounts

#### RETSIN Workflow
1. **Anagram Generation**:
   - Each anagram consists of 5 distinct letters
   - Exactly 5 valid English words are pre-selected as targets
   - All target words are exactly 5 letters long
   - Letters may be used multiple times within a word
   - No proper nouns or offensive terms

2. **Gameplay**:
   - Players submit as many valid 5-letter words as they can find
   - Each submission is checked against the 5 target words
   - Players should aim to submit many valid words to increase chances of matching targets
   - Only the 5 target words count toward scoring
   
3. **Platform-Specific Implementation**:
   - **Discord**:
     - Work submissions via `/work retsin letters:[scrambled letters]` command
     - Interactive components for word submission
     - Ephemeral responses for immediate feedback
     - Results and payment notifications in private messages for significant amounts
   - **Matrix**:
     - Work submissions via `!work retsin [scrambled letters]` command
     - Form-based input for word submission
     - Private message responses for feedback
     - Results and payment notifications in private messages for significant amounts

4. **Scoring Mechanics**:
   - Players earn points based on how many target words they find:
     - 5/5 words = +50% payment
     - 4/5 words = +20% payment
     - 3/5 words = -10% payment
     - 2/5 words = -40% payment
     - 1/5 words = -70% payment
     - 0/5 words = no payment
   - Base payment: 5 Simbucks per anagram

5. **Verification**:
   - Bot maintains a dictionary of valid words
   - Case-insensitive comparison
   - Tracks work completions and resource distribution
   - No automated prevention of rapid submissions
   
6. **Platform-Specific Implementation**:
   - **Discord**:
     - Word verification via slash commands
     - Ephemeral responses for immediate feedback
     - Cooldown management via Discord rate limiting
   - **Matrix**:
     - Word verification via prefix commands
     - Private message responses for feedback
     - Cooldown management via Matrix rate limiting

#### Resource Management
- **Bot-Tracked Resources**:
  - Simbucks (currency used on both Discord and Matrix)
  - Travel tickets
  - Subsistence tickets
  - Group memberships
  - Work completions

- **Player-Tracked Items**:
  - Employment agreements
  - Market transactions
  - Laws and regulations
  - Government structures
  - Social contracts
  - Simforce deployments
  
- **Platform-Specific Implementation**:
  - **Discord**:
    - Resources tracked in database and displayed via slash commands
    - `/balance`, `/inventory`, and `/status` commands for resource checking
    - Ephemeral responses for personal resource information
  - **Matrix**:
    - Resources tracked in database and displayed via prefix commands
    - `!balance`, `!inventory`, and `!status` commands for resource checking
    - Private message responses for personal resource information

#### Group Management
- **Ownership**:
  - One head per group
  - Automatic reassignment if head leaves
  - Transfer requires confirmation

- **Banking & Payments**:
  - Group heads pay employees from their personal funds
  - Industries (BASIN/RETSIN) may bank Simbucks to earn interest
  - Interest rates and banking rules determined by player agreements
  - Bot tracks all Simbuck transactions automatically
  
- **Platform-Specific Implementation**:
  - **Discord**:
    - Payments made via `/give` command with target user mention
    - Group leadership transferred via `/group promote @user` command
    - Ephemeral responses for transaction confirmations
    - Group management via slash commands and role assignments
  - **Matrix**:
    - Payments made via `!give [username] [amount]` command
    - Group leadership transferred via `!group promote [username]` command
    - Private message responses for transaction confirmations
    - Group management via prefix commands and power level adjustments

- **Enterprise Tasks**:
  - Simple but time-consuming verification tasks
  - Image-based verification (e.g., "Find all instances of X in this image")
  - Short written responses to scenario-based questions
  
- **Platform-Specific Implementation**:
  - **Discord**:
    - Tasks delivered via slash commands and message components
    - Image verification using Discord's embedded image capabilities
    - Responses collected via modal forms
  - **Matrix**:
    - Tasks delivered via prefix commands
    - Image verification using Matrix's media sharing capabilities
    - Responses collected via structured message replies

### Moderation Tools
> **Note:** Moderation approaches will be refined after review of the SIMSOC Coordinator's Manual. Current specifications are preliminary and subject to revision.
- **Monitoring and Moderation**:
  - Basic tracking of message activity in public game spaces
  - Human moderation by Coordinator and JUDCO for rule enforcement
  - Honor system for cross-region communication restrictions
  - Log bot-to-player communications for dispute resolution (not player-to-player DMs)
  
- **Platform-Specific Implementation**:
  - **Discord**:
    - Message monitoring via Discord.js event listeners
    - Logging to admin-only channels
    - Moderation actions applied through role management
  - **Matrix**:
    - Message monitoring via Matrix SDK event listeners
    - Logging to admin-only rooms
    - Moderation actions applied through power level adjustments

- **Reporting System**:
  - Anonymous reporting option
  - JUDCO review queue for reported incidents
  
- **Platform-Specific Implementation**:
  - **Discord**:
    - Simple `/report` command for players
    - Ephemeral responses for report confirmation
    - Reports logged to admin-only channels
  - **Matrix**:
    - Simple `!report` command for players
    - Private message responses for report confirmation
    - Reports logged to admin-only rooms

### Performance Optimization
- **Large Scale Management**:
  - Rate limiting for commands
  - Asynchronous processing for non-critical tasks
  - Caching frequently accessed data
  
- **Platform-Specific Implementation**:
  - **Discord**:
    - Discord.js optimizations for large servers
    - Sharding support for very large player counts
    - Discord API rate limit management
  - **Matrix**:
    - Matrix SDK optimizations for large spaces
    - Federation considerations for distributed deployments
    - Matrix API rate limit management

## Open Questions
1. How to balance puzzle difficulty to ensure they require meaningful effort?
2. Best practices for detecting and preventing automated puzzle solving?
3. Methods to encourage and monitor the honor system in a digital environment?
4. Optimal space structure for different group sizes (10-90 players)?
5. Best practices for cross-platform identity management and verification?
6. Strategies for ensuring consistent experience across Discord and Matrix implementations?
