// src/App.tsx
import NeumorphicCard from './components/ui/NeumorphicCard';
import NeumorphicButton from './components/ui/NeumorphicButton';
import NeumorphicInput from './components/ui/NeumorphicInput';
import { useState } from 'react';
import { GridProvider, useGrid } from './contexts/GridContext'; // Import GridProvider and useGrid
import GridContainer from './components/GridContainer'; // Import GridContainer

function AppContent() {
  const [inputValue, setInputValue] = useState('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const { dispatch } = useGrid(); // Get dispatch from context

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] text-[var(--color-text-light)] p-8 flex flex-col items-center space-y-12">
      <h1 className="text-4xl font-bold text-[var(--color-text-light)] mb-12">Tagesbegleiter - Neumorphic Demo</h1>

      <NeumorphicCard className="w-full max-w-md" padding="p-4">
        <h2 className="text-xl font-semibold mb-2">Grid Controls</h2>
        <NeumorphicButton onClick={() => dispatch({ type: 'TOGGLE_GRID_LINES' })}>
          Toggle Grid Lines
        </NeumorphicButton>
      </NeumorphicCard>

      {/* Wrap the content display area with GridContainer */}
      <GridContainer className="w-full max-w-3xl min-h-[400px] bg-opacity-50 bg-[var(--color-bg-light)] shadow-[var(--shadow-light-inset)] rounded-[var(--border-radius-lg)]">
        {/* Placeholder for where tiles will go. For now, it's empty or shows debug cells */}
        {/* Example of placing a neumorphic card inside for structure testing */}
        <NeumorphicCard
            className="col-start-1 row-start-1"
            style={{ gridColumn: 'span 2', gridRow: 'span 1'}} // Example of manual placement
        >
            A sample card in grid
        </NeumorphicCard>
      </GridContainer>

      {/* Other demo sections from P2.4 (now outside the main GridContainer for simplicity) */}
      {/* Section for NeumorphicCard (original demo) */}
      <NeumorphicCard className="w-full max-w-md" padding="p-8">
        <h2 className="text-2xl font-semibold mb-4">Neumorphic Card (Original Demo)</h2>
        <p>This is a NeumorphicCard. It can contain any content you like.</p>
        <NeumorphicInput
          value="Read-only inside card"
          readOnly
          className="mt-4 w-full"
        />
      </NeumorphicCard>

      {/* Section for NeumorphicButton (original demo) */}
      <NeumorphicCard className="w-full max-w-md" padding="p-8">
        <h2 className="text-2xl font-semibold mb-4">Neumorphic Buttons (Original Demo)</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <NeumorphicButton onClick={() => alert('Button clicked!')}>
            Click Me
          </NeumorphicButton>
          <NeumorphicButton isPressed={isButtonPressed} onClick={() => setIsButtonPressed(!isButtonPressed)}>
            {isButtonPressed ? 'Pressed State' : 'Toggle Press'}
          </NeumorphicButton>
          <NeumorphicButton disabled>
            Disabled Button
          </NeumorphicButton>
        </div>
      </NeumorphicCard>

      {/* Section for NeumorphicInput (original demo) */}
      <NeumorphicCard className="w-full max-w-md" padding="p-8">
        <h2 className="text-2xl font-semibold mb-4">Neumorphic Input (Original Demo)</h2>
        <div className="space-y-4">
          <NeumorphicInput
            placeholder="Enter text here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="Normal Input"
          />
          <NeumorphicInput
            placeholder="Disabled input"
            disabled
            aria-label="Disabled Input"
          />
        </div>
        {inputValue && <p className="mt-4">Input Value: {inputValue}</p>}
      </NeumorphicCard>

      {/* Theme toggle example (conceptual) (original demo) */}
      <NeumorphicCard className="w-full max-w-md" padding="p-8">
        <h2 className="text-2xl font-semibold mb-4">Theme Toggle (Conceptual) (Original Demo)</h2>
        <p className="mb-2">This button would toggle the dark theme.</p>
        <NeumorphicButton
          onClick={() => {
            document.body.classList.toggle('dark-theme');
          }}
        >
          Toggle Dark Theme
        </NeumorphicButton>
         <p className="mt-2 text-sm">
            (Actual theme state management will be handled by ThemeContext later)
          </p>
      </NeumorphicCard>
    </div>
  );
}

function App() { // New App component that includes the provider
  return (
    <GridProvider>
      <AppContent />
    </GridProvider>
  );
}

export default App;
