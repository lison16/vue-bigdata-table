export default {
    name: 'RenderCell',
    functional: true,
    props: {
        render: Function,
        index: Number
    },
    render: (h, ctx) => {
        return ctx.props.render(h, ctx.props.index);
    }
};