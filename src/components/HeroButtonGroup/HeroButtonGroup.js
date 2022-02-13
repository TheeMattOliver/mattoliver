import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
import { QUERIES } from "../../constants"
import Modal from "../Modal"
import { Button, DogButton } from "../Button"

const HeroButtonGroup = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [dogUrl, setDogUrl] = useState("")
  const getDog = async () => {
    console.log("hi")
    const dogResponse = await fetch(`https://dog.ceo/api/breeds/image/random`)
    const dogData = await dogResponse.json()
    console.log("dogData: ", dogData)
    setDogUrl(dogData.message)
    setShowModal(true)
  }
  const clearDogs = () => setDogUrl("")

  useEffect(() => clearDogs(), [])

  return (
    <Wrapper>
      <ButtonList>
        <ButtonContainer>
          <Button
            variant="secondary"
            size="large"
            onClick={() => {
              navigate("/work")
            }}
          >
            See some projects
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <DogButton variant="outline" size="large" onClick={getDog}>
            Dog, please
          </DogButton>
        </ButtonContainer>
      </ButtonList>
      <Modal
        title="Hi there"
        isOpen={showModal}
        handleDismiss={() => setShowModal(false)}
      >
        <h2>Here is a dog:</h2>
        <ImageContainer>
          {dogUrl.length > 1 && <StyledImage src={dogUrl} alt="a dog" />}
        </ImageContainer>
      </Modal>
    </Wrapper>
  )
}

export default HeroButtonGroup

const Wrapper = styled.div`
  padding: 0 1rem;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  @media ${QUERIES.smAndUp} {
    padding: 0 2rem;
  }
  @media ${QUERIES.lgAndUp} {
    /* max-width: 80rem; */
  }
  @media ${QUERIES.xlAndUp} {
    /* max-width: revert; */
  }
`

const ButtonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  gap: 16px;
`

const StyledImage = styled.img`
  max-width: 500px;
  max-height: 500px;
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonContainer = styled.div`
  flex: 1;
  justify-content: flex-start;
  align-items: stretch;
  display: flex;
`
