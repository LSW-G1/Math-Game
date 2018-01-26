// SLAM1 - Session Manager
// VERSION 3.00, latest updated:
//

class SessionManager
{

	constructor()
	{
		this.game
		this.session

		this.op
	}

	// FUNCTION: Listen the sessions events
	listen()
	{
		// Listen for SESSION_INFORMATIONS events
		socket.on("SESSION_INFORMATIONS", (session) =>
		{
			// LOGGING
			console.log(" SM: Session Informations recieved")

			this.session = session

			// Check owner status
			if (this.getOwner() == Player.getUsername())
			{
				Player.setOwner(true)
			}
			else
			{
				Player.setOwner(false)
			}

			// Check the game's Status
			if (session.status == "Running")
			{
				UI.setRunning()
				UI.hideElement("#SMPlay", 350)
			}

			// Display Players
			UI.displayPlayers(this.getPlayers(), this.getOwner())
		})

		// Listen for GAME_STARTED events
		socket.on("GAME_STARTED", (data) =>
		{
			// LOGGING
			console.log(" SM: Game Started recieved")

			// Create the game
			this.game = new Game()
			this.game.setDifficulty(data.difficulty)
			this.game.start()

			// Change the session status
			this.session.status = "Running"
		})

		// Listen for GAME_UPDATED events
		socket.on("GAME_UPDATED", (data) =>
		{
			// LOGGING
			console.log(" SM: Game Updated recieved")

			// Sets the OP data in Memory
			this.op = new OP()
			this.op.force(data.operation)

			// Sets the new Session Informations in Memory
			this.session = data.session

			// Alert the user, clear the input
			UI.alert()
			UI.clearInput()

			// Display the Operation to the Player
			UI.displayOP(data.operation.integer_1, data.operation.integer_2, data.operation.operation)
		})

		// Listen for GAME_STOPPED events
		socket.on("GAME_STOPPED", (data) =>
		{
			// LOGGING
			console.log(" SM: Game Stopped recieved")

			// Create the game
			this.game.stop()
			this.game = null

			// Change the session status
			this.session.status = "Stopped"
		})
	}


	// FUNCTION: Join a session
	join(name, username)
	{
		// LOGGING
		console.log(" SM: Session Join sent")

		// Send a SESSION_JOIN event
		socket.emit("SESSION_JOIN",
		{
			name: name,
			username: username
		})
	}


	// FUNCTION: Start the game
	start()
	{
		// LOGGIN
		console.log(" SM: Game Start sent")

		// Change the session status
		this.session.status = "Running"

		// Send a GAME_START event
		socket.emit("GAME_START",
		{
			difficulty: settings["normal"]
		})

		// If host, send an OP
		if (Player.getOwner())
		{
			this.startRound(settings["normal"])
		}
	}

	// FUNCTION: Stop the game
	stop()
	{
		// LOGGIN
		console.log(" SM: Game Stop sent")

		console.log(this.session)

		socket.emit("GAME_STOPPED",
		{
			session: this.session
		})
	}

	// FUNCTION: Start a new Round
	startRound(difficulty)
	{
		// LOGGING
		console.log(" SM: Round Start sent")

		// Generate a new Round
		this.op = new OP()
		this.op.generate(difficulty || this.game.getDifficulty())

		// Update the player's score in the session
		this.session.players.forEach((player) =>
		{
			if (player.username == Player.getUsername())
			{
				player.score = Player.getScore()
			}
		})

		// Send a NEW_ROUND
		socket.emit("GAME_UPDATE",
		{
			session: this.session,
			operation: this.op.get()
		})
	}

	// FUNCTION: Get Players in the session
	getPlayers()
	{
		return this.session.players || []
	}

	// FUNCTION: Get the Owner
	getOwner()
	{
		return this.session.owner || null
	}

	// FUNCTION: Get the OP Object
	getOP()
	{
		return this.op
	}
}