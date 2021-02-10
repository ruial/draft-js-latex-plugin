export const inlineTeXStrategy = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        if (!entityKey)
            return false;
        return contentState.getEntity(entityKey).getType() === 'INLINETEX';
    }, callback);
};
