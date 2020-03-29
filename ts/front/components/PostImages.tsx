import React, { FC, useCallback, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import Image from '../../back/models/image';
import ImagesZoom from './ImagesZoom';

interface Props {
  images: Image[];
}

const PostImages: FC<Props> = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={`http://localhost:3065/${images[0].src}`} onClick={onZoom} alt={images[0].src} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div>
          <img role="presentation" src={`http://localhost:3065/${images[0].src}`} width="50%" alt={images[0].src} onClick={onZoom} />
          <img role="presentation" src={`http://localhost:3065/${images[0].src}`} width="50%" alt={images[0].src} onClick={onZoom} />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <img role="presentation" src={`http://localhost:3065/${images[0].src}`} width="50%" alt={images[0].src} onClick={onZoom} />
        <div
          role="presentation"
          style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

export default PostImages;
