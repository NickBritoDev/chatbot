const handleButtonClick = (setIsLoadingButton) => {
  setIsLoadingButton(true)
  setTimeout(() => {
    setIsLoadingButton(false)
  }, 2000)
}

export default handleButtonClick
