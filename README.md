# Drag and Drop

## Example

```shell
npm run dev
```

## Usage

```typescript
import { useDrag, useDrop, DragDropContextProvider } from "@oasis-engine/react-dnd";

function App() {
  const [dragRef, previewRef] = useDrag({
    type: 1,
    item: { content: "world" },
    onStart: () => {
      console.log("drag start");
    },
    onEnd: () => {
      console.log("on end");
    }
  });

  const dropRef = useDrop({
    accept: 1 | 2 | 4,
    onDrop: (e: DragEvent, item) => {
      console.log("on drop");
    },
    onEnter: (e: DragEvent, item) => {
      console.log("on enter");
    },
    onLeave: (e: DragEvent, item) => {
      console.log("on leave");
    },
    onOver: (e: DragEvent, item) => {
      console.log("on over");
    }
  });

  return (
    <DragDropContextProvider>
      <div ref={dropRef}>drop</div>
      <div ref={dragRef}>drag</div>
      <div ref={previewRef}>preview</div>
    </DragDropContextProvider>
  );
}
```

## API

### useDrag

```typescript
// TODO
```

### useDrop

```typescript
// TODO
```
