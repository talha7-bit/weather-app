import React from 'react'
import pic1 from '../assets/download.png'
import pic2 from '../assets/download1.jpeg'

const Card = ({item,search,setsearch,handlesearch,currentloc,error}) => {

 const icon=item.weather[0].icon;
 const description=item.weather[0].description;
const getLocalTime=(offsetinseconds)=>{
  const utc= new Date().getTime() + new Date().getTimezoneOffset() * 60000;
  return new Date(utc +offsetinseconds * 1000);
}
const localtime=getLocalTime(item.timezone);
const time=localtime.toLocaleTimeString([],{hours:"2-digit",minutes:"2-digit"})
const date=localtime.toLocaleDateString(undefined,{
  weekday:"long",
  day:"numeric",
  month:"long",
  year:"numeric"
})  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]'>
      {error && <p className='text-red-600 text-2xl'>{error}</p>}
     
       <button onClick={currentloc} className='bg-blue-900 text-white px-4 py-1 cursor-pointer rounded-xl'>Use Current Location</button>
       <p className='text-white'>or</p>
        <form onSubmit={handlesearch}>
                  <input className='border bg-white text-black rounded px-4 py-1' type='text' placeholder='enter city name' value={search} onChange={(e)=>
                      setsearch(e.target.value)
                  }/>
                  <button type='submit' className='bg-blue-900 text-white mx-2 px-4 py-1 cursor-pointer rounded-xl'>Search</button>
              </form>
        <div className='backdrop-blur-lg bg-white/10 border border-white/30 shadow-xl p-8 rounded-2xl h-[380px] w-[320px] text-white space-y-6 flex flex-col items-center justify-center'>
           <div className='text-center'>
             <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} className='w-20 h-20'/>
      <p className='text-sm text-gray-300 capitalize'>{description}</p>
            <h1 className='text-4xl font-bold'>{Math.round(item.main.temp - 273.15)}°C</h1>
            <h1 className='text-xl'>{item.name}</h1>
            </div>
            <div className='text-center text-sm text-gray-300'>
              <p>{date}</p>
              <p>{time}</p>
            </div>
            <div className='flex items-center justify-between space-x-4'>
            <div className='flex items-center space-x-2'>
            <img src={pic1} className='w-10 h-10'/>
            <div>
            <h3 className='text-lg font-semibold'>{item.main.humidity}</h3>
            <h2 className='text-sm text-gray-200'>Humidity</h2>
            </div>
            </div>
            <div className='flex items-center space-x-2'>
            <img src={pic2} className='w-10 h-10 rounded-full'/>
            <div>
                <h3 className='text-lg font-semibold'>{item.wind.speed}</h3>
                <h2 className='text-sm text-gray-200'>Wind Speed</h2>
            </div>
            </div>
            </div>
        </div>
        
      
    </div>
  )
}

export default Card
