import "./list.css"
import { Navbar } from '../../components/navbar/Navbar'
import { Header } from '../../components/header/Header'
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { DateRange } from "react-date-range"
import { format } from "date-fns"
import SearchItem from "../../components/searchItem/SearchItem"
import useFetch from "../../hooks/useFetch"

export const List = () => {

  const location = useLocation()
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false)
  const [min, setMin] = useState(false)
  const [max, setMax] = useState(false)
  
const cityParam = destination ? `city=${destination}&` : "";
   const { data, error, loading, reFetch } = useFetch(`${import.meta.env.VITE_API_URL}/api/hotels?${cityParam}min=${min || 0}&max=${max || 9999}`)
  console.log(data);
  
  const handleClick = ()=> {
    reFetch()
  } 

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label >Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="lsItem">
              <label >Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")}`} to {`${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && <DateRange
                
                onChange={item => setDates([item.selection])}
                minDate={new Date()}
                ranges={dates}
                
              />}
            </div>
            <div className="lsItem">
              <label>Options</label>

              <div className="lsOptions">

                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input onChange={(e)=> setMin(e.target.value)} type="number" className="lsOptionInput" />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" onChange={(e)=> setMax(e.target.value)} className="lsOptionInput" />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>

              </div>



            </div>

            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
                {loading ? "loading" :
                  <>
                  {data.map((item)=> (

                  <SearchItem key={item._id} item={item}/>
                  ))}
                  </>
                  }
                
          </div>
        </div>
      </div>
    </div>
  )
}
