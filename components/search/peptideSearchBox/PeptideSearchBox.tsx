import React, { useState } from 'react';
import { Box, Tabs } from 'react-bulma-components';
import SingleQueryPeptideSearchBox from './SingleQueryPeptideSearchBox';
import MultiQueryPeptideSearchBox from './MultiQueryPeptideSearchBox';

type SearchMode = 'single' | 'multi';
const searchComponents: Record<SearchMode, React.FC> = {
  single: SingleQueryPeptideSearchBox,
  multi: MultiQueryPeptideSearchBox
};

const searchTabOptions = [
  { text: 'Single query', mode: 'single' as SearchMode },
  { text: 'Multi query', mode: 'multi' as SearchMode }
];

const PeptideSearchBox = () => {
  const [searchMode, setSearchMode] = useState<SearchMode>('single');
  const SearchComponent = searchComponents[searchMode];

  const handleSearchTabClick = (mode: SearchMode) => () => {
    setSearchMode(mode);
  };

  return (
    <Box>
      <Tabs>
        {
          searchTabOptions.map(({ text, mode }) => (
            <Tabs.Tab key={mode} active={searchMode === mode} onClick={handleSearchTabClick(mode)}>
              {text}
            </Tabs.Tab>
          ))
        }
      </Tabs>

      <SearchComponent />
    </Box>
  );
};

export default PeptideSearchBox;
