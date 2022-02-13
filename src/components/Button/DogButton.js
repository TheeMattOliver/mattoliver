import React, { useState, useEffect } from "react"
import Button from "./Button"
import styled from "styled-components"

const StyledImage = styled.img`
  max-width: 500px;
  max-height: 500px;
`

const DogButton = ({ size, variant, ...props }) => {
  const [dogUrl, setDogUrl] = useState("")
  const getDog = async () => {
    console.log("dog")
    const dogResponse = await fetch(
      `https://dog.ceo/api/breed/husky/images/random`
    )
    const dogData = await dogResponse.json()
    setDogUrl(dogData.message)
  }

  const clearDogs = () => setDogUrl("")

  useEffect(() => clearDogs(), [])
  return (
    <>
      <Button variant="outline" size="large" onClick={getDog} {...props}>
        get a dog
      </Button>
      {dogUrl.length > 1 && (
        <Button variant="outline" size="large" onClick={clearDog} {...props}>
          no more dogs please
        </Button>
      )}
      {dogUrl.length > 1 && <StyledImage src={dogUrl} alt="a dog" />}
    </>
  )
}

export default DogButton
