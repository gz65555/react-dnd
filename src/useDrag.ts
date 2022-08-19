import { RefObject, useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { DragContext, DragState } from "./DragContext";

export interface IDragOptions<T> {
  /**
   * The type of the item that can be dropped.
   */
  type: number;
  /**
   * The data item that is being dragged.
   */
  item: T;
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
  /**
   * Render drag preview.
   */
  renderPreview?: (item: T) => JSX.Element;
}

export function useDrag<T>(options: IDragOptions<T>): RefObject<any> {
  const dragRef = useRef<HTMLDivElement>(null);
  const { type, item, onEnd, onStart, onCancel, renderPreview } = options;

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

      if (typeof renderPreview === "function") {
        const preview = renderPreview(item);
        if (preview) {
          const node = document.createElement("div");
          node.style.zIndex = "-1000";
          node.style.position = "fixed";
          node.style.top = "-10000px";
          document.body.appendChild(node);
          ReactDOM.render(preview, node);

          // Compute the offset that the preview will appear under the mouse.
          // If possible, this is based on the point the user clicked on the target.
          // If the preview is much smaller, then just use the center point of the preview.
          // use implementation from : https://github.com/adobe/react-spectrum/pull/3108/files#diff-06f17304ad635748d29a0836794c742959b3715d791cba8eb1c0277f2eaed394L104
          const size = node.getBoundingClientRect();
          const rect = (e.currentTarget! as HTMLDivElement).getBoundingClientRect();
          let x = e.clientX - rect.x;
          let y = e.clientY - rect.y;
          if (x > size.width || y > size.height) {
            x = size.width / 2;
            y = size.height / 2;
          }
          // Rounding height to an even number prevents blurry preview seen on some screens
          let height = 2 * Math.round(rect.height / 2);
          node.style.height = `${height}px`;

          dataTransfer.setDragImage(node, x, y);
          requestAnimationFrame(() => {
            document.body.removeChild(node);
          });
        }
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

  return dragRef;
}
