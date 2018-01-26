// MG-Server
// TiCubius
// V1.00

console.log("\033c")

const fs = require("fs")
const colors = require("colors")
const io = require("socket.io")(8000)

const Client = require("./app/Client.js")
const Session = require("./app/Session.js")

clients = []
sessions = []

// EVENT: Client connects to the website
io.on("connection", (socket) =>
{
	let client = new Client(socket)
	clients.push(client)

	// EVENT: Client wants to join / create a session 
	socket.on("SESSION_JOIN", (data) =>
	{
		// LOGGING
		console.log(" SESSION_JOIN    : ".cyan + data.username.yellow + " joined " + data.name.yellow)

		// Sets the username of the Client.
		client.setUsername(data.username)

		// Search the correct Session
		let session = sessions.find((session) =>
		{
			if (session.getName() == data.name)
			{
				// We found the correct session
				return session
			}
		})

		// No session with this name exists, create it
		if (!session)
		{
			session = new Session(data.name)
			session.setOwner(data.username)
			session.setStatus("Stopped")

			sessions.push(session)
		}

		// Join the client in the session/room
		client.joinChannel(data.name)
		session.addPlayer(data.username)

		// Send informations to everyone in the session
		io.sockets.in(session.getName()).emit("SESSION_INFORMATIONS", session.get())
	})

	// EVENT: Client is requesting informations about the sessions
	socket.on("SESSION_REQUEST", (name) =>
	{
		// LOGGING
		console.log(" SESSION_REQUEST : ".cyan + socket.id.yellow + " requested " + name.yellow)

		// Search the correct Session
		let session = sessions.find((session) =>
		{
			if (session.getName() == name)
			{
				return session
			}
		})

		if (session)
		{
			// Send informations to the Client
			socket.emit("SESSION_INFORMATIONS", session.get())
		}
	})

	// EVENT: Client wants to start the game
	socket.on("GAME_START", (data) =>
	{
		// LOGGING
		console.log(" GAME_START      : ".cyan + socket.id.yellow + " requested to start the game")

		// Loop through each sessions the Client's in
		client.getChannels().forEach((channel) =>
		{
			// Search the correct Session
			let session = sessions.find((session) =>
			{
				if (session.getName() == channel)
				{
					return session
				}
			})

			// Check if the client is the owner of the Session
			if (session && (session.owner == client.getUsername()))
			{
				// Change the session's status
				session.setStatus("Running")

				// Send informations to everyone in the Session
				io.sockets.in(session.getName()).emit("SESSION_INFORMATIONS", session)
				io.sockets.in(session.getName()).emit("GAME_STARTED", data)
			}
		})
	})

	// EVENT: Client wants to update the game
	socket.on("GAME_UPDATE", (data) =>
	{
		// LOGGING
		console.log(" GAME_UPDATE     : ".cyan + socket.id.yellow + " updated the game")

		// Search the correct Session
		let session = sessions.find((session) =>
		{
			if (session.getName() == data.session.name)
			{
				this.session = data.session
				return session
			}
		})

		// Check if the client is the owner of the Session
		if (session)
		{
			// Send informations to everyone in the Session
			io.sockets.in(session.getName()).emit("GAME_UPDATED", data)
		}
	})

	// EVENT: Host has stopped the game
	socket.on("GAME_STOPPED", (data) =>
	{
		// LOGGINGsession.s
		console.log(" GAME_STOPPED    : ".cyan + socket.id.yellow + " stopped the game")

		// Search the correct Session
		let session = sessions.find((session) =>
		{
			if (session.getName() == data.session.name)
			{
				return session
			}
		})

		// Check if the client is the owner of the Session
		if (session)
		{
			data.session.players.forEach((player) =>
			{
				session.setPlayer(player)
			})
			session.setStatus("stopped")

			// Send informations to everyone in the Session
			io.sockets.in(session.getName()).emit("SESSION_INFORMATIONS", session)
		}
	})

	// EVENT: Client is disconnecting
	socket.on("disconnect", () =>
	{
		// Loop through each sessions
		sessions.forEach((session) =>
		{
			// Search for the player
			session.getPlayers().filter((player) =>
			{
				// It's the client
				if (player.username == client.getUsername())
				{
					// Leave the session
					client.leaveChannel(session.getName())

					// Remove from the players list
					session.removePlayer(player)

					// Check if players are remaining
					if (session.getPlayers().length)
					{
						// Check if it was the Host
						if (session.getOwner() == player.username)
						{
							session.setOwner(session.getPlayers()[Math.floor(Math.random() * session.getPlayers().length)])
						}
					}
					else
					{
						sessions.splice(sessions.indexOf(session), 1)
					}

					// Send informations to everyone in the session
					io.sockets.in(session.getName()).emit("SESSION_INFORMATIONS", session.get())
				}
			})
		})

		// LOGGING
		console.log(" DISCONNECT      : ".cyan + socket.id.yellow + " disconnected.")
	})

	// LOGGING
	console.log(" CONNECT         : ".cyan + socket.id.yellow + " connected.")
})