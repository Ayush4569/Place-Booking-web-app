import React,{useState} from 'react'

function PlacesImages({place}) {

    const [showExtraPhotos, setShowExtraPhotos] = useState(false);
    if (showExtraPhotos) {
        return (
          <div className="absolute inset-0 bg-black text-white min-h-screen">
            <div className="grid bg-black gap-4 p-8">
              <div>
                <h2 className="text-2xl mx-auto text-center">Photos of {place?.title}</h2>
                <button
                  className="flex bg-opacity-0 hover:bg-gray-200 hover:text-black gap-2 py-2 px-4 fixed delay-75 right-12 top-4 rounded-2xl text-white"
                  onClick={() => setShowExtraPhotos(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                  Close Photos
                </button>
              </div>
              {place?.photos?.length > 0 &&
                place.photos.map((photos) => (
                  <div className="p-6 flex flex-col justify-center items-center" key={photos}>
                    <img className="w-[65vw] h-auto object-cover" src={`http://localhost:4000/uploads/${photos}`} />
                  </div>
                ))}
            </div>
          </div>
        );
      }
    
  return (
    <div className="relative  mt-1">
        <div className="grid  grid-cols-[2fr_1fr] gap-2 rounded-3xl overflow-hidden">
          <div>
            {place?.photos?.[0] && (
              <div>
                <img
                  className="w-full sm:h-auto md:h-[72vh] aspect-square object-cover cursor-pointer"
                  onClick={() => setShowExtraPhotos(true)}
                  src={`http://localhost:4000/uploads/${place.photos[0]}`}
                />
              </div>
            )}
          </div>
          <div className="grid ">
            {place?.photos?.[1] && (
              <img
                className="w-full sm:h-auto md:h-[36vh] aspect-square  object-cover cursor-pointer"
                onClick={() => setShowExtraPhotos(true)}
                src={`http://localhost:4000/uploads/${place.photos[1]}`}
              />
            )}
            <div className="overflow-hidden">
              {place?.photos?.[2] && (
                <img
                  className="w-full sm:h-auto md:h-[36vh] aspect-square  object-cover relative top-2 cursor-pointer"
                  src={`http://localhost:4000/uploads/${place.photos[2]}`}
                />
              )}
            </div>
          </div>
        </div>
        <button
          className="absolute flex gap-1 bottom-2 py-2 px-4 right-2 rounded-xl shadow-md shadow-gray-800"
          onClick={() => setShowExtraPhotos(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          Show more photos
        </button>
      </div>
  )
}

export default PlacesImages