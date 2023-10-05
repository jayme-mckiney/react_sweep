import { useState, useRef } from 'react'

export default function useLongPress(handle: Function) {

  const timerRef = useRef();
  const isLongPress: boolean = useRef(false);

  function startPressTimer() {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;

    }, 500)
  }

  function handleOnClick(e) {
    if ( isLongPress.current ) {
      console.log('Is long press - not continuing.');
      return;
    }
    handle(isLongPress.current)
  }

  function handleOnMouseDown() {
    console.log('handleOnMouseDown');
    startPressTimer();
  }

  function handleOnMouseUp() {
    console.log('handleOnMouseUp');
    clearTimeout(timerRef.current);
  }

  function handleOnTouchStart(e) {
    console.log('handleOnTouchStart');
    startPressTimer();
  }

  function handleOnTouchEnd() {
    if ( isLongPress.current ) {
      handle(isLongPress.current)
      return
    }
    console.log('handleOnTouchEnd');
    clearTimeout(timerRef.current);
  }

  return {
    handlers: {
      onClick: handleOnClick,
      onMouseDown: handleOnMouseDown,
      onMouseUp: handleOnMouseUp,
      onTouchStart: handleOnTouchStart,
      onTouchEnd: handleOnTouchEnd
    }
  }
}