import {Block} from "./Block";
import ImageBlock from "./ImageBlock";
import CloudinaryService from "../../../services/CloudinaryService";

export class Image extends Block {
    type = "image";
    content = "";

    constructor(type, options = {}) {
        super(type);
        if (options.file) {
            CloudinaryService.uploadImage(options.file)
                .then((res) => this.setContent(res?.data?.secure_url));
        }
    }

    render(key) {
        return (
            <ImageBlock
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
