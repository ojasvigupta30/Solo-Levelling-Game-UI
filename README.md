# Solo Leveling Frontend

This is the frontend for the Solo Leveling-inspired game application. It is built using **React**, **React Router**, and **Vite** to provide an interactive and dynamic user interface for gameplay.

## Solo-Levelling Backend

[Backend Server](https://github.com/ojasvigupta30/Solo-Levelling-Game-Server)

## Features

- **Authentication Pages**: Register and login with secure JWT authentication.
- **Player Dashboard**: View player stats, inventory, and progression.
- **Dungeon Exploration**: Explore dungeons, view monster details, and engage in combat.
- **Combat System**: Battle monsters with real-time updates to player stats and inventory.

---

## Project Structure

```plaintext
.
├── src/
│   ├── api/
│   │   ├── userApi.js          # User Authentication API calls
│   │   ├── playerApi.js        # Player-related API calls
│   │   ├── dungeonApi.js       # Dungeon-related API calls
│   │   ├── combatApi.js        # Combat-related API calls
│   ├── components/
│   │   ├── Login.jsx              # Login component
│   │   ├── Register.jsx           # Registration component
│   │   ├── PlayerProfile.jsx      # Player profile component
│   │   ├── PlayerName.jsx         # Player name component
│   │   ├── DungeonDetail.jsx      # Dungeon details component
│   │   ├── DungeonList.jsx        # Dungeon list component
│   │   ├── NavigationButton.jsx   # Dungeon details component
│   ├── pages/
│   │   ├── Home.jsx            # Home page
│   │   ├── SetPlayerName.jsx   # Player name setup page
│   │   ├── Dungeons.jsx        # Dungeons listing page
│   │   ├── Combat.jsx          # Combat page
│   │   ├── GameDashboard.jsx   # Main dashboard
│   │   ├── Inventory.jsx       # Inventory page
│   ├── App.jsx                 # Main React app
│   ├── index.css               # Global CSS
│   ├── main.jsx                # Entry point for React
├── package.json               # Project dependencies
├── index.html               # Main HTML file
```

## Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- npm or yarn

## Installation

1. Clone the Repository:
```bash
git clone https://github.com/ojasvigupta30/Solo-Levelling-Game-UI.git
```

2. Install Dependencies:
```bash
npm install
```

3. Set Up Environment Variables: Create a .env file in the root directory and configure the following:
```bash
VITE_API_URL=http://localhost:5000/api
```
Replace http://localhost:5001 with your backend's URL if hosted remotely.

4. Start the Development Server:
```bash
npm run dev
```
The app should now be running at http://localhost:5173.

## Pages and Components

### Pages
- Home Page (/home): Displays game news, player achievements, and quick links.
- Set Player Name (/set-player-name): Allows the user to create or update their player name.
- Game Dashboard (/dashboard): Central hub for accessing the player profile, dungeons, and logout.
- Dungeons Page (/dungeons): Displays a list of available dungeons for exploration.
- Combat Page (/combat): Engages the player in battles with monsters, updates stats, and adds loot to the inventory.


## API Integration

The frontend interacts with the backend via the following API endpoints:

### User Authentication

| Endpoint                | Method | Description          |
|--------------------------|--------|----------------------|
| `/api/users/register`    | POST   | Register a new user  |
| `/api/users/login`       | POST   | Login and receive JWT |

---

### Player Management

| Endpoint                  | Method | Description                       |
|----------------------------|--------|-----------------------------------|
| `/api/players`             | POST   | Create or update a player profile |
| `/api/players/:username`   | GET    | Fetch player details              |
| `/api/players/:username/xp`| PATCH  | Add XP and level up a player      |

---

### Dungeon Management

| Endpoint                | Method | Description                 |
|--------------------------|--------|-----------------------------|
| `/api/dungeons`          | GET    | Fetch all available dungeons |
| `/api/dungeons/:id`      | GET    | Fetch dungeon details        |
| `/api/dungeons/explore`  | POST   | Explore a dungeon            |

---

### Combat

| Endpoint            | Method | Description                 |
|---------------------|--------|-----------------------------|
| `/api/combat/battle` | POST   | Engage in combat with a monster |

---

## Technologies Used

- **React**: For building the user interface.
- **React Router**: For client-side routing.
- **Vite**: Build tool for faster development.
- **CSS**: For styling the application.
- **Axios**: For making API requests.


## Future Improvements
- Add animations and effects for combat actions.
- Implement a detailed leaderboard page.
- Add inventory management with item usage (e.g., health potions).
- Enhance the UI with more anime-inspired visuals.


## Author

### [Ojasvi Gupta](https://github.com/ojasvigupta30)
