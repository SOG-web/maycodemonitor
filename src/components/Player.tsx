import React from 'react';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

interface Props {
  events: any;
}

export const Player = (props: Props) => {
  const [width, setWidth] = React.useState(900);
  const [height, setHeight] = React.useState(500);

  React.useEffect(() => {
    const player = new rrwebPlayer({
      target: document.getElementById('replayer') as HTMLElement,
      props: {
        events: props.events,
        autoPlay: false,
        width: width,
        height: height,
      },
    });

    return () => {
      player.getReplayer().destroy();
    };
  }, [props.events]);

  // do not remove this effect
  React.useEffect(() => {
    // this is to clear the player when the component unmounts so that you wont be seeing multiple players

    return () => {
      const player = document.getElementById('replayer');
      if (player) {
        player.innerHTML = '';
      }
    };
  }, []);
  return <div id='replayer'></div>;
};
