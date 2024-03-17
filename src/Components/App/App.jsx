import React, { useEffect, useState } from 'react';
import searchIcon from '../../assets/search.svg';
import './App.css';
import { Navbar, NavbarContent, Input } from "@nextui-org/react";
import Book from '../Book/Book';
import { Tabs, Tab } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Chip, Avatar } from "@nextui-org/react";

function App() {
  const [books, setBooks] = useState([]);
  const [selectedTab, setSelectedTab] = useState('newest');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    fetchBooks("book");
  }, [selectedTab]);

  const fetchBooks = (query) => {
    let isAlpabetical = false;
    let orderBy = selectedTab;
    if (query === "") {
      query = "book";
    }
    if (selectedTab === "alphabetical") {
      orderBy = "relevance";
      isAlpabetical = true;
    }
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&orderBy=${orderBy}`)
      .then(response => response.json())
      .then(data => {
        if (data.items) {
          if (isAlpabetical === true) {
            setBooks(sortBooksAlphabetically(data.items));
          }
          else {
            setBooks(data.items);
          }
        } else {
          setBooks([]);
        }
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }


  const handleSearch = (event) => {
    fetchBooks(event.target.value);
  }

  const sortBooksAlphabetically = (books) => {
    return books.sort((a, b) => {
      const titleA = a.volumeInfo.title.toLowerCase();
      const titleB = b.volumeInfo.title.toLowerCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
  }


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
            placeholder="Type to search a book..."
            startContent={<img src={searchIcon} alt="" width={20} />}
            size="sm"
            onChange={handleSearch}
            type="search"
          />
        </NavbarContent>
        <NavbarContent as="div" className="items-center" justify="end">
          <RadioGroup
            label="Sort by:"
            orientation="horizontal"
            defaultValue={selectedTab}
            onValueChange={setSelectedTab}
          >
            <Radio value="relevance">Relevance</Radio>
            <Radio value="newest">Newest</Radio>
            <Radio value="alphabetical">Alphabetical(A-Z)</Radio>
          </RadioGroup>
        </NavbarContent>

      </Navbar>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 books-wrapper mx-auto max-w-5xl px-2 sm:px-6 py-8 gap-6">
        {books.map(book => (
          <Book
            key={book.id}
            name={book.volumeInfo.title}
            img={book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
            description={book.volumeInfo.description}
            authors={book.volumeInfo.authors}
            url={book.volumeInfo.infoLink}
          />
        ))}
      </div>
    </>
  );
}

export default App;
