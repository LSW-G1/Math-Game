// WS-Server - Client Class
// TiCubius
// V1.00

class Client
{

	constructor(socket)
	{
		this.id = socket.id
		this.username

		this.channels = []
		this.socket = socket
	}

	// FUNCTION: Get the ID of the Client
	getId()
	{
		return this.id
	}


	// FUNCTION: Get the username of the Client
	getUsername()
	{
		return this.username
	}

	// FUNCTION: Set the username of the Client
	setUsername(username)
	{
		this.username = username
	}


	// FUNCTION: Get the channels the Client is in
	getChannels()
	{
		return this.channels
	}

	// FUNCTION: Join a channel, if the Client's not already in
	joinChannel(channel)
	{
		if (this.channels.indexOf(channel) == -1)
		{
			this.socket.join(channel)
			this.channels.push(channel)

			return true
		}

		return false
	}

	// FUNCTION: Leave a channel, if the Client's already in
	leaveChannel(channel)
	{
		if (this.channels.indexOf(channel) != -1)
		{
			this.socket.leave(channel)
			this.channels.splice(this.channels.indexOf(channel, 1))

			return true
		}

		return false
	}

}

module.exports = Client