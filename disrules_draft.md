# DISRULES.md - Cosmis Implementation Rules
**Technical Specification for SIMSOC to Discord Adaptation**
*Version 0.2 - May 2025*

## Overview
This document outlines how the original SIMSOC rules are adapted into Cosmis, our Discord-based implementation. It serves as a technical guide for bot development and game administration, bridging the physical simulation mechanics with Discord's digital platform capabilities.

## Adaptation Philosophy

Cosmis maintains the core educational and experiential elements of SIMSOC while leveraging Discord's unique features to enhance accessibility, automation, and engagement. Our adaptation follows these guiding principles:

1. **Preserve Core Mechanics**: The fundamental social dynamics, economic systems, and power structures of SIMSOC remain intact.

2. **Automate Administrative Tasks**: Repetitive calculations, resource distribution, and status tracking are handled by bots to reduce coordinator workload.

3. **Enhance Transparency**: Discord provides opportunities for clearer information sharing while still maintaining strategic information asymmetry where appropriate.

4. **Increase Accessibility**: The digital format allows for asynchronous participation and removes geographic barriers.

5. **Maintain Educational Value**: All adaptations prioritize the learning objectives around social dynamics, power relationships, and collective decision-making.

## Key Conversion Strategies

### Forms to Slash Commands

The original SIMSOC relies heavily on paper forms for most game actions. In Cosmis, these are converted to Discord slash commands:

- **Form Submission**: Instead of filling out paper forms, players use `/` commands with appropriate parameters
- **Validation**: Bots automatically validate inputs and permissions before processing
- **Record Keeping**: All form submissions are logged digitally for transparency and reference
- **Notifications**: Relevant parties receive immediate notifications when forms affecting them are processed

### Physical Regions to Discord Channels

SIMSOC's physical regions where players gather are implemented as Discord categories and channels:

- **Regional Categories**: Each region (Red, Blue, Yellow, Green, Gray) has its own category
- **Channel Types**: Each region contains text, voice, and information channels
- **Travel Mechanics**: Channel access permissions simulate physical travel between regions
- **Regional Identity**: Visual differentiation through channel colors and naming conventions

### Paper Resources to Digital Assets

Physical game components are represented digitally:

- **Simbucks**: Digital currency tracked by the bot system
- **Tickets**: Digital assets for travel and subsistence
- **Support Cards**: Digital tokens distributed through commands
- **Passages**: Text-based puzzles delivered through Discord

### In-Person Interactions to Discord Communications

SIMSOC relies on face-to-face interactions, which are adapted to Discord's communication tools:

- **Public Discussions**: Regional text channels for open conversations
- **Private Negotiations**: Direct messages and private channels for confidential talks
- **Group Meetings**: Voice channels for real-time discussions
- **Announcements**: Dedicated channels for important information

### Manual Calculations to Bot Automation

Many SIMSOC processes requiring manual calculation are automated:

- **National Indicators**: Automatically calculated based on player actions
- **Income Distribution**: Automatically processed at the beginning of each session
- **Resource Tracking**: Digital inventory management for all players and groups
- **Session Timing**: Automated notifications for session phases and deadlines

## Core Discord Architecture

### Server Structure
- **Regions as Categories**: Each region (Red, Blue, Yellow, Green) will be a category
- **Region Channels**:
  - `#region-name-chat` - Text channel for general discussion
  - `🔊region-name-voice` - Voice channel for voice communication
  - `📊region-name-stats` - Read-only channel showing regional stats

### Role System
- **Base Roles**:
  - `@Player` - Base role for all active participants
  - `@Minority Group` - For players designated as minority members (if enabled)

- **Basic Groups**:
  - `@BASIN` - Basic Industry employees
  - `@BASIN-Head` - Head of BASIN
  - `@RETSIN` - Retail Sales Industry employees
  - `@RETSIN-Head` - Head of RETSIN
  - `@POP` - Party of the People members
  - `@POP-Head` - Leader of Party of the People
  - `@SOP` - Society Party members
  - `@SOP-Head` - Leader of Society Party
  - `@EMPIN` - Employee Interests group members
  - `@EMPIN-Head` - Head of Employee Interests
  - `@HUMSERVE` - Human Services organization members
  - `@HUMSERVE-Head` - Head of Human Services
  - `@MASMED` - Mass Media agency staff
  - `@MASMED-Head` - Director of Mass Media
  - `@JUDCO` - Judicial Council members
  - `@JUDCO-Head` - Chief Justice of Judicial Council
  - `@SIMFORCE` - Law enforcement and military personnel
  - `@SIMFORCE-Commander` - Commander of Simforce

- **Agencies**:
  - Travel Agencies: `@Travel-1`, `@Travel-2`, etc. (one per region)
  - Subsistence Agencies: `@Subsist-1`, `@Subsist-2`, etc. (one per region)
  - Each agency has a single owner with full control

