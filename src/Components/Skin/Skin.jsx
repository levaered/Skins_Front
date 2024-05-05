import { useState, useEffect } from 'react'
import './Skin.css'
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

function Skin({ name, img, description, onEditClick }) {

    const cutText = (text, maxLength) => {
        if (text && text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        }
        return text;
    }

    return (
        <>
            <Card isFooterBlurred className="w-full h-[300px] card">
                <Image
                    removeWrapper
                    isZoomed
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-contain"
                    src={img}
                />
                <CardFooter className="absolute flex bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between gap-2">
                    <div>
                        <h4 className="text-black font-medium text-1xl">{cutText(name, 20)}</h4>
                        <p className="text-black text-tiny">{cutText(description, 30)}</p>
                        <div className='flex w-full gap-2 mt-3'>
                            <Button color="primary" onClick={onEditClick}>
                                Edit
                            </Button>
                            <Button color="danger">
                                Remove
                            </Button>
                        </div>

                    </div>
                </CardFooter>
            </Card >
        </>
    )
}

export default Skin;
