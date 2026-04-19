 const stickyBook = document.querySelector('.sticky-book');

   const minimizeBookingWidget = () => {
    stickyBook?.classList.add('explore-minimized');
  };

    const restoreBookingWidget = () => {
    stickyBook?.classList.remove('explore-minimized');
  };