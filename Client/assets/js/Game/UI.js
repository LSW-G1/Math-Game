// SLAM1 - UI
// VERSION 3.00, latest updated: 
// 

class UI
{

	constructor()
	{
		this.timer
	}

	// FUNCTION: Listen the UI events
	listen()
	{
		// EVENT: Player clicks on join a session
		$("#HJoin").on("click", () =>
		{
			this.hideElement(".home", 350, () =>
			{
				this.showElement(".sessionManager", 350)
			})
		})


		// EVENT: Player confirms his informations
		$("#SMConfirm").on("click", () =>
		{
			// FORM VALIDATION
			let username = $("#SMUsername")
			let sessionName = $("#SMName")

			if ((username.val().length) && (sessionName.val().length))
			{
				// Block inputs
				username[0].readOnly = true
				sessionName[0].readOnly = true
				$("#SMConfirm")[0].disabled = true

				// Set Player's username
				Player.setUsername(username.val())

				// SWITCH SCENE
				this.hideElement("#SMActions", 350, () =>
				{
					$(".sessionManager > .subtitle").text("Joining the session...")
					this.showElement(".playersList", 350, () =>
					{
						// Join the session
						Session.join(sessionName.val(), username.val())
					})
				})
			}
		})

		// EVENT: Host clicks on "Play"
		$("#SMPlay").on("click", (data) =>
		{
			Session.start()
		})

		// EVENT: Player input
		$("#answer").on("keyup", () =>
		{
			Session.getOP().checkAnswer()
		})

	}



	// FUNCTION: Hide an element, with a transition
	hideElement(element, time, callback)
	{
		let html = $(element)
		html.fadeTo(time, 0, () =>
		{
			html.addClass("hidden delete")

			if (callback)
			{
				callback()
			}
		})
	}

	// FUNCTION: Show an element, with a transition
	showElement(element, time, callback)
	{
		let html = $(element)

		html.removeClass("hidden delete")
		html.fadeTo(time, 1, () =>
		{
			if (callback)
			{
				callback()
			}
		})
	}



	// FUNCTION: Display players
	displayPlayers(players, owner)
	{
		$(".playersList > .players").text("")
		players.forEach((player) =>
		{
			if (player.username == owner)
			{
				$(".playersList > .players").append("<li>" + player.score + " - <b>" + player.username + "</b></li>")
			}
			else
			{
				$(".playersList > .players").append("<li>" + player.score + " - " + player.username + "</li>")
			}
		})
	}

	// FUNCTION: Display operation
	displayOP(integer_1, integer_2, operation, result)
	{
		$(".equation").text(integer_1 + " " + operation + " " + integer_2)
	}



	// FUNCTION: Timer. Because Stress
	startTimer(time, callback)
	{
		$(".timer").css(
		{
			"animation": "timer " + time + "s linear forwards",
		})

		clearTimeout(this.timer)

		this.timer = setTimeout(() =>
		{
			this.resetTimer(callback)
		}, (time) * 1000)
	}

	// FUNCTION: Reset Timer. Because less stress.
	resetTimer(callback)
	{
		$(".timer").css(
		{
			"animation": "stopTimer .350s linear forwards",
		})

		if (callback)
		{
			callback()
		}
	}



	// FUNCTION: Flash to alert the user
	alert()
	{
		$("#alert").css(
		{
			"animation": "alert .750s linear forwards"
		})

		setTimeout(() =>
		{
			this.resetAlert()
		}, 750)
	}

	// FUNCTION: Resets the alert
	resetAlert()
	{
		$("#alert").css(
		{
			"animation": ""
		})
	}



	// FUNCTION: Clear the Input
	clearInput()
	{
		$("#answer").val("")
	}



	// FUNCTION: Set Waiting Text to Host
	setHost()
	{
		$(".sessionManager > .subtitle").text("").append("<p>You are the host</p>")
	}

	// FUNCTION: Set Waiting Text to Client
	setClient()
	{
		$(".sessionManager > .subtitle").text("").append("<p>Waiting for host...</p>")
	}

	// FUNCTION: Set Waiting Text to Running
	setRunning()
	{
		$(".sessionManager > .subtitle").text("").append("<p>Waiting for the game to finish...</p>")
	}


	// FUNCTION: Audio. Because Music.
	setAudio(type)
	{
		// FUNCTION: starts the music
		var music_calm = $(".calm")
		var music_stress = $(".stress")

		if (type == "calm")
		{
			music_stress.animate(
			{
				volume: 0
			}, 750, () =>
			{
				music_stress[0].pause()
				music_stress[0].currentTime = 0
			})

			music_calm[0].play()
			music_calm.animate(
			{
				volume: .50
			}, 500)
		}

		if (type == "stress")
		{
			music_calm.animate(
			{
				volume: 0
			}, 750, () =>
			{
				music_calm[0].pause()
				music_calm[0].currentTime = 0
			})

			music_stress[0].play()
			music_stress.animate(
			{
				volume: .50
			}, 500)
		}

		if (type == "stopped")
		{
			music_calm.animate(
			{
				volume: 0
			}, 250, () =>
			{
				music_calm[0].pause()
				music_calm[0].currentTime = 0
			})

			music_stress.animate(
			{
				volume: 0
			}, 250, () =>
			{
				music_stress[0].pause()
				music_stress[0].currentTime = 0
			})
		}
	}

}

exports = UI