- **Special Roles**:
  - `@Coordinator` - Game administrators
  - `@Spectator` - For eliminated players and external observers; has read-only access to game channels, but can communicate in designated spectator areas (e.g., #spectator-kibitz channel)

### Bot Architecture
- **The Coordinator**: Main game bot handling all game mechanics
- **Admin Bot**: Handles server management and moderation
- **Integration**: Both bots share a common database

## Adapting Core Mechanics

### 1. Travel Between Regions
- **Basic Travel**:
  - `/visit region:[name]` - Visit another region using a travel ticket
  - Each ticket allows visiting 1-4 regions (each region can only be visited once per ticket)
  - May return home at any time to end the journey
  - Cannot revisit the same region twice on the same ticket
  - `/travel_status` - View remaining destination options and ticket status

- **Travel Rules**:
  - Visitors can only access destination region channels (no home region access)
  - Each region can only be visited once per ticket
  - Visit ends when player returns home or is removed
  - Players can only be in one region at a time

- **Visitor Management**:
  - Residents can initiate `/vote_remove @visitor`
  - Requires unanimous vote to remove (any resident can block removal)
  - 2-minute voting period once initiated
  - Only one vote attempt allowed per visitor per visit
  - Visitors can see the vote in progress and its results
  - If not removed, visitor cannot be voted out again during current visit

- **Implementation**:
  - Bot manages channel permissions dynamically
  - Visit history is tracked per ticket
  - Automatic notifications for visit start/end and voting
  - Activity logs in `#travel-log`

### 2. Subsistence System
- **Automated Tracking**:
  - Players must meet subsistence requirements each turn
  - Failure to meet requirements leads to elimination
- **Subsistence Options**:
  - Purchase via `/buy item:subsistence` (if available)
  - Automatic deduction of Simbucks for Luxury Living
  - Status visible via `/status` command

### 3. National Indicators
- **Access Control**:
  - Only MASMED head has direct access to the actual indicator values with visual indicators (📈/📉)
  - MASMED head is responsible for communicating indicators to the public
  - Other players must rely on MASMED's reports or make their own assessments
- **Impact of Player Count**:
  - Each `/dropout` (absentee) negatively affects national indicators
  - Each `/dropin` (new player) provides a corresponding boost to indicators
- **Player Interaction**:
  - MASMED head uses `/indicators` to view actual values with visual indicators
  - Other players can request indicator info from MASMED
  - Historical trends may be available based on MASMED's reporting

### 4. Economic System
- **Currency**: Virtual Simbucks tracked in database
- **Transactions**:
  - `/give user:@username amount:[number] reason:[text]`
  - `/balance` to check current Simbucks
  - `/transactions` to view recent transaction history
  - Transaction logs in `#transaction-log` (admin only)
  - Receipts DMed to both parties for transparency
  - **Note**: Transactions are binding and can be used for trades or agreements

- **Perks System**:
  - **Cosmetic Flairs**: Special role colors, badges, or titles
  - **Communication Bonuses**:
    - Ability to create temporary voice channels
    - Custom emoji usage in designated channels
    - Priority message highlighting
  - **Regional Benefits**:
    - Ability to pin messages in regional channels
    - Custom channel organization privileges
    - Temporary moderation abilities in home region
  - **Purchase**:
    - `/buyperk type:[perk]` - Purchase a specific perk
    - `/perks` - View available perks and current status

### 5. Player Lifecycle
- **Joining a Game**:
  - New players can use `/dropin` to join if the game allows it
  - Only designated group heads start with resources; regular players begin with none
  - Game indicators receive a boost with each new player

- **Leaving a Game**:
  - Players can use `/dropout` to leave the game at any time
  - Becomes an absentee, affecting national indicators
  - May rejoin later if the game allows it

### 6. Dispute Resolution
- **JUDCO's Role**:
  - Handles reports of cheating or rule violations
  - Does not typically intervene in scams or broken agreements between players
  - May investigate patterns of deceptive behavior
- **Player Responsibility**:
  - Players are responsible for their own agreements
  - Use `/give` carefully as transactions cannot be reversed
  - Consider using escrow for high-value trades

### 6. Form Replacements
All paper forms from original SIMSOC are replaced with slash commands:

- **Job Applications**: `/apply position:[role] message:[text]`
- **Law Proposals**: `/propose_law title:[text] description:[text]`
- **Voting**: `/vote proposal:[id] choice:[for/against/abstain]`
- **Arrest Requests**: `/request_arrest user:@username reason:[text]`
- **Agency Actions**: `/agency action:[type] target:[user/agency] details:[text]`

### 7. Verification System
To replace physical verification:
- **Puzzle Challenges**: `/verify_puzzle` - Get a random verification task
- **CAPTCHA-style Tasks**: For critical actions
- **Time-based Cooldowns**: To prevent automation
- **Activity Monitoring**: For suspicious patterns

## Communication System

### MASMED (Mass Media) Implementation
- **Regional Announcements**:
  - MASMED leaders can broadcast messages to all regions simultaneously
  - Each region receives the same announcement but can be customized per region
  - Uses Discord's announcement channels for consistency

- **Voice Features**:
  - MASMED can create temporary voice channels for public announcements
  - Stage channels for town hall meetings or press conferences
  - Region-specific voice chats for local news broadcasts

- **Content Control**:
  - MASMED can pin important announcements in each region
  - Scheduled news cycles can be automated
  - Emergency broadcast capability for critical updates

### JUDCO (Judicial Committee)
- **Rule Enforcement**:
  - Monitors for violations of communication rules
  - Handles reports of cheating or honor system violations
  - Can impose in-game penalties or restrictions

- **Cheating Prevention**:
  - Tracks suspicious patterns (rapid puzzle solving, etc.)
  - Investigates reports of out-of-game communication
  - Manages the appeals process for reported violations

### Communication Rules
1. **Allowed**:
   - All in-game communication must happen within the Discord server
   - Region-specific channels for local discussions
   - Direct messages only for roleplay purposes within the same region

2. **Prohibited**:
   - No DMs about the game with players outside your current region
   - No external communication tools for game-related discussions
   - No sharing of solutions to puzzles or anagrams outside intended channels

3. **Puzzle System**:
   - BASIN and RETSIN puzzles must be solved manually
   - Time-based cooldowns on puzzle attempts
   - Randomized anagrams and puzzles generated per session

## Discord-Specific Features

### 1. Work System

#### BASIN Work
```
/work basin submit:"[text]"
```
- **Response**: Shows the text and requests vowel counts
- **Format**: `a:[#] e:[#] i:[#] o:[#] u:[#]`
- **Verification**:
  - Compares counts with actual values
  - Returns accuracy percentage
  - 10% reduction per error, 6+ errors = no payment

#### RETSIN Work
```
/work retsin letters:"[scrambled letters]"
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
```
/give tickets:[#] @user type:[travel|subsistence]
```
- **Requirements**: Must own the tickets being transferred
- **Limits**: Cannot exceed agency's available tickets
- **Confirmation**: Both parties receive DM confirmation
- **Note**: For employee payments, use the standard `/give` command with Simbucks

### 2. Player Commands
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

### 2. Admin Commands
```
!start_session - Begin a new game session
!end_turn - Advance to next turn
!adjust_indicators [indicator] [amount] - Modify national indicators
!arrest @user - Place user under arrest
```

### 3. Automated Systems
- **Turn Processing**:
  - Automatic subsistence checks
  - Income distribution
  - Indicator adjustments
  - Event triggers

## Data Management

The bot maintains the following game state:

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

All game mechanics are enforced automatically by the bot, while players are responsible for managing their agreements and social structures.
```

## Implementation Roadmap

### Phase 1: Core Systems
1. Player registration and profiles
2. Regional movement
3. Basic economy (Simbucks, transactions)
4. Subsistence tracking

### Phase 2: Game Mechanics
1. National indicators
2. Employment and agencies
3. Simforce and law enforcement
4. Public programs

### Phase 3: Advanced Features
1. Automated turn processing
2. Event system
3. Advanced reporting and dashboards
4. Integration with Discord features (threads, reactions, etc.)

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

3. **Scoring Mechanics**:
   - Players earn points based on how many target words they find:
     - 5/5 words = +50% bonus
     - 4/5 words = +20% bonus
     - 3/5 words = -10% penalty
     - 2/5 words = -40% penalty
     - 1/5 words = -70% penalty
   - Words must be exactly 5 letters long
   - No proper nouns, hyphenated words, or foreign terms

3. **Verification**:
   - Bot maintains a dictionary of valid words
   - Case-insensitive comparison
   - Tracks work completions and resource distribution
   - No automated prevention of rapid submissions

#### Resource Management
- **Bot-Tracked Resources**:
  - Simbucks (currency)
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

#### Group Management
- **Ownership**:
  - One head per group
  - Automatic reassignment if head leaves
  - Transfer requires confirmation

- **Banking & Payments**:
  - All payments made via `/give` command
  - Group heads pay employees from their personal funds
  - Industries (BASIN/RETSIN) may bank Simbucks to earn interest
  - Interest rates and banking rules determined by player agreements
  - Bot tracks all Simbuck transactions automatically

- **Enterprise Tasks**:
  - Simple but time-consuming verification tasks
  - Image-based verification (e.g., "Find all instances of X in this image")
  - Short written responses to scenario-based questions

### Moderation Tools
- **Automated Monitoring**:
  - Track message frequency and patterns
  - Flag potential cross-region communication
  - Log all game-related DMs for dispute resolution

- **Reporting System**:
  - Simple `/report` command for players
  - Anonymous reporting option
  - JUDCO review queue for reported incidents

### Performance Optimization
- **Large Scale Management**:
  - Rate limiting for commands
  - Asynchronous processing for non-critical tasks
  - Caching frequently accessed data
  - Sharding support for very large player counts

## Open Questions
1. How to balance puzzle difficulty to ensure they require meaningful effort?
2. Best practices for detecting and preventing automated puzzle solving?
3. Methods to encourage and monitor the honor system in a digital environment?
4. Optimal channel structure for different group sizes (10-90 players)?
