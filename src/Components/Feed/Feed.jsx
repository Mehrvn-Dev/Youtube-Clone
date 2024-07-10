import React, { useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY } from '../../data';

// Define the Feed component with a prop called category
const Feed = ({ category }) => {
  // Define state to store data
  const [data, setData] = useState([]);

  // Define the fetchData function to (get data from the YouTube API)
  const fetchData = async () => {
    // Construct the URL for the API request using category and API_KEY
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

    try {
      // Send the request to the API and wait for the response
      const response = await fetch(videoList_url);
      const result = await response.json();
      // If data is received, store it in the state
      if (result.items) {
        setData(result.items);
      } else {
        setData([]);
      }
    } catch (error) {
      // In case of an error, log the error to the console and set state to an empty array
      console.error("Error fetching data: ", error);
      setData([]);
    }
  };

  // Use useEffect to call fetchData when the category changes
  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    // Render the content of the component
    <div className='feed'>
      {data.length > 0 ? (
        // If data is available, display it as a list of links
        data.map((item, index) => (
          <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card" key={index}>
            <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{item.statistics.viewCount} views &bull; {new Date(item.snippet.publishedAt).toDateString()}</p>
          </Link>
        ))
      ) : (
        // If no data is available, display the message "Loading..."
        <p>Loading... please wait</p>
      )}
    </div>
  );
};

export default Feed;
