// SLAM1 - Loading System 
// VERSION 3.00, latest updated: 
// TARTIERE Kevin 

class Player
{

	constructor()
	{
		this.username
		this.score = 0

		this.isOwner
	}


	// FUNCTION: Set the player's username
	setUsername(username)
	{
		this.username = username
	}

	// FUNCTION: Get the player's username
	getUsername()
	{
		return this.username
	}


	// FUNCTION: Get the player's score
	getScore()
	{
		return this.score
	}

	// FUNCTION: Set the player's score
	setScore(score)
	{
		this.score = score
	}

	// FUNCTION: Is the player the owner of the game
	getOwner()
	{
		return this.isOwner
	}

	// FUNCTION: Set the player to be the owner
	setOwner(boolean)
	{
		if (boolean)
		{
			this.isOwner = true

			UI.setHost()
			UI.showElement("#SMPlay", 350)
		}
		else
		{
			this.isOwner = false

			UI.setClient()
			UI.hideElement("#SMPlay", 350)
		}

		this.isOwner = boolean
	}
}

exports = Player