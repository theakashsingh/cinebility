import { useEffect } from "react";

const useDetectOutsideClick = (ref, fn) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        fn();
      }
    }

    document.addEventListener("mousedown", handleClickOutside, false);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, false);
    };
  }, [ref]);
};

export default useDetectOutsideClick;
