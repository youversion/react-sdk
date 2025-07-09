import { FC } from 'react';

const loginButtonUrl = 'https://github.com/youversion/yvp-sdks/blob/main/shared-assets/roundedButton-dark.png?raw=true';

interface Props {
  onClick: () => void;
  styles?: React.CSSProperties;
}

export const YouVersionLoginButton: FC<Props> = ({ onClick, styles }) => {
  return (
    <img
      src={loginButtonUrl}
      alt="Sign in with YouVersion"
      onClick={onClick}
      style={{ cursor: "pointer", width: "200px", ...styles }}
    />
  );
};