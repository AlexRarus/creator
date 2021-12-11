import styled from 'styled-components';

interface IButton {
  background?: string;
  borderRadius?: string;
  color?: string;
  height?: string;
  [key: string]: any;
}

export const ButtonBlock = styled.div<IButton>`
  display: flex;
  flex-direction: column;
  padding: 8px 14px;
  align-items: center;
  width: 100%;
  color: ${({ color }) => color};
  border-radius: ${({ borderRadius }) => borderRadius}px;
  background: ${({ background }) => background || 'inherit'};
  height: ${({ height }) => height}px;
  cursor: pointer;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

export const SubTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;
