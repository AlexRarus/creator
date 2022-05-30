import { useEffect, useState } from 'react';
import styler from 'stylefire';
import { interpolate, animate, easeOut } from 'popmotion';

export const addAnimationHook = (containerRef: any, modalRef: any, closeModal: any) => {
  const [activateClosing, setActivateClosing] = useState<any>(false);
  const [trigger, setTrigger] = useState<any>();
  const [isClosing, setIsClosing] = useState(false);
  const [modalContainerRenderer, setModalContainerRenderer] = useState<any>();
  const [modalRenderer, setModalRenderer] = useState<any>();

  // Create CSS renderers
  useEffect(() => {
    if (containerRef && modalRef) {
      setModalContainerRenderer(styler(containerRef));
      setModalRenderer(styler(modalRef));
    }
  }, [containerRef, modalRef]);

  useEffect(() => {
    if (trigger && modalContainerRenderer && modalRenderer) {
      // Get bounding box of triggering element
      const triggerBBox = trigger.getBoundingClientRect();

      // Temporarily show modal container to measure modal
      modalContainerRenderer.set('display', 'flex').render();
      modalRenderer.set('opacity', 0).render();

      // Get bounding box of final modal position
      const modalBBox = modalRef?.getBoundingClientRect();

      // Get a function to tween the modal from the trigger
      const modalTweener = generateModalTweener(triggerBBox, modalBBox);

      animate({
        duration: 200,
        ease: easeOut,
        onUpdate: modalTweener,
      });
    }
  }, [trigger, modalContainerRenderer, modalRenderer]);

  useEffect(() => {
    if (activateClosing && !isClosing && trigger) {
      setIsClosing(true);

      const triggerBBox = trigger?.getBoundingClientRect();
      const modalBBox = modalRef?.getBoundingClientRect();

      const modalTweener = generateModalTweener(triggerBBox, modalBBox);

      animate({
        from: modalRenderer.get('opacity'),
        to: 0,
        duration: 250,
        onUpdate: modalTweener,
        onComplete: closeComplete,
      });
    }
  }, [activateClosing, trigger, isClosing, modalRef]);

  // Select DOM
  // const modalTriggersDom = document.querySelectorAll('.modal-trigger');
  // const dimmer = document.querySelector('.overlay');
  // const modalContainer = document.querySelector('.modal-container');
  // const modal = document.querySelector('.modal');

  // Return the center x, y of a bounding box
  function findCenter({ top, left, height, width }: any) {
    return {
      x: left + width / 2,
      y: top + height / 2,
    };
  }

  /*
    Generate a function that will take a progress value (0 - 1)
    and use that to tween the modal from the source to the destination
    bounding boxes
  */
  const vRange = [0, 1];
  function generateModalTweener(sourceBBox: any, destinationBBox: any) {
    const sourceCenter = findCenter(sourceBBox);
    const destinationCenter = findCenter(destinationBBox);

    const toX = interpolate(vRange, [sourceCenter.x - destinationCenter.x, 0]);
    const toY = interpolate(vRange, [sourceCenter.y - destinationCenter.y, 0]);
    const toScaleX = interpolate(vRange, [sourceBBox.width / destinationBBox.width, 1]);
    const toScaleY = interpolate(vRange, [sourceBBox.height / destinationBBox.height, 1]);

    return (v: any) =>
      modalRenderer.set({
        opacity: v,
        x: toX(v),
        y: toY(v),
        scaleX: toScaleX(v),
        scaleY: toScaleY(v),
      });
  }

  function openModal(e: any) {
    if (e.target && e.target.closest('.modal-trigger')) {
      setTrigger(e?.target);
    }
  }

  function closeComplete() {
    setIsClosing(false);
    setActivateClosing(false);
    modalContainerRenderer.set('display', 'none').render();
    modalRenderer.set({
      y: 0,
      scaleX: 1,
      scaleY: 1,
      transformOrigin: '50% 50%',
    });
    closeModal();
  }

  function cancelModal(e: any) {
    console.log(e.target.closest('.cancel-modal'));
    if (e.target && e.target.closest('.cancel-modal')) {
      setActivateClosing(true);
    }
  }

  useEffect(() => {
    document.addEventListener('click', openModal);
    document.addEventListener('click', cancelModal);

    return () => {
      document.removeEventListener('click', openModal);
      document.removeEventListener('click', cancelModal);
    };
  }, []);

  return { hasAnimation: !!trigger };
};
