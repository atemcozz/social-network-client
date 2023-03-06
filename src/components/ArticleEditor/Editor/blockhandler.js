import TextBlock from "./Blocks/TextBlock";
import ImageBlock from "./Blocks/ImageBlock";
import MapBlock from "./Blocks/MapBlock";
function blockHandler(block, editor) {
  switch (block.type) {
    case "text":
      return (
        <TextBlock
          key={block.id}
          content={block.content}
          onChange={(data) => editor.setBlockContent(block, data)}
          onDelete={() => editor.removeBlock(block)}
          onMoveUp={() => editor.moveBlock(block, -1)}
          onMoveDown={() => editor.moveBlock(block, 1)}
          edit={editor.editEnabled()}
        />
      );
    case "image":
      return (
        <ImageBlock
          key={block.id}
          content={block.content}
          onChange={(data) => editor.setBlockContent(block, data)}
          onDelete={() => editor.removeBlock(block)}
          onMoveUp={() => editor.moveBlock(block, -1)}
          onMoveDown={() => editor.moveBlock(block, 1)}
          edit={editor.editEnabled()}
        />
      );
    case "geo":
      return (
        <MapBlock
          key={block.id}
          content={block.content}
          onChange={(data) => editor.setBlockContent(block, data)}
          onDelete={() => editor.removeBlock(block)}
          onMoveUp={() => editor.moveBlock(block, -1)}
          onMoveDown={() => editor.moveBlock(block, 1)}
          edit={editor.editEnabled()}
        />
      );
    default:
      return null;
  }
}
export default blockHandler;
