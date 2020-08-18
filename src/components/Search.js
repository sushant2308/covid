import {
  STATE_CODES_ARRAY,
  STATE_CODES,
  STATE_NAMES,
  UNASSIGNED_STATE_CODE,
  UNKNOWN_DISTRICT_KEY,
} from '../Constants';
import produce from 'immer';
import React, {useState, useMemo, useCallback, useRef} from 'react';
import * as Icon from 'react-feather';
import {Link} from 'react-router-dom';
import {useDebounce, useUpdateEffect} from 'react-use';


function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [expand, setExpand] = useState(false);
  const [results, setResults] = useState([]);
  const searchInput = useRef(null);

 
  const [engine, setEngine] = useState(null);
  const [districtEngine, setDistrictEngine] = useState(null);

  useUpdateEffect(() => {
    import('corejs-typeahead').then((Bloodhound) => {
      setEngine(
        // eslint-disable-next-line
        new Bloodhound.default({
          initialize: true,
          local: STATE_CODES_ARRAY.filter(
            ({code}) => code !== UNASSIGNED_STATE_CODE
          ),
          queryTokenizer: Bloodhound.default.tokenizers.whitespace,
          datumTokenizer: Bloodhound.default.tokenizers.obj.whitespace('name'),
        })
      );

      setDistrictEngine(
        // eslint-disable-next-line
        new Bloodhound.default({
          initialize: true,
          limit: 5,
          queryTokenizer: Bloodhound.default.tokenizers.whitespace,
          datumTokenizer: Bloodhound.default.tokenizers.obj.whitespace(
            'district'
          ),
          indexRemote: true,
          remote: {
            url: 'https://api.covid19india.org/state_district_wise.json',
            transform: function (response) {
              const districts = [];
              Object.keys(response)
                .filter((stateName) => stateName !== 'State Unassigned')
                .map((stateName) => {
                  const districtData = response[stateName].districtData;
                  Object.keys(districtData)
                    .filter(
                      (districtName) => districtName !== UNKNOWN_DISTRICT_KEY
                    )
                    .map((districtName) => {
                      return districts.push({
                        district: districtName,
                        state: stateName,
                      });
                    });
                  return null;
                });
              return districts;
            },
          },
        })
      );
    });
  }, [expand]);

  const handleSearch = useCallback(
    (searchInput) => {
      if (!engine) return null;
      const results = [];

      const sync = (datums) => {
        datums.map((result, index) => {
          const stateObj = {
            name: result.name,
            type: 'state',
            route: result.code,
          };
          results.push(stateObj);
          return null;
        });
      };

      const districtSync = (datums) => {
        datums.slice(0, 3).map((result, index) => {
          const districtObj = {
            name: result.district,
            type: 'district',
            route: STATE_CODES[result.state],
          };
          results.push(districtObj);
          return null;
        });

        setResults([...results]);
      };

      engine.search(searchInput, sync);
      districtEngine.search(searchInput, districtSync);
    },
    [districtEngine, engine]
  );

  useDebounce(
    () => {
      if (searchValue) {
        handleSearch(searchValue);
      } else {
        setResults(
          produce(results, (draftResults) => {
            draftResults.splice(0);
          })
        );
      }
    },
    100,
    [searchValue]
  );



  

  const trail = useMemo(() => {
    const styles = [];

    [0, 0, 0].map((element, index) => {
      styles.push({
        animationDelay: `${index * 250}ms`,
      });
      return null;
    });
    return styles;
  }, []);

  const handleClose = useCallback(() => {
    setSearchValue('');
    setResults([]);
  }, []);

  const handleChange = useCallback((event) => {
    setSearchValue(event.target.value);
  }, []);

  return (
    <div className="Search">
      <label className="fadeInUp" style={trail[0]}>
        Search your district or state
      </label>
      <div className="line fadeInUp" style={trail[1]}></div>

      <div className="search-input-wrapper fadeInUp" style={trail[2]}>
        <input
          type="text"
          value={searchValue}
          ref={searchInput}
          onFocus={setExpand.bind(this, true)}
          onBlur={setExpand.bind(this, false)}
          onChange={handleChange}
        />

        

        <div className="search-button">
          <Icon.Search />
        </div>

        {searchValue.length > 0 && (
          <div className={`close-button`} onClick={handleClose}>
            <Icon.X />
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="results">
          {results.map((result, index) => (
            <Link key={index} to={`state/${result.route}`}>
              <div className="result">
                <div className="result-left">
                  <div className="result-name">
                    {`${result.name}`}
                    {result.type === 'district' &&
                      `, ${STATE_NAMES[result.route]}`}
                  </div>
                </div>
                <div className="result-type">
                  <span>{[result.route]}</span>
                  <Icon.ArrowRightCircle size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      
      
    </div>
  );
}

const isEqual = () => {
  return true;
};

export default React.memo(Search, isEqual);