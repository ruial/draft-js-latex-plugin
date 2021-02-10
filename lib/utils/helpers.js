export function isAtEndOfBlock(contentState, selection) {
    const currentBlockKey = selection.getAnchorKey();
    const currentBlock = contentState.getBlockForKey(currentBlockKey);
    return currentBlock.getText().length === selection.getStartOffset();
}
export function isAtEndOfContent(contentState, selection) {
    if (!isAtEndOfBlock(contentState, selection)) {
        return false;
    }
    const currentBlockKey = selection.getAnchorKey();
    const lastBlockKey = contentState.getLastBlock().getKey();
    return currentBlockKey === lastBlockKey;
}
export function isCurrentBlockEmpty(contentState, selection) {
    const currentBlockKey = selection.getAnchorKey();
    const currentBlock = contentState.getBlockForKey(currentBlockKey);
    return currentBlock.getText().length === 0;
}
