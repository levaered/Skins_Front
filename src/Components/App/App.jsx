import React, { useEffect, useState } from 'react';
import searchIcon from '../../assets/search.svg';
import './App.css';
import { Navbar, NavbarContent, Input } from "@nextui-org/react";
import Skin from '../Skin/Skin'
import { Tabs, Tab } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, NavbarItem, Textarea } from "@nextui-org/react";
import { Chip, Avatar } from "@nextui-org/react";
import skin1 from '../../../skins/skin1.png'

function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [modalName, setModalName] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  const hadleEditClick = (skin) => {
    setModalName(() => skin.name);
    setModalDescription(() => skin.description);
    onOpen();
  }
  const handleAddNewClick = () => {
    setModalName(() => "");
    setModalDescription(() => "");
    onOpen();
  }

  let skins = [
    {
      id: 1,
      name: "Angsty Artist (Susie)",
      img: skin1,
      description: "She braved the night to create. Even when surrounded in darkness, she shone"
    }
  ];
  return (
    <>
      <Navbar isBordered className='nav'>
        <NavbarContent as="div" className="items-center" justify="start">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[20rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search for a skin..."
            startContent={<img src={searchIcon} alt="" width={20} />}
            size="sm"
            type="search"
          />
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button onPress={handleAddNewClick}  color="primary" href="#" variant="flat">
              Add New Skin
            </Button>
          </NavbarItem>
        </NavbarContent>

      </Navbar>

      <Modal isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange} className="dark text-foreground bg-background">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{modalName}</ModalHeader>
              <ModalBody>
                <Input type="email" label="Email" placeholder="Enter your email" defaultValue={modalName} />
                <p>
                  <Textarea
                    label="Description"
                    placeholder="Enter your description"
                    className="w-full"
                    defaultValue={modalDescription}
                  />
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 books-wrapper mx-auto max-w-5xl px-2 sm:px-6 py-8 gap-6">
        {skins.map(skin => (
          <Skin
            key={skin.id}
            name={skin.name}
            img={skin.img}
            description={skin.description}
            onEditClick={() => hadleEditClick(skin)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
