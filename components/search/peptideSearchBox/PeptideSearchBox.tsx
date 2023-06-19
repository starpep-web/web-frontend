import React, { useState } from 'react';
import { Box, Tabs } from 'react-bulma-components';
import TextQueryPeptideSearchBox from './tabs/TextQueryPeptideSearchBox';
import SingleQueryPeptideSearchBox from './tabs/SingleQueryPeptideSearchBox';
import MultiQueryPeptideSearchBox from './tabs/MultiQueryPeptideSearchBox';

type SearchMode = 'text' | 'single' | 'multi';
const searchComponents: Record<SearchMode, React.FC> = {
  text: TextQueryPeptideSearchBox,
  single: SingleQueryPeptideSearchBox,
  multi: MultiQueryPeptideSearchBox
};

const searchTabOptions = [
  { text: 'Filter', mode: 'text' as SearchMode },
  { text: 'Single Query', mode: 'single' as SearchMode },
  { text: 'Multi Query', mode: 'multi' as SearchMode }
];

const PeptideSearchBox = () => {
  const [searchMode, setSearchMode] = useState<SearchMode>('text');
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
