import { SelectionState } from 'draft-js';
export function getNewBlockSelection(blockBefore, blockAfter, after) {
    let targetBlock;
    let offset;
    if (after) {
        targetBlock = blockAfter || blockBefore;
        offset = blockAfter ? 0 : targetBlock.getLength();
    }
    else {
        targetBlock = blockBefore || blockAfter;
        offset = blockBefore ? targetBlock.getLength() : 0;
    }
    return SelectionState.createEmpty(targetBlock.getKey()).merge({
        anchorOffset: offset,
        focusOffset: offset,
        hasFocus: true
    });
}
