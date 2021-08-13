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
  const name = store.name;
  // console.log('ankur');
  const [containerRef, isView] = useObserver({
    threshold: 0.5,
    root: null,
    margin: 0,
  });

  useEffect(() => {
    const time = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7c6cc793912ee9fe86fa700694679fa8&tags=${
            name === '' ? 'nature' : name
          }&format=json&nojsoncallback=1&page=${++page}&per_page=30`
        );
        const result = await res.json();
        console.log(result);
        if (result.photos.photo.length === 0) return;
        Dispatch(
          ImageSliceAction.AddMore({
            images: result.photos.photo,
          })
        );
      } catch (error) {}
    }, 500);
    return () => {
      clearTimeout(time);
    };
  }, [isView, store.name]);
  useEffect(() => {
    page = 0;
    first = false;
    console.log('A');
  }, [name]);
  if (isView) {
    first = true;
  } else {
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
          <div
            ref={containerRef}
            style={{ position: 'relative', width: '100%', height: '10px' }}
          >
            {/* <p>Loading...</p> */}
          </div>
        }
      </div>
    </Container>
  );
};

export default React.memo(ResultView);
