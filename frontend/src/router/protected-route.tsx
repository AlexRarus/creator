import { Navigate } from 'react-router-dom';

interface IProps {
  children: any;
  allow: boolean;
}

export const ProtectedRoute = ({ children, allow }: IProps) => {
  if (!allow) {
    return <Navigate to='/' replace={true} />;
  }

  return children;
};
