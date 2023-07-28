import React, {useEffect} from 'react';

const useOutsideClick = (ref, handler, mouseEvent = "mousedown") => {
    useEffect(() => {
        function handleClickOutside(event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler();
        }

        document.addEventListener(mouseEvent, handleClickOutside);
        return () => {
            document.removeEventListener(mouseEvent, handleClickOutside);
        };
    }, [ref]);
};

export default useOutsideClick;