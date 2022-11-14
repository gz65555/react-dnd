import React, { createContext, createRef, MutableRefObject, PropsWithChildren, useRef } from "react";

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

export const DragContext = createContext({ item: null } as IDndContextValue);

const dragItemRef = createRef<IDndContextValue>();
// @ts-ignore
dragItemRef.current = { item: null, type: -1, state: DragState.None };

/**
 * DragContext.Provider
 * @param props
 * @returns
 */
export function DragDropContextProvider(props: PropsWithChildren) {
  return <DragContext.Provider value={dragItemRef.current!}>{props.children}</DragContext.Provider>;
}
