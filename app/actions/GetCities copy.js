import React from 'react'
import cities from '@app/data/cities.json'

const GetCities = () => {

  return (
    <>
            {typeof(JSON.stringify(cities))}
            <select>
                <option>Select city</option>
                {
                    JSON.stringify(cities).map((value, i) => {
                        <option>{value.city}</option>
                    })
                }
            </select>
            
    </>
  )
}

export default GetCities