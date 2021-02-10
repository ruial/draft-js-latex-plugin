export function getInternals(config) {
    const editingState = { key: '' };
    const getEditingState = () => {
        return editingState;
    };
    const setEditingState = (newEditingState) => {
        Object.assign(editingState, newEditingState);
    };
    return {
        getEditingState,
        setEditingState
    };
}
