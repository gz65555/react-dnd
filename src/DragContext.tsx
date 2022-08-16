import React, { createContext, MutableRefObject, PropsWithChildren, useRef } from "react";

export const DragContext = createContext<MutableRefObject<{ type: number; item: any }>>({
  current: { type: -1, item: null }
});

/**
 * DragContext.Provider
 * @param props
 * @returns
 */
export function DragDropContextProvider(props: PropsWithChildren) {
  const dragItemRef = useRef<any>();

  return <DragContext.Provider value={dragItemRef}>{props.children}</DragContext.Provider>;
}
