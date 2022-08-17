import React, { createContext, MutableRefObject, PropsWithChildren, useRef } from "react";

export enum DragState {
  None = "none",
  Dragging = "dragging",
  Dropped = "dropped",
  Cancelled = "cancelled"
}
HTMLCanvasElement;
HTMLDivElement;
HTMLImageElement;
interface IDndContextValue<T = any> {
  type: number;
  item: T;
  state: DragState;
}

export const DragContext = createContext<MutableRefObject<IDndContextValue>>({
  current: { type: -1, item: null, state: DragState.None }
});

/**
 * DragContext.Provider
 * @param props
 * @returns
 */
export function DragDropContextProvider(props: PropsWithChildren) {
  const dragItemRef = useRef<IDndContextValue>({ type: -1, item: null, state: DragState.None });

  return <DragContext.Provider value={dragItemRef}>{props.children}</DragContext.Provider>;
}
