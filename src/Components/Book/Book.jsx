import { useState, useEffect } from 'react'
import './Book.css'
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { Chip, Avatar } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

function Book({ name, img, description, authors, url }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalAuthor, setModalAuthor] = useState("");
    const [booksByAuthor, setBooksByAuthor] = useState([]);

    useEffect(() => {
        if (modalAuthor) {
            fetchBooksByAuthor();
        }
    }, [modalAuthor]);

    const cutText = (text, maxLength) => {
        if (text && text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        }
        return text;
    }

    const openBook = () => {
        window.location.href = url;
    }

    const handleChipClick = (authorName) => {
        setModalAuthor(authorName);
        onOpen();
    }

    const fetchBooksByAuthor = async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(modalAuthor)}`);
            if (response.ok) {
                const data = await response.json();
                if (data.items) {
                    setBooksByAuthor(data.items);
                }
            } else {
                throw new Error('Failed to fetch books by author');
            }
        } catch (error) {
            console.error('Error fetching books by author:', error);
        }
    }

    return (
        <>
            <Card isFooterBlurred className="w-full h-[300px] card">
                <CardHeader className="absolute z-10 top-1 flex-col items-start card-header gap-2">
                    {authors && authors.map((author, index) => (
                        <Button key={author + index} onClick={() => { handleChipClick(author) }} className='author-btn'>
                            {cutText(author, 20)}
                        </Button>
                    ))}
                </CardHeader>
                <Image
                    removeWrapper
                    isZoomed
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src={img}
                />
                <CardFooter className="absolute flex bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between gap-2">
                    <div>
                        <h4 className="text-black font-medium text-1xl">{cutText(name, 12)}</h4>
                        <p className="text-black text-tiny">{cutText(description, 30)}</p>
                    </div>
                    <Button className="text-tiny" color="primary" radius="full" size="sm" onClick={openBook}>
                        Open
                    </Button>
                </CardFooter>
            </Card >

            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" style={{ maxHeight: '80vh' }}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">{modalAuthor}</ModalHeader>
                    <ModalBody className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                        {booksByAuthor.map((book, index) => (
                            <Card key={index} isFooterBlurred className="w-full h-[300px] card mb-4">
                                <CardHeader className="absolute z-10 top-1 flex-col items-start card-header gap-2">
                                    
                                </CardHeader>
                                <Image
                                    removeWrapper
                                    isZoomed
                                    alt="Card example background"
                                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                                    src={book.volumeInfo.imageLinks?.thumbnail}
                                />
                                <CardFooter className="absolute flex bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between gap-2">
                                    <div>
                                        <h4 className="text-black font-medium text-1xl">{cutText(book.volumeInfo.title, 12)}</h4>
                                        <p className="text-black text-tiny">{cutText(book.volumeInfo.description, 30)}</p>
                                    </div>
                                    <Button className="text-tiny" color="primary" radius="full" size="sm" onClick={() => window.location.href = book.volumeInfo.infoLink}>
                                        Open
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default Book;
