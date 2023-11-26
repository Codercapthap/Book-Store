import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

function Gallery({ images, title }) {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <div className="App">
      <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
        {images.map((image) => {
          return (
            <a
              href={import.meta.env.VITE_APP_API + image.imageLocation}
              key={image.imageLocation}
            >
              <img
                alt={title}
                src={import.meta.env.VITE_APP_API + image.imageLocation}
                className=" mb-2 cursor-pointer hover:border hover:border-blue-500 p-2 mr-4"
              />
            </a>
          );
        })}
      </LightGallery>
    </div>
  );
}

export default Gallery;
