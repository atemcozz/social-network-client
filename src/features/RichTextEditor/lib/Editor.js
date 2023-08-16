import {Block} from "./Blocks/Block";

export class Editor {
  blocks = [];
  editMode = false;
  nextID = 0;
  events = {};
  blockTypes = {};

  constructor(options) {
    this.blocks = options.blocks || [];
    this.renderBlock = options?.blockHandler || (() => null);
    if (options.useBlocks) {
      options.useBlocks.forEach((cls) => {
        const instance = new cls();
        if (instance instanceof Block && instance.type?.length > 0) {
          this.blockTypes[instance.type] = cls;
        }
      });
    }
  }

  json() {
    return this.blocks.map((block) => block.parse());
  }

  getBlocks() {
    return this.blocks;
  }

  setBlocks(blocks) {
    this.blocks = blocks;
    this.emitEvent("update");
  }

  getBlockContent(block) {
    let result;
    this.blocks.forEach((b) => {
      if (b.id === block.id) {
        result = b.content;
      }
    });
    return result;
  }

  setBlockContent(block, content) {
    this.blocks.forEach((b) => {
      if (b.id === block.id) {
        b.content = content;
      }
    });
    this.emitEvent("update");
  }

  insertBlock(type, options = {}) {
    const cls = this.blockTypes[type];
    if (cls) {
      const block = new cls(this, options);

      this.blocks.push(block);

      this.emitEvent("update");
      return block;
    }
  }

  deleteBlock(block) {
    if (this.blocks.length > 1) {
      this.setBlocks(this.blocks.filter((b) => b !== block));
      this.emitEvent("update");
    }

  }

  shiftBlock(block, shift) {
    let firstIndex = 0;
    this.blocks.forEach((b, index) => {
      if (b === block) {
        firstIndex = index;
      }
    });
    let secondIndex = firstIndex + shift;
    if (secondIndex >= 0 && secondIndex < this.blocks.length) {
      let temp = this.blocks[firstIndex];
      this.blocks[firstIndex] = this.blocks[secondIndex];
      this.blocks[secondIndex] = temp;
    }
    this.emitEvent("update");
  }

  moveBlockUp(block) {
    this.shiftBlock(block, -1);
  }

  moveBlockDown(block) {
    this.shiftBlock(block, 1);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.emitEvent("update");
  }

  editModeEnabled() {
    return this.editMode;
  }


  format(style) {
    document.execCommand(style);
    this.emitEvent("update");
  }

  styleActive(style) {
    return document.queryCommandState(style);
  }

  emitEvent(eventName) {
    this.events[eventName].call();
  }

  on(eventName, callback) {
    this.events[eventName] = callback;
  }
}
