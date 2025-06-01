# Cosmis Database Schema

This document outlines the database schema for the Cosmis project, separating the technical implementation details from the gameplay rules.

## Core Player Data

```
players {
  id: string,            // Discord user ID
  username: string,      // Discord username
  region: string,        // Current region
  home_region: string,   // Starting region
  role: string,          // Group assignment
  simbucks: number,      // Current currency
  status: string,        // "active", "arrested", "dropout"
  subsistence_status: string,  // "paid", "unpaid"
  joined_at: timestamp,
  last_active: timestamp
}
```

## Support Card System

```
support_cards {
  id: string,
  player_id: string,
  party: string,         // "POP" or "SOP"
  session_id: string,
  timestamp: timestamp,
  valid: boolean,
  invalidation_reason: string
}
```

## EMPIN Support

```
empin_support {
  id: string,
  empin_member_id: string,
  supported_player_id: string,
  session_id: string,
  timestamp: timestamp,
  active: boolean
}
```

## HUMSERVE Assistance

```
humserve_assistance {
  id: string,
  humserve_member_id: string,
  assisted_player_id: string,
  session_id: string,
  assistance_type: string,  // "subsistence", "travel", etc.
  timestamp: timestamp
}
```

## Luxury Living

```
luxury_living {
  id: string,
  player_id: string,
  purchase_session: string,
  active: boolean,
  auto_renew: boolean
}
```

## Private Transportation

```
private_transport {
  id: string,
  player_id: string,
  purchase_session: string,
  active: boolean
}
```

## Individual Goals

```
individual_goals {
  id: string,
  player_id: string,
  goal_text: string,
  set_session: string,
  approved: boolean,
  completed: boolean,
  completion_session: string
}
```

## Simforce

```
simforce {
  id: string,
  name: string,
  size: number,
  commander_id: string,
  authorization_rule: string,
  created_at: timestamp,
  last_renewed: timestamp,
  active: boolean
}

simforce_arrests {
  id: string,
  simforce_id: string,
  arrested_player_id: string,
  arresting_officer_id: string,
  arrest_time: timestamp,
  release_time: timestamp,
  active: boolean
}

simforce_protection {
  id: string,
  simforce_id: string,
  protected_player_id: string,
  protection_start: timestamp,
  protection_end: timestamp,
  active: boolean
}
```

## Guard Posts and Riots

```
guard_posts {
  id: string,
  region: string,
  simforce_id: string,
  established_at: timestamp,
  expires_at: timestamp,
  active: boolean
}

riots {
  id: string,
  region: string,
  initiated_by: string,
  participants: string[],
  started_at: timestamp,
  ended_at: timestamp,
  successful: boolean
}
```

## Work Systems

```
basin_submissions {
  id: string,
  player_id: string,
  submission_text: string,
  session_id: string,
  timestamp: timestamp,
  approved: boolean,
  reviewer_id: string,
  review_timestamp: timestamp,
  score: number
}

retsin_submissions {
  id: string,
  player_id: string,
  letters: string,
  words_found: string[],
  session_id: string,
  timestamp: timestamp,
  score: number
}
```

## Travel System

```
travel_tickets {
  id: string,
  owner_id: string,
  ticket_type: string,  // "travel" or "subsistence"
  created_at: timestamp,
  used_at: timestamp,
  used: boolean
}

travel_log {
  id: string,
  player_id: string,
  from_region: string,
  to_region: string,
  timestamp: timestamp,
  ticket_id: string,  // null if private transport used
  private_transport: boolean
}
```

## National Indicators

```
national_indicators {
  id: string,
  session_id: string,
  timestamp: timestamp,
  fes: number,  // Food and Energy Supply
  sl: number,   // Standard of Living
  sc: number,   // Social Cohesion
  pc: number    // Public Commitment
}

indicator_events {
  id: string,
  indicator_affected: string,  // "fes", "sl", "sc", "pc"
  change_amount: number,
  reason: string,
  timestamp: timestamp,
  session_id: string
}
```

## Sessions

```
sessions {
  id: string,
  name: string,
  start_time: timestamp,
  end_time: timestamp,
  active: boolean,
  sequence_number: number
}
```

## Transactions

```
transactions {
  id: string,
  from_player_id: string,
  to_player_id: string,
  amount: number,
  reason: string,
  timestamp: timestamp,
  session_id: string
}
```
