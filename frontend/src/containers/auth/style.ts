import styled from 'styled-components';
import { MEDIA, LIGHT_THEME } from 'src/components/theme';

export const AuthPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme?.mainBackground};
  background-image: ${({ theme }) => theme?.mainGradient};
`;
AuthPageWrapper.defaultProps = {
  theme: LIGHT_THEME,
};

export const AuthFormWrapper = styled.form`
  position: relative;
  padding: 20px;
  width: 480px;
  max-width: 100%;
  margin: 100px 10px 0;
  border-radius: 4px;

  ${MEDIA.max530({
    margin: '50px 0 0',
    width: '100%',
  })}
`;
AuthFormWrapper.defaultProps = {
  theme: LIGHT_THEME,
};

export const FormTitle = styled.div`
  width: 100%;
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: -0.06rem;
  margin-bottom: 40px;
  text-align: center;
`;

export const AuthCommonButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 42px;
  margin-right: 12px;
  cursor: pointer;
  border-radius: 4px;
  background: ${({ theme }) => theme?.component?.button?.background?.secondary};

  &:hover {
    background: ${({ theme }) => theme?.component?.button?.hover?.secondary};
  }

  &:active {
    background: ${({ theme }) => theme?.component?.button?.active?.secondary};
  }

  :last-child {
    margin-right: 0;
  }
`;

export const AuthRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ButtonRow = styled(AuthRow)`
  height: 40px;
  margin-top: 20px;
`;

export const AuthColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const AuthSpan = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const AuthSeparate = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme?.textColor?.primary};
  position: relative;
  margin: 30px 0;

  &:after {
    content: 'Или';
    position: absolute;
    padding: 0 14px;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme?.background?.primary};
  }
`;

export const AnimateWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;
