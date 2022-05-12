function template({ imports, componentName, props, jsx, exports }, { tpl }) {

  return tpl`
    import React, { forwardRef, useState } from 'react';
    import styled from 'styled-components';
    import {
      compose,
      space,
      color,
      layout,
      typography,
      SpaceProps,
      ColorProps,
      LayoutProps,
      TypographyProps
    } from 'styled-system';
    import { v4 as uuidv4 } from 'uuid';
    export type IconProps = SpaceProps & ColorProps & LayoutProps & TypographyProps;
    const SvgComponent = forwardRef<
      SVGSVGElement,
      React.SVGProps<SVGSVGElement> & { title?: any }
    >(({ title, ...props }, svgRef) => {
        const [titleId] = useState(() => (title? uuidv4(): undefined));
        return (
          ${jsx}
        )
      }
    );
    const ${componentName} = styled(SvgComponent)<IconProps>(({ color, cursor, ...rest }) => {
        const cssRule = {
          flex: 'none',
          verticalAlign: 'middle',
        };
        color && (cssRule['fill'] = color);
        cursor && (cssRule['cursor'] = cursor);
        return cssRule;
      },
      compose(space, color, layout, typography)
    );
    export default ${componentName};
  `;
}

module.exports = template;
