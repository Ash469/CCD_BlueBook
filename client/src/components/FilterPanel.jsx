import React from 'react';

// UI Components (these would typically be imported from your UI library)
const Card = ({ children, className }) => (
  <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg ${className || ''}`}>{children}</div>
);

const CardHeader = ({ children, className }) => (
  <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${className || ''}`}>{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-lg font-medium text-gray-900 dark:text-gray-100 ${className || ''}`}>{children}</h3>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className || ''}`}>{children}</div>
);

const Label = ({ children, htmlFor, className }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className || ''}`}>{children}</label>
);

// Simplified Select components
const Select = ({ value, onValueChange, children }) => {
  return (
    <select 
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="w-full p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
    >
      {children}
    </select>
  );
};

const SelectTrigger = ({ children, id }) => <div id={id}>{children}</div>;
const SelectValue = ({ placeholder }) => <div>{placeholder}</div>;
const SelectContent = ({ children }) => <>{children}</>;
const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;

// Simplified Slider component
const Slider = ({ min, max, step, value, onValueChange, className }) => {
  const handleMinChange = (e) => {
    const newMin = parseFloat(e.target.value);
    const [_, currentMax] = value;
    // Ensure min doesn't exceed max
    if (newMin <= currentMax - 0.1) {
      onValueChange([newMin, currentMax]);
    }
  };

  const handleMaxChange = (e) => {
    const newMax = parseFloat(e.target.value);
    const [currentMin, _] = value;
    // Ensure max doesn't go below min
    if (newMax >= currentMin + 0.1) {
      onValueChange([currentMin, newMax]);
    }
  };

  return (
    <div className={`relative h-10 ${className || ''}`}>
      {/* Base track */}
      <div className="absolute top-1/2 transform -translate-y-1/2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      
      {/* Filled track */}
      <div 
        className="absolute top-1/2 transform -translate-y-1/2 h-1.5 bg-blue-500 rounded-full"
        style={{ 
          left: `${((value[0] - min) / (max - min)) * 100}%`,
          width: `${((value[1] - value[0]) / (max - min)) * 100}%`
        }}
      ></div>
      
      {/* Min thumb */}
      <input 
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleMinChange}
        className="absolute w-full top-1/2 transform -translate-y-1/2 h-1.5 opacity-0 cursor-pointer z-20"
      />
      <div 
        className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white dark:bg-gray-100 border-2 border-blue-500 rounded-full pointer-events-none shadow-sm"
        style={{ left: `${((value[0] - min) / (max - min)) * 100}%` }}
      ></div>
      
      {/* Max thumb */}
      <input 
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={handleMaxChange}
        className="absolute w-full top-1/2 transform -translate-y-1/2 h-1.5 opacity-0 cursor-pointer z-20"
      />
      <div 
        className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white dark:bg-gray-100 border-2 border-blue-500 rounded-full pointer-events-none shadow-sm"
        style={{ left: `${((value[1] - min) / (max - min)) * 100}%` }}
      ></div>
    </div>
  );
};

const FilterPanel = ({ 
  branches, 
  interviewModes, 
  filters, 
  onFilterChange 
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Filter Experiences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="branch-filter">Branch</Label>
          <Select 
            value={filters.branch}
            onValueChange={(value) => onFilterChange({ ...filters, branch: value })}
          >
            <SelectItem value="All">All Branches</SelectItem>
            {branches.map((branch) => (
              <SelectItem key={branch} value={branch}>{branch}</SelectItem>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label>CPI Range</Label>
          <div className="pt-4 px-1">
            <Slider
              min={6}
              max={10}
              step={0.1}
              value={[filters.cpiRange[0], filters.cpiRange[1]]}
              onValueChange={(value) => onFilterChange({ ...filters, cpiRange: value })}
              className="mb-1"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{filters.cpiRange[0].toFixed(1)}</span>
              <span>{filters.cpiRange[1].toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mode-filter">Interview Mode</Label>
          <Select 
            value={filters.interviewMode}
            onValueChange={(value) => onFilterChange({ ...filters, interviewMode: value })}
          >
            <SelectItem value="All">All Modes</SelectItem>
            {interviewModes.map((mode) => (
              <SelectItem key={mode} value={mode}>{mode}</SelectItem>
            ))}
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;