import {useCallback, useEffect} from 'react'

export const useClickOutsideEffect = ({callback, nodeRef, toggleNodeRef}) => {
  const handleClickOutsideDatesPopup = useCallback(event => {
    if(
      toggleNodeRef.current &&
      nodeRef.current &&
      !toggleNodeRef.current.contains(event.target) &&
      !nodeRef.current.contains(event.target)
    ) {
      callback()
    }
  }, [callback, nodeRef, toggleNodeRef])

  useEffect(() => {
    if(typeof document === 'undefined') {
      return
    }

    document.addEventListener('click', handleClickOutsideDatesPopup, true)

    return () => {
      document.removeEventListener('click', handleClickOutsideDatesPopup, true)
    }
  }, [handleClickOutsideDatesPopup])
}
