# Cosmis - A Social Simulation Game for Discord

A Discord bot system for running a social simulation game based on William A. Gamson's SIMSOC (Simulated Society). The game is designed for 10-90 players who take on roles that explore society, economy, and social justice through structured gameplay.

## Project Structure

```
cosmis/
├── admin-bot/        # Admin bot source code
│   └── src/
├── game-bot/         # Game bot source code
│   └── src/
├── shared/           # Shared code between bots
│   ├── database/     # Database models and migrations
│   └── utils/        # Shared utility functions
├── docs/             # Documentation
│   ├── player-guides/
│   ├── rules/
│   └── promotion/
└── server-setup/     # Server configuration templates
    └── channel-templates/
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)
- A Discord server where you have administrator permissions
- A Discord bot application (get from [Discord Developer Portal](https://discord.com/developers/applications))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cosmis.git
   cd cosmis
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Discord bot token:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   ```

4. Start the bots:
   - For development:
     ```bash
     npm run dev:admin
     # In a separate terminal
     npm run dev:game
     ```
   - For production:
     ```bash
     npm run start:admin
     npm run start:game
     ```

## Development

### Code Style
- Follow standard JavaScript style
- Use clear, descriptive variable and function names
- Add comments to explain complex logic
- Keep functions small and focused on a single task

### Database
- Development: SQLite
- Production: PostgreSQL/MySQL (TBD)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
