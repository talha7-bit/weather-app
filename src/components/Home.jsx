import React, { useEffect, useState } from 'react'
import Card from './Card';


const Home = () => {
    const[data,setdata]=useState(null);
    const[error,seterror]=useState("");
    const API_KEY="4051080164b9ac16948299080a91e8f5"
    const[search,setsearch]=useState("");
    const[loading,setloading]=useState("");



    const fetchdata=async(query)=>{
       
        try{
            const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`);
            const result=await response.json();
           
            if(result.cod!==200){
                
                seterror("please enter correct name for city");
                
            }else{
              
                seterror("");
                setdata(result);

            }
        console.log(result)
            

        }catch(error){
            seterror("an error occured while fetching data");
        }
    }

    useEffect(()=>{
       setloading("loading...");
        fetchdata("london").finally(()=>{
          setloading("")
        })
    },[])
    const handlesearch=(e)=>{
    e.preventDefault();
    
    if(search.trim !== "" ){
     
        fetchdata(search);
        seterror("")
    }
    }
     const currentloc=()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        async(position)=>{
          const lat=position.coords.latitude;
          const lon=position.coords.longitude;
         try{
          const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        const result=await response.json();
        setdata(result);
        seterror("");
         }catch(error){
          console.log("failed to get data from current location")
          seterror("failed to get data from current location")
          fetchdata(search)
        }
        },(err)=>{
            console.log('permission denied or loocation unavailble')
            seterror('permission denied or loocation unavailble')
       fetchdata(search)
        }

      )
    }else{
        seterror("geolocation is not supported by this browser")
   fetchdata(search);
    }
  }
  return (
    <div className='max-h-screen overflow-hidden'>
     {loading && <h3 className='text-black flex items-center justify-center mt-60'>{loading}</h3>} 
  
   { data && (<Card 
     item={data} 
     search={search} 
     handlesearch={handlesearch} 
     setsearch={setsearch}
     currentloc={currentloc}
     error={error}
   
     />) }
    
    </div>
  )
}

export default Home
