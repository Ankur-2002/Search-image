import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../Layout/Container';
import Classes from './Navbar.module.css';
import { ImageSliceAction } from '../Store/ImagesSlice';
import Datalist from './Datalist/Datalist';
const Navbar = () => {
  const Dispatch = useDispatch();
  const [search, setsearch] = useState('');

  const fetchImage = useCallback(
    event => {
      if (event.target.value.trim() !== '') {
        setsearch(event.target.value.trim());
        Dispatch(ImageSliceAction.Loading());
      } else {
        setsearch('nature');
      }
    },
    [search]
  );

  useEffect(() => {
    const time = setTimeout(async () => {
      Dispatch(ImageSliceAction.Loading());
      Dispatch(
        ImageSliceAction.AddImage({
          images: [],
          name: search === 'nature' ? null : search,
        })
      );
      Dispatch(ImageSliceAction.NotLoading());
    }, 500);

    return () => {
      clearTimeout(time); // callback for clear timeinterval and minimize call stack
    };
  }, [search]);

  return (
    <React.Fragment>
      <Container className={`${Classes.Navbar}`}>
        <h1>Search Photos</h1>
        <input
          type="text"
          onChange={fetchImage}
          list={'Search'}
          placeholder={'Search'}
        ></input>
        <datalist id={'Search'}>
          <Datalist />
        </datalist>
      </Container>
    </React.Fragment>
  );
};

export default Navbar;
