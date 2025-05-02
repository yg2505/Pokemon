import React, { useState } from 'react';
import './type.css';  

const typeOptions = [
  'fire', 'water', 'grass', 'electric', 'bug', 'normal', 'poison',
  'flying', 'ground', 'fairy', 'rock', 'psychic', 'ice',
  'dragon', 'dark', 'steel', 'fighting',
];

const TypeDropdown = ({ selectedTypes, setSelectedTypes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedTypes((prevSelected) =>
      prevSelected.includes(type)
        ? prevSelected.filter((t) => t !== type)
        : [...prevSelected, type]
    );
  };

  const handleDone = () => setIsOpen(false);

  return (
    <div className="type-filters">
      <button onClick={toggleDropdown}>
        {selectedTypes.length > 0
          ? `${selectedTypes.length} Selected`
          : 'Select Types'}
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-scroll">
            {typeOptions.map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  value={type}
                  checked={selectedTypes.includes(type)}
                  onChange={handleTypeChange}
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>

          <div className="done-button-container">
            <button onClick={handleDone} className="done-button">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeDropdown;
