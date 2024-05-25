import React from 'react';

interface StyleProps {
    fontFamily: string;
}

interface BoxProps {
    styleSheet: StyleProps;
    children: React.ReactNode;
    tag?: keyof JSX.IntrinsicElements;
}

export default function Box({ styleSheet, children, tag }: BoxProps) {
    const Tag = tag || 'div';
    return <Tag style={styleSheet}>{children}</Tag>;
}
