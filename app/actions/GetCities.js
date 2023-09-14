import React, { useEffect } from 'react'
import cities from '@app/data/cities.json'
import states from '@app/data/states.json'

const GetCities = () => {

  return (
    <>
    <select
      {...register("city")}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >

          {cities.map((value, index) => (
              value.city ? (
                <option key={index} value={value.city}>
                  {value.city} ({value.state})
                </option>
              ) : (
                <option key={index} value={value.state}>
                  {value.state}
                </option>
              )
            ))}
            <option value="other">Other</option>
      </select>
            
    </>
  )
}

export default GetCities