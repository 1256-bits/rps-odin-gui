//RPS no gui

const rps = (player, ai) => {

}

const plInput = () => prompt("[R]ock, [P]aper, [S]cissors");

const aiInput = () => {
	const rps = {0: "R", 1: "P", 2: "S" };
	return rps[Math.trunc(Math.random()*3)];
}

