# Unicode Display

A simple web tool to inspect text character by character, revealing Unicode Code Points and UTF-8 byte sequences.

## Purpose

The main purpose of this tool is to help developers and users verify text data, identify encoding issues, and visualize how characters are represented in memory. It is particularly useful for spotting:
- Hidden control characters.
- Differences between similar-looking characters.
- Multi-byte character encoding (UTF-8).
- Surrogate pairs and emoji composition.

## Features

- **Real-time Grid Display**: Type or paste text to see it broken down into individual characters.
- **Detailed Info**: Each card shows:
    - **Position**: The character's index in the string (1-based).
    - **Character**: The visual representation.
    - **Code Point**: The Unicode identifier (e.g., `U+0041`).
    - **UTF-8 Bytes**: The hexadecimal byte sequence used to represent the character in UTF-8 (e.g., `41` or `E5 9B BD`).

## Highlighting Logic

The grid uses color coding to help distinguish different types of characters:

- **Default (Dark Blue)**: Standard ASCII characters (A-Z, a-z, 0-9) and ASCII symbols (<, >, =, $, etc.).
- **Orange (`#ea580c`)**: Special characters, including:
    - **Non-Latin Characters**: Chinese, Japanese, Arabic, etc. (e.g., `国`).
    - **Symbols & Emojis**: Non-ASCII symbols (e.g., `😀`).
    - **Control Characters**: Hidden characters like newlines or tabs.
- **Light Purple (`#c084fc`)**: Multi-byte characters that are **not** considered "special" by the above rules.
    - Primarily used for **Accented Latin** characters (e.g., `é`, `ñ`, `ü`) which take 2 bytes in UTF-8 but are still Latin script.

## Usage

Simply open `index.html` in any modern web browser. No installation or server is required.
