// SLAM1 - OP
// VERSION 3.00, latest updated: 
//

class OP
{
	constructor()
	{
		this.integer_1
		this.integer_2
		this.operation

		this.result
	}

	// FUNCTION: Generates a random number between min and max
	RNG(min, max)
	{
		return Math.round(Math.random() * (max - min) + min)
	}

	// FUNCTION: Generatates an mathematical problem
	generate(difficulty)
	{
		// RANDOM GENERATION
		this.integer_1 = this.RNG(difficulty.range[0], difficulty.range[1])
		this.integer_2 = this.RNG(difficulty.range[0], difficulty.range[1])
		this.operation = settings.operations[this.RNG(difficulty.operations[0], difficulty.operations[1])]

		// SAVE IN this.results, DIFFERENT DEPENDING ON THE OPERATION
		if (this.operation === "+")
		{
			this.result = (this.integer_1 + this.integer_2)
		}
		else if (this.operation === "-")
		{
			this.result = (this.integer_1 - this.integer_2)
		}
		else if (this.operation === "x")
		{
			this.result = (this.integer_1 * this.integer_2)
		}
		else if (this.operation === "/")
		{
			this.integer_1 = (this.integer_1 * this.integer_2)
			this.result = (this.integer_1 / this.integer_2)
		}
	}

	// FUNCTION: Returns the current OP
	get()
	{
		return {
			integer_1: this.integer_1,
			integer_2: this.integer_2,
			operation: this.operation,
			result: this.result
		}
	}

	// FUNCTION: Forces an OP
	force(data)
	{
		this.integer_1 = data.integer_1
		this.integer_2 = data.integer_2
		this.operation = data.operation

		this.result = data.result
		UI.displayOP(this.integer_1, this.integer_2, this.operation, this.result)
	}

	// FUNCTION: Check the answer
	checkAnswer()
	{
		// LOGING
		console.log(" GC: Checking Answer")

		var value = $("#answer").val()
		var expected = this.result

		if (value == expected)
		{
			Player.setScore(Player.getScore() + 1)
			Session.startRound()
		}
	}
}

exports = OP