import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface Chip {
  id: number;
  label: string;
  image: string;
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<Chip[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const items: Chip[] = [
    { id: 1, label: "Marina Augstine", image: "/profile.jpg" },
    { id: 2, label: "Anita Gross", image: "/profile.jpg" },
    { id: 3, label: "Martin Smith", image: "/profile.jpg" },
    { id: 4, label: "Bob Williams", image: "/profile.jpg" },
    { id: 5, label: "Nick Giannopoulos", image: "/profile.jpg" },
  ];

  useEffect(() => {
    setFilteredItems(items.filter(item => !chips.find(chip => chip.label === item.label)));
  }, [chips]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim() === '' || value === '') {
      setFilteredItems(items.filter(item => !chips.find(chip => chip.label === item.label)));
    } else if (inputRef.current === document.activeElement) {
      setFilteredItems(items.filter(item => item.label.toLowerCase().includes(value.toLowerCase()) && !chips.find(chip => chip.label === item.label)));
    }
  };

  const handleItemClick = (item: Chip) => {
    setChips([...chips, { id: Date.now(), label: item.label, image: item.image }]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const toggleDropdown = () => {
    setIsOpen(false);
  };

  const handleChipRemove = (chipId: number) => {
    setChips(chips.filter(chip => chip.id !== chipId));
    setInputValue('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputRef.current === document.activeElement) {
      setFilteredItems(items.filter(item => !chips.find(chip => chip.label === item.label)));
      setIsOpen(!isOpen);

    }

    if (event.key === 'Backspace' && inputValue === '') {
      const lastChip = chips[chips.length - 1];
      if (lastChip) {
        handleChipRemove(lastChip.id);
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex'}}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onDoubleClick={toggleDropdown}
          style={{
            display:'flex',
            borderRadius: 10,
            width:600,
            marginLeft: 4,
          }}
          placeholder={chips.map(chip => chip.label).join(', ')}
        />
        {chips.map(chip => (
          <div key={chip.id} style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'lightgray',
            color: 'black',
            padding: 4,
            borderRadius: 10,
            marginRight: 4,
            marginBottom: 4
          }}>
            <img
              src={`${chip.image}`}
              alt={chip.label}
              style={{ width: 24, height: 24, marginRight: 4, borderRadius: '50%' }}
            />
            {chip.label}
            <button style={{ marginLeft: 4 }} onClick={() => handleChipRemove(chip.id)}>X</button>
          </div>
        ))}
      </div>

      <div>
        {isOpen && filteredItems.map(item => (
          <div key={item.id} style={{ color: 'black', marginTop: 10 }} onClick={() => handleItemClick(item)}>
            <img src={item.image} alt={item.label} style={{ marginRight: 8, borderRadius: '50%', width: 30, height: 30 }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
