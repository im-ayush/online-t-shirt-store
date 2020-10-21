import React from 'react'

const ImageHelper = ({product}) => {
  const imageurl = product ? product.image : `https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg`
  return (
    <div className="rounded border border-success p-2">
      <img src={imageurl}
        style={{maxHeight:"350px", maxWidth:":100%"}}
        className="mb-3 rounded"
      alt=""/>
    </div>
  );
}

export default ImageHelper;
