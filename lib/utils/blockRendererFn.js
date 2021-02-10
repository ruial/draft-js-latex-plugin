import TeXBlock from '../components/TeXBlock';
export const getBlockRendererFn = (internals) => (block, store) => {
    const isAtomic = block.getType() === 'atomic';
    const isTexBlock = block.getData().get('type') === 'TEXBLOCK';
    if (isAtomic && isTexBlock) {
        return {
            component: TeXBlock,
            editable: false,
            props: { store, internals }
        };
    }
};
