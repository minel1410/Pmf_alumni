import { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';
import setCanvasPreview from "./setCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateAvatar }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const resetCropper = () => {
    setImgSrc("");
    setCrop(null);
    setError("");
  };

  const handleCropImage = () => {
    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(
        crop,
        imgRef.current.width,
        imgRef.current.height
      )
    );
    const dataUrl = previewCanvasRef.current.toDataURL();
    updateAvatar(dataUrl);
    resetCropper();
    closeModal();
  };

  return (
    <>

<div class="mb-3">
  <label
    class="mb-2 inline-block text-neutral-500"
    >Odaberite profilnu sliku</label>
  <input
    class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-picton-blue-500 file:text-white file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none"
    type="file"
accept="image/*"
onChange={onSelectFile} />
</div>
    


      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
          locked
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          {/* <button
            className="text-black bg-picton-blue-500 font-mono py-2 px-4 rounded-md w-full mt-4 bg-sky-500 hover:bg-sky-600"
            onClick={handleCropImage}
          >
            Crop Image
          </button> */}
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};

export default ImageCropper;
