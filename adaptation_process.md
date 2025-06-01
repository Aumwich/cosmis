# Cosmis Adaptation Process
**Brainstorming and Implementation Strategy**
*Version 0.2 - May 2025*

## Introduction

This document outlines our approach to adapting SIMSOC into Cosmis for Discord, focusing on the process, challenges, and solutions. It serves as a bridge between the original game mechanics (documented in simrules.md) and the technical implementation specifications (detailed in disrules_draft.md), explaining our thought process and design decisions.

## Documentation Structure

The Cosmis project documentation consists of three main documents:

1. **simrules.md** - Comprehensive documentation of original SIMSOC simulation mechanics
2. **disrules_draft.md** - Technical specification for implementing SIMSOC on Discord
3. **playerrules.md** (planned) - Player-facing guide for Cosmis on Discord

This adaptation_process.md document complements these by documenting our design thinking and adaptation strategies.

## Adaptation Philosophy

Cosmis maintains the core educational and experiential elements of SIMSOC while leveraging Discord's unique features to enhance accessibility, automation, and engagement. Our adaptation follows these guiding principles:

1. **Preserve Core Mechanics**: The fundamental social dynamics, economic systems, and power structures of SIMSOC remain intact.

2. **Automate Administrative Tasks**: Repetitive calculations, resource distribution, and status tracking are handled by bots to reduce coordinator workload.

3. **Enhance Transparency**: Discord provides opportunities for clearer information sharing while still maintaining strategic information asymmetry where appropriate.

4. **Increase Accessibility**: The digital format allows for asynchronous participation and removes geographic barriers.

5. **Maintain Educational Value**: All adaptations prioritize the learning objectives around social dynamics, power relationships, and collective decision-making.

## Core Adaptation Challenges

### 1. Physical to Digital Conversion

**Challenge**: SIMSOC relies heavily on physical presence, paper forms, and face-to-face interactions.

**Solutions**:
- **Channel Architecture**: Discord categories and channels replace physical regions
- **Permission System**: Dynamic channel permissions simulate travel between regions
- **Slash Commands**: Replace paper forms with structured digital inputs
- **Database**: Track all game state that was previously managed with physical components
- **Honor System**: Clearly defined rules about allowed communication channels

### 2. Coordinator Role Automation

**Challenge**: The human coordinator in SIMSOC handles many administrative tasks that need automation.

**Solutions**:
- **The Coordinator Bot**: Automates form processing, resource distribution, and calculations
- **Validation Systems**: Automatic checks for rule compliance
- **Transaction System**: Digital currency management with logging
- **Notification System**: Automated alerts for game events and status changes
- **Dashboard Channels**: Read-only information displays for game state

### 3. Preserving Educational Value

**Challenge**: Ensuring the digital adaptation maintains the core learning objectives.

**Solutions**:
- **Reflection Prompts**: Built-in reflection questions during and after gameplay
- **Analytics**: Track and visualize social dynamics for post-game discussion
- **Debrief Tools**: Structured debrief process with data visualization
- **Documentation**: Clear player guides explaining the educational purpose
- **Feedback Loops**: Mechanisms to gather player insights during and after play

## Player Journey Design

### 1. Onboarding Process

**Objective**: Give players a clear understanding of Cosmis and prepare them for meaningful participation.

**Implementation**:
- **Welcome Channel**: Introduction to Cosmis concept and educational goals
- **Tutorial System**: Interactive walkthrough of basic commands and mechanics
- **Role Selection**: Guided process for selecting group preferences and goals
- **Expectation Setting**: Clear explanation of time commitment and participation requirements
- **Honor System Explanation**: Emphasis on the importance of following communication rules

### 2. Game Initialization

**Objective**: Create balanced starting conditions and prepare players for the first session.

**Implementation**:
- **Group Assignment Algorithm**: Balance experience levels and preferences
- **Starting Resources**: Distribution of initial Simbucks and resources
- **Regional Assignment**: Balanced population distribution
- **Goal Setting**: Structured process for selecting and recording individual goals
- **Pre-game Briefing**: Final instructions and expectations before gameplay begins

