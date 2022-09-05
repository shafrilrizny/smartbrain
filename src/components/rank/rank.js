import React from 'react';
import './rank.css';

const Rank = ({name,entries}) => {
  return (
    <div>
        <div className='center rank'>
           {`${name}, your current entry count is...`}
        </div>

        <div className='center rank'>
          {entries}
        </div>
    </div>
  )
}

export default Rank;