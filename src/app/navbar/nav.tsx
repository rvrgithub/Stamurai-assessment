"use client";
import { FaLocationDot } from "react-icons/fa6";
import { MdMyLocation } from "react-icons/md";
import { useRouter } from "next/navigation";
import SearchBar from "../search/searchbar";
interface InputBarProps {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
}
const Nav: React.FC<InputBarProps> = ({ input, setInput }) => {
    const router = useRouter();
    let key = "07f6e8c0dff0d9d6260082aee791ec34";
    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                // console.log(" latitude, longitude", latitude, longitude)
                // Use latitude and longitude to fetch weather data from a weather API
                const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
                fetch(weatherApiUrl)
                    .then(response => response.json())
                    .then(data => {
                        // Handle weather data
                        // console.log("city name", data.name);
                        // router.push(`/weather-report?city=${data.name}`)
                        router.push(`/weather-report?city=${encodeURIComponent(data.name)}`);
                        // Example: Display the current temperature
                        const currentTemperature = data.main.temp;
                        // console.log(`Current temperature: ${currentTemperature}°C`);
                    })
                    .catch(error => {
                        console.error('Error fetching weather data:', error);
                    });
            });
        } else {
            console.error('Geolocation is not supported by this browser');
        }
    };
    return (
        <>
            <nav className="bg-gray-700 sticky top-0 left-0 w-full z-10">
                <div className="container mx-auto py-4 flex flex-wrap justify-center lg:justify-between items-center">
                    <div className="w-full lg:w-auto mb-3 lg:mb-0 lg:flex-grow ml-2">
                        <div className="flex items-center space-x-2">
                            <img src="/assets/clear-day.svg" alt="weather_icon" width={50} height={50} />
                            <h1 className="text-2xl font-bold text-gray-50">Weather App</h1>
                        </div>
                    </div>
                    <div className="flex  items-center justify-end " style={{ position: "fixed", top: 22, justifyItems: "flex-end", right: 0 }}>
                        <span> <MdMyLocation title="Your Current Location " className="text-gray-500 cursor-pointer text-white mr-4" size={25} onClick={handleCurrentLocation} /></span>
                        {/* <span>  <FaLocationDot style={{ margin: "0 10px" }} size={25} color="white" /></span> */}
                    </div>
                    <div className="w-full lg:w-auto lg:flex-grow flex justify-center">
                        <SearchBar input={input} setInput={setInput} />
                    </div>
                </div>
            </nav>
        </>
    )
}


export default Nav;

