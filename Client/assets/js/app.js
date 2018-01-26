// SLAM1 - Loading System 
// VERSION 3.00, latest updated: 
// TARTIERE Kevin 

require.config(
{

	baseUrl: "./assets/js/",
	paths:
	{
		settings: "settings",

		jquery: "lib/jquery",
		ui: "lib/jquery-ui",
		io: "lib/socket.io",

		SM: "Session/Manager",
		UI: "Game/UI",

		"Game": "Game/Game",
		"Player": "Game/Player",
		"OP": "Game/OP"

	}

})

require(["settings", "jquery", "ui", "io"], (settings, $, ui, io) =>
{
	socket = io("ws." + window.location.hostname)

	require(["SM", "UI", "Game", "Player", "OP"], () =>
	{
		Session = new SessionManager()
		Session.listen()

		UI = new UI()
		UI.listen()

		Player = new Player()
	})
})