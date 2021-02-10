import { Modifier, SelectionState } from 'draft-js';
export function removeEntity(contentState, blockKey, start, end) {
    const selectionToRemove = SelectionState.createEmpty(blockKey).merge({
        anchorOffset: start,
        focusOffset: end
    });
    return Modifier.removeRange(contentState, selectionToRemove, 'backward');
}
