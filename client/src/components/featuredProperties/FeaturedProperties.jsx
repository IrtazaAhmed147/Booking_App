import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {

  const { data, error, loading } = useFetch(`${import.meta.env.VITE_API_URL}/api/hotels?featured=true&min=10&max=1500`)
  console.log(data);
  
  return (
    <div className="fp">
      {loading ? "loading" : <>
        {data && data?.map((item) => (

          <div className="fpItem" key={item._id}>
            <img
              src={item.photos[0]}
              alt=""
              className="fpImg"
            />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
           {item.rating &&  <div className="fpRating">
              <button>{item.rating}</button>
              <span>Excellent</span>
            </div>}
          </div>

        ))}
      </>}
    </div>
  );
};

export default FeaturedProperties;