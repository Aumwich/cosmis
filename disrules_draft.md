# DISRULES.md - Cosmis Technical Specification
**Discord Implementation of SIMSOC Game Mechanics**
*Version 0.3 - May 2025*

## Overview
This document provides the technical specifications for implementing SIMSOC mechanics in Cosmis on Discord. It serves as the primary reference for bot development, focusing on concrete implementation details rather than design philosophy.

> **Note**: For adaptation philosophy and design process, see `adaptation_process.md`
>
> **Implementation Principle**: For most game mechanics requiring private feedback, use Discord's ephemeral responses (visible only to the command user) rather than direct messages (DMs). This keeps routine interactions within the main Discord interface.
>
> **DM Usage**: Reserve direct messages for significant game events that warrant special attention:
> - Game start notifications with personalized role information and initial instructions
> - Game end notifications with personal results and debrief information
> - Critical updates that players should not miss even when offline

## Technical Reference Architecture

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

#### Technical Specification

1. **Slash Commands**:
   - `/indicators` - MASMED head only: View current indicator values
   - `/indicatorhistory` - MASMED head only: View historical trends

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

5. **Discord Implementation**:
   - MASMED head receives indicator values as a formatted message
   - Includes emoji indicators for trends (📈/📉)
   - Color-coded text for critical thresholds

6. **Access Control**:
   - Only MASMED head has direct access to the actual indicator values
   - MASMED head is responsible for communicating indicators to the public
   - Other players must rely on MASMED's reports or make their own assessments

7. **Impact of Player Count**:
   - Each `/dropout` (absentee) negatively affects national indicators (-2 to all)
   - Each `/dropin` (new player) provides a corresponding boost to indicators (+2 to all)

8. **Player Interaction**:
   - MASMED head uses `/indicators` to view current values
   - MASMED manually shares information with other players
   - Historical data provided to MASMED for context

### 4. Economic System
- **Currency**: Virtual Simbucks tracked in database
- **Transactions**:
  - `/give user:@username amount:[number] reason:[text]`
  - `/balance` to check current Simbucks
  - `/transactions` to view recent transaction history
  - Transaction logs in `#transaction-log` (admin only)
  - Receipts DMed to both parties for transparency
  - **Note**: Transactions are binding and can be used for trades or agreements

### Luxury Living Implementation

#### Technical Specification

1. **Slash Commands**:
   - `/buy luxury` - Purchase Luxury Living status
   - `/luxurystatus` - Check your Luxury Living status
   - `/cancel luxury` - Cancel Luxury Living status (with confirmation prompt)

2. **Mechanics**:
   - Costs 10 Simbucks per session
   - Automatically provides subsistence (no need to purchase separately)
   - Grants access to exclusive `#luxury-lounge` channels in each inhabited region
   - Provides visual indicator in username (🌟)
   - Automatic renewal unless cancelled
   - Confirmation prompt when cancelling: "Are you sure? This will remove your luxury living status and it will have to be repurchased to be reacquired."

3. **Discord Implementation**:
   - `@Luxury-Living` role with special color
   - Access to region-specific luxury lounges
   - Custom emoji access
   - Priority in voice channels (speaker priority)
   - Luxury lounges only in inhabited regions (not in Gray region)

### Private Transportation Implementation

#### Technical Specification

1. **Slash Commands**:
   - `/buy transport` - Purchase Private Transportation
   - `/transportstatus` - Check your Private Transportation status

2. **Mechanics**:
   - One-time purchase of 25 Simbucks
   - Allows unlimited travel between regions without travel tickets
   - No regional visit limitations (can visit same region multiple times)
   - Cannot be transferred to other players
   - Lost if player is arrested

3. **Discord Implementation**:
   - `@Private-Transport` role
   - Bypass of normal travel restrictions in channel permissions
   - Visual indicator in username (🚗)
   - Travel log entries marked with special icon

> **Future Expansion Idea:** In a multi-nation implementation, private transport passes would only apply to the nation in which they were purchased. Additional passes would be required for other nations.

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

### Political Party Support System Implementation

#### Technical Specification

1. **Slash Commands**:
   - `/support [POP|SOP]` - Submit or change your support for a political party
   - `/supportstatus` - Check your current support status
   - `/supportcount` - Party heads only: View current support count

2. **Support Mechanics**:
   - Players can support either POP or SOP during a session
   - Players can change their support during a session (last submission counts)
   - Support from arrested or absentee players is automatically invalidated
   - Support status resets at the beginning of each new session

