import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import ProfileImage from '../components/ProfileImage'
import Question from '../components/Question'
import { BiEdit } from 'react-icons/bi'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  useToast,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'

const Background = styled.div`
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  min-height: 22em;
  color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background: rgb(4, 93, 20);
  background: linear-gradient(
    0deg,
    rgba(4, 93, 20, 1) 0%,
    rgba(84, 230, 9, 1) 100%
  );
`

// blue
// background: rgb(30, 134, 147);
//   background: linear-gradient(
//     0deg,
//     rgba(30, 134, 147, 1) 0%,
//     rgba(27, 226, 217, 1) 100%
//   );

// orange
// background: rgb(228, 131, 50);
//   background: linear-gradient(
//     0deg,
//     rgba(228, 131, 50, 1) 0%,
//     rgba(230, 204, 52, 1) 100%
//   );

// purple
// background: rgb(114, 25, 162);
// background: linear-gradient(
//   0deg,
//   rgba(114, 25, 162, 1) 0%,
//   rgba(246, 83, 240, 1) 100%
// );

const ProfileBox = styled.div`
  height: 65vh;
  border-radius: 40px 40px 0px 0px;
  width: 70%;
  margin: auto;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  position: relative;
  bottom: 30px;
  background-color: #eff0f7;
  @media (max-width: 768px) {
    width: 100%;
  }
  padding-top: 10px;
`

const Hover = styled.div`
  :hover {
    cursor: pointer;
  }
`

export default function MyAccount() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [verifiedPassword, setVerifiedPassword] = useState('')
  const [color, setColor] = useState('green')

  const [changeEmail, setChangeEmail] = useState(false)
  const [changeUsername, setChangeUsername] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [changeColor, setChangeColor] = useState(false)

  const initialRef = React.useRef()
  const finalRef = React.useRef()
  const toast = useToast()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const editData = {
        username,
        email,
        oldPassword,
        newPassword,
        verifiedPassword,
      }
      await axios.put('http://localhost:5000/auth/', editData)
      toast({
        title: 'Success',
        description: `User Updated Successfully`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (err) {
      toast({
        title: 'Error',
        description: `${err.response.data.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  function handleDelete() {
    console.log('Handle delete')
  }

  return (
    <>
      <Background>
        <ProfileImage size={150} marginT={90} marginB={20} />
        <b>ktrip96</b>
        <span style={{ fontWeight: 300, fontFamily: 'Exo', display: 'flex' }}>
          I am a software engineer at Google{' '}
          <Hover>
            <BiEdit
              onClick={onOpen}
              style={{
                marginLeft: 10,
                marginTop: 2,
                onHover: 'cursor:pointer',
              }}
            />
          </Hover>
        </span>
      </Background>
      <ProfileBox>
        <Question />
        <Question />
      </ProfileBox>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Button
              mb={3}
              onClick={() => setChangeEmail((prev) => !prev)}
              textAlign='center'
              colorScheme='green'
              isFullWidth
            >
              Change your email
            </Button>
            <br />
            {changeEmail && (
              <Input
                mb={3}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder='Type your new email'
              />
            )}
            <Button
              mb={3}
              textAlign='center'
              onClick={() => setChangeUsername((prev) => !prev)}
              colorScheme='teal'
              isFullWidth
            >
              Change your username
            </Button>
            {changeUsername && (
              <Input
                mb={3}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder='Type your new username'
              />
            )}
            <br />

            <Button
              mb={3}
              textAlign='center'
              onClick={() => setChangePassword((prev) => !prev)}
              colorScheme='green'
              isFullWidth
            >
              Change your password
            </Button>
            {changePassword && (
              <>
                <Input
                  mb={3}
                  type='password'
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                  placeholder='Type your old password'
                />
                <Input
                  mb={3}
                  type='password'
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  placeholder='Type your new password'
                />
                <Input
                  mb={3}
                  type='password'
                  onChange={(e) => setVerifiedPassword(e.target.value)}
                  value={verifiedPassword}
                  placeholder='Verify your new password'
                />
              </>
            )}
            <br />

            <Button
              mb={3}
              textAlign='center'
              onClick={() => setChangeColor((prev) => !prev)}
              colorScheme='teal'
              isFullWidth
            >
              Change your color
            </Button>
            {changeColor && (
              <RadioGroup value={color} onChange={(e) => setColor(e)}>
                <Radio colorScheme='green' value='green' mr={3}>
                  Green
                </Radio>
                <Radio colorScheme='orange' value='orange' mr={3}>
                  Orange
                </Radio>
                <Radio colorScheme='blue' value='blue' mr={3}>
                  Blue
                </Radio>
                <Radio colorScheme='purple' value='purple' mr={3}>
                  Purple
                </Radio>
              </RadioGroup>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button mr={3} colorScheme='orange'>
              Logout
            </Button>
            <Button
              mr={3}
              textAlign='center'
              colorScheme='red'
              onClick={handleDelete}
            >
              Delete account
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
