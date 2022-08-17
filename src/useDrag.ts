import { RefObject, useContext, useEffect, useRef } from "react";
import { DragContext, DragState } from "./DragContext";

export interface IDragOptions<T> {
  /**
   * The type of the item that can be dropped.
   */
  type: number;
  /**
   * The data item that is being dragged.
   */
  item?: T;
  /**
   * The callback that is called when the item is end.
   */
  onEnd?: (e: DragEvent, item: T | undefined) => void;
  /**
   * The callback that is called when the item is start.
   */
  onStart?: (e: DragEvent, item: T | undefined) => void;
  /**
   * The callback that is called when the drag is canceled.
   */
  onCancel?: (e: DragEvent, item: T | undefined) => void;
}

type IDragElement = RefObject<any>;

type IDragReturnType = [IDragElement, IDragElement];

export function useDrag<T>(options: IDragOptions<T>): IDragReturnType {
  const dragRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const { type, item, onEnd, onStart, onCancel } = options;

  const dragItem = useContext(DragContext);

  useEffect(() => {
    const { current: dragElement } = dragRef;
    if (!dragElement) {
      return;
    }

    dragElement.setAttribute("draggable", "true");

    const handleDragStart = (e: DragEvent) => {
      e.stopImmediatePropagation();

      const dataTransfer = e.dataTransfer!;
      dataTransfer.effectAllowed = "move";

      const { current } = dragItem;
      current.state = DragState.Dragging;
      current.type = type;
      current.item = item;

      if (previewRef.current) {
        dataTransfer.setDragImage(previewRef.current, 0, 0);
      }

      if (onStart) {
        onStart(e, item);
      }
    };

    const handleDragEnd = (e: DragEvent) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      const { current } = dragItem;
      if (current.state !== DragState.Dropped) {
        current.state = DragState.Cancelled;
        if (onCancel) {
          onCancel(e, item);
        }
      }
      if (onEnd) {
        onEnd(e, item);
      }
    };

    dragElement.addEventListener("dragstart", handleDragStart);
    dragElement.addEventListener("dragend", handleDragEnd);

    return () => {
      dragElement.removeEventListener("dragstart", handleDragStart);
      dragElement.removeEventListener("dragend", handleDragEnd);
    };
  }, []);

  return [dragRef, previewRef];
}
