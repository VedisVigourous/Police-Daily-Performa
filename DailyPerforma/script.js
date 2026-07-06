const rows = document.getElementById('rows');
const printButton = document.getElementById('print-button');
const topButton = document.getElementById('top-button');
const noteInput = document.querySelector('.note-input');
const printNoteContent = document.getElementById('print-note-content');

const columnConfigs = [
	{ placeholder: 'Event ID' },
	{ placeholder: 'Police Station' },
	{ placeholder: 'DD/MM/YYYY HH:MM' },
	{ placeholder: 'Call head and gist of call', multiline: true },
	{ placeholder: 'MPV call sign' },
	{ placeholder: 'MPV RCD time' },
	{ placeholder: 'LP reach time' },
	{ placeholder: 'Total time taken by LP' },
	{ placeholder: 'Name of IO' },
	{ placeholder: 'Yes / No / N.A.', multiline: true },
];

for (let i = 1; i <= 10; i += 1) {
	const tr = document.createElement('tr');

	const snoCell = document.createElement('td');
	const snoInput = document.createElement('input');
	snoInput.className = 'cell-input serial';
	snoInput.value = i;
	snoInput.readOnly = true;
	snoInput.tabIndex = -1;
	snoInput.setAttribute('aria-label', `Serial number ${i}`);
	snoCell.appendChild(snoInput);
	tr.appendChild(snoCell);

	columnConfigs.forEach((config) => {
		const td = document.createElement('td');
		const input = document.createElement('textarea');
		input.className = config.multiline ? 'cell-input wrap' : 'cell-input';
		input.setAttribute('aria-label', `${config.placeholder} row ${i}`);
		td.appendChild(input);
		tr.appendChild(td);
	});

	rows.appendChild(tr);
}

const autoGrow = (element) => {
	element.style.height = 'auto';
	element.style.height = `${element.scrollHeight}px`;
};

const bindAutoGrow = () => {
	document.querySelectorAll('.cell-input, .note-input').forEach((element) => {
		autoGrow(element);
		element.addEventListener('input', () => autoGrow(element));
	});
};

const syncPrintNote = () => {
	if (printNoteContent && noteInput) {
		printNoteContent.textContent = noteInput.value;
	}
};

if (printButton) {
	printButton.addEventListener('click', () => window.print());
}

if (topButton) {
	topButton.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
}

if (noteInput) {
	noteInput.addEventListener('input', syncPrintNote);
	syncPrintNote();
}

bindAutoGrow();
