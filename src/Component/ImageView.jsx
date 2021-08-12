import React, { useState } from 'react';
import Model from './Model/Model';
import Classes from './ResultView.module.css';
const ImageView = props => {
  const [OpenModel, setOpenModel] = useState(false);

  const create = () => {
    setOpenModel(!OpenModel);
  };

  return (
    <React.Fragment>
      <div onClick={create}>
        <img
          className={Classes.img}
          key={props.img.id}
          src={`http://farm${props.img.farm}.staticflickr.com/${props.img.server}/${props.img.id}_${props.img.secret}.jpg`}
          alt={'valie'}
        ></img>
      </div>
      {OpenModel && <Model img={props.img} onClick={create} />}
    </React.Fragment>
  );
};

export default ImageView;
