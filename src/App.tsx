import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface Chip {
    id: number;
    label: string;
  }

function App() {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [show, setShow]=useState(null);
  const [isSearchBarActive, setIsSearchBarActive] = useState<boolean>(false);


  const items: string[] = ["Marina Augstine", "Anita Gross", "Martin Smith", "Bob Williams", "Nick Giannopoulos"];

  useEffect(() => {
    setFilteredItems(items.filter(item => !chips.find(chip => chip.label === item)));
  }, [chips]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (inputRef.current === document.activeElement && value.trim() === '') {
      setFilteredItems(items.filter(item => !chips.find(chip => chip.label === item)));
    } else {
      setFilteredItems([]);
    }
  };

  const handleItemClick = (item: string) => {
    setChips([...chips, { id: Date.now(), label: item }]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleChipRemove = (chipId: number) => {
    setChips(chips.filter(chip => chip.id !== chipId));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputRef.current === document.activeElement) {
      setFilteredItems(items.filter(item => !chips.find(chip => chip.label === item)));
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
    <div style={{display:'block', position:'absolute'}}>
      <div style={{display:'flex', columnGap:4,alignItems:'center',position:'absolute'}}>
        {chips.map(chip => (
          <div key={chip.id} style={{backgroundColor:'lightgray',
                                    color:'black',
                                    padding:4,
                                    borderRadius:10,
                                    }}>
            {chip.label}
            <button style={{marginLeft:12}}  onClick={() => handleChipRemove(chip.id)}>X</button>
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        style={{
          width:600,
          height:40,
          borderRadius:10,
          marginTop:20,
          zIndex:-1
        }}
        placeholder="Type to search..."
      />
      <div>
        {filteredItems.map(item => (
          <div key={item}  onClick={() => handleItemClick(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;



