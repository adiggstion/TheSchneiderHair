const SALONIZED_SCRIPT_SRC = 'https://static-widget.salonized.com/loader.js';

let isWidgetOpen = false;

function getSalonizedContainer() {
  return document.querySelector('#salonized-widget, .salonized-booking');
}

function findSalonizedWidgetButton() {
  const widgetRoot = getSalonizedContainer();
  if (!widgetRoot) return null;

  return (
    widgetRoot.querySelector('button') ||
    widgetRoot.querySelector('[role="button"]') ||
    widgetRoot.querySelector('[data-toggle]') ||
    widgetRoot.querySelector('.sz-booking-button') ||
    widgetRoot.querySelector('.button') ||
    widgetRoot.querySelector('iframe')
  );
}

function clickSalonizedWidgetButton() {
  const button = findSalonizedWidgetButton();
  if (!button) return false;
  button.click();
  return true;
}

function hasSalonizedApi() {
  return !!(window.szBooking && typeof window.szBooking.toggleWidget === 'function');
}

function openSalonizedWidget() {
  if (hasSalonizedApi()) {
    window.szBooking.toggleWidget();
    isWidgetOpen = true;
    return true;
  }

  if (clickSalonizedWidgetButton()) {
    isWidgetOpen = true;
    return true;
  }

  return false;
}

function closeSalonizedWidget() {
  if (!isWidgetOpen) return false;

  if (hasSalonizedApi()) {
    window.szBooking.toggleWidget();
    isWidgetOpen = false;
    return true;
  }

  return false;
}

function ensureSalonizedLoader() {
  return new Promise((resolve, reject) => {
    if (hasSalonizedApi()) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(`script[src="${SALONIZED_SCRIPT_SRC}"]`);

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', reject, { once: true });

      const waitForWidget = () => {
        if (hasSalonizedApi()) {
          resolve();
          return;
        }
        setTimeout(waitForWidget, 200);
      };

      waitForWidget();
      return;
    }

    const script = document.createElement('script');
    script.src = SALONIZED_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', reject, { once: true });
    document.body.appendChild(script);
  });
}

function retryOpenSalonizedWidget(retries = 12, interval = 300) {
  let attempt = 0;

  return new Promise((resolve) => {
    const tryOpen = () => {
      if (openSalonizedWidget()) {
        resolve(true);
        return;
      }

      attempt += 1;
      if (attempt >= retries) {
        resolve(false);
        return;
      }

      setTimeout(tryOpen, interval);
    };

    tryOpen();
  });
}

async function handleBookingTriggerClick(event) {
  const trigger = event.target.closest('.booking-trigger, #book-btn');
  if (!trigger) return;

  event.preventDefault();

  try {
    await ensureSalonizedLoader();
    const opened = await retryOpenSalonizedWidget();

    if (!opened) {
      console.warn('Salonized widget found no triggerable button or API.');
    }
  } catch (error) {
    console.error('Salonized widget failed to load.', error);
  }
}

function handleOutsideClick(event) {
  if (!isWidgetOpen) return;

  const clickedTrigger = event.target.closest('.booking-trigger, #book-btn');
  if (clickedTrigger) return;

  const widgetContainer = getSalonizedContainer();
  const clickedInsideContainer = widgetContainer?.contains(event.target);

  if (clickedInsideContainer) return;

  closeSalonizedWidget();
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closeSalonizedWidget();
  }
}

document.addEventListener('click', handleBookingTriggerClick);
document.addEventListener('click', handleOutsideClick);
document.addEventListener('keydown', handleEscapeKey);