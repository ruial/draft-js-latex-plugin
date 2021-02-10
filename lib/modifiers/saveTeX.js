import { Modifier, SelectionState } from 'draft-js';
import { getNewBlockSelection } from './getNewBlockSelection';
import { removeEntity } from './removeEntity';
import { removeTeXBlock } from './removeTeXBlock';
export function saveInlineTeX({ after, contentState, tex, type, entityKey, blockKey, startPos }) {
    const needsRemoval = tex.length === 0;
    let newContentState;
    let newSelection;
    if (needsRemoval) {
        newContentState = removeEntity(contentState, blockKey, startPos, startPos + 1);
        newSelection = newContentState.getSelectionAfter();
    }
    else {
        newContentState = contentState.mergeEntityData(entityKey, {
            tex,
            type
        });
        const offset = after ? startPos + 1 : startPos;
        newSelection = SelectionState.createEmpty(blockKey).merge({
            anchorOffset: offset,
            focusOffset: offset,
            hasFocus: true
        });
    }
    return [newContentState, newSelection, needsRemoval];
}
export function saveTeXBlock({ after, contentState, tex, block }) {
    const needsRemoval = tex.length === 0;
    const blockKey = block.getKey();
    let newContentState;
    let newSelection;
    if (needsRemoval) {
        newContentState = removeTeXBlock(contentState, block, after);
        newSelection = newContentState.getSelectionAfter();
    }
    else {
        newContentState = Modifier.mergeBlockData(contentState, SelectionState.createEmpty(blockKey), { tex });
        newSelection = getNewBlockSelection(contentState.getBlockBefore(blockKey), contentState.getBlockAfter(blockKey), after);
    }
    return [newContentState, newSelection, needsRemoval];
}
