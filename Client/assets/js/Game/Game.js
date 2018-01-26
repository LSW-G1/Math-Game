// SLAM1 - Game
// VERSION 3.00, latest updated: 
//

class Game
{

	construct()
	{
		this.status
		this.difficulty
	}


	// FUNCTION: Set the game's difficulty
	setDifficulty(difficulty)
	{
		this.difficulty = difficulty
	}

	// FUNCTION: Get the game's difficulty
	getDifficulty()
	{
		return this.difficulty
	}


	// FUNCTION: Set the game's status
	setStatus(status)
	{
		this.status = status
	}

	// FUNCTION: get the game's status
	getStatus(status)
	{
		return this.status
	}


	// FUNCTION: Start a new game
	start()
	{
		// LOGGING
		console.log(" GC: Game started")

		let status = this.getStatus()
		if (status != "running")
		{
			// Change the status
			this.setStatus("running")

			// SWITCH SCENE
			UI.hideElement(".sessionManager", 350, () =>
			{
				UI.showElement(".game", 350, () =>
				{
					// Start the audio
					UI.setAudio("calm")

					// Start the timer
					UI.startTimer(this.getDifficulty().timer, () =>
					{
						this.stop()
					})
				})
			})

			// Change audio when half of the time has passed
			setTimeout(() =>
			{
				UI.setAudio("stress")

				// Add the flash effect on the input
				$("#answer").addClass("flash")
				$("#equation").addClass("flash")
			}, ((this.getDifficulty().timer + 1) / 2 * 1000))
		}
	}

	// FUNCTION: Stops the game
	stop()
	{
		// LOGGING
		console.log(" GC: Game stopped")

		let status = this.getStatus()
		if (status == "running")
		{
			this.setStatus("stopped")

			// SWITCH SCENE
			UI.hideElement(".game", 350, () =>
			{
				UI.showElement(".sessionManager", 350)

				// Reset the timer's state
				UI.resetTimer()

				// Remove the flash effect on the input
				$("#answer").removeClass("flash")
				$("#equation").removeClass("flash")

				// Stops the audio
				UI.setAudio("stopped")

				// Alert session
				Session.stop()
			})
		}
	}

}

exports = Game