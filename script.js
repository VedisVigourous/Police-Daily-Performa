const rows = document.getElementById('rows');
const page = document.querySelector('.page');
const imageButton = document.getElementById('image-button');
const printButton = document.getElementById('print-button');
const topButton = document.getElementById('top-button');
const noteInput = document.querySelector('.note-input');
const printNoteContent = document.getElementById('print-note-content');
const downloadLink = document.getElementById('download-link');

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

const exportAsImage = async () => {
	if (!page || !downloadLink || typeof window.html2canvas !== 'function') {
		return;
	}

	const exportPadding = 32;
	const wrapper = document.createElement('div');
	wrapper.style.position = 'fixed';
	wrapper.style.left = '-10000px';
	wrapper.style.top = '0';
	wrapper.style.padding = `${exportPadding}px`;
	wrapper.style.background = '#ffffff';
	wrapper.style.width = `${page.scrollWidth + (exportPadding * 2)}px`;
	wrapper.style.height = 'auto';

	const clone = page.cloneNode(true);
	clone.style.margin = '0';
	clone.style.width = '100%';
	wrapper.appendChild(clone);
	document.body.appendChild(wrapper);

	const canvas = await window.html2canvas(wrapper, {
		backgroundColor: '#ffffff',
		scale: 2,
		useCORS: true,
		scrollX: 0,
		scrollY: -window.scrollY,
		windowWidth: wrapper.scrollWidth,
		windowHeight: wrapper.scrollHeight,
	});

	wrapper.remove();

	downloadLink.href = canvas.toDataURL('image/png');
	downloadLink.click();
};

if (printButton) {
	printButton.addEventListener('click', () => window.print());
}

if (imageButton) {
	imageButton.addEventListener('click', exportAsImage);
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