3. **Income Calculation**:
   - Formula: (Support Count / 40% of active players) × 1.25 × Initial Income
   - Automatically calculated at session end
   - Affected by National Indicators
   - Results displayed to party heads via `/income` command

4. **Discord Implementation**:
   - Private ephemeral response when support is registered or changed
   - Support counts visible only to party heads through ephemeral responses
   - Support history viewable during debrief
   - Visual indicators for successful submission (reaction on command)

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

### EMPIN (Employee Interests) Implementation

#### Technical Specification

1. **Slash Commands**:
   - `/income` - EMPIN head only: View current income

2. **Income Calculation**:
   - Formula: $15 × SL (Size Level) initially
   - Subsequent income based on Support Cards submitted
   - Affected by National Indicators

3. **Discord Implementation**:
   - EMPIN members have access to private EMPIN channels
   - Negotiation with employers (BASIN/RETSIN) happens through natural player interaction
   - No mechanical support system - all player advocacy happens through social interaction

> **Note:** EMPIN's purpose is to represent employee interests through negotiation and social interaction. There are no mechanical "support" commands - players use natural Discord communication to fulfill their role.

### HUMSERVE (Human Services) Implementation

#### Technical Specification

1. **Slash Commands**:
   - `/income` - HUMSERVE head only: View current income

2. **Income Calculation**:
   - Formula: $15 × SL (Size Level) initially
   - Subsequent income based on Support Cards submitted
   - Affected by National Indicators

3. **Discord Implementation**:
   - Assistance to players happens entirely through natural social interaction
   - Players use standard `/give` commands to provide subsistence or tickets to those in need
   - No special commands for assistance - all help is negotiated between players

> **Note:** HUMSERVE's purpose is to provide assistance to players in need through natural social interaction. There are no mechanical "assistance request" commands - players communicate their needs through normal Discord channels, and HUMSERVE members respond accordingly.

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

### Individual Goals System

#### Technical Specification

1. **Slash Commands**:
   - `/goal set [description]` - Set your individual goal for the game
   - `/goaldeclaration [yes|no|change]` - Submit a goal declaration each session
   - `/goalstatus` - Check your current goal
   - `/listgoals` - Spectator command: View all player goals

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

3. **Goal Management**:
   - Players select from predefined goals or create custom ones
   - Suggested goals include: Power, Center of Attention, Style of Life, Security, Popularity, Fun and Adventure
   - Players can change goals during the game by using the "change" option
   - Goals are self-evaluated; no mechanical completion tracking

4. **Discord Implementation**:
   - Goals are private by default
   - Players can opt to make goals public with `/goal public`
   - Goal declarations are submitted directly to coordinator bot
   - Spectators can view all goals with `/listgoals` command
   - Declaration statistics shown to MASMED for National Indicator reporting

### Riot and Guard Post Mechanics

#### Technical Specification

1. **Slash Commands**:
   - `/riot` - Sign a riot form (one per player per session)
   - `/guardpost create [region]` - Establish a guard post in a region (costs $20)
   - `/guardpost renew [region]` - Renew a guard post for another session (costs $5)

2. **Riot Mechanics**:
   - Riots affect the entire nation, not just specific regions
   - Each player may participate in only one riot per session
   - A riot occurs when enough players use the `/riot` command (minimum 3)
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

4. **Discord Implementation**:
   - Riots are initiated via `/riot` command
   - Guard posts are visually indicated in region channels with a shield emoji
   - Riot events and guard post establishments are announced in #event-log
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
   - `/simforce create name:[text] authorization:[text]` - Creates a new Simforce (costs 25 Simbucks)
   - `/simforce invest amount:[number]` - Increases Simforce size (1:1 ratio)
   - `/simforce renew` - Renews Simforce for next session (10 Simbucks)
   - `/simforce status` - Shows current size and protection status

2. **Core Functions**:
   - `/simforce arrest @user reason:[text]` - Arrests a player (costs 10 Simbucks)
   - `/simforce protect @user` - Extends protection to a player
   - `/simforce attack name:[text]` - Attacks another Simforce
   - `/simforce release @user` - Releases an arrested player

3. **Database Structure**:
   ```
   simforces {
     id: string,
     name: string,
     size: number,
     owner_id: string,
     authorized_users: string[],
     protected_users: string[],
     arrested_users: string[],
     created_at: timestamp,
     last_renewed: timestamp
   }
   ```

4. **Discord Implementation**:
   - `@Simforce-Commander` role for Simforce heads
   - `@Protected` role for users under Simforce protection
   - `@Arrested` role with restricted channel permissions
   - Automated channel access restrictions for arrested users
   - Visual indicators in username for arrest/protection status

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
