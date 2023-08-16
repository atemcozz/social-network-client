import {Block} from "./Block";
import {TextBlock} from "../../components/Blocks";

export class Text extends Block {
  type = "text";
  content = "";

  render(key) {
    return (
      <TextBlock
        key={key}
        content={this.content}
        onCreate={(type, options) => this.editor.insertBlock(type, options)}
        onChange={(data) => this.setContent(data)}
        onDelete={() => this.delete()}
        onMoveUp={() => this.moveUp()}
        onMoveDown={() => this.moveDown()}
        editMode={this.editor.editModeEnabled()}
      />
    );
  }

  parse() {
    return {type: this.type, content: this.content};
  }
}
