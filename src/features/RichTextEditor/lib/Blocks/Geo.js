import {Block} from "./Block";
import {GeoBlock} from "../../components/Blocks";

export class Geo extends Block {
  type = "geo";
  content = [0, 0];

  render(key) {
    return (
      <GeoBlock
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
