document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const gridContainer = document.getElementById('gridContainer');

    textInput.addEventListener('input', (e) => {
        const text = e.target.value;
        renderGrid(text);
    });

    function renderGrid(text) {
        gridContainer.innerHTML = '';

        if (!text) {
            gridContainer.innerHTML = '<div class="empty-state">Start typing to see the magic happen.</div>';
            return;
        }

        // Use Array.from to correctly handle surrogate pairs and emojis
        const characters = Array.from(text);
        let byteOffset = 0;

        characters.forEach((char, index) => {
            const card = createCharCard(char, index, byteOffset);
            gridContainer.appendChild(card);

            // Calculate bytes for next offset
            const encoder = new TextEncoder();
            byteOffset += encoder.encode(char).length;
        });
    }

    function createCharCard(char, index, byteOffset) {
        const card = document.createElement('div');
        card.className = 'char-card';

        // Handle whitespace characters for display
        let displayChar = char;
        if (char === ' ') displayChar = '␣';
        else if (char === '\n') displayChar = '↵';
        else if (char === '\t') displayChar = '⇥';

        // Get Unicode code point
        const codePoint = char.codePointAt(0);
        const isAscii = codePoint < 128;

        // Detect special characters:
        // 1. Control characters (\p{C}) - Include all (e.g. \n, \t)
        const isControl = /\p{C}/u.test(char);

        // 2. Symbols (\p{S}) - Exclude ASCII symbols (like <, >, =, $)
        const isSymbol = /\p{S}/u.test(char) && !isAscii;

        // 3. Separators (\p{Z}) - Exclude regular space
        const isSeparator = /\p{Z}/u.test(char) && char !== ' ';

        // 4. Non-Latin Letters (\p{L} && !\p{Script=Latin})
        const isNonLatinLetter = /\p{L}/u.test(char) && !/\p{Script=Latin}/u.test(char);

        const isSpecial = isControl || isSymbol || isSeparator || isNonLatinLetter;

        if (isSpecial) {
            card.classList.add('special-char');
        } else if (!isAscii) {
            // Multi-byte characters (Code Point > 127) that are not special
            // e.g. Accented Latin characters
            card.classList.add('multi-byte-char');
        }

        // Get Unicode code point string
        const hexCode = 'U+' + codePoint.toString(16).toUpperCase().padStart(4, '0');

        // Get UTF-8 bytes
        const encoder = new TextEncoder();
        const utf8Bytes = encoder.encode(char);
        const utf8Hex = Array.from(utf8Bytes)
            .map(b => b.toString(16).toUpperCase().padStart(2, '0'))
            .join(' ');

        card.innerHTML = `
            <span class="char-position">${index + 1}</span>
            <div class="char-display">${displayChar}</div>
            <div class="char-meta">
                <div class="char-code-point">${hexCode}</div>
                <div class="char-utf8">${utf8Hex}</div>
            </div>
            <span class="byte-counter">${byteOffset}</span>
        `;

        return card;
    }
});
