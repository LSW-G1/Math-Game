// MG-Server - Session Class
// TiCubius
// V1.00

class Session
{

	constructor(data)
	{
		this.name = data
		this.difficulty
		this.status = "Stopped"

		this.owner
		this.players = []
	}

	// FUNCTION: Get the name of the Session
	getName()
	{
		return this.name
	}


	get()
	{
		return this
	}

	// FUNCTION: Get the players in the Session
	getPlayers()
	{
		return this.players
	}

	// FUNCTION: Add a player to the Session
	addPlayer(username)
	{
		this.players.push(
		{
			username: username,
			score: 0
		})
	}

	// FUNCTION: Set a player's object
	setPlayer(data)
	{
		this.players.forEach((player) =>
		{
			if (data.username == player.username)
			{
				player.score = data.score
			}
		})
	}

	// FUNCTION: Remove a player from the Session
	removePlayer(player)
	{
		this.players.splice(this.players.indexOf(player), 1)
	}

	// FUNCTION: Get the Owner of the Session
	getOwner()
	{
		return this.owner
	}

	// FUNCTION: Set the Owner of the Session
	setOwner(username)
	{
		this.owner = username
	}

	// FUNCTION: Set the Session's status
	setStatus(status)
	{
		this.status = status
	}

}

module.exports = Session