### 3. Session Structure

**Objective**: Create a rhythm of gameplay that works in Discord's asynchronous environment.

**Implementation**:
- **Session Timing Options**:
  - **Synchronous**: Set timeframes where all players are active (e.g., 2-hour blocks)
  - **Asynchronous**: Extended periods (e.g., 24-48 hours) with specific deadlines
  - **Hybrid**: Core synchronous events with asynchronous activities between
- **Turn Structure**: Clear phases within each session (work, travel, trading, etc.)
- **Notification System**: Reminders for key deadlines and events
- **Absence Handling**: Mechanisms for managing player absence that balance realism with practicality

### 4. Debrief Process

**Objective**: Maximize learning through structured reflection.

**Implementation**:
- **Data Reveal**: Comprehensive statistics and visualizations of game events
- **Reflection Channels**: Structured discussion spaces for different aspects of the experience
- **Guided Questions**: Prompts to help players connect game experiences to real-world insights
- **Anonymous Feedback**: Options for sharing sensitive observations
- **Documentation**: Resources for further exploration of concepts experienced in the game

## Bot Architecture Considerations

### The Coordinator Bot

**Primary Functions**:
- **Economy Management**: Track Simbucks, process transactions, distribute income
- **Travel System**: Manage region access and travel permissions
- **Work Verification**: Process and validate work submissions
- **National Indicators**: Calculate and update indicators based on game events
- **Form Processing**: Handle all slash command "forms" and validate inputs
- **Notification System**: Send alerts, confirmations, and status updates

**Technical Considerations**:
- **Database Integration**: Real-time updates and transaction safety
- **Permission Management**: Dynamic role and channel permission updates
- **Command Rate Limiting**: Prevent abuse of game mechanics
- **Error Handling**: Clear error messages and recovery mechanisms
- **Logging**: Comprehensive activity logs for troubleshooting and analysis

### Admin Bot

**Primary Functions**:
- **Server Setup**: Automated channel and role creation
- **Player Registration**: Onboarding and role assignment
- **Moderation Tools**: Monitoring for rule violations
- **Game Configuration**: Settings for different game parameters
- **Emergency Controls**: Override capabilities for unexpected situations

## Honor System Implementation

The honor system is crucial to SIMSOC's educational value but presents unique challenges in a digital environment.

**Implementation Strategies**:
- **Clear Documentation**: Explicit rules about allowed communication channels
- **Social Pressure**: Visibility of actions to create accountability
- **Reporting Mechanism**: Simple process for reporting suspected violations
- **Consequence System**: Graduated responses to honor system violations
- **Positive Reinforcement**: Recognition for exemplary adherence to the honor system

## Adaptation Examples

### Example 1: Travel System

**Original SIMSOC**:
- Physical travel tickets
- Physical movement between classroom regions
- Face-to-face interactions with residents

**Cosmis Implementation**:
- Digital travel tickets in player inventory
- Channel permission changes to grant/revoke access
- Discord interactions in destination channels
- Automated travel logs and notifications
- Voting system for resident-initiated removal

### Example 2: BASIN Work

**Original SIMSOC**:
- Paper passages with vowel counting tasks
- Manual verification by coordinator
- Physical payment in Simbucks

**Cosmis Implementation**:
- Digital passages delivered via slash command
- Automated verification of vowel counts
- Immediate feedback on accuracy
- Automatic Simbuck transfers upon completion
- Rate limiting to prevent automation/cheating

### Example 3: Simforce

**Original SIMSOC**:
- Paper forms for Simforce creation and orders
- Manual tracking of Simforce size and capabilities
- Physical protection cards
- Coordinator-managed arrest procedures

**Cosmis Implementation**:
- Slash commands for Simforce management
- Database tracking of Simforce attributes
- Automated protection status with visual indicators
- Permission-based enforcement of Simforce actions
- Transparent logs of Simforce activities
- Role-based visual indicators for arrest/protection status

#### Simforce Design Decisions

