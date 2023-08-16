import {Block} from "./Block";


import {GeoRouteBlock} from "../../components/Blocks";

export class GeoRoute extends Block {
  type = "geo_route";
  content = [];

  render(key) {
    return (
      <GeoRouteBlock
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
