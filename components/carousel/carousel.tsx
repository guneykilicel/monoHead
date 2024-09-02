"use client";
import * as React from "react";
import Image from "next/image"; // Next.js resim bileşenini içe aktarıyoruz

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo() {
  // Resim ve video URLs'ini bir dizi olarak tanımlayın
  const items = [
    { image: "/images/image1.jpg", video: "/videos/video1.mp4" },
    { image: "/images/image2.jpg", video: "/videos/video2.mp4" },
    { image: "/images/image3.jpg", video: "/videos/video3.mp4" },
  ];

  const [playingVideoIndex, setPlayingVideoIndex] = React.useState<number | null>(null);

  // Video oynatma fonksiyonu
  const handlePlayVideo = (index: number) => {
    setPlayingVideoIndex(index);
  };

  // Video durdurma fonksiyonu
  const handleStopVideo = () => {
    setPlayingVideoIndex(null);
  };

//   React.useEffect(() => {
//     handleStopVideo();
//   }, [playingVideoIndex]);

  return (
    <div className="relative">
      <Carousel className="" opts={{ loop: true }}>
        <CarouselContent>
          {items.map(({ image, video }, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center items-center h-[calc(100vh-70px)] relative"
            >
              <div className="p-1 w-full h-full">
                <Card className="h-full w-full relative">
                  <CardContent className="relative flex items-center justify-center p-0 h-full w-full">
                    {playingVideoIndex === index ? (
                      <div className="relative w-full h-full">
                        <video
                          src={items[index].video}
                          autoPlay
                          className="w-full h-full object-cover"
                          style={{ pointerEvents: "none" }} // Tıklanamaz yap
                          onEnded={handleStopVideo} // Video bitince resme dön
                        />
                      </div>
                    ) : (
                      <Image
                        src={image}
                        alt={`Image ${index + 1}`}
                        fill
                        className="rounded-md absolute object-cover"
                        priority
                      />
                    )}
                    {/* Videoyu oynat butonu */}
                    {playingVideoIndex !== index && (
                      <button
                        onClick={() => handlePlayVideo(index)}
                        className="absolute bottom-4 right-4 bg-white text-black p-2 rounded shadow-lg"
                      >
                        Videoyu Oynat
                      </button>
                    )}
                    {/* Video durdur butonu */}
                    {playingVideoIndex === index && (
                      <button
                        onClick={handleStopVideo}
                        className="absolute bottom-4 right-4 bg-white text-black p-2 rounded shadow-lg"
                      >
                        Duraklat
                      </button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[2rem] top-1/2 transform -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-[2rem] top-1/2 transform -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
}