**Core Mechanics**:
- Simforce starts at size 25, representing the direct conversion of the 25 Simbucks initialization cost
- Each additional Simbuck invested increases force size by exactly 1 unit (1:1 ratio)
- Simforce operates independently without oversight from JUDCO or other governing bodies
- Simforce commanders have complete autonomy within their defined authorization rules

**Discord Adaptation**:
- Role-based implementation (`@Simforce-Commander`, `@Protected`, `@Arrested`)
- Visual indicators in usernames/nicknames to show status
- Channel permission management for arrested players
- Automated tracking of protection relationships
- Command-based interface for all Simforce actions

**Balance Considerations**:
- Clear visual indicators prevent confusion about protection/arrest status
- Automated enforcement of mechanical rules ensures consistent application
- Transaction logs maintained by The Coordinator Bot (only accessible to administrators during gameplay, revealed during debrief)
- Cost structure (25 Simbucks initial, 10 Simbucks per arrest) preserved from original game
- Protection status remains private information known only to the Simforce commander and protected individuals

## Brainstorm Ideas

The following are preliminary ideas that need further development before implementation, roughly ordered by implementation priority:

### Flavor Text and Immersion
- Occasional flavor text displayed when certain commands are used (randomized to keep fresh)
- Thematic messaging for different regions and groups
- Visual styling for different agency communications

### Human Coordinator Role
- Hybrid automation model with human coordinator oversight
- Special slash commands for human coordinator (e.g., `/admin_override`, `/manual_adjust`)
- Different versions of Cosmis could exist simultaneously (human-assisted and fully automated)
- Multiple Discord servers could run different versions concurrently

### Regional Activity Logs
- Hidden channels for each region that log relevant slash commands
- Visible to administrators and spectators during gameplay
- Revealed to all players during debrief for transparency and learning

### Future Expansion Ideas
- Scaling beyond the original 90-player limit
- Very large games (200+ players) with additional industries
- Multiple MASMED groups for different information ecosystems
- Additional habitable regions with unique characteristics
- Specialized roles that emerge only at larger player counts
- Inter-regional diplomatic systems

## Open Questions and Design Decisions

1. **Session Timing**: How to balance synchronous vs. asynchronous gameplay?
   - Options: Fixed session times, flexible windows, or hybrid approach
   - Considerations: Player availability, engagement, pacing

2. **Scale Considerations**: How to adapt mechanics for different player counts?
   - Small Games (10-25 players): Simplified group structure, combined roles
   - Medium Games (25-50 players): Standard implementation
   - Large Games (50-90 players): Extended regional system, hierarchical roles

3. **Verification Mechanisms**: How to ensure puzzle tasks are completed legitimately?
   - Time-based analysis of submissions
   - Randomized challenges
   - Pattern detection for automated solving

4. **Communication Boundaries**: How to enforce regional communication limits?
   - Technical controls vs. honor system
   - Monitoring capabilities
   - Consequences for violations

5. **Spectator Experience**: How to create meaningful observation opportunities?
   - Read-only access to select channels
   - Dedicated spectator discussion spaces
   - Post-game access to full game data

## Next Steps

1. **Finalize Core Mechanics**:
   - Complete slash command specifications for all game actions
   - Define database schema for all game entities
   - Design UI elements for key game information

2. **Prototype Key Systems**:
   - Implement basic economy and transaction system
   - Create travel and regional permission system
   - Develop work verification mechanisms

3. **Test with Small Groups**:
   - Run limited scenarios with 5-10 players
   - Focus on core mechanics before scaling
   - Gather feedback on user experience

4. **Iterate Based on Feedback**:
   - Refine command interfaces
   - Adjust balance of automation vs. manual processes
   - Enhance educational components

## Conclusion

The adaptation of SIMSOC to Discord as Cosmis presents both challenges and opportunities. By thoughtfully translating physical mechanics to digital equivalents while preserving the core educational experience, we can create an accessible, engaging simulation that achieves the original goals while leveraging modern technology.

This document will evolve as we make implementation decisions and gather feedback from testing. All stakeholders are encouraged to contribute ideas and raise concerns throughout the development process.
