# 🤖 Whispr - Desktop AI Chatbot

A modern desktop chatbot application built with Electron, React, and Tailwind CSS, powered by Google Gemini AI. Features a floating window that can be toggled with global hotkeys and runs in the system tray.

## Features

- 🤖 **AI-Powered**: Full integration with Google Gemini AI for intelligent conversations
- 🚀 **Global Hotkey**: Press `Ctrl+L` to show/hide the chatbot window from anywhere
- 🔄 **System Tray**: Minimize to tray instead of closing, with context menu options
- 🪟 **Floating Window**: Frameless, always-on-top window positioned at bottom-right
- 🎨 **Modern UI**: Beautiful interface built with React and Tailwind CSS
- 🔒 **Secure**: Uses Electron's security best practices with context isolation
- 🌐 **Cross-platform**: Works on Windows, macOS, and Linux
- ⚡ **Real-time**: Instant AI responses with typing indicators and error handling

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download this project**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

   This will:
   - Start the React development server on http://localhost:3000
   - Launch the Electron app automatically
   - Enable hot reload for development

4. **Try the global hotkey:**
   - Press `Ctrl+L` to toggle the chatbot window
   - Right-click the system tray icon for options

## Usage

### Global Hotkey
- **`Ctrl+L`** (or `Cmd+L` on macOS): Toggle chatbot window visibility

### System Tray
- **Left-click**: Toggle window visibility
- **Right-click**: Show context menu with options to show/hide or quit

### Window Behavior
- Frameless design with custom header
- Fixed size (400x600 pixels)
- Always appears at bottom-right of screen
- Stays on top of other windows
- Doesn't appear in taskbar
- Closing the window minimizes to tray instead of quitting

## Building for Production

### Development Build
```bash
npm run build
```

### Create Distributable Package
```bash
npm run dist
```

This creates platform-specific distributables in the `dist/` folder:
- **Windows**: `.exe` installer
- **macOS**: `.dmg` disk image
- **Linux**: `.AppImage` executable

### Pack Without Installer
```bash
npm run pack
```

## Project Structure

```
desktop-chatbot/
├── public/
│   ├── main.js          # Electron main process
│   ├── electron.js      # Electron entry point
│   ├── preload.js       # Preload script for security
│   └── index.html       # HTML template
├── src/
│   ├── components/
│   │   ├── ChatWindow.js # Main chat interface
│   │   ├── Chat/        # Chat-related components
│   │   └── UI/          # UI components
│   ├── utils/
│   │   ├── textFormatter.js # Text formatting utilities
│   │   └── messageUtils.js  # Message handling utilities
│   ├── hooks/           # Custom React hooks
│   ├── constants/       # Application constants
│   ├── Image/           # Image assets
│   ├── App.js           # Main React component
│   ├── index.js         # React entry point
│   └── index.css        # Tailwind CSS imports
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## Customization

### AI Configuration

To customize the AI behavior, modify the relevant configuration in your chat components:

1. **API Integration**: Update API keys and endpoints in your chat handling logic
2. **Model Settings**: Modify model configurations in your chat components
3. **Custom Prompts**: Add system prompts or conversation context as needed
4. **Alternative AI**: Replace or integrate different AI services by modifying the response generation logic

### Styling

The app uses Tailwind CSS with a custom dark theme. Modify colors in `tailwind.config.js`:

```js
colors: {
  'chat-bg': '#0f172a',       // Main background
  'chat-surface': '#1e293b',  // Surface elements
  'chat-border': '#334155',   // Borders
  'chat-primary': '#3b82f6',  // Primary color
  'chat-secondary': '#64748b' // Secondary color
}
```

### Icons and Assets

Customize the application icons and images:
1. **Tray Icon**: Add your custom tray icon to the application
2. **Application Icon**: Set your own application icon in the Electron main process
3. **UI Assets**: Add custom images to the `src/Image/` directory for use in the interface

### Window Settings

Modify window properties in `public/main.js`:

```js
const windowWidth = 400;   // Window width
const windowHeight = 600;  // Window height
const x = screenWidth - windowWidth - 20;  // X position
const y = screenHeight - windowHeight - 40; // Y position
```

## Development

### Available Scripts

- `npm start` - Start development with hot reload
- `npm run react-start` - Start only React dev server
- `npm run build` - Build React app for production
- `npm run dist` - Build and package for distribution
- `npm run pack` - Package without creating installer

### Security

The app follows Electron security best practices:
- Node integration disabled in renderer
- Context isolation enabled
- Preload script for secure IPC communication
- CSP headers and secure defaults

## Troubleshooting

### Global Hotkey Not Working
- Make sure no other application is using `Ctrl+L`
- Try running as administrator on Windows
- Check console for registration errors

### Window Not Showing
- Press `Ctrl+L` to toggle visibility
- Check system tray for the app icon
- Restart the application

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Make sure you have the latest Node.js version
- On Windows, you might need Visual Studio Build Tools for native dependencies

## Future Enhancements

- [x] ~~OpenAI GPT integration~~ **Completed with Gemini AI**
- [ ] Custom AI model support
- [ ] Conversation history persistence
- [ ] Multiple chat themes
- [ ] Voice input/output
- [ ] Plugin system
- [ ] Multi-language support
- [ ] Context-aware conversations
- [ ] File upload and analysis
- [ ] Export chat history

## License

MIT License - feel free to use this project as a starting point for your own desktop chatbot applications.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change. 