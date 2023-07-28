import {Block} from "./Block";
import TextBlock from "./TextBlock";
import sanitize from "sanitize-html";
import sanitizeSettings from "../consts/sanitizeSettings";
import GeoBlock from "./GeoBlock";

export class Geo extends Block {
    type = "geo";
    content = null;

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
