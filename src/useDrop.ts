import React, { useEffect } from "react";
import { DragContext, DragState } from "./DragContext";

export interface IDropOptions<T> {
  /**
   * The accepted type of the item that can be dropped.
   */
  accept: number;
  /**
   * The callback that is called when drop the item.
   */
  onDrop?: (e: DragEvent, item: T) => void;
  /**
   * The callback that is called when item is leaving the drop area.
   */
  onLeave?: (e: DragEvent, item: T) => void;
  /**
   * The callback that is called when item is entering the drop area.
   */
  onEnter?: (e: DragEvent, item: T) => void;
  /**
   * The callback that is called when item is over the drop area.
   */
  onOver?: (e: DragEvent, item: T) => void;
}

export function useDrop<T extends HTMLElement, U = any>(options: IDropOptions<U>) {
  const dropRef = React.createRef<T>();

  const dragItem = React.useContext(DragContext);

  useEffect(() => {
    const dropElement = dropRef.current;
    if (!dropElement) {
      return;
    }

    const { accept, onDrop, onLeave, onEnter, onOver } = options;

    const handleDragOver = (e: DragEvent) => {
      if (accept & dragItem.type) {
        e.stopImmediatePropagation();
        e.preventDefault();
        e.dataTransfer!.dropEffect = "move";
        if (onOver) {
          onOver(e, dragItem.item);
        }
      }
    };

    const handleDragEnter = (e: DragEvent) => {
      if (accept & dragItem.type) {
        e.stopImmediatePropagation();
        e.preventDefault();
        if (onEnter) {
          onEnter(e, dragItem.item);
        }
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      if (accept & dragItem.type) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (onLeave) {
          onLeave(e, dragItem.item);
        }
      }
    };

    const handleDrop = (e: DragEvent) => {
      if (accept & dragItem.type) {
        dragItem.state = DragState.Dropped;
        e.preventDefault();
        e.stopImmediatePropagation();
        if (onDrop) {
          onDrop(e, dragItem.item);
        }
      }
    };

    dropElement.addEventListener("dragenter", handleDragEnter);
    dropElement.addEventListener("dragleave", handleDragLeave);
    dropElement.addEventListener("dragover", handleDragOver);
    dropElement.addEventListener("drop", handleDrop);

    return () => {
      dropElement.removeEventListener("dragenter", handleDragEnter);
      dropElement.removeEventListener("dragleave", handleDragLeave);
      dropElement.removeEventListener("dragover", handleDragOver);
      dropElement.removeEventListener("drop", handleDrop);
    };
  }, []);

  return dropRef;
}
