
export function setWinner(winner) {
	return { winner };
}

export function setWinnerName(winnerName) {
	return { winnerName };
}

export function resetState(defaultObj) {
	return defaultObj;
}

export function updateStateValues(state, obj) {
	const newState = Object.assign(state, obj);

	return newState;
}

export function setNewHistory(history, newValues) {
	const newHistory = [...history];
	newHistory.push(newValues);
	return newHistory;
}

export function defaultState() {
	const defaultValues = Array(9).fill('');

	return {
		currentText: 'O',
		values: defaultValues,
		winner: null,
		history: [],
		gameover: false
	};
}
/*===========================================================================================
  _____                _           _ _     _       _____                
 | ____| __ _ ___  ___| |__  _   _(_) | __| |     | __  | ___   __ _ ___ ______
 | |_   / _` /  _|/ _ \ '_ \| | | | | |/ _` |_____| |/ / / _ \ / _` /  _|_  __/
 |  _| | (_|   |_   __/ |_) | |_| | | | (_| |_____|  \ \|  __/| (_|   |_  | |
 |_|    \__,_\___|\___|_.__/ \__,_|_|_|\__,_|     |_| \_\\___| \__,_\___| |_|
                                                                                
===========================================================================================*/