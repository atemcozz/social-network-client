export class Block {
    //type name is required for blocks indexing
    type;
    editor;
    content;

    constructor(editor, options) {
        this.editor = editor;
    }

    shift(value) {
        this.editor.shiftBlock(this, value);
    }

    moveUp() {
        this.editor.moveBlockUp(this);
    }

    moveDown() {
        this.editor.moveBlockDown(this);
    }

    getContent() {
        return this.content;
    }

    setContent(content) {
        this.content = content;
        this.editor.emitEvent("update");
    }

    delete() {
        this.editor.deleteBlock(this);
    }

    parse() {
        return {type: this.type, content: this.content};
    }

    render() {
        return null;
    }
}
