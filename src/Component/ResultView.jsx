import React, { useState, useRef, useCallback } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ImageSliceAction } from '../Store/ImagesSlice';
import Container from '../Layout/Container';
import ImageView from './ImageView';
import Classes from './ResultView.module.css';
import useObserver from './Observer/useObserver';
let first = false;
let page = 1;
const ResultView = () => {
  const Dispatch = useDispatch();
  const store = useSelector(state => state);
  console.log('ankur');
  const [containerRef, isView] = useObserver({
    threshold: 0.5,
    root: null,
    margin: 0,
  });

  useEffect(() => {
    const time = setTimeout(() => {
      const Images = async (pageNumber = page) => {
        try {
          const res = await fetch(
            `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7c6cc793912ee9fe86fa700694679fa8&tags=${
              store.name === '' ? 'nature' : store.name
            }&format=json&nojsoncallback=1&page=${pageNumber}&per_page=20`
          );
          const result = await res.json();
          Dispatch(
            ImageSliceAction.AddMore({
              images: result.photos.photo,
            })
          );
        } catch (error) {}
      };

      Images();
      page = page + 1;
    }, 700);
    return () => {
      clearTimeout(time);
    };
  }, [isView, store.name]);
  if (isView) {
    first = true;
  }
  return (
    <Container>
      <div className={Classes.Result}>
        {store.isLoading ? (
          <p className={Classes.Loading}>Loading ....</p>
        ) : (
          store.item.map((value, index) => {
            return <ImageView key={value.secret + index} img={value} />;
          })
        )}
        {store.isError && <p className={Classes.Error}>Something Went Wrong</p>}
        {!store.isError && !store.isLoading && store.item.length === 0 && (
          <p className={Classes.Empty}>No Search Found</p>
        )}
        {
          <div ref={containerRef} style={{ position: 'relative' }}>
            {first && store.item.length > 20 && !store.Loading && (
              <p className="loader">
                {' '}
                {isView ? 'Loading ... ' : 'No More Item'}{' '}
              </p>
            )}
          </div>
        }
      </div>
    </Container>
  );
};

export default React.memo(ResultView);
