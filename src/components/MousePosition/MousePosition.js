import React from 'react';
import { debounce } from '../../lib/utils';

export default function MousePosition() {
  const [mouseX, setMouseX] = React.useState(null);
  const handleMouseMove = React.useCallback(
    debounce((ev) => {
      setMouseX(ev.clientX);
    }, 250),
    []
  );
  return (
    <div onMouseMove={handleMouseMove}>
      Mouse position: {mouseX}
    </div>
  );
}