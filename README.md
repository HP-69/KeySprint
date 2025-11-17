# MonkeyType Clone 🐵

A beautiful, feature-complete clone of MonkeyType - the minimalist typing test application. Built with vanilla JavaScript, HTML, and CSS.

## Screenshots

### Default Dark Theme
![MonkeyType Clone - Dark Theme](https://github.com/user-attachments/assets/352f3471-b1c3-4c8f-a13c-c4c08d2896c2)

### Typing in Progress
![Typing in Progress](https://github.com/user-attachments/assets/ad41325a-dbad-4e7c-82b5-4d7d0cc5cab5)

### Settings Panel
![Settings Panel](https://github.com/user-attachments/assets/f6dfeac2-fcec-45de-95f8-6d1a2307ed4a)

### Serika Theme
![Serika Theme](https://github.com/user-attachments/assets/bd84921b-1771-4d29-8357-9d44828b29a5)

### Time Mode
![Time Mode](https://github.com/user-attachments/assets/38a11a16-ab2c-4af0-aa32-d55be8339832)

## Features ✨

### Typing Test Modes
- **Word Count Mode**: Test with 10, 25, 50, or 100 words
- **Time Mode**: Test for 15s, 30s, 60s, or 120s
- Real-time word highlighting and validation
- Smooth caret animation
- Accurate character-by-character feedback

### Statistics & Analytics
- **Live Statistics**: Real-time WPM, accuracy, and raw WPM during test
- **Detailed Results**: 
  - Words Per Minute (WPM)
  - Accuracy percentage
  - Raw WPM (including errors)
  - Consistency score
  - Character breakdown (correct/incorrect/extra/missed)

### Customization
- **Multiple Themes**:
  - Dark (default)
  - Light
  - Serika
  - Dracula
- **Test Options**:
  - Punctuation toggle
  - Numbers toggle
  - Sound effects toggle

### User Experience
- Minimalist, distraction-free design
- Smooth animations and transitions
- Blur effect when unfocused
- Keyboard shortcuts (Tab+Shift to restart, Esc to unfocus)
- Responsive design for all screen sizes
- Focus management

## Installation 🚀

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Bootysl4ppa/monkey-type-clone.git
cd monkey-type-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage 📝

1. **Select Test Mode**: Choose between word count or time mode
2. **Configure Settings**: Click the settings icon to customize theme and options
3. **Start Typing**: Click on the typing area and start typing the displayed words
4. **View Results**: After completing the test, see your detailed statistics
5. **Restart**: Click the restart button or use Tab+Shift keyboard shortcut

### Keyboard Shortcuts
- **Space**: Move to next word
- **Tab + Shift**: Restart test
- **Escape**: Unfocus typing area

## Technical Details 🛠️

### Technologies Used
- Pure Vanilla JavaScript (ES6+)
- HTML5
- CSS3 (with CSS Variables for theming)
- Express.js (for serving)
- Roboto Mono font (from Google Fonts)

### Key Features Implementation

#### Word Generation
- Randomized word selection from a curated word list
- Optional punctuation and numbers
- Dynamic word count based on mode

#### WPM Calculation
- Standard WPM formula: (characters typed / 5) / time in minutes
- Real-time updates during typing
- Separate raw WPM calculation including errors

#### Accuracy Tracking
- Character-by-character validation
- Real-time accuracy percentage
- Detailed character breakdown (correct/incorrect/extra/missed)

#### Consistency Score
- Statistical analysis of WPM variation
- Standard deviation calculation
- Normalized to percentage

#### Theme System
- CSS Custom Properties (variables)
- Theme persistence using localStorage
- Smooth theme transitions

## Project Structure 📁

```
monkey-type-clone/
├── public/
│   ├── index.html          # Main HTML structure
│   ├── styles.css          # All styles and themes
│   ├── app.js              # Main application logic
│   └── words.js            # Word database
├── server.js               # Express server
├── package.json            # Dependencies and scripts
└── README.md              # Documentation
```

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

MIT License - feel free to use this project for learning or personal use.

## Acknowledgments 🙏

- Inspired by [MonkeyType](https://monkeytype.com/)
- Built as a learning project to understand typing test mechanics
- Font: Roboto Mono by Google Fonts

## Future Enhancements 💡

Potential features to add:
- Quote mode
- Custom text mode
- Language selection
- User accounts and history
- Leaderboards
- More themes
- Chart visualization of WPM over time
- Replay functionality

---

Made with ❤️ by the